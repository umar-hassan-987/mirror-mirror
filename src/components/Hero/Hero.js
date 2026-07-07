"use client";

import HeroBackground from "./HeroBackground";
import HeroLabel from "./HeroLabel";
import HeroHeadline from "./HeroHeadline";
import HeroSubtitle from "./HeroSubtitle";
import HeroButtons from "./HeroButtons";
import MouseParallax from "./MouseParallax";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black w-full">
      {/* Background loop video under the overlays */}
      <HeroBackground />

      {/* Mouse Parallax wrapper for the central copy */}
      <div className="relative z-30 max-w-container-max mx-auto px-margin-mobile md:px-gutter w-full py-20 flex flex-col items-center text-center">
        <MouseParallax multiplier={5}>
          <div className="flex flex-col items-center justify-center">
            <HeroLabel>{t("hero.label")}</HeroLabel>

            <HeroHeadline>
              {t("hero.headlineLine1")}<br />
              {t("hero.headlineLine2")} <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-[#731be5] text-transparent bg-clip-text gradient-span">{t("hero.headlineHighlight")}</span> {t("hero.headlineLine3")}
            </HeroHeadline>

            <HeroSubtitle>
              {t("hero.subtitle")}
            </HeroSubtitle>

            <HeroButtons />
          </div>
        </MouseParallax>
      </div>
    </section>
  );
}
