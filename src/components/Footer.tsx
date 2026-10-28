import React, { useState } from 'react';
import { MapPin, Mail, Phone, Heart, Shield, ArrowUp, Lock, ShieldCheck, KeyRound, Eye, EyeOff, X, Building2, Copy, Check, Search, Globe, Tag } from 'lucide-react';
import { useAdminAuth } from '../utils/adminAuth';
import { ORG_DETAILS } from '../data/organizationData';
import { Language } from '../types';
import { VisitorCounter } from './VisitorCounter';
import { BottomAdminBar } from './BottomAdminBar';
import { AdminTab } from './AdminPortal';

interface FooterProps {
  language: Language;
  onOpenAdmin?: () => void;
  onOpenAdminTab?: (tab: AdminTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenAdmin, onOpenAdminTab }) => {
  const { isAdmin, login, logout } = useAdminAuth();
  const [showBottomLogin, setShowBottomLogin] = useState(false);
  const [bottomPassword, setBottomPassword] = useState('');
  const [showBottomPass, setShowBottomPass] = useState(false);
  const [bottomError, setBottomError] = useState<string | null>(null);
  const [copiedFooterKey, setCopiedFooterKey] = useState<string | null>(null);

  const handleFooterCopy = (text: string, key: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedFooterKey(key);
      setTimeout(() => setCopiedFooterKey(null), 2000);
    } catch {
      setCopiedFooterKey(key);
      setTimeout(() => setCopiedFooterKey(null), 2000);
    }
  };

  const handleBottomLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(bottomPassword);
    if (res.success) {
      setBottomPassword('');
      setBottomError(null);
      setShowBottomLogin(false);
    } else {
      setBottomError(res.message);
      setTimeout(() => setBottomError(null), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-stone-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Registration Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-slate-700 shrink-0">
                <img
                  src={ORG_DETAILS.logoUrl}
                  alt="JUYO"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/juyo-logo.jpg';
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {language === 'bn' ? ORG_DETAILS.nameBn : ORG_DETAILS.nameEn}
                </h3>
                <p className="text-xs text-amber-400 font-semibold">
                  "{language === 'bn' ? ORG_DETAILS.mottoBn : ORG_DETAILS.mottoEn}"
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md">
              {language === 'bn'
                ? 'জয়মনিরহাট ইউনিয়ন যুব সংগঠন একটি অরাজনৈতিক স্বেচ্ছাসেবী সামাজিক প্রতিষ্ঠান। যুব উন্নয়ন অধিদপ্তর কুড়িগ্রাম জেলা কার্যালয় থেকে নিবন্ধিত হয়ে আমরা আত্ম-মানবতার সেবা ও গ্রামীণ সমাজ সংস্কারে নিরলসভাবে কাজ করে যাচ্ছি।'
                : 'A government-registered, non-political voluntary institution committed to altruistic community service, girl empowerment, and rural development in Bhurungamari, Kurigram.'}
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-stone-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {language === 'bn'
                  ? `রেজি: ${ORG_DETAILS.regNumberBn} · যুব উন্নয়ন অধিদপ্তর`
                  : `Reg: ${ORG_DETAILS.regNumberEn} · DYD Kurigram`}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'প্রয়োজনীয় লিংক' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-stone-400">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'মূলপাতা' : 'Home'}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'আমাদের সম্পর্কে ও নিবন্ধন' : 'About & Registration'}
                </a>
              </li>
              <li>
                <a href="#flagship-project" className="hover:text-amber-400 transition-colors text-amber-300/90 font-medium">
                  {language === 'bn' ? 'মাদকবিরোধী বিশেষ প্রকল্প' : 'Anti-Drug Flagship Project'}
                </a>
              </li>
              <li>
                <a href="#activities" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? '১০টি প্রধান কার্যক্রম' : '10 Core Activities'}
                </a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'অর্জন ও সাফল্য' : 'Key Achievements'}
                </a>
              </li>
              <li>
                <a href="#leadership" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'সদস্য পরিচিতি ও নেতৃত্ব (১১ জন)' : 'Leadership & Members'}
                </a>
              </li>
              <li>
                <a href="#partners" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'সহযোগী সংস্থা ও নেটওয়ার্ক' : 'Partners & Network'}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'স্থিরচিত্র গ্যালারি' : 'Photo Gallery'}
                </a>
              </li>
              <li>
                <a href="#social-hub" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'ফেসবুক পেজ ও সোশ্যাল হাব' : 'Social Hub'}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  {language === 'bn' ? 'যোগাযোগ ও অনুদান' : 'Contact & Donations'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Contact & Address */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'প্রধান কার্যালয় ও যোগাযোগ' : 'Office & Contacts'}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                <span>{language === 'bn' ? ORG_DETAILS.addressBn : ORG_DETAILS.addressEn}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${ORG_DETAILS.whatsapp}`} className="hover:text-emerald-400 font-mono">
                  {ORG_DETAILS.whatsapp} ({ORG_DETAILS.phoneFormatted})
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${ORG_DETAILS.email}`} className="hover:text-blue-400 break-all">
                  {ORG_DETAILS.email}
                </a>
              </div>
            </div>

            {/* Official Donation Accounts */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2 text-xs">
              <div className="text-amber-300 font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'bn' ? 'সংগঠনের অফিশিয়াল অনুদান হিসাব:' : 'Donation Accounts:'}</span>
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/60 font-semibold">
                  {language === 'bn' ? 'নিজস্ব ব্যাংক' : 'Official'}
                </span>
              </div>

              {/* Agrani Bank */}
              <div className="bg-slate-950 p-2 rounded-md border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-stone-200">
                  <span>{language === 'bn' ? ORG_DETAILS.bankAccount.bankNameBn : ORG_DETAILS.bankAccount.bankNameEn}</span>
                  <span className="text-[10px] text-stone-400 font-normal">{language === 'bn' ? ORG_DETAILS.bankAccount.branchBn : ORG_DETAILS.bankAccount.branchEn}</span>
                </div>
                <div className="flex items-center justify-between font-mono bg-slate-900 px-2 py-1 rounded border border-slate-800">
                  <span className="text-emerald-400 font-black text-xs tracking-wider">
                    {ORG_DETAILS.bankAccount.accountNumber}
                  </span>
                  <button
                    onClick={() => handleFooterCopy(ORG_DETAILS.bankAccount.accountNumber, 'footer_bank')}
                    type="button"
                    className="text-[10px] text-emerald-300 hover:text-white px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 cursor-pointer"
                    title="হিসাব নম্বর কপি করুন"
                  >
                    {copiedFooterKey === 'footer_bank' ? '✓ কপি হয়েছে' : 'কপি'}
                  </button>
                </div>
                <div className="text-[10px] text-stone-400 flex items-center justify-between pt-0.5">
                  <span className="truncate max-w-[150px]" title={ORG_DETAILS.bankAccount.accountNameEn}>
                    {ORG_DETAILS.bankAccount.accountNameEn}
                  </span>
                  <span className="font-mono text-stone-300 font-semibold">
                    রাউটিং: {ORG_DETAILS.bankAccount.routingNumber}
                  </span>
                </div>
              </div>

              {/* Mobile Banking */}
              <div className="space-y-1.5 pt-1.5 border-t border-slate-800/80">
                <div className="flex items-center justify-between font-mono text-stone-200 text-[11px]">
                  <span className="text-pink-400 font-bold">বিকাশ (bKash):</span>
                  <div className="flex items-center gap-1.5">
                    <span>{ORG_DETAILS.bkash}</span>
                    <button
                      onClick={() => handleFooterCopy(ORG_DETAILS.bkash, 'footer_bkash')}
                      type="button"
                      className="text-[10px] text-stone-400 hover:text-white cursor-pointer"
                      title="কপি"
                    >
                      {copiedFooterKey === 'footer_bkash' ? '✓' : 'কপি'}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between font-mono text-stone-200 text-[11px]">
                  <span className="text-orange-400 font-bold">নগদ (Nagad):</span>
                  <div className="flex items-center gap-1.5">
                    <span>{ORG_DETAILS.nagad}</span>
                    <button
                      onClick={() => handleFooterCopy(ORG_DETAILS.nagad, 'footer_nagad')}
                      type="button"
                      className="text-[10px] text-stone-400 hover:text-white cursor-pointer"
                      title="কপি"
                    >
                      {copiedFooterKey === 'footer_nagad' ? '✓' : 'কপি'}
                    </button>
                  </div>
                </div>
                <div className="text-[10px] text-amber-300/90 leading-tight bg-amber-950/40 p-1.5 rounded border border-amber-900/60">
                  ⚠️ বিকাশ ও নগদ সাধারণ সম্পাদকের নামে (মোঃ নুরে আলম সিদ্দিকী শান্ত)। টাকা পাঠানোর পূর্বে সভাপতি/সাধারণ সম্পাদকের সঙ্গে যোগাযোগ করুন।
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <a
                href={ORG_DETAILS.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-900/70 hover:bg-blue-800 text-white rounded-md text-xs font-semibold transition-colors"
              >
                ফেসবুক পেজ
              </a>
              <a
                href={ORG_DETAILS.facebookGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-950 hover:bg-blue-900 text-white border border-blue-800 rounded-md text-xs font-semibold transition-colors"
              >
                ফেসবুক গ্রুপ
              </a>
              <a
                href={ORG_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-900/70 hover:bg-emerald-800 text-white rounded-md text-xs font-semibold transition-colors"
              >
                হোয়াটসঅ্যাপ
              </a>
            </div>
          </div>
        </div>

        {/* On-Page Local SEO & Key Search Topics Directory */}
        <div className="py-8 border-b border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Search className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'bn' 
                  ? 'জনপ্রিয় অনুসন্ধান ও বিষয়ভিত্তিক সূচি (SEO Search Index)' 
                  : 'Popular Local Search Topics & Keywords Index'}
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              {language === 'bn'
                ? 'ভূরুঙ্গামারী, কুড়িগ্রাম, রংপুর ও বাংলাদেশে আমাদের প্রধান কার্যক্রম ও সেবা'
                : 'Core social initiatives across Bhurungamari, Kurigram & Rangpur Division'}
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {/* Geographic Hub */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-stone-400 font-semibold flex items-center gap-1 shrink-0 text-[11px]">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>{language === 'bn' ? 'এলাকা কাভারেজ:' : 'Coverage:'}</span>
              </span>
              <a href="#wards" className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-stone-300 hover:text-amber-300 hover:border-slate-700 transition-colors">
                Bhurungamari (ভূরুঙ্গামারী)
              </a>
              <a href="#wards" className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-stone-300 hover:text-amber-300 hover:border-slate-700 transition-colors">
                Kurigram (কুড়িগ্রাম)
              </a>
              <a href="#about" className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-stone-300 hover:text-amber-300 hover:border-slate-700 transition-colors">
                Rangpur Division (রংপুর বিভাগ)
              </a>
              <a href="#wards" className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-stone-300 hover:text-amber-300 hover:border-slate-700 transition-colors">
                Joymonirhat (জয়মনিরহাট ইউনিয়ন ১-৯ ওয়ার্ড)
              </a>
              <a href="#home" className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-stone-300 hover:text-amber-300 hover:border-slate-700 transition-colors">
                Bangladesh (বাংলাদেশ)
              </a>
            </div>

            {/* Core Sectors & Activities */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-stone-400 font-semibold flex items-center gap-1 shrink-0 text-[11px]">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'bn' ? 'কার্যক্রম ও সেবা:' : 'Focus Sectors:'}</span>
              </span>
              <a href="#activities" className="px-2.5 py-1 rounded bg-slate-900/90 border border-emerald-900/50 text-emerald-300 hover:bg-emerald-950/80 transition-colors">
                বৃক্ষরোপণ ও পরিবেশ সুরক্ষা (Tree Plantation)
              </a>
              <a href="#flagship-project" className="px-2.5 py-1 rounded bg-slate-900/90 border border-rose-900/50 text-rose-300 hover:bg-rose-950/80 transition-colors">
                মাদক প্রতিরোধ আন্দোলন (Anti-Drug Movement)
              </a>
              <a href="#activities" className="px-2.5 py-1 rounded bg-slate-900/90 border border-amber-900/50 text-amber-300 hover:bg-amber-950/80 transition-colors">
                বাল্যবিবাহ প্রতিরোধ সেল (Child Marriage Prevention)
              </a>
              <a href="#about" className="px-2.5 py-1 rounded bg-slate-900/90 border border-blue-900/50 text-blue-300 hover:bg-blue-950/80 transition-colors">
                স্বেচ্ছাসেবা ও মানব সংগঠন (Volunteerism)
              </a>
              <a href="#about" className="px-2.5 py-1 rounded bg-slate-900/90 border border-purple-900/50 text-purple-300 hover:bg-purple-950/80 transition-colors">
                সমাজসেবা ও এনজিও (NGO & Social Welfare)
              </a>
              <a href="#contact" className="px-2.5 py-1 rounded bg-slate-900/90 border border-red-900/50 text-red-300 hover:bg-red-950/80 transition-colors">
                জরুরি রক্তদান স্কোয়াড (Emergency Blood Help)
              </a>
              <a href="#activities" className="px-2.5 py-1 rounded bg-slate-900/90 border border-cyan-900/50 text-cyan-300 hover:bg-cyan-950/80 transition-colors">
                যুব উন্নয়ন ও কারিগরি প্রশিক্ষণ (Youth Development)
              </a>
              <a href="#contact" className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700 text-stone-300 hover:text-white transition-colors">
                অনুদানের খাতা (Agrani Bank: 0200020924516)
              </a>
            </div>
          </div>
        </div>

        {/* 
          দুটি সেকশন শুধুমাত্র অনুমোদিত অ্যাডমিনের জন্য দৃশ্যমান:
          ১. ওয়েবসাইট ভিজিটর ও এলাকা ট্র্যাকার (VisitorCounter)
          ২. অ্যাডমিন দ্রুত প্রবেশ ও ট্রাফিক নিয়ন্ত্রণ (BottomAdminBar)
          সাধারণ ভিজিটরদের কাছে এই দুটি সেকশন সম্পূর্ণ অদৃশ্য থাকবে।
        */}
        {isAdmin && (
          <div className="pt-8 pb-4 space-y-4 border-t border-slate-800/80 mt-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/80 border border-amber-500/40 px-4 py-2.5 rounded-xl text-xs text-amber-300">
              <span className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {language === 'bn' 
                    ? 'অনুমোদিত অ্যাডমিন মোড সক্রিয়: সাধারণ ভিজিটরদের কাছে এই দুটি সেকশন লুকানো, শুধু আপনি দেখতে ও পরিচালনা করতে পারছেন।'
                    : 'Authorized Admin Mode Active: These two sections are hidden from general visitors and visible only to you.'}
                </span>
              </span>
              <button
                type="button"
                onClick={logout}
                className="self-start sm:self-auto px-3 py-1 bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800/60 rounded-lg font-bold transition-all cursor-pointer text-[11px]"
                title="লগআউট করুন এবং সেকশন দুটি পুনরায় লুকিয়ে রাখুন"
              >
                {language === 'bn' ? 'লগআউট ও লুকান' : 'Logout & Hide'}
              </button>
            </div>

            {/* সেকশন ১: রিয়েল-টাইম ওয়েবসাইট ভিজিটর ও এলাকা ট্র্যাকার (অক্ষত রাখা হয়েছে, শুধু অ্যাডমিনের জন্য) */}
            <VisitorCounter language={language} />

            {/* সেকশন ২: অ্যাডমিন দ্রুত প্রবেশ ও ট্রাফিক নিয়ন্ত্রণ (অক্ষত রাখা হয়েছে, শুধু অ্যাডমিনের জন্য) */}
            <BottomAdminBar
              language={language}
              onOpenAdminTab={(tab) => {
                if (onOpenAdminTab) {
                  onOpenAdminTab(tab);
                } else if (onOpenAdmin) {
                  onOpenAdmin();
                }
              }}
            />
          </div>
        )}

        {/* Quick inline admin bottom unlock box for authorized admin */}
        {!isAdmin && showBottomLogin && (
          <div className="pt-6 pb-2 border-t border-slate-800 mt-6 animate-in fade-in duration-200">
            <div className="max-w-md mx-auto bg-slate-900 border border-amber-500/40 p-4 rounded-2xl shadow-2xl">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>{language === 'bn' ? 'অ্যাডমিন দ্রুত প্রবেশ ও আনলক' : 'Admin Quick Access & Unlock'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowBottomLogin(false)}
                  className="text-stone-400 hover:text-white p-1 cursor-pointer"
                  title="বন্ধ করুন"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleBottomLoginSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type={showBottomPass ? 'text' : 'password'}
                    value={bottomPassword}
                    onChange={(e) => {
                      setBottomPassword(e.target.value);
                      if (bottomError) setBottomError(null);
                    }}
                    placeholder={language === 'bn' ? 'গোপন অ্যাডমিন পাসওয়ার্ড লিখুন...' : 'Enter admin password...'}
                    className="w-full pl-3 pr-9 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    autoFocus
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowBottomPass(!showBottomPass)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white p-1 cursor-pointer"
                  >
                    {showBottomPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  {language === 'bn' ? 'আনলক' : 'Unlock'}
                </button>
              </form>
              {bottomError && (
                <p className="text-[11px] text-rose-400 font-semibold mt-2">{bottomError}</p>
              )}
            </div>
          </div>
        )}

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="text-center sm:text-left">
            © {ORG_DETAILS.establishedYearEn} - 2026 {ORG_DETAILS.nameBn} (JUYO)। সর্বস্বত্ব সংরক্ষিত।
          </p>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">
              {language === 'bn' ? 'অরাজনৈতিক ও অলাভজনক স্বেচ্ছাসেবী যুব সংগঠন' : 'Non-political & voluntary organization'}
            </span>

            {!isAdmin ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowBottomLogin(!showBottomLogin)}
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400/90 hover:text-amber-300 font-semibold transition-colors cursor-pointer py-1.5 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700"
                  title="নিচ থেকেই পাসওয়ার্ড দিয়ে লগইন করুন"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'bn' ? 'অ্যাডমিন প্রবেশ' : 'Admin Login'}</span>
                </button>
                <button
                  onClick={() => onOpenAdminTab ? onOpenAdminTab('notice') : onOpenAdmin?.()}
                  type="button"
                  className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-white transition-colors cursor-pointer py-1.5 px-2.5 rounded-lg bg-slate-900/60 border border-slate-800"
                  title="সম্পূর্ণ অ্যাডমিন পোর্টাল খুলুন"
                >
                  <span>{language === 'bn' ? 'পোর্টাল' : 'Portal'}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAdminTab ? onOpenAdminTab('notice') : onOpenAdmin?.()}
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer py-1.5 px-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40"
                  title="অ্যাডমিন পোর্টাল খুলুন"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'bn' ? 'অ্যাডমিন পোর্টাল (সক্রিয়)' : 'Admin Portal (Active)'}</span>
                </button>
                <button
                  onClick={logout}
                  type="button"
                  className="text-xs text-rose-400 hover:text-rose-300 py-1.5 px-2.5 rounded-lg bg-rose-950/40 border border-rose-800/40 cursor-pointer"
                  title="লগআউট ও সেকশন লুকান"
                >
                  {language === 'bn' ? 'লুকান' : 'Hide'}
                </button>
              </div>
            )}

            <button
              onClick={scrollToTop}
              type="button"
              className="p-2 bg-slate-900 hover:bg-slate-800 text-stone-300 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
