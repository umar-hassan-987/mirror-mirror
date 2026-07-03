"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function HeroButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
      className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center"
    >
      <Link
        href="/portfolio"
        className="bg-white text-black hover:scale-105 active:scale-95 transition-all duration-300 px-10 py-5 font-inter font-bold text-lg flex items-center justify-center gap-2 group shadow-xl"
      >
        View Gallery
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
      <Link
        href="/portfolio"
        className="border border-white/40 hover:border-white text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 px-10 py-5 font-inter font-bold text-lg flex items-center justify-center gap-2 group"
      >
        Play Showreel
        <Play className="w-5 h-5 fill-current text-current transition-transform group-hover:scale-110" />
      </Link>
    </motion.div>
  );
}
