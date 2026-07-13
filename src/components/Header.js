"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Header() {
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

  const openDropdown = useCallback((id) => {
    clearTimeout(dropdownTimer.current);
    setActiveDropdown(id);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => clearTimeout(dropdownTimer.current);
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

  const linkClass = (href, hasDropdown) => {
    const isActive = pathname === href && !hasDropdown;
    return `flex items-center gap-1 font-inter font-semibold text-sm tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
      isActive
        ? isScrolled
          ? "text-primary border-b-2 border-primary pb-1"
          : "text-white border-b-2 border-white pb-1"
        : isScrolled
          ? "text-on-surface-variant hover:text-primary"
          : "text-white/80 hover:text-white"
    }`;
  };

  const dropdownPanelClass = `py-2 rounded-lg border shadow-2xl ${
    isScrolled
      ? "bg-surface border-outline-variant/20"
      : "bg-black/90 backdrop-blur-md border-white/10"
  }`;

  const dropdownLinkClass = `block px-5 py-2.5 font-inter text-xs font-semibold tracking-wider uppercase transition-colors ${
    isScrolled
      ? "text-on-surface hover:text-primary hover:bg-surface-variant/50"
      : "text-white/70 hover:text-white hover:bg-white/10"
  }`;

  // Reusable dropdown wrapper
  const DropdownItem = ({ id, label, href, items }) => (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={() => openDropdown(id)}
      onMouseLeave={closeDropdown}
    >
      <Link href={href} className={linkClass(href, true)}>
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            activeDropdown === id ? "rotate-180" : ""
          }`}
        />
      </Link>
      {activeDropdown === id && (
        <div className="absolute top-full ltr:left-0 rtl:right-0 pt-2 z-[60] w-64">
          <div className={dropdownPanelClass}>
            {items.map((sub, i) => (
              <Link key={i} href={sub.href} className={dropdownLinkClass}>
                {sub.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Simple nav link (no dropdown)
  const NavLink = ({ label, href }) => (
    <div className="h-full flex items-center">
      <Link href={href} className={linkClass(href, false)}>
        {label}
      </Link>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        isScrolled
          ? "bg-surface/90 backdrop-blur-md border-b border-outline-variant/20 shadow-sm h-16"
          : "bg-transparent h-20"
      }`}
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center transition-colors duration-300">
          <Image
            src={isScrolled ? "/black-logo.png" : "/white-logo.png"}
            alt="Mirror Mirror Logo"
            width={160}
            height={50}
            priority
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 h-full">
          <DropdownItem
            id="destination"
            label={t("nav.destination")}
            href="/"
            items={destinationItems}
          />
          <NavLink label={t("nav.home")} href="/" />
          <DropdownItem
            id="services"
            label={t("nav.services")}
            href="/services"
            items={serviceItems}
          />
          <NavLink label={t("nav.about")} href="/about" />
          <NavLink label={t("nav.portfolio")} href="/portfolio" />
          <NavLink label={t("nav.blog")} href="/blog" />
        </nav>

        {/* Right side: Language + Book Now + Mobile toggle */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div
            className={`hidden sm:flex items-center p-1 rounded-full border transition-colors relative ${
              isScrolled
                ? "bg-surface-container-high border-outline-variant/30"
                : "bg-black/20 backdrop-blur-sm border-white/10"
            }`}
            dir="ltr"
          >
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] gradient-bg rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                locale === "en"
                  ? "translate-x-0 left-1"
                  : "translate-x-full left-1"
              }`}
            />
            <button
              onClick={() => setLocale("en")}
              className={`relative z-10 w-12 py-1.5 text-xs font-inter font-bold transition-colors ${
                locale === "en"
                  ? "text-white"
                  : isScrolled
                    ? "text-on-surface-variant hover:text-primary"
                    : "text-white/50 hover:text-white/80"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("ar")}
              className={`relative z-10 w-12 py-1.5 text-xs font-inter font-bold transition-colors ${
                locale === "ar"
                  ? "text-white"
                  : isScrolled
                    ? "text-on-surface-variant hover:text-primary"
                    : "text-white/50 hover:text-white/80"
              }`}
            >
              عربي
            </button>
          </div>

          {/* Book Now */}
          <Link
            href="/contact"
            className="hidden sm:inline-block gradient-bg text-white px-8 py-3 rounded-full font-inter font-semibold text-sm hover:opacity-90 transition-all active:scale-95"
          >
            {t("nav.bookNow")}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors focus:outline-none ${
              isScrolled ? "text-on-surface" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {isOpen && (
        <div
          className={`lg:hidden fixed inset-0 ${
            isScrolled ? "top-16" : "top-20"
          } bg-slate-900/95 backdrop-blur-lg z-40 animate-fade-in overflow-y-auto`}
        >
          <nav className="flex flex-col items-center gap-6 pt-12 pb-24">
            {/* Destination (expandable) */}
            <MobileDropdown
              label={t("nav.destination")}
              href="/"
              items={destinationItems}
              expanded={mobileExpanded === "destination"}
              onToggle={() =>
                setMobileExpanded(mobileExpanded === "destination" ? null : "destination")
              }
              onNavigate={() => setIsOpen(false)}
            />

            {/* Home */}
            <Link
              onClick={() => setIsOpen(false)}
              href="/"
              className={`font-inter font-bold text-lg tracking-widest uppercase transition-colors ${
                pathname === "/" ? "text-primary-fixed-dim" : "text-white/80 hover:text-white"
              }`}
            >
              {t("nav.home")}
            </Link>

            {/* Services (expandable) */}
            <MobileDropdown
              label={t("nav.services")}
              href="/services"
              items={serviceItems}
              expanded={mobileExpanded === "services"}
              onToggle={() =>
                setMobileExpanded(mobileExpanded === "services" ? null : "services")
              }
              onNavigate={() => setIsOpen(false)}
            />

            {/* About */}
            <Link
              onClick={() => setIsOpen(false)}
              href="/about"
              className={`font-inter font-bold text-lg tracking-widest uppercase transition-colors ${
                pathname === "/about" ? "text-primary-fixed-dim" : "text-white/80 hover:text-white"
              }`}
            >
              {t("nav.about")}
            </Link>

            {/* Portfolio */}
            <Link
              onClick={() => setIsOpen(false)}
              href="/portfolio"
              className={`font-inter font-bold text-lg tracking-widest uppercase transition-colors ${
                pathname === "/portfolio"
                  ? "text-primary-fixed-dim"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {t("nav.portfolio")}
            </Link>

            {/* Blog */}
            <Link
              onClick={() => setIsOpen(false)}
              href="/blog"
              className={`font-inter font-bold text-lg tracking-widest uppercase transition-colors ${
                pathname === "/blog" ? "text-primary-fixed-dim" : "text-white/80 hover:text-white"
              }`}
            >
              {t("nav.blog")}
            </Link>

            {/* Book Now */}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="gradient-bg text-white px-8 md:px-10 py-4 rounded-full font-inter font-bold text-md mt-4 shadow-lg shadow-primary/20"
            >
              {t("nav.bookNow")}
            </Link>

            {/* Language Switcher */}
            <div
              className="flex items-center p-1.5 mt-8 bg-black/20 backdrop-blur-sm rounded-full border border-white/10 relative"
              dir="ltr"
            >
              <div
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] gradient-bg rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                  locale === "en"
                    ? "translate-x-0 left-1.5"
                    : "translate-x-full left-1.5"
                }`}
              />
              <button
                onClick={() => {
                  setLocale("en");
                  setIsOpen(false);
                }}
                className={`relative z-10 w-24 py-2 text-sm font-inter font-bold transition-colors ${
                  locale === "en" ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                English
              </button>
              <button
                onClick={() => {
                  setLocale("ar");
                  setIsOpen(false);
                }}
                className={`relative z-10 w-24 py-2 text-sm font-inter font-bold transition-colors ${
                  locale === "ar" ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                العربية
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ── Mobile accordion dropdown ── */
function MobileDropdown({ label, href, items, expanded, onToggle, onNavigate }) {
  return (
    <div className="flex flex-col items-center w-full">
      <button
        onClick={onToggle}
        className="font-inter font-bold text-lg tracking-widest uppercase text-white/80 hover:text-white transition-colors flex items-center gap-2"
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
      {expanded && (
        <div className="flex flex-col items-center gap-3 mt-4">
          {items.map((sub, i) => (
            <Link
              key={i}
              onClick={onNavigate}
              href={sub.href}
              className="font-inter text-sm font-semibold tracking-wider uppercase text-white/60 hover:text-white transition-colors text-center"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
