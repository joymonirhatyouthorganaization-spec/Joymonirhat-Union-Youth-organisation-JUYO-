/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CacheReport {
  localStorageSizeKb: number;
  cachedImagesCount: number;
  totalNotices: number;
  totalGalleryItems: number;
  cacheStorageSupported: boolean;
  serviceWorkersCount: number;
  cacheVersion: string;
  lastUpdatedTime: string;
}

export const CACHE_KEYS = {
  VERSION: 'juyo_content_cache_version_v3',
  LAST_CLEARED: 'juyo_cache_last_cleared_v1',
  TEMPORARY_BLOBS: 'juyo_temp_blobs_v1',
};

// In-memory runtime cache for blazing fast data lookups
const inMemoryCache = new Map<string, { data: unknown; timestamp: number }>();

/**
 * Get cached item from memory or compute it
 */
export function getOrSetMemoryCache<T>(key: string, ttlMs: number, computeFn: () => T): T {
  const existing = inMemoryCache.get(key);
  const now = Date.now();
  if (existing && now - existing.timestamp < ttlMs) {
    return existing.data as T;
  }
  const fresh = computeFn();
  inMemoryCache.set(key, { data: fresh, timestamp: now });
  return fresh;
}

/**
 * Invalidate memory cache and bump version
 * Called automatically whenever any admin Publishes, Updates, or Deletes content
 */
export function invalidateContentCache(reason = 'content_updated'): void {
  inMemoryCache.clear();
  if (typeof window !== 'undefined') {
    try {
      const now = Date.now();
      localStorage.setItem(CACHE_KEYS.VERSION, now.toString());
      // Dispatch content refresh
      window.dispatchEvent(new CustomEvent('juyo_content_cache_invalidated', { detail: { reason, timestamp: now } }));
    } catch {}
  }
}

/**
 * Get current browser cache & storage size report
 */
export async function getCacheReport(): Promise<CacheReport> {
  let localStorageSizeKb = 0;
  let totalNotices = 0;
  let totalGalleryItems = 0;
  let cachedImagesCount = 0;

  if (typeof window !== 'undefined') {
    try {
      let totalBytes = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const val = localStorage.getItem(key) || '';
          totalBytes += key.length + val.length;
          if (key === 'juyo_custom_notices_v1') {
            try {
              totalNotices = JSON.parse(val).length;
            } catch {}
          }
          if (key === 'juyo_custom_gallery_v1') {
            try {
              const gallery = JSON.parse(val);
              totalGalleryItems = gallery.length;
              cachedImagesCount = gallery.filter((item: any) => item.imageUrl && item.imageUrl.startsWith('data:')).length;
            } catch {}
          }
        }
      }
      localStorageSizeKb = Math.round((totalBytes * 2) / 1024);
    } catch (err) {
      console.warn('Failed to calculate storage size', err);
    }
  }

  let serviceWorkersCount = 0;
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      serviceWorkersCount = registrations.length;
    } catch {}
  }

  const version = typeof window !== 'undefined' ? localStorage.getItem(CACHE_KEYS.VERSION) || '3.0.0' : '3.0.0';
  const lastCleared = typeof window !== 'undefined' ? localStorage.getItem(CACHE_KEYS.LAST_CLEARED) || 'সম্প্রতি' : 'সম্প্রতি';

  return {
    localStorageSizeKb,
    cachedImagesCount,
    totalNotices,
    totalGalleryItems,
    cacheStorageSupported: typeof window !== 'undefined' && 'caches' in window,
    serviceWorkersCount,
    cacheVersion: version,
    lastUpdatedTime: lastCleared,
  };
}

/**
 * Admin-Only Clear Website Cache
 * Flushes temporary storage, browser caches, and stale blobs without touching master password or published organization records
 */
export async function clearWebsiteCache(deepClean = true): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Flush in-memory cache
    inMemoryCache.clear();

    // 2. Clear window.caches (Service Worker caches)
    if (typeof window !== 'undefined' && 'caches' in window) {
      const keys = await caches.keys();
      for (const key of keys) {
        await caches.delete(key);
      }
    }

    // 3. Unregister any service workers
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
    }

    // 4. Clear temporary sessionStorage while preserving admin session if requested
    if (typeof sessionStorage !== 'undefined') {
      const auth = sessionStorage.getItem('juyo_admin_authenticated_session_v1');
      const authTime = sessionStorage.getItem('juyo_admin_auth_timestamp_v1');
      sessionStorage.clear();
      if (auth) {
        sessionStorage.setItem('juyo_admin_authenticated_session_v1', auth);
      }
      if (authTime) {
        sessionStorage.setItem('juyo_admin_auth_timestamp_v1', authTime);
      }
    }

    // 5. Clean temporary localStorage blobs
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(CACHE_KEYS.TEMPORARY_BLOBS);
      localStorage.removeItem('juyo_cache_temporary_blobs');
      const nowStr = new Date().toLocaleTimeString('bn-BD');
      localStorage.setItem(CACHE_KEYS.LAST_CLEARED, nowStr);
      localStorage.setItem(CACHE_KEYS.VERSION, Date.now().toString());
    }

    // Dispatch invalidation to all live hooks
    invalidateContentCache('manual_admin_clear');

    return {
      success: true,
      message: 'ব্রাউজার ক্যাশ ও মেমোরি সফলভাবে পরিষ্কার করা হয়েছে! ওয়েবসাইটের সর্বশেষ কনটেন্ট দ্রুত লোড হবে।',
    };
  } catch (error) {
    console.error('Failed to clear cache', error);
    return {
      success: false,
      message: 'ক্যাশ মুছে ফেলতে সমস্যা হয়েছে: ' + (error instanceof Error ? error.message : String(error)),
    };
  }
}
