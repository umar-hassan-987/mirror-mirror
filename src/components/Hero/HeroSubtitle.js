"use client";

import { motion } from "framer-motion";

export default function HeroSubtitle({ children }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      className="font-inter text-md md:text-lg lg:text-xl text-white/70 max-w-2xl leading-relaxed mb-12"
    >
      {children}
    </motion.p>
  );
}
