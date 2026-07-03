"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

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

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHidden ? "-translate-y-full" : "translate-y-0"
    } ${
      isScrolled 
        ? "bg-surface/90 backdrop-blur-md border-b border-outline-variant/20 shadow-sm h-16" 
        : "bg-transparent h-20"
    }`}>
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto h-full">
        <Link 
          href="/" 
          className={`flex items-center gap-3 transition-colors duration-300 ${
            isScrolled ? "text-on-surface" : "text-white"
          }`}
        >
          <img src="/logo.png" alt="Mirror Mirror Logo" className="h-8 md:h-10 w-auto object-contain" />
          <span className="font-plus-jakarta text-xl md:text-2xl font-bold tracking-tight">Mirror Mirror</span>
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

        {/* Action Button & Mobile Menu Trigger */}
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden sm:inline-block gradient-bg text-white px-8 py-3 rounded-full font-inter font-semibold text-sm hover:opacity-90 transition-all active:scale-95">
            Book Now
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors focus:outline-none ${
              isScrolled ? "text-on-surface" : "text-white"
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

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className={`md:hidden fixed inset-0 ${
          isScrolled ? "top-16" : "top-20"
        } bg-slate-900/95 backdrop-blur-lg z-40 transition-all duration-300 animate-fade-in`}>
          <nav className="flex flex-col items-center gap-8 pt-16 h-full">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  onClick={() => setIsOpen(false)}
                  href={item.href}
                  className={`font-inter font-bold text-lg tracking-widest uppercase transition-colors ${
                    isActive ? "text-primary-fixed-dim" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="gradient-bg text-white px-10 py-4 rounded-full font-inter font-bold text-md mt-4 shadow-lg shadow-primary/20"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
