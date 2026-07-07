"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { defaultLocale, getTranslation } from './index';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(defaultLocale);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLocale = localStorage.getItem('lang');
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'ar')) {
      setLocaleState(savedLocale);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Apply language changes to DOM
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    
    // Manage fonts
    if (locale === 'ar') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }

  }, [locale, isMounted]);

  const setLocale = (newLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem('lang', newLocale);
  };

  const t = (key) => {
    if (!isMounted) {
        // Return English during SSR/initial hydration to avoid mismatch
        return getTranslation(defaultLocale, key);
    }
    return getTranslation(locale, key);
  };

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  // To prevent hydration mismatch, we render children even if not mounted, 
  // but use defaultLocale for translations during initial render.
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
