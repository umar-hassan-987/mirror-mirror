"use client";

import { motion } from "framer-motion";

export default function HeroHeadline({ children }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="font-plus-jakarta font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white max-w-5xl mb-8"
    >
      {children}
    </motion.h1>
  );
}
