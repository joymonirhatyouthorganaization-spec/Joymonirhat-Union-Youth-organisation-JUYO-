/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  KeyRound, 
  BarChart3, 
  FileText, 
  Camera, 
  Newspaper, 
  RefreshCw, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  LogOut,
  Sparkles,
  Zap
} from "lucide-react";
import { clearWebsiteCache, getCacheReport, CacheReport } from "../utils/cacheManager";
import { useAdminAuth } from "../utils/adminAuth";
import { Language } from "../types";
import { AdminTab } from "./AdminPortal";

interface BottomAdminBarProps {
  language: Language;
  onOpenAdminTab: (tab: AdminTab) => void;
}

export const BottomAdminBar: React.FC<BottomAdminBarProps> = ({ language, onOpenAdminTab }) => {
  const { isAdmin, login, logout } = useAdminAuth();
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [cacheReport, setCacheReport] = useState<CacheReport | null>(null);

  useEffect(() => {
    getCacheReport().then(setCacheReport);
    const interval = setInterval(() => {
      getCacheReport().then(setCacheReport);
    }, 10000);
    return () => clearInterval(interval);
  }, [isAdmin]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(passwordInput);
    if (res.success) {
      setPasswordInput("");
      setErrorMessage(null);
      setSuccessMessage("অ্যাডমিন মোড সক্রিয় হয়েছে! নিচের অপশনগুলো থেকে সরাসরি নিয়ন্ত্রণ করুন।");
      setTimeout(() => setSuccessMessage(null), 4000);
    } else {
      setErrorMessage(res.message);
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };

  const handleClearCache = async () => {
    setIsClearingCache(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const res = await clearWebsiteCache(true);
    setIsClearingCache(false);

    if (res.success) {
      setSuccessMessage(res.message);
      const updated = await getCacheReport();
      setCacheReport(updated);
      setTimeout(() => setSuccessMessage(null), 5000);
    } else {
      setErrorMessage(res.message);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden transition-all">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-500"></div>

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-sm sm:text-base text-white">
                {language === "bn" ? "অ্যাডমিন দ্রুত প্রবেশ ও ট্রাফিক নিয়ন্ত্রণ" : "Admin Quick Control & Traffic"}
              </h4>
              {isAdmin && (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>লগইন সক্রিয়</span>
                </span>
              )}
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              {language === "bn" 
                ? "সংগঠনের নিজস্ব ডেটা, ভিজিটর ট্র্যাকার ও ব্রাউজার ক্যাশ মেমোরি সরাসরি নিয়ন্ত্রণ করুন।"
                : "Manage organization data, visitor analytics, and web cache memory directly."}
            </p>
          </div>
        </div>

        {/* Cache status & fast actions */}
        <div className="flex items-center gap-2">
          {/* Clear Cache button: ONLY for authorized admin */}
          <button
            type="button"
            onClick={handleClearCache}
            disabled={isClearingCache}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-stone-300 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
            title="ব্রাউজার ক্যাশ ক্লিয়ার করুন ও দ্রুততম লোড নিশ্চিত করুন"
          >
            {isClearingCache ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
            ) : (
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span>{language === "bn" ? "ক্যাশ ক্লিয়ার" : "Clear Cache"}</span>
          </button>

          {isAdmin && (
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white rounded-lg text-xs font-semibold border border-rose-800/50 transition-all cursor-pointer"
              title="অ্যাডমিন সেশন থেকে লগআউট করুন"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === "bn" ? "লগআউট" : "Logout"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="mt-3 p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mt-3 p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* VIEW A: IF NOT AUTHENTICATED -> PASSWORD LOGIN FORM */}
      {!isAdmin ? (
        <div className="mt-4 pt-1">
          <form onSubmit={handleLoginSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative flex-1">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder={language === "bn" ? "গোপন অ্যাডমিন পাসওয়ার্ড লিখুন..." : "Enter admin password..."}
                className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400 transition-all"
                required
              />
              <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer shrink-0"
            >
              <Unlock className="w-4 h-4" />
              <span>{language === "bn" ? "লগইন করুন / আনলক" : "Unlock Admin"}</span>
            </button>
          </form>
        </div>
      ) : (
        /* VIEW B: IF AUTHENTICATED -> INSTANT DIRECT ACTION BUTTONS */
        <div className="mt-4 pt-1 space-y-3">
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>সংগঠনের অ্যাডমিন প্যানেল সক্রিয়। নিচে থেকে সরাসরি যে অংশে যেতে চান ক্লিক করুন:</span>
            </span>
            <span className="text-stone-400 text-[11px] flex items-center gap-2">
              <span>ক্যাশ সাইজ: <strong className="text-white font-mono">{cacheReport?.localStorageSizeKb || 0} KB</strong></span>
              <span className="text-emerald-400">• আল্ট্রা-ফাস্ট মোড সক্রিয়</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* 1. VISITOR & TRAFFIC ANALYTICS BUTTON (PRIMARY) */}
            <button
              type="button"
              onClick={() => onOpenAdminTab("analytics")}
              className="p-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 shadow-lg border border-teal-400/40 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
              </div>
              <span className="text-center">{language === "bn" ? "ভিজিটর ও এলাকা ট্রাফিক" : "Visitor Analytics"}</span>
              <span className="text-[10px] text-teal-100 font-normal">৯টি ওয়ার্ড ও জেলা/দেশ</span>
            </button>

            {/* 2. Notice Publisher */}
            <button
              type="button"
              onClick={() => onOpenAdminTab("notice")}
              className="p-3 rounded-xl bg-blue-900/80 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 border border-blue-700 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <FileText className="w-4 h-4 text-blue-300" />
              <span className="text-center">{language === "bn" ? "বিজ্ঞপ্তি প্রকাশ করুন" : "Post Notice"}</span>
              <span className="text-[10px] text-blue-300 font-normal">নোটিশ বোর্ড লাইভ</span>
            </button>

            {/* 3. Program Photo Upload */}
            <button
              type="button"
              onClick={() => onOpenAdminTab("gallery")}
              className="p-3 rounded-xl bg-indigo-900/80 hover:bg-indigo-800 text-white font-semibold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 border border-indigo-700 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Camera className="w-4 h-4 text-indigo-300" />
              <span className="text-center">{language === "bn" ? "ছবি আপলোড করুন" : "Upload Photo"}</span>
              <span className="text-[10px] text-indigo-300 font-normal">অ্যালবাম ও কর্মসূচি</span>
            </button>

            {/* 4. Press Clipping */}
            <button
              type="button"
              onClick={() => onOpenAdminTab("press")}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-stone-200 font-semibold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 border border-slate-700 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Newspaper className="w-4 h-4 text-amber-400" />
              <span className="text-center">{language === "bn" ? "পেপার কাটিং যুক্ত" : "Press Clipping"}</span>
              <span className="text-[10px] text-stone-400 font-normal">মিডিয়া কভারেজ</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
