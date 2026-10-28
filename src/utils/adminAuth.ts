/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

export const ADMIN_AUTH_KEYS = {
  MASTER_PASSWORD: 'juyo_admin_master_password_v1',
  AUTH_SESSION: 'juyo_admin_authenticated_session_v1',
  AUTH_TIMESTAMP: 'juyo_admin_auth_timestamp_v1',
};

// Master secret password set by the user
export const DEFAULT_MASTER_PASSWORD = '1617707322qw';

export const ADMIN_AUTH_EVENT = 'juyo_admin_auth_changed';

/**
 * Checks if current user is an authorized admin
 */
export function isUserAdmin(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const isAuth = sessionStorage.getItem(ADMIN_AUTH_KEYS.AUTH_SESSION) === 'true';
    if (!isAuth) return false;

    // Optional 24-hour expiry check
    const timestamp = sessionStorage.getItem(ADMIN_AUTH_KEYS.AUTH_TIMESTAMP);
    if (timestamp) {
      const age = Date.now() - parseInt(timestamp, 10);
      if (age > 24 * 60 * 60 * 1000) {
        logoutAdmin();
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Verifies password and logs in as admin
 */
export function verifyAndLoginAdmin(inputPassword: string): { success: boolean; message: string } {
  if (typeof window === 'undefined') {
    return { success: false, message: 'ব্রাউজার এনভায়রনমেন্ট পাওয়া যায়নি।' };
  }

  const trimmed = inputPassword.trim();
  const storedPass = localStorage.getItem(ADMIN_AUTH_KEYS.MASTER_PASSWORD);
  const activePassword = storedPass || DEFAULT_MASTER_PASSWORD;

  if (trimmed === activePassword) {
    try {
      sessionStorage.setItem(ADMIN_AUTH_KEYS.AUTH_SESSION, 'true');
      sessionStorage.setItem(ADMIN_AUTH_KEYS.AUTH_TIMESTAMP, Date.now().toString());
      // Also set localStorage flag so admin can see bottom controls if they opened in new tab of same browser
      localStorage.setItem('juyo_admin_active_flag', 'true');
    } catch {}

    window.dispatchEvent(new CustomEvent(ADMIN_AUTH_EVENT, { detail: { authenticated: true } }));
    return {
      success: true,
      message: 'সফলভাবে অ্যাডমিন লগইন সম্পন্ন হয়েছে!',
    };
  }

  return {
    success: false,
    message: 'ভুল পাসওয়ার্ড! শুধুমাত্র অনুমোদিত অ্যাডমিন প্রবেশ করতে পারবেন।',
  };
}

/**
 * Logs out the admin
 */
export function logoutAdmin(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(ADMIN_AUTH_KEYS.AUTH_SESSION);
    sessionStorage.removeItem(ADMIN_AUTH_KEYS.AUTH_TIMESTAMP);
    localStorage.removeItem('juyo_admin_active_flag');
  } catch {}

  window.dispatchEvent(new CustomEvent(ADMIN_AUTH_EVENT, { detail: { authenticated: false } }));
}

/**
 * React Hook for admin authentication state
 */
export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => isUserAdmin());

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAdmin(isUserAdmin());
    };

    window.addEventListener(ADMIN_AUTH_EVENT, handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener(ADMIN_AUTH_EVENT, handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  return {
    isAdmin,
    login: verifyAndLoginAdmin,
    logout: logoutAdmin,
  };
}
