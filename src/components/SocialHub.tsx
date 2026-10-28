import React, { useState } from 'react';
import { MessageCircle, ExternalLink, Share2, Users, Check, Globe, ShieldAlert, Copy, Sparkles, Megaphone, X } from 'lucide-react';
import { ORG_DETAILS, DRUG_PREVENTION_POSTS } from '../data/organizationData';
import { Language } from '../types';

interface SocialHubProps {
  language: Language;
}

export const SocialHub: React.FC<SocialHubProps> = ({ language }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [copiedPromoText, setCopiedPromoText] = useState(false);

  const websiteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://organisation.ai.studio';

  const promoPostText = `🌟 তারুণ্যের শক্তিতে গড়ি সচেতন, মাদকমুক্ত ও মানবিক সমাজ 🌟

কুড়িগ্রাম জেলার ভূরুঙ্গামারী উপজেলার জয়মনিরহাট ইউনিয়নে সমাজসেবা, যুব উন্নয়ন, মাদক ও বাল্যবিবাহ প্রতিরোধ এবং আত্ম-মানবতার সেবায় নিবেদিত অরাজনৈতিক স্বেচ্ছাসেবী প্রতিষ্ঠান:
🏛️ জয়মনিরহাট ইউনিয়ন যুব সংগঠন (JUYO)
(যুব উন্নয়ন অধিদপ্তর কুড়িগ্রাম নিবন্ধিত, রেজি: যুউঅ/কুড়ি-৮৮/২০২৩)

আমাদের প্রধান সেবাসমূহ:
🌿 বৃক্ষরোপণ ও পরিবেশ সুরক্ষা কর্মসূচি
🛡️ সীমান্তবর্তী এলাকায় মাদক প্রতিরোধ সামাজিক আন্দোলন
🚫 বাল্যবিবাহ প্রতিরোধ ও কন্যাশিশু সুরক্ষা সেল
🩸 ২৪ ঘণ্টা বিনামূল্যে জরুরি রক্তদান স্কোয়াড (হেল্পলাইন: 01705929049)
🤝 শীতার্তদের কম্বল বিতরণ ও বন্যা দুর্যোগে মানবিক ত্রাণ
💻 যুব কারিগরি ও আত্মকর্মসংস্থান প্রশিক্ষণ সহায়তা

🏛️ সংগঠনের অফিশিয়াল অনুদান হিসাব:
অগ্রণী ব্যাংক পিএলসি, ভূরুঙ্গামারী শাখা
হিসাব নম্বর: 0200020924516 (রাউটিং: 010490105)
হিসাবের নাম: JOYMONIRHAT UNION JUBO SANGATHON

🌐 আমাদের ওয়েবসাইট ভিজিট করুন ও বিস্তারিত জানুন:
${websiteUrl}

#Joymonirhat #Bhurungamari #Kurigram #Rangpur #JUYO #NGO #YouthOrganization #মাদকপ্রতিরোধ #বৃক্ষরোপণ #স্বেচ্ছাসেবা #বাল্যবিবাহপ্রতিরোধ #রক্তদান #সমাজসেবা`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: language === 'bn' ? ORG_DETAILS.nameBn : ORG_DETAILS.nameEn,
        text: language === 'bn' ? `${ORG_DETAILS.nameBn} - ${ORG_DETAILS.mottoBn}` : `${ORG_DETAILS.nameEn} - ${ORG_DETAILS.mottoEn}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-2">
              <Globe className="w-4 h-4" />
              <span>{language === 'bn' ? 'সামাজিক যোগাযোগ ও কমিউনিটি' : 'Community & Social Networks'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              {language === 'bn'
                ? 'অনলাইন ও সোশ্যাল মিডিয়ায় আমাদের সাথে যুক্ত থাকুন'
                : 'Connect With JUYO Across Social Media & Channels'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed">
              {language === 'bn'
                ? 'জয়মনিরহাট ইউনিয়ন যুব সংগঠনের অফিশিয়াল ফেসবুক পেজ লাইক দিয়ে নিয়মিত কার্যক্রমের ভিডিও ও ছবি দেখুন এবং ফেসবুক গ্রুপে যোগ দিয়ে এলাকার যেকোনো উন্নয়ন প্রস্তাবনায় অংশ নিন।'
                : 'Follow our official Facebook page for real-time field reports, join our Facebook group for community dialogues, or message our WhatsApp helpline.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Facebook Page Card */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-6 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-4 shadow-sm">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {language === 'bn' ? 'অফিশিয়াল ফেসবুক পেজ' : 'Official Facebook Page'}
                </h3>
                <p className="mt-1.5 text-xs text-blue-200 leading-relaxed">
                  {language === 'bn'
                    ? 'ভিডিও রিপোর্ট, সংবাদ বিজ্ঞপ্তি ও লাইভ সমাজসেবা প্রচার।'
                    : 'Official announcements, field photo albums, and video coverage.'}
                </p>
              </div>

              <a
                href={ORG_DETAILS.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-900 bg-white hover:bg-amber-300 rounded-lg transition-colors group"
              >
                <span>{language === 'bn' ? 'পেজ ভিজিট করুন' : 'Visit Page'}</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Facebook Group Card */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-6 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center text-white mb-4 shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {language === 'bn' ? 'অফিশিয়াল ফেসবুক গ্রুপ' : 'Official Facebook Group'}
                </h3>
                <p className="mt-1.5 text-xs text-blue-200 leading-relaxed">
                  {language === 'bn'
                    ? 'জয়মনিরহাটের তরুণ ও এলাকাবাসীর উন্মুক্ত আলোচনা এবং মতবিনিময়।'
                    : 'Community discussion forum for local citizens and active youth members.'}
                </p>
              </div>

              <a
                href={ORG_DETAILS.facebookGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-900 bg-white hover:bg-amber-300 rounded-lg transition-colors group"
              >
                <span>{language === 'bn' ? 'গ্রুপে যুক্ত হোন' : 'Join Group'}</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* WhatsApp Hotline Card */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-6 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white mb-4 shadow-sm">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {language === 'bn' ? 'জরুরি হোয়াটসঅ্যাপ হেল্পলাইন' : '24/7 WhatsApp Hotline'}
                </h3>
                <p className="mt-1.5 text-xs text-blue-200 leading-relaxed">
                  {language === 'bn'
                    ? 'রক্তদান প্রয়োজন বা জরুরি মানবিক সহায়তায় সরাসরি মেসেজ পাঠান।'
                    : 'Instant messaging for emergency blood requests and direct aid coordination.'}
                </p>
                <div className="mt-2 text-xs font-mono font-bold text-amber-300">
                  {ORG_DETAILS.phoneFormatted}
                </div>
              </div>

              <a
                href={ORG_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors group"
              >
                <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে মেসেজ দিন' : 'Chat on WhatsApp'}</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Dedicated Field-level Anti-Drug Facebook Posts section */}
          <div className="mt-10 pt-8 border-t border-white/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300 uppercase tracking-widest mb-1">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>{language === 'bn' ? 'মাঠপর্যায়ের মাদকবিরোধী কার্যক্রম' : 'Field Anti-Drug Action'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {language === 'bn'
                    ? 'অফিসিয়াল ফেসবুক পেজের ৫টি বিশেষ মাঠপর্যায়ের প্রতিবেদন'
                    : '5 Key Anti-Drug Movement Reports from Our Official Facebook Page'}
                </h3>
                <p className="text-xs sm:text-sm text-blue-200 mt-1">
                  {language === 'bn'
                    ? 'জয়মনিরহাটের তরুণ সমাজকে রক্ষায় আমাদের সচেতনতামূলক কর্মসূচি, শপথ ও রাজপথের র‍্যালির সরাসরি ফেসবুক লিংক:'
                    : 'Direct links to our youth rallies, anti-drug pledges, and community campaigns on Facebook:'}
                </p>
              </div>
              <a
                href={ORG_DETAILS.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-950 bg-amber-300 hover:bg-amber-400 rounded-lg transition-colors"
              >
                <span>{language === 'bn' ? 'সকল ফেসবুক আপডেট দেখুন' : 'All Updates'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DRUG_PREVENTION_POSTS.map((post) => (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/15 border border-white/15 hover:border-amber-300/60 rounded-xl p-4 flex flex-col justify-between transition-all group backdrop-blur-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/30 text-amber-300 border border-amber-300/30">
                        {language === 'bn' ? post.highlightBn : post.highlightEn}
                      </span>
                      <span className="text-[11px] text-blue-200">
                        {language === 'bn' ? post.dateBn : post.dateEn}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                      {language === 'bn' ? post.titleBn : post.titleEn}
                    </h4>

                    <p className="mt-2 text-xs text-blue-100 line-clamp-2 leading-relaxed">
                      {language === 'bn' ? post.summaryBn : post.summaryEn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-amber-300 font-semibold group-hover:text-amber-200">
                    <span>{language === 'bn' ? 'ফেসবুকে সচিত্র প্রতিবেদন দেখুন' : 'View on Facebook'}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Share & Viral Promotion Row */}
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-blue-200">
            <div>
              <div className="font-semibold text-white flex items-center gap-1.5 mb-0.5">
                <Megaphone className="w-4 h-4 text-amber-300" />
                <span>{language === 'bn' ? 'সোশ্যাল মিডিয়ায় সংগঠনের বিজ্ঞাপন ও প্রচার' : 'Social Media Promotion Campaign'}</span>
              </div>
              <p className="text-[11px] text-blue-200">
                {language === 'bn'
                  ? 'আপনার ফেসবুক পেজ, গ্রুপ ও হোয়াটসঅ্যাপে ১-ক্লিকে প্রচার করে সংগঠনের পরিচিতি দেশব্যাপী ছড়িয়ে দিন।'
                  : 'Instantly promote our welfare programs across Facebook groups, pages, and WhatsApp.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Ready-made Ad Copy Kit Modal trigger */}
              <button
                onClick={() => setShowPromoModal(true)}
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-bold rounded-lg shadow-sm transition-all cursor-pointer text-xs"
                title="বিজ্ঞাপন ও ফেসবুক পোস্টের আকর্ষণীয় টেক্সট দেখুন ও কপি করুন"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'বিজ্ঞাপন টেক্সট কিট' : 'Ad Promo Kit'}</span>
              </button>

              {/* Direct Facebook Share */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold rounded-lg shadow-sm transition-colors text-xs"
                title="ফেসবুকে শেয়ার করুন"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>{language === 'bn' ? 'ফেসবুকে শেয়ার' : 'Facebook'}</span>
              </a>

              {/* Direct WhatsApp Share */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${promoPostText}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-sm transition-colors text-xs"
                title="হোয়াটসঅ্যাপে শেয়ার করুন"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে শেয়ার' : 'WhatsApp'}</span>
              </a>

              {/* Copy Direct Link */}
              <button
                onClick={handleShare}
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-colors cursor-pointer text-xs"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? (language === 'bn' ? 'লিংক কপি হয়েছে!' : 'Copied!') : (language === 'bn' ? 'লিংক কপি' : 'Copy Link')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Campaign Ad Copy Modal */}
      {showPromoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl w-full max-w-2xl p-6 text-white shadow-2xl relative max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center">
                  <Megaphone className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {language === 'bn' ? 'সোশ্যাল মিডিয়ায় প্রচার ও বিজ্ঞাপনের রেডিমেড কিট' : 'Social Media Promo & Campaign Kit'}
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    {language === 'bn' ? 'টেক্সটটি কপি করে ফেসবুক পেজ, গ্রুপ বা প্রোফাইলে পোস্ট করুন' : 'Ready-to-use promotional text with links & hashtags'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPromoModal(false)}
                type="button"
                className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Guidance Box */}
            <div className="mt-3 p-3 bg-blue-950/60 rounded-xl border border-blue-800/60 text-xs text-blue-200 space-y-1.5">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>{language === 'bn' ? 'বিজ্ঞাপন ও প্রচারের টিপস:' : 'Promotion Tips:'}</span>
              </div>
              <p className="leading-relaxed">
                {language === 'bn'
                  ? '১. নিচের লেখাটি কপি করে আপনার সংগঠনের ফেসবুক পেজে পোস্ট করুন। ২. ভূরুঙ্গামারী ও কুড়িগ্রামের বিভিন্ন গ্রুপে (যেমন: "কুড়িগ্রাম পরিবার", "ভুরুঙ্গামারী বার্তা") শেয়ার করুন। ৩. চাইলে ফেসবুকের "Boost Post" বাটনে ক্লিক করে সামান্য বাজেট দিয়ে যেকোনো সময় পেইড স্পন্সরড বিজ্ঞাপনও চালাতে পারেন।'
                  : 'Copy the text below and post it directly on your Facebook page and local community groups, or run a sponsored boost through Meta Ad Manager.'}
              </p>
            </div>

            {/* Scrollable Text Area */}
            <div className="mt-3 flex-1 overflow-y-auto">
              <pre className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-stone-200 font-sans whitespace-pre-wrap leading-relaxed select-all">
                {promoPostText}
              </pre>
            </div>

            {/* Footer Buttons */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] text-stone-400">
                {language === 'bn' ? 'ওয়েবসাইটের অফিসিয়াল লিংক ও ব্যাংক নম্বর সংযুক্ত রয়েছে' : 'Official website link and Agrani Bank account included'}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(promoPostText);
                    setCopiedPromoText(true);
                    setTimeout(() => setCopiedPromoText(false), 2500);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    copiedPromoText
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md'
                  }`}
                >
                  {copiedPromoText ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{language === 'bn' ? 'কপি সফল হয়েছে!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{language === 'bn' ? 'সম্পূর্ণ লেখা কপি করুন' : 'Copy All Text'}</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  {language === 'bn' ? 'সরাসরি ফেসবুকে পোস্ট' : 'Post to Facebook'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
