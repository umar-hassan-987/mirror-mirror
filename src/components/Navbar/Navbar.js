"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const lastScrollY = useRef(0);
  const dropdownTimer = useRef(null);
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
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
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    return () => clearTimeout(dropdownTimer.current);
  }, []);

  const openMega = useCallback((id) => {
    clearTimeout(dropdownTimer.current);
    setActiveDropdown(id);
  }, []);

  const closeMega = useCallback(() => {
    dropdownTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  const destinationItems = [
    { label: t("nav.destinations.qatar"), href: "/" },
    { label: t("nav.destinations.saudi"), href: "/" },
    { label: t("nav.destinations.dubai"), href: "/" },
    { label: t("nav.destinations.lebanon"), href: "/" },
    { label: t("nav.destinations.philippines"), href: "/" },
  ];

  const serviceItems = [
    { label: t("nav.serviceItems.mirrorBooth"), href: "/services" },
    { label: t("nav.serviceItems.retroBooth"), href: "/services" },
    { label: t("nav.serviceItems.privateBooth"), href: "/services" },
    { label: t("nav.serviceItems.highAngleBooth"), href: "/services" },
    { label: t("nav.serviceItems.booth360"), href: "/services" },
    { label: t("nav.serviceItems.telephoneBooth"), href: "/services" },
    { label: t("nav.serviceItems.photowall"), href: "/services" },
    { label: t("nav.serviceItems.videography"), href: "/services" },
    { label: t("nav.serviceItems.photography"), href: "/services" },
    { label: t("nav.serviceItems.brandingPhotowall"), href: "/services" },
    { label: t("nav.serviceItems.brandingCollaterals"), href: "/services" },
  ];

  const plainNavItems = [
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.portfolio"), href: "/portfolio" },
    { label: t("nav.blog"), href: "/blog" },
  ];

  const navLinkClass = (href, hasDropdown) => {
    const isActive = pathname === href && !hasDropdown;
    return `font-inter font-semibold text-sm tracking-wider uppercase transition-all duration-300 ${
      isActive
        ? isScrolled
          ? "text-primary border-b-2 border-primary pb-1"
          : "text-white border-b-2 border-white pb-1"
        : isScrolled
          ? "text-on-surface-variant hover:text-primary"
          : "text-white/80 hover:text-white"
    }`;
  };

  const headerHeight = isScrolled || isOpen ? "h-16" : "h-20";
  const headerPx = isScrolled || isOpen ? 64 : 80;

  return (
    <>
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHidden ? "-translate-y-full" : "translate-y-0"
    } ${
      activeDropdown && !isScrolled
        ? `bg-black/95 backdrop-blur-xl border-b border-white/10 ${headerHeight}`
        : (isScrolled || isOpen) 
          ? `bg-surface/90 backdrop-blur-md border-b border-outline-variant/20 shadow-sm ${headerHeight}` 
          : `bg-transparent ${headerHeight}`
    }`}>
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto h-full">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src={(isScrolled || isOpen) ? "/black-logo.png" : "/white-logo.png"} alt="Mirror Mirror Logo" width={160} height={50} priority className="h-10 md:h-12 w-auto object-contain shrink-0" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 xl:gap-8 h-full">
          {/* DESTINATION */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => openMega("destination")}
            onMouseLeave={closeMega}
          >
            <Link href="/" className={`flex items-center gap-1.5 ${navLinkClass("/", true)}`}>
              {t("nav.destination")}
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === "destination" ? "rotate-180" : ""}`} />
            </Link>
          </div>

          {/* HOME */}
          <Link href="/" className={navLinkClass("/", false)}>
            {t("nav.home")}
          </Link>

          {/* SERVICES */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => openMega("services")}
            onMouseLeave={closeMega}
          >
            <Link href="/services" className={`flex items-center gap-1.5 ${navLinkClass("/services", true)}`}>
              {t("nav.services")}
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180" : ""}`} />
            </Link>
          </div>

          {/* ABOUT, PORTFOLIO, BLOG */}
          {plainNavItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(item.href, false)}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className={`hidden sm:flex items-center p-1 rounded-full border transition-colors relative ${isScrolled ? 'bg-surface-container-high border-outline-variant/30' : 'bg-black/20 backdrop-blur-sm border-white/10'}`} dir="ltr">
            <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] gradient-bg rounded-full shadow-md transition-transform duration-300 ease-in-out ${locale === 'en' ? 'translate-x-0 left-1' : 'translate-x-full left-1'}`}></div>
            <button onClick={() => setLocale('en')} className={`relative z-10 w-12 py-1.5 text-xs font-inter font-bold transition-colors ${locale === 'en' ? 'text-white' : isScrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/50 hover:text-white/80'}`}>EN</button>
            <button onClick={() => setLocale('ar')} className={`relative z-10 w-12 py-1.5 text-xs font-inter font-bold transition-colors ${locale === 'ar' ? 'text-white' : isScrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/50 hover:text-white/80'}`}>عربي</button>
          </div>

          <Link href="/contact" className="hidden sm:inline-block gradient-bg text-white px-8 py-3 rounded-full font-inter font-semibold text-sm hover:opacity-90 transition-all active:scale-95">
            {t("nav.bookNow")}
          </Link>

          {/* Mobile */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')} className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors focus:outline-none ${(isScrolled || isOpen) ? "text-on-surface" : "text-white"}`} aria-label="Toggle language">
              <Globe className="w-5 h-5" />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors focus:outline-none ${(isScrolled || isOpen) ? "text-on-surface" : "text-white"}`} aria-label="Toggle menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* ═══ FULL-WIDTH MEGA MENUS (rendered outside header, below it) ═══ */}

    {/* DESTINATION Mega Menu */}
    <div
      className={`hidden md:block fixed left-0 right-0 z-40 transition-all duration-300 ease-out ${
        activeDropdown === "destination" && !isHidden
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
      style={{ top: headerPx }}
      onMouseEnter={() => openMega("destination")}
      onMouseLeave={closeMega}
    >
      <div className={`border-b shadow-2xl ${isScrolled ? 'bg-surface/95 backdrop-blur-xl border-outline-variant/20' : 'bg-black/95 backdrop-blur-xl border-white/10'}`}>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] gradient-bg rounded-full"></div>
            <p className={`font-inter text-xs font-bold uppercase tracking-[0.2em] ${isScrolled ? 'text-primary' : 'text-primary-fixed-dim'}`}>
              {t("nav.destination")}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            {destinationItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`group flex items-center gap-3 py-2 transition-colors ${
                  isScrolled
                    ? "text-on-surface hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isScrolled ? 'bg-outline-variant group-hover:bg-primary' : 'bg-white/30 group-hover:bg-primary-fixed-dim'}`}></span>
                <span className="font-inter text-sm font-semibold tracking-wider uppercase">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* SERVICES Mega Menu */}
    <div
      className={`hidden md:block fixed left-0 right-0 z-40 transition-all duration-300 ease-out ${
        activeDropdown === "services" && !isHidden
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
      style={{ top: headerPx }}
      onMouseEnter={() => openMega("services")}
      onMouseLeave={closeMega}
    >
      <div className={`border-b shadow-2xl ${isScrolled ? 'bg-surface/95 backdrop-blur-xl border-outline-variant/20' : 'bg-black/95 backdrop-blur-xl border-white/10'}`}>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] gradient-bg rounded-full"></div>
            <p className={`font-inter text-xs font-bold uppercase tracking-[0.2em] ${isScrolled ? 'text-primary' : 'text-primary-fixed-dim'}`}>
              {t("nav.services")}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-1">
            {serviceItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`group flex items-center gap-3 py-2.5 transition-colors ${
                  isScrolled
                    ? "text-on-surface hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${isScrolled ? 'bg-outline-variant group-hover:bg-primary' : 'bg-white/30 group-hover:bg-primary-fixed-dim'}`}></span>
                <span className="font-inter text-sm font-semibold tracking-wider uppercase">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* ═══ MOBILE DRAWER ═══ */}
    {isOpen && (
      <div className="md:hidden fixed inset-0 z-40 animate-fade-in overflow-y-auto" style={{ backgroundColor: 'white' }}>
        <nav className="flex flex-col items-center gap-6 pt-28 pb-20">
          {/* DESTINATION */}
          <div className="flex flex-col items-center w-full">
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "destination" ? null : "destination")}
              className="font-inter font-bold text-lg tracking-widest uppercase text-black/80 hover:text-black transition-colors flex items-center gap-2"
            >
              {t("nav.destination")}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === "destination" ? "rotate-180" : ""}`} />
            </button>
            {mobileExpanded === "destination" && (
              <div className="flex flex-col items-center gap-3 mt-3">
                {destinationItems.map((sub, i) => (
                  <Link key={i} onClick={() => setIsOpen(false)} href={sub.href} className="font-inter text-sm font-semibold tracking-wider uppercase text-black/50 hover:text-black transition-colors">
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* HOME */}
          <Link onClick={() => setIsOpen(false)} href="/" className={`font-inter font-bold text-lg tracking-widest uppercase transition-colors ${pathname === "/" ? "text-primary" : "text-black/80 hover:text-black"}`}>
            {t("nav.home")}
          </Link>

          {/* SERVICES */}
          <div className="flex flex-col items-center w-full">
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}
              className="font-inter font-bold text-lg tracking-widest uppercase text-black/80 hover:text-black transition-colors flex items-center gap-2"
            >
              {t("nav.services")}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === "services" ? "rotate-180" : ""}`} />
            </button>
            {mobileExpanded === "services" && (
              <div className="flex flex-col items-center gap-3 mt-3">
                {serviceItems.map((sub, i) => (
                  <Link key={i} onClick={() => setIsOpen(false)} href={sub.href} className="font-inter text-sm font-semibold tracking-wider uppercase text-black/50 hover:text-black transition-colors">
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ABOUT, PORTFOLIO, BLOG */}
          {plainNavItems.map((item) => (
            <Link key={item.href} onClick={() => setIsOpen(false)} href={item.href} className={`font-inter font-bold text-lg tracking-widest uppercase transition-colors ${pathname === item.href ? "text-primary" : "text-black/80 hover:text-black"}`}>
              {item.label}
            </Link>
          ))}

          <Link href="/contact" onClick={() => setIsOpen(false)} className="gradient-bg text-white px-8 md:px-10 py-4 rounded-full font-inter font-bold text-md mt-4 shadow-lg shadow-primary/20">
            {t("nav.bookNow")}
          </Link>

          <div className="flex items-center p-1.5 mt-8 bg-black/20 backdrop-blur-sm rounded-full border border-white/10 relative" dir="ltr">
            <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] gradient-bg rounded-full shadow-md transition-transform duration-300 ease-in-out ${locale === 'en' ? 'translate-x-0 left-1.5' : 'translate-x-full left-1.5'}`}></div>
            <button onClick={() => { setLocale('en'); setIsOpen(false); }} className={`relative z-10 w-24 py-2 text-sm font-inter font-bold transition-colors ${locale === 'en' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}>English</button>
            <button onClick={() => { setLocale('ar'); setIsOpen(false); }} className={`relative z-10 w-24 py-2 text-sm font-inter font-bold transition-colors ${locale === 'ar' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}>العربية</button>
          </div>
        </nav>
      </div>
    )}
    </>
  );
}
