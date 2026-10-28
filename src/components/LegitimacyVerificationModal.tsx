import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  Download, 
  QrCode, 
  Building2, 
  FileCheck2, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  Lock
} from 'lucide-react';
import { ORG_DETAILS } from '../data/organizationData';
import { Language } from '../types';

interface LegitimacyVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const LegitimacyVerificationModal: React.FC<LegitimacyVerificationModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'cert' | 'bank' | 'qr'>('cert');
  const [copiedTextKey, setCopiedTextKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const websiteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://organisation.ai.studio';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(websiteUrl)}&margin=15`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTextKey(key);
    setTimeout(() => setCopiedTextKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-5 sm:p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-300 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-full mb-1">
                <span>সরকারি নিবন্ধন ও বৈধতা স্বীকৃতি</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                {language === 'bn' ? 'সংগঠনের পূর্ণাঙ্গ বৈধতা ও স্বচ্ছতা সনদ' : 'Official Legitimacy & Transparency Dossier'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs (App tab removed as requested) */}
        <div className="flex items-center border-b border-stone-200 bg-stone-50 px-4 sm:px-6 overflow-x-auto text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('cert')}
            className={`py-3.5 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'cert'
                ? 'border-blue-900 text-blue-900 font-bold bg-white'
                : 'border-transparent text-stone-600 hover:text-slate-900'
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            <span>সরকারি নিবন্ধন সনদ</span>
          </button>

          <button
            onClick={() => setActiveTab('bank')}
            className={`py-3.5 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'bank'
                ? 'border-blue-900 text-blue-900 font-bold bg-white'
                : 'border-transparent text-stone-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>ব্যাংক, বিকাশ ও নগদ অনুদান হিসাব</span>
          </button>

          <button
            onClick={() => setActiveTab('qr')}
            className={`py-3.5 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'qr'
                ? 'border-blue-900 text-blue-900 font-bold bg-white'
                : 'border-transparent text-stone-600 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-4 h-4 text-indigo-600" />
            <span>ব্যানার ও প্রচারের কিউআর কোড</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* TAB 1: Government Registration Certificate */}
          {activeTab === 'cert' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                  <strong>১০০% বৈধ ও নিবন্ধিত স্বেচ্ছাসেবী সংগঠন:</strong> জয়মনিরহাট ইউনিয়ন যুব সংগঠন গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের যুব ও ক্রীড়া মন্ত্রণালয়াধীন <strong>যুব উন্নয়ন অধিদপ্তর, কুড়িগ্রাম জেলা কার্যালয়</strong> কর্তৃক স্বীকৃত ও নিবন্ধিত।
                </div>
              </div>

              {/* Certificate Image & Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-stone-100 group">
                  <img
                    src={ORG_DETAILS.registrationCertUrl}
                    alt="সরকারি নিবন্ধন সনদ"
                    className="w-full h-64 object-contain bg-white"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 p-2.5 text-center text-white text-xs font-semibold">
                    যুব উন্নয়ন অধিদপ্তর অনুমোদিত অফিসিয়াল নিবন্ধন পত্র
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200">
                    <span className="text-xs text-stone-500 font-semibold block">সরকারি নিবন্ধন নম্বর:</span>
                    <span className="text-base font-bold font-mono text-blue-950 block">{ORG_DETAILS.regNumberBn}</span>
                    <span className="text-[11px] text-stone-500 font-mono">DYD-Kuri-88/2023</span>
                  </div>

                  <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200">
                    <span className="text-xs text-stone-500 font-semibold block">অনুমোদনকারী কর্তৃপক্ষ:</span>
                    <span className="text-sm font-bold text-slate-900 block">{ORG_DETAILS.regAuthorityBn}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                      <span className="text-stone-500 block">প্রতিষ্ঠার তারিখ:</span>
                      <span className="font-bold text-slate-800">{ORG_DETAILS.establishedDateBn}</span>
                    </div>
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                      <span className="text-stone-500 block">নিবন্ধন অনুমোদন:</span>
                      <span className="font-bold text-slate-800">{ORG_DETAILS.regDateBn}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-200 text-xs text-blue-950">
                    <strong>সংগঠনের প্রকৃতি:</strong> {ORG_DETAILS.natureBn}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Official Bank Account & Financial Integrity */}
          {activeTab === 'bank' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                  <strong>আর্থিক সততা ও প্রতারণা রোধে সতর্কতা:</strong> সংগঠনের সকল অর্থনৈতিক কার্যক্রম সম্পূর্ণ স্বচ্ছ এবং সরকারের বিধিমোতাবেক পরিচালিত। ব্যক্তিগত কোনো বিকাশ/নগদে চাঁদা দাবি করা সম্পূর্ণ নিষিদ্ধ। সংগঠনের যাবতীয় অনুদান শুধুমাত্র সংগঠনের নিজের নামের অফিশিয়াল ব্যাংক একাউন্টে জমা নেওয়া হয়।
                </div>
              </div>

              {/* Bank Account Details Card */}
              <div className="bg-white rounded-2xl p-5 border-2 border-emerald-600/50 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-emerald-700" />
                    <span className="font-bold text-base text-slate-900">{ORG_DETAILS.bankAccount.bankNameBn}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                    সংগঠনের নিজের নামে সক্রিয় হিসাব
                  </span>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-bold text-stone-500 uppercase">হিসাব নম্বর (Account Number)</div>
                    <div className="text-lg sm:text-xl font-mono font-black text-emerald-800 tracking-wider">
                      {ORG_DETAILS.bankAccount.accountNumber}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(ORG_DETAILS.bankAccount.accountNumber, 'acc')}
                    type="button"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs cursor-pointer flex items-center gap-1.5"
                  >
                    {copiedTextKey === 'acc' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedTextKey === 'acc' ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block">হিসাবের নাম:</span>
                    <span className="font-bold text-slate-900 font-mono">{ORG_DETAILS.bankAccount.accountNameEn}</span>
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block">শাখা ও জেলা:</span>
                    <span className="font-bold text-slate-900">{ORG_DETAILS.bankAccount.branchBn}</span>
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block">রাউটিং নম্বর (Routing No):</span>
                    <span className="font-mono font-bold text-slate-900">{ORG_DETAILS.bankAccount.routingNumber}</span>
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <span className="text-stone-500 block">হিসাবের ধরন:</span>
                    <span className="font-bold text-slate-900">{ORG_DETAILS.bankAccount.accountTypeBn}</span>
                  </div>
                </div>

                {/* Mobile Banking: bKash and Nagad with General Secretary Notice */}
                <div className="pt-3 border-t border-stone-200">
                  <div className="text-xs font-bold text-slate-900 mb-2">
                    মোবাইল ব্যাংকিং (বিকাশ ও নগদ):
                  </div>

                  <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 mb-3 text-xs text-amber-950 leading-relaxed flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>জরুরি সতকর্তা ও নির্দেশিকা:</strong> এই বিকাশ ও নগদ নম্বর দুটি সংগঠনের <strong>সাধারণ সম্পাদক (মোঃ নুরে আলম সিদ্দিকী শান্ত)</strong>-এর নামে নিবন্ধিত। এই দুই নাম্বারে কোনো অনুদান বা অর্থ পাঠানোর আগে অবশ্যই সংগঠনের <strong>সভাপতি</strong> (০১৭৩৮৬৫৬০০৪) অথবা <strong>সাধারণ সম্পাদক</strong> (০১৭০৫৯২৯০৪৯)-এর সঙ্গে ফোনে সরাসরি যোগাযোগ ও কথা বলে নিশ্চিত হয়ে টাকা পাঠাবেন।
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* bKash */}
                    <div className="bg-pink-50/70 border border-pink-200 rounded-xl p-3 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-pink-200 text-pink-900">
                          বিকাশ (bKash) · পার্সোনাল
                        </span>
                        <div className="text-base font-black font-mono text-slate-900 mt-1">
                          {ORG_DETAILS.bkash}
                        </div>
                        <div className="text-[11px] text-pink-950 font-medium">
                          সাধারণ সম্পাদকের নামে
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(ORG_DETAILS.bkash, 'modal_bkash')}
                        type="button"
                        className="px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg text-xs cursor-pointer flex items-center gap-1"
                      >
                        {copiedTextKey === 'modal_bkash' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedTextKey === 'modal_bkash' ? 'কপি' : 'কপি'}</span>
                      </button>
                    </div>

                    {/* Nagad */}
                    <div className="bg-orange-50/70 border border-orange-200 rounded-xl p-3 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-200 text-orange-900">
                          নগদ (Nagad) · পার্সোনাল
                        </span>
                        <div className="text-base font-black font-mono text-slate-900 mt-1">
                          {ORG_DETAILS.nagad}
                        </div>
                        <div className="text-[11px] text-orange-950 font-medium">
                          সাধারণ সম্পাদকের নামে
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(ORG_DETAILS.nagad, 'modal_nagad')}
                        type="button"
                        className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg text-xs cursor-pointer flex items-center gap-1"
                      >
                        {copiedTextKey === 'modal_nagad' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedTextKey === 'modal_nagad' ? 'কপি' : 'কপি'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Printable QR Code for Banners, Posters & Public Outreach */}
          {activeTab === 'qr' && (
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex items-start gap-3">
                <QrCode className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-indigo-950 leading-relaxed">
                  <strong>ব্যানার, লিফলেট ও পোস্টারের জন্য কিউআর কোড:</strong> এই কিউআর কোডটি ডাউনলোড করে প্রিন্ট করে সংগঠনের অফিস, বিভিন্ন হাট-বাজার, শিক্ষাপ্রতিষ্ঠান বা পোস্টারে যুক্ত করতে পারেন। যেকোনো মোবাইল দিয়ে এটি স্ক্যান করলেই সরাসরি এই অফিশিয়াল ওয়েবসাইটে চলে আসা যাবে।
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="bg-white p-3 rounded-2xl border-2 border-indigo-200 shadow-md">
                  <img
                    src={qrCodeUrl}
                    alt="Official Website QR Code"
                    className="w-48 h-48 rounded-xl object-contain"
                  />
                  <div className="text-center font-mono text-[10px] text-stone-500 mt-2 font-bold">
                    স্ক্যান করে ভিজিট করুন
                  </div>
                </div>

                <div className="space-y-3 max-w-sm text-center sm:text-left">
                  <h4 className="text-base font-bold text-slate-900">
                    অফিসিয়াল স্মার্ট কিউআর কার্ড
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    গ্রামের সাধারণ মানুষ, ছাত্র-যুবক এবং প্রবাসীরা সহজেই ক্যামেরা দিয়ে স্ক্যান করে সংগঠনের সকল রক্তদান, মাদক প্রতিরোধ ও সমাজকল্যাণ সেবা পেতে পারেন।
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <a
                      href={qrCodeUrl}
                      download="JUYO-Official-Website-QR.png"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>কিউআর কোড ডাউনলোড</span>
                    </a>
                    <button
                      onClick={() => handleCopy(websiteUrl, 'web_url')}
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-stone-100 text-slate-800 font-semibold rounded-xl text-xs border border-stone-300 transition-all cursor-pointer"
                    >
                      {copiedTextKey === 'web_url' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedTextKey === 'web_url' ? 'লিংক কপি হয়েছে' : 'লিংক কপি'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-stone-50 p-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-stone-500 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>যুব উন্নয়ন অধিদপ্তর নিবন্ধিত · শতভাগ বৈধ ও সুরক্ষিত ওয়েবসাইট</span>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            ঠিক আছে
          </button>
        </div>
      </div>
    </div>
  );
};
