"use client";

import { useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function MouseParallax({ children, multiplier = 4 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const physics = { damping: 50, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, physics);
  const springY = useSpring(y, physics);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Calculate delta relative to window center, keep it within the 5px constraint
      const targetX = (e.clientX / innerWidth - 0.5) * multiplier;
      const targetY = (e.clientY / innerHeight - 0.5) * multiplier;
      
      x.set(targetX);
      y.set(targetY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, multiplier]);

  return (
    <motion.div style={{ x: springX, y: springY }} className="w-full h-full relative z-10">
      {children}
    </motion.div>
  );
}
