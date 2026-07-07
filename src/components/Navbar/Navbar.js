"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);

      // Hide header when scrolling down past hero section (approx 600px), show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 600) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.portfolio"), href: "/portfolio" },
    { label: t("nav.blog"), href: "/blog" },
  ];

  return (
    <>
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHidden ? "-translate-y-full" : "translate-y-0"
    } ${
      (isScrolled || isOpen) 
        ? "bg-surface/90 backdrop-blur-md border-b border-outline-variant/20 shadow-sm h-16" 
        : "bg-transparent h-20"
    }`}>
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto h-full">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Mirror Mirror Logo" className="h-8 md:h-10 w-auto object-contain shrink-0" />
          <div className="flex flex-col items-start leading-none">
            <span className={`font-plus-jakarta font-extrabold text-base md:text-lg tracking-wider transition-colors duration-300 ${
              (isScrolled || isOpen) ? "text-on-surface" : "text-white"
            }`}>
              MIRROR.MIRROR
            </span>
            <span className="bg-purple-600 text-[8px] text-white px-1.5 py-0.5 mt-0.5 font-inter font-bold tracking-widest uppercase rounded-sm leading-none">
              {t("nav.brandSubtitle")}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-inter font-semibold text-sm tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? isScrolled 
                      ? "text-primary border-b-2 border-primary pb-1" 
                      : "text-white border-b-2 border-white pb-1"
                    : isScrolled 
                      ? "text-on-surface-variant hover:text-primary" 
                      : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Language Switcher & Mobile Menu Trigger */}
        <div className="flex items-center gap-4">
          <div className={`hidden sm:flex items-center p-1 rounded-full border transition-colors relative ${isScrolled ? 'bg-surface-container-high border-outline-variant/30' : 'bg-black/20 backdrop-blur-sm border-white/10'}`} dir="ltr">
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] gradient-bg rounded-full shadow-md transition-transform duration-300 ease-in-out ${locale === 'en' ? 'translate-x-0 left-1' : 'translate-x-full left-1'}`}
            ></div>
            <button 
              onClick={() => setLocale('en')}
              className={`relative z-10 w-12 py-1.5 text-xs font-inter font-bold transition-colors ${
                locale === 'en' 
                  ? 'text-white' 
                  : isScrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/50 hover:text-white/80'
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => setLocale('ar')}
              className={`relative z-10 w-12 py-1.5 text-xs font-inter font-bold transition-colors ${
                locale === 'ar' 
                  ? 'text-white' 
                  : isScrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/50 hover:text-white/80'
              }`}
            >
              عربي
            </button>
          </div>

          <Link href="/contact" className="hidden sm:inline-block gradient-bg text-white px-8 py-3 rounded-full font-inter font-semibold text-sm hover:opacity-90 transition-all active:scale-95">
            {t("nav.bookNow")}
          </Link>

          {/* Mobile Globe and Menu Toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
              className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors focus:outline-none ${
                (isScrolled || isOpen) ? "text-on-surface" : "text-white"
              }`}
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors focus:outline-none ${
                (isScrolled || isOpen) ? "text-on-surface" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div 
          className={`md:hidden fixed inset-0 z-40 transition-all duration-300 animate-fade-in`}
          style={{ backgroundColor: 'white' }}
        >
          <nav className="flex flex-col items-center gap-8 pt-28 h-full">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  onClick={() => setIsOpen(false)}
                  href={item.href}
                  className={`font-inter font-bold text-lg tracking-widest uppercase transition-colors ${
                    isActive ? "text-primary" : "text-black/80 hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="gradient-bg text-white px-8 md:px-10 py-4 rounded-full font-inter font-bold text-md mt-4 shadow-lg shadow-primary/20"
            >
              {t("nav.bookNow")}
            </Link>

            <div className="flex items-center p-1.5 mt-8 bg-black/20 backdrop-blur-sm rounded-full border border-white/10 relative" dir="ltr">
              <div 
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] gradient-bg rounded-full shadow-md transition-transform duration-300 ease-in-out ${locale === 'en' ? 'translate-x-0 left-1.5' : 'translate-x-full left-1.5'}`}
              ></div>
              <button 
                onClick={() => { setLocale('en'); setIsOpen(false); }}
                className={`relative z-10 w-24 py-2 text-sm font-inter font-bold transition-colors ${locale === 'en' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
              >
                English
              </button>
              <button 
                onClick={() => { setLocale('ar'); setIsOpen(false); }}
                className={`relative z-10 w-24 py-2 text-sm font-inter font-bold transition-colors ${locale === 'ar' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
              >
                العربية
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
