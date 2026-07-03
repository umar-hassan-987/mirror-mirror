"use client";

import HeroBackground from "./HeroBackground";
import HeroLabel from "./HeroLabel";
import HeroHeadline from "./HeroHeadline";
import HeroSubtitle from "./HeroSubtitle";
import HeroButtons from "./HeroButtons";
import MouseParallax from "./MouseParallax";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black w-full">
      {/* Background loop video under the overlays */}
      <HeroBackground />

      {/* Mouse Parallax wrapper for the central copy */}
      <div className="relative z-30 max-w-container-max mx-auto px-margin-mobile md:px-gutter w-full py-20 flex flex-col items-center text-center">
        <MouseParallax multiplier={5}>
          <div className="flex flex-col items-center justify-center">
            <HeroLabel>WELCOME TO MIRROR MIRROR</HeroLabel>

            <HeroHeadline>
              We Capture Your<br />
              Best <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-[#731be5] text-transparent bg-clip-text gradient-span">Memories</span> Here
            </HeroHeadline>

            <HeroSubtitle>
              Premium photo wall rentals and event activations in Qatar. Elevating weddings, corporate galas, and luxury celebrations.
            </HeroSubtitle>

            <HeroButtons />
          </div>
        </MouseParallax>
      </div>
    </section>
  );
}
