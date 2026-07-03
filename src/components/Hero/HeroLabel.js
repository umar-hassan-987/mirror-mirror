"use client";

import { motion } from "framer-motion";

export default function HeroLabel({ children }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="uppercase tracking-[0.25em] text-xs font-semibold text-white/70 block mb-6"
    >
      {children}
    </motion.span>
  );
}
