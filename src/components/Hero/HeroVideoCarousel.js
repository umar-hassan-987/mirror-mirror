"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroVideoCarousel({ 
  videos = [], 
  interval = 3000, 
  transitionDuration = 0.8 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Monitor user accessibility settings for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Set up the interval timer to increment video indexes
  useEffect(() => {
    if (videos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [videos.length, interval]);

  // Framer Motion variants representing outgoing / incoming states
  const variants = {
    initial: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 1.05,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(2px)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: transitionDuration,
        ease: [0.25, 0.1, 0.25, 1], // easeInOut cubic
      },
    },
    exit: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 1.02,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(2px)",
      transition: {
        duration: transitionDuration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  if (!videos || videos.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black z-0">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <video
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            className="w-full h-full object-cover scale-[1.01]"
            src={videos[currentIndex]}
          />
        </motion.div>
      </AnimatePresence>

      {/* Invisible next video for preloading to avoid loading flashes */}
      {videos.map((src, index) => {
        const nextIndex = (currentIndex + 1) % videos.length;
        if (index !== nextIndex) return null;
        return (
          <video
            key={`preload-${index}`}
            src={src}
            preload="auto"
            muted
            className="hidden"
          />
        );
      })}
    </div>
  );
}
