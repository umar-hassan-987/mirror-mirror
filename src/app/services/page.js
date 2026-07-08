"use client";

import Link from "next/link";
import { Sparkles, Camera, Video, Mic, Heart, PenTool, CheckCircle, Gift, ArrowRight, Printer } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Services() {
  const { t, dir } = useLanguage();
  const services = [
    {
      id: "mirror-booth",
      name: t("services.list.mirrorBooth.name"),
      icon: <Camera className="w-8 h-8 text-primary" />,
      desc: t("services.list.mirrorBooth.desc"),
      image: "/images/mirror-default.webp",
      price: t("services.list.mirrorBooth.price"),
      duration: t("services.list.mirrorBooth.duration"),
      specs: t("services.list.mirrorBooth.specs") || []
    },
    {
      id: "audio-video-booth",
      name: t("services.list.audioVideoBooth.name"),
      icon: <Video className="w-8 h-8 text-secondary" />,
      desc: t("services.list.audioVideoBooth.desc"),
      image: "/images/audio-video-booth.webp",
      price: t("services.list.audioVideoBooth.price"),
      duration: t("services.list.audioVideoBooth.duration"),
      specs: t("services.list.audioVideoBooth.specs") || []
    },
    {
      id: "polaroid-guestbook",
      name: t("services.list.polaroidGuestbook.name"),
      icon: <Heart className="w-8 h-8 text-tertiary" />,
      desc: t("services.list.polaroidGuestbook.desc"),
      image: "/images/Polaroid.webp",
      price: t("services.list.polaroidGuestbook.price"),
      duration: t("services.list.polaroidGuestbook.duration"),
      specs: t("services.list.polaroidGuestbook.specs") || []
    },
    {
      id: "branding-collaterals",
      name: t("services.list.brandingCollaterals.name"),
      icon: <Gift className="w-8 h-8 text-primary" />,
      desc: t("services.list.brandingCollaterals.desc"),
      image: "/images/brand.webp",
      price: t("services.list.brandingCollaterals.price"),
      duration: t("services.list.brandingCollaterals.duration"),
      specs: t("services.list.brandingCollaterals.specs") || []
    },
    {
      id: "videography",
      name: t("services.list.videography.name"),
      icon: <Video className="w-8 h-8 text-secondary" />,
      desc: t("services.list.videography.desc"),
      image: "/images/videography-service.webp",
      price: t("services.list.videography.price"),
      duration: t("services.list.videography.duration"),
      specs: t("services.list.videography.specs") || []
    },
    {
      id: "photography",
      name: t("services.list.photography.name"),
      icon: <Camera className="w-8 h-8 text-tertiary" />,
      desc: t("services.list.photography.desc"),
      image: "/images/photography.webp",
      price: t("services.list.photography.price"),
      duration: t("services.list.photography.duration"),
      specs: t("services.list.photography.specs") || []
    }
  ];

  const addOns = [
    { name: t("services.addons.extraPrint.name"), price: t("services.addons.extraPrint.price"), desc: t("services.addons.extraPrint.desc") },
    { name: t("services.addons.fullScreen.name"), price: t("services.addons.fullScreen.price"), desc: t("services.addons.fullScreen.desc") },
    { name: t("services.addons.floralArch.name"), price: t("services.addons.floralArch.price"), desc: t("services.addons.floralArch.desc") },
    { name: t("services.addons.liveSlide.name"), price: t("services.addons.liveSlide.price"), desc: t("services.addons.liveSlide.desc") }
  ];

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden px-margin-mobile md:px-gutter w-full">
        {/* Background Image with Premium Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/services-hero.webp" 
            alt="Mirror mirror photo booth backdrop" 
            className="w-full h-full object-cover" 
          />
          {/* Strong gradient and solid overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-20 rtl:from-transparent rtl:via-black/40 rtl:to-black/80"></div>
        </div>

        <div className="relative z-30 max-w-container-max mx-auto w-full">
          <div className="max-w-3xl">
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-pink-300 mb-4 block drop-shadow-md">
              {t("services.hero.label")}
            </span>
            <h1 className="font-plus-jakarta font-extrabold text-5xl md:text-5xl md:text-7xl mb-6 text-white leading-tight drop-shadow-md">
              {t("services.hero.titleLine1")} <span className="text-pink-100">{t("services.hero.titleHighlight")}</span>
            </h1>
            <p className="font-inter text-lg md:text-xl text-white/95 leading-relaxed drop-shadow-sm font-medium">
              {t("services.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-12 md:py-16 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
        <div className="space-y-24">
          {services.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={item.id} 
                className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Showcase */}
                <div className="w-full lg:w-1/2">
                  <div className="rounded-none overflow-hidden shadow-xl border border-outline-variant/20 relative group">
                    <img loading="lazy" decoding="async" 
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt={item.name} 
                      src={item.image} 
                    />
                    <div className={`absolute top-6 ${dir === 'rtl' ? 'right-6' : 'left-6'} p-4 glass-card rounded-none border border-white`}>
                      <p className="font-plus-jakarta font-extrabold text-lg text-primary">{item.price}</p>
                      <p className="text-xs text-on-surface-variant font-semibold mt-0.5">{item.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="w-12 h-12 rounded-none bg-surface-container-high border border-outline-variant/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h2 className="font-plus-jakarta font-bold text-3xl md:text-4xl text-on-surface leading-tight">
                    {item.name}
                  </h2>
                  <p className="font-inter text-base md:text-lg text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                  
                  {/* Specs / Features Checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/30">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#008287] shrink-0" />
                        <span className="font-inter text-sm md:text-base text-on-surface">{spec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center gap-2 gradient-bg text-white font-inter font-semibold py-4 px-8 rounded-none shadow-md hover:shadow-xl active:scale-95 transition-all w-fit"
                    >
                      {t("services.list.bookEventSetup")} <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Add-ons & Customization Section */}
      <section className="py-16 md:py-24 bg-surface-container-low border-t border-outline-variant/20 w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-16">
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-primary mb-4 block">{t("services.addons.label")}</span>
            <h2 className="font-plus-jakarta font-bold text-4xl text-on-surface">{t("services.addons.title")}</h2>
            <p className="font-inter text-sm md:text-base text-on-surface-variant mt-2 max-w-xl mx-auto">{t("services.addons.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {addOns.map((add, idx) => (
              <div 
                key={idx} 
                className="bg-surface p-8 rounded-none border border-outline-variant/30 hover:border-primary/40 transition-colors flex justify-between gap-6 shadow-sm group"
              >
                <div className="space-y-2">
                  <h4 className="font-plus-jakarta font-bold text-xl text-on-surface group-hover:text-primary transition-colors">{add.name}</h4>
                  <p className="font-inter text-sm text-on-surface-variant leading-relaxed">{add.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-plus-jakarta font-extrabold text-md md:text-lg text-primary">{add.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
