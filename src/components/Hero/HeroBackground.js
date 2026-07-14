"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch((err) => {
              // Ignore autoplay restriction errors
              console.log("Video play failed or interrupted:", err);
            });
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    const el = videoRef.current;
    if (el) {
      observer.observe(el);
    }
    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-black">
      {/* HTML5 Cinematic Video Loop */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        className="w-full h-full object-cover scale-[1.01]"
        src="/vid/hero.webm"
      />

      {/* Layer 1: Dark Overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Layer 2: Transition Gradient (Fades into black to match pure black hero base) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black z-20" />

      {/* Layer 3: Radial Highlight (Creates a central illumination focus) */}
      <div
        className="absolute inset-0 z-30 opacity-70 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%)"
        }}
      />
    </div>
  );
}

