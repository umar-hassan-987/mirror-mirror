import HeroVideoCarousel from "./HeroVideoCarousel";

export default function HeroBackground() {
  const videos = [
    "/vid/vedios/short1.mp4",
    "/vid/vedios/short2.mp4",
    "/vid/vedios/short3.mp4",
    "/vid/vedios/short4.mp4",
    "/vid/vedios/short5.mp4",
    "/vid/vedios/short6.mp4"
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-black">
      {/* HTML5 Cinematic Multi-Video Loop Carousel */}
      <HeroVideoCarousel videos={videos} interval={3000} transitionDuration={0.8} />

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
