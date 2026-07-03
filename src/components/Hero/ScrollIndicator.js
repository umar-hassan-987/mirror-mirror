"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 1.0, delay: 1.2 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer"
      onClick={() => {
        const nextSection = document.getElementById("homepage-next-section");
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <span className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-inter font-bold mb-1">
          Scroll Down
        </span>
        <ChevronDown className="w-5 h-5 text-white/70" />
      </motion.div>
    </motion.div>
  );
}
