"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroVideoCarousel({ 
  videos = [], 
  interval = 3000, 
  transitionDuration = 0.8 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const loadedVideos = useRef(new Set());

  // Monitor user accessibility settings for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Intersection Observer — only load/play videos when hero is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  // Mark first video as loaded immediately
  useEffect(() => {
    if (videos.length > 0) {
      loadedVideos.current.add(0);
    }
  }, [videos]);

  // Set up the interval timer to increment video indexes (only when visible)
  useEffect(() => {
    if (videos.length <= 1 || !isVisible) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % videos.length;
        // Pre-mark the video after next as loaded so it starts buffering
        const preloadIdx = (next + 1) % videos.length;
        loadedVideos.current.add(next);
        loadedVideos.current.add(preloadIdx);
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [videos.length, interval, isVisible]);

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
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-black z-0">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          {isVisible && (
            <video
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              className="w-full h-full object-cover scale-[1.01]"
              src={videos[currentIndex]}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
