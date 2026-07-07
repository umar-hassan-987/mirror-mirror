"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function HeroButtons() {
  const { t, dir } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
      className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center"
    >
      <Link
        href="/portfolio"
        className="bg-white text-black hover:scale-105 active:scale-95 transition-all duration-300 px-8 md:px-10 py-5 font-inter font-bold text-lg flex items-center justify-center gap-2 group shadow-xl"
      >
        {t("hero.viewGallery")}
        <ArrowRight className={`w-5 h-5 group-hover:${dir === 'rtl' ? '-translate-x-1 rotate-180' : 'translate-x-1'} transition-transform`} />
      </Link>
      <Link
        href="/portfolio"
        className="border border-white/40 hover:border-white text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 px-8 md:px-10 py-5 font-inter font-bold text-lg flex items-center justify-center gap-2 group"
      >
        {t("hero.playShowreel")}
        <Play className={`w-5 h-5 fill-current text-current transition-transform group-hover:scale-110 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
      </Link>
    </motion.div>
  );
}
