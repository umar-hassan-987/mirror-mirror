"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-24 pb-12 mt-auto">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          {/* Brand & Intro */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group mb-8">
              <Image src="/white-logo.png" alt="Mirror Mirror Logo" width={160} height={50} loading="lazy" className="h-12 w-auto object-contain shrink-0" />
            </Link>
            <p className="font-inter text-sm text-white/60 leading-relaxed max-w-sm">
              {t("footer.description")}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-6">
            <h4 className="font-inter font-bold text-xs uppercase tracking-widest text-white/40">{t("footer.navigation")}</h4>
            <nav className="flex flex-col gap-4">
              {[
                { label: t("nav.home"), path: '/' },
                { label: t("nav.services"), path: '/services' },
                { label: t("nav.portfolio"), path: '/portfolio' },
                { label: t("nav.blog"), path: '/blog' }
              ].map((item) => (
                <Link key={item.path} href={item.path} className="font-inter text-sm font-medium text-white/80 hover:text-primary transition-colors flex items-center gap-1 group w-max">
                  {item.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 rtl:-translate-x-0 ltr:-translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <h4 className="font-inter font-bold text-xs uppercase tracking-widest text-white/40">{t("footer.contactUs")}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="font-inter text-xs text-white/50 uppercase tracking-widest mb-2">{t("footer.studioAddress")}</p>
                <p className="font-inter text-sm text-white/90 leading-relaxed">
                  {t("footer.addressLine1")}<br />{t("footer.addressLine2")}
                </p>
              </div>
              <div>
                <p className="font-inter text-xs text-white/50 uppercase tracking-widest mb-2">{t("footer.getInTouch")}</p>
                <a href="tel:+97471567348" className="block font-inter text-sm text-white/90 hover:text-primary transition-colors mb-2" dir="ltr">+974 7156 7348</a>
                <a href="mailto:info@mirrormirrorphotowallqatar.net" className="block font-inter text-sm text-white/90 hover:text-primary transition-colors break-all">info@mirrormirrorphotowallqatar.net</a>
              </div>
            </div>
          </div>

        </div>

        {/* Big Text Divider */}
        <div className="w-full flex justify-center items-center border-t border-b border-white/10 py-8 mb-12 overflow-hidden">
          <h2 className="font-plus-jakarta font-extrabold text-[12vw] md:text-[10vw] leading-none text-transparent tracking-tighter whitespace-nowrap select-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
            MIRROR MIRROR
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-inter text-xs text-white/40">
            {t("footer.rights").replace("{year}", new Date().getFullYear())}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="font-inter text-xs text-white/40 hover:text-white transition-colors">{t("footer.privacy")}</Link>
            <Link href="/terms" className="font-inter text-xs text-white/40 hover:text-white transition-colors">{t("footer.terms")}</Link>
            <div className="flex items-center gap-3 md:ms-4 border-s border-white/10 ps-4">
              <a href="https://www.instagram.com/mirrormirrorphotowall.qatar/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61581485352697" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@mirror_mirror_photobooth?_r=1&_t=ZN-97tYy2rH8Ug" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
