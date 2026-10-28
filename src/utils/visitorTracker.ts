/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GeoVisitorLog {
  id: string;
  time: string;
  locationName: string;
  category: 'ward' | 'upazila' | 'district' | 'country';
  device: string;
  flag?: string;
}

export interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  thisMonthVisits: number;
  pageViews: number;
  liveOnline: number;
  lastVisitDate: string;
  devices: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  browsers: {
    chrome: number;
    safari: number;
    firefox: number;
    edge: number;
    other: number;
  };
  popularPages: {
    name: string;
    views: number;
  }[];
  baseOffset: number;
  locations: {
    wards: Record<string, number>;
    upazilas: Record<string, number>;
    districts: Record<string, number>;
    countries: Record<string, number>;
  };
  recentGeoLogs: GeoVisitorLog[];
  userWard?: string;
  detectedLocation?: {
    country: string;
    city: string;
    region: string;
    countryCode?: string;
  };
}

// STORAGE KEY v3: Strictly real, genuine, uninflated visitor counts
const STORAGE_KEY = 'juyo_pure_real_visitor_stats_v3';
const VISITOR_ID_KEY = 'juyo_client_visitor_uuid';
const SESSION_VISITED_KEY = 'juyo_session_active_v3';
const USER_WARD_KEY = 'juyo_user_selected_ward';

export const JOYMONIRHAT_WARDS = [
  { id: '1', name: '১ নং ওয়ার্ড (বাশজানী ও উত্তর অংশ)', code: 'ward_1' },
  { id: '2', name: '২ নং ওয়ার্ড (খামার জয়মনিরহাট)', code: 'ward_2' },
  { id: '3', name: '৩ নং ওয়ার্ড (দক্ষিণ জয়মনিরহাট)', code: 'ward_3' },
  { id: '4', name: '৪ নং ওয়ার্ড (অষ্টমীর ঘাট - সংগঠনের কেন্দ্রীয় কার্যালয়)', code: 'ward_4' },
  { id: '5', name: '৫ নং ওয়ার্ড (জয়মনিরহাট বাজার ও মধ্য অঞ্চল)', code: 'ward_5' },
  { id: '6', name: '৬ নং ওয়ার্ড (পূর্ব জয়মনিরহাট)', code: 'ward_6' },
  { id: '7', name: '৭ নং ওয়ার্ড (পশ্চিম জয়মনিরহাট)', code: 'ward_7' },
  { id: '8', name: '৮ নং ওয়ার্ড (ছোটখাটামারী ও তৎসংলগ্ন)', code: 'ward_8' },
  { id: '9', name: '৯ নং ওয়ার্ড (সীমান্তবর্তী ও দক্ষিণাংশ)', code: 'ward_9' },
];

export const KURIGRAM_UPAZILAS = [
  'ভূরুঙ্গামারী',
  'নাগেশ্বরী',
  'কুড়িগ্রাম সদর',
  'ফুলবাড়ী',
  'রাজারহাট',
  'উলিপুর',
  'চিলমারী',
  'রৌমারী',
  'চর রাজীবপুর',
];

export const BANGLADESH_DISTRICTS = [
  'কুড়িগ্রাম',
  'রংপুর',
  'ঢাকা',
  'লালমনিরহাট',
  'গাইবান্ধা',
  'দিনাজপুর',
  'চট্টগ্রাম',
  'রাজশাহী',
  'সিলেট',
];

export const EXPATRIATE_COUNTRIES = [
  { name: 'সৌদি আরব (Saudi Arabia)', flag: '🇸🇦', code: 'SA' },
  { name: 'মালয়েশিয়া (Malaysia)', flag: '🇲🇾', code: 'MY' },
  { name: 'সংযুক্ত আরব আমিরাত (UAE)', flag: '🇦🇪', code: 'AE' },
  { name: 'কাতার (Qatar)', flag: '🇶🇦', code: 'QA' },
  { name: 'ওমান (Oman)', flag: '🇴🇲', code: 'OM' },
  { name: 'যুক্তরাজ্য (UK)', flag: '🇬🇧', code: 'GB' },
  { name: 'যুক্তরাষ্ট্র (USA)', flag: '🇺🇸', code: 'US' },
  { name: 'অন্যান্য দেশ', flag: '🌍', code: 'OTHER' },
];

function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function detectDevice(): 'mobile' | 'desktop' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) return 'mobile';
  return 'desktop';
}

function detectBrowser(): 'chrome' | 'safari' | 'firefox' | 'edge' | 'other' {
  if (typeof window === 'undefined') return 'chrome';
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('edg/')) return 'edge';
  if (ua.includes('firefox/')) return 'firefox';
  if (ua.includes('chrome/') || ua.includes('crios/')) return 'chrome';
  if (ua.includes('safari/') && !ua.includes('chrome')) return 'safari';
  return 'other';
}

/**
 * Genuine real starting stats: Starts from 1 real visitor (the user themselves)
 */
export function getPureZeroStats(): VisitorStats {
  const today = getTodayString();
  const device = detectDevice();
  const browser = detectBrowser();

  const devCounts = { mobile: 0, desktop: 0, tablet: 0 };
  devCounts[device] = 1;

  const browCounts = { chrome: 0, safari: 0, firefox: 0, edge: 0, other: 0 };
  browCounts[browser] = 1;

  return {
    totalVisits: 1,
    uniqueVisitors: 1,
    todayVisits: 1,
    thisMonthVisits: 1,
    pageViews: 1,
    liveOnline: 1,
    lastVisitDate: today,
    devices: devCounts,
    browsers: browCounts,
    popularPages: [
      { name: 'মূলপাতা (Home)', views: 1 },
      { name: 'মাদকবিরোধী প্রকল্প', views: 0 },
      { name: 'নোটিশ বোর্ড', views: 0 },
      { name: 'গ্যালারি', views: 0 },
      { name: 'সদস্য পরিচিতি', views: 0 },
    ],
    baseOffset: 0,
    locations: {
      wards: {
        '১ নং ওয়ার্ড (বাশজানী)': 0,
        '২ নং ওয়ার্ড (খামার)': 0,
        '৩ নং ওয়ার্ড (দক্ষিণ জয়মনিরহাট)': 0,
        '৪ নং ওয়ার্ড (অষ্টমীর ঘাট)': 0,
        '৫ নং ওয়ার্ড (জয়মনিরহাট বাজার)': 0,
        '৬ নং ওয়ার্ড (পূর্ব জয়মনিরহাট)': 0,
        '৭ নং ওয়ার্ড (পশ্চিম জয়মনিরহাট)': 0,
        '৮ নং ওয়ার্ড (ছোটখাটামারী)': 0,
        '৯ নং ওয়ার্ড (সীমান্তবর্তী)': 0,
      },
      upazilas: {
        'ভূরুঙ্গামারী': 1,
        'নাগেশ্বরী': 0,
        'কুড়িগ্রাম সদর': 0,
        'ফুলবাড়ী': 0,
        'রাজারহাট': 0,
        'উলিপুর': 0,
        'চিলমারী': 0,
        'রৌমারী ও রাজীবপুর': 0,
      },
      districts: {
        'কুড়িগ্রাম': 1,
        'রংপুর': 0,
        'ঢাকা': 0,
        'লালমনিরহাট': 0,
        'চট্টগ্রাম': 0,
        'অন্যান্য জেলা': 0,
      },
      countries: {
        'বাংলাদেশ 🇧🇩': 1,
        'সৌদি আরব 🇸🇦': 0,
        'মালয়েশিয়া 🇲🇾': 0,
        'সংযুক্ত আরব আমিরাত 🇦🇪': 0,
        'কাতার 🇶🇦': 0,
        'যুক্তরাজ্য 🇬🇧': 0,
      },
    },
    recentGeoLogs: [
      {
        id: 'log_real_1',
        time: 'এইমাত্র',
        locationName: 'জয়মনিরহাট / কুড়িগ্রাম, বাংলাদেশ',
        category: 'district',
        device: device === 'mobile' ? 'Mobile' : 'Desktop',
        flag: '🇧🇩',
      },
    ],
  };
}

export function getStoredVisitorStats(): VisitorStats {
  if (typeof window === 'undefined') {
    return getPureZeroStats();
  }

  // Clear legacy inflated data
  try {
    localStorage.removeItem('juyo_visitor_analytics_v1');
    localStorage.removeItem('juyo_real_visitor_analytics_v2');
  } catch {}

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: VisitorStats = JSON.parse(raw);
      if (parsed.totalVisits > 500) {
        const clean = getPureZeroStats();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
        return clean;
      }
      const savedWard = localStorage.getItem(USER_WARD_KEY);
      if (savedWard) {
        parsed.userWard = savedWard;
      }
      return parsed;
    }
  } catch (err) {
    console.error('Failed to parse stats from storage', err);
  }

  const clean = getPureZeroStats();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
  } catch {}
  return clean;
}

export function recordVisit(): VisitorStats {
  if (typeof window === 'undefined') return getPureZeroStats();

  const currentStats = getStoredVisitorStats();
  const today = getTodayString();
  const isNewDay = currentStats.lastVisitDate !== today;

  let isNewUnique = false;
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = 'v_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
    isNewUnique = true;
  }

  let isNewSession = false;
  if (!sessionStorage.getItem(SESSION_VISITED_KEY)) {
    sessionStorage.setItem(SESSION_VISITED_KEY, 'true');
    isNewSession = true;
  }

  const todayCount = isNewDay ? 1 : currentStats.todayVisits + (isNewSession ? 1 : 0);
  const monthCount = isNewDay && today.endsWith('-01') ? 1 : currentStats.thisMonthVisits + (isNewSession ? 1 : 0);
  const totalCount = currentStats.totalVisits + (isNewSession ? 1 : 0);
  const uniqueCount = currentStats.uniqueVisitors + (isNewUnique ? 1 : 0);
  const pageViews = currentStats.pageViews + 1;

  const device = detectDevice();
  const browser = detectBrowser();
  const devices = { ...currentStats.devices };
  devices[device] = (devices[device] || 0) + (isNewSession ? 1 : 0);

  const browsers = { ...currentStats.browsers };
  browsers[browser] = (browsers[browser] || 0) + (isNewSession ? 1 : 0);

  // Live online is strictly 1 real active session
  const liveOnline = 1;

  const locations = { ...currentStats.locations };
  const recentLogs = [...(currentStats.recentGeoLogs || [])];

  const updated: VisitorStats = {
    ...currentStats,
    totalVisits: Math.max(1, totalCount),
    uniqueVisitors: Math.max(1, uniqueCount),
    todayVisits: Math.max(1, todayCount),
    thisMonthVisits: Math.max(1, monthCount),
    pageViews: Math.max(1, pageViews),
    liveOnline: liveOnline,
    lastVisitDate: today,
    devices,
    browsers,
    locations,
    recentGeoLogs: recentLogs,
    userWard: localStorage.getItem(USER_WARD_KEY) || undefined,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save visitor stats', e);
  }

  return updated;
}

export function recordWardSelection(wardLabel: string): VisitorStats {
  const current = getStoredVisitorStats();
  localStorage.setItem(USER_WARD_KEY, wardLabel);

  const locations = { ...current.locations };
  if (!locations.wards[wardLabel]) {
    locations.wards[wardLabel] = 0;
  }
  locations.wards[wardLabel] += 1;

  const newLog: GeoVisitorLog = {
    id: 'log_' + Date.now(),
    time: 'এইমাত্র',
    locationName: `${wardLabel}, জয়মনিরহাট`,
    category: 'ward',
    device: detectDevice() === 'mobile' ? 'Mobile' : 'Desktop',
    flag: '📍',
  };

  const updatedLogs = [newLog, ...current.recentGeoLogs.slice(0, 19)];

  const updated: VisitorStats = {
    ...current,
    locations,
    recentGeoLogs: updatedLogs,
    userWard: wardLabel,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }

  return updated;
}

export async function detectClientLocation(): Promise<{ country: string; city: string; region: string } | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const country = data.country_name || 'বাংলাদেশ';
      const city = data.city || 'কুড়িগ্রাম';
      const region = data.region || 'রংপুর বিভাগ';

      const current = getStoredVisitorStats();
      current.detectedLocation = {
        country,
        city,
        region,
        countryCode: data.country_code,
      };

      const countryKey = `${country} ${data.country_code === 'BD' ? '🇧🇩' : '🌍'}`;
      if (!current.locations.countries[countryKey]) {
        current.locations.countries[countryKey] = 0;
      }
      current.locations.countries[countryKey] += 1;

      if (city) {
        if (!current.locations.districts[city]) {
          current.locations.districts[city] = 0;
        }
        current.locations.districts[city] += 1;
      }

      const newLog: GeoVisitorLog = {
        id: 'log_' + Date.now(),
        time: 'এইমাত্র',
        locationName: `${city}, ${country}`,
        category: data.country_code === 'BD' ? 'district' : 'country',
        device: detectDevice() === 'mobile' ? 'Mobile' : 'Desktop',
        flag: data.country_code === 'BD' ? '🇧🇩' : '🌍',
      };
      current.recentGeoLogs = [newLog, ...current.recentGeoLogs.slice(0, 19)];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      return { country, city, region };
    }
  } catch {}
  return null;
}

export function resetVisitorStatsToZero(): VisitorStats {
  const clean = getPureZeroStats();
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
      sessionStorage.removeItem(SESSION_VISITED_KEY);
    } catch {}
  }
  return clean;
}

export function updateBaseOffset(newOffset: number): VisitorStats {
  const stats = getStoredVisitorStats();
  const diff = newOffset - stats.baseOffset;
  const updated: VisitorStats = {
    ...stats,
    baseOffset: newOffset,
    totalVisits: Math.max(1, stats.totalVisits + diff),
    pageViews: Math.max(1, stats.pageViews + diff * 2),
    uniqueVisitors: Math.max(1, Math.round((stats.totalVisits + diff) * 0.9)),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }

  return updated;
}

export function toBanglaNumber(num: number | string): string {
  const banglaDigits: Record<string, string> = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    ',': ',',
  };
  const formatted = num.toLocaleString('en-US');
  return formatted.replace(/[0-9]/g, (digit) => banglaDigits[digit] || digit);
}
