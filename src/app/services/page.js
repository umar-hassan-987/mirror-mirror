"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, Camera, Video, Mic, Heart, PenTool, CheckCircle, Gift, ArrowRight, Printer } from "lucide-react";
import { motion } from "framer-motion";
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
      id: "retro-booth",
      name: t("services.list.retroBooth.name"),
      icon: <Camera className="w-8 h-8 text-secondary" />,
      desc: t("services.list.retroBooth.desc"),
      image: "/images/retro-booth.webp",
      price: t("services.list.retroBooth.price"),
      duration: t("services.list.retroBooth.duration"),
      specs: t("services.list.retroBooth.specs") || []
    },
    {
      id: "booth-360",
      name: t("services.list.booth360.name"),
      icon: <Video className="w-8 h-8 text-tertiary" />,
      desc: t("services.list.booth360.desc"),
      image: "/images/booth-360.webp",
      price: t("services.list.booth360.price"),
      duration: t("services.list.booth360.duration"),
      specs: t("services.list.booth360.specs") || []
    },
    {
      id: "telephone-booth",
      name: t("services.list.telephoneBooth.name"),
      icon: <Mic className="w-8 h-8 text-primary" />,
      desc: t("services.list.telephoneBooth.desc"),
      image: "/images/audio-video-booth.webp",
      price: t("services.list.telephoneBooth.price"),
      duration: t("services.list.telephoneBooth.duration"),
      specs: t("services.list.telephoneBooth.specs") || []
    },
    {
      id: "private-booth",
      name: t("services.list.privateBooth.name"),
      icon: <Camera className="w-8 h-8 text-secondary" />,
      desc: t("services.list.privateBooth.desc"),
      image: "/images/private-booth.webp",
      price: t("services.list.privateBooth.price"),
      duration: t("services.list.privateBooth.duration"),
      specs: t("services.list.privateBooth.specs") || []
    },
    {
      id: "high-angle-booth",
      name: t("services.list.highAngleBooth.name"),
      icon: <Camera className="w-8 h-8 text-tertiary" />,
      desc: t("services.list.highAngleBooth.desc"),
      image: "/images/high-angle-booth.webp",
      price: t("services.list.highAngleBooth.price"),
      duration: t("services.list.highAngleBooth.duration"),
      specs: t("services.list.highAngleBooth.specs") || []
    },
    {
      id: "photography",
      name: t("services.list.photography.name"),
      icon: <Camera className="w-8 h-8 text-primary" />,
      desc: t("services.list.photography.desc"),
      image: "/images/photography.webp",
      price: t("services.list.photography.price"),
      duration: t("services.list.photography.duration"),
      specs: t("services.list.photography.specs") || []
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
      id: "studio-rental",
      name: t("services.list.studioRental.name"),
      icon: <Camera className="w-8 h-8 text-tertiary" />,
      desc: t("services.list.studioRental.desc"),
      image: "/images/studio1.webp",
      price: t("services.list.studioRental.price"),
      duration: t("services.list.studioRental.duration"),
      specs: t("services.list.studioRental.specs") || []
    },
    {
      id: "branding-photowall",
      name: t("services.list.brandingPhotoWall.name"),
      icon: <PenTool className="w-8 h-8 text-primary" />,
      desc: t("services.list.brandingPhotoWall.desc"),
      image: "/images/branding-photowall.webp",
      price: t("services.list.brandingPhotoWall.price"),
      duration: t("services.list.brandingPhotoWall.duration"),
      specs: t("services.list.brandingPhotoWall.specs") || []
    },
    {
      id: "branding-collaterals",
      name: t("services.list.brandingCollaterals.name"),
      icon: <Gift className="w-8 h-8 text-secondary" />,
      desc: t("services.list.brandingCollaterals.desc"),
      image: "/images/brand.webp",
      price: t("services.list.brandingCollaterals.price"),
      duration: t("services.list.brandingCollaterals.duration"),
      specs: t("services.list.brandingCollaterals.specs") || []
    }
  ];

  const addOns = [
    { name: t("services.addons.extraHour.name"), price: t("services.addons.extraHour.price"), desc: t("services.addons.extraHour.desc") },
    { name: t("services.addons.transportation.name"), price: t("services.addons.transportation.price"), desc: t("services.addons.transportation.desc") },
    { name: t("services.addons.fridgeMagnet.name"), price: t("services.addons.fridgeMagnet.price"), desc: t("services.addons.fridgeMagnet.desc") },
    { name: t("services.addons.extraEnvelopes.name"), price: t("services.addons.extraEnvelopes.price"), desc: t("services.addons.extraEnvelopes.desc") }
  ];

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden px-margin-mobile md:px-gutter w-full">
        {/* Background Image with Premium Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/services-hero.webp" 
            alt="Mirror mirror photo booth backdrop" 
            fill
            priority
            sizes="100vw"
            className="w-full h-full object-cover" 
          />
          {/* Strong gradient and solid overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-20 rtl:from-transparent rtl:via-black/40 rtl:to-black/80"></div>
        </div>

        <div className="relative z-30 max-w-container-max mx-auto w-full">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="max-w-3xl"
          >
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="font-inter font-bold text-xs uppercase tracking-widest text-pink-300 mb-4 block drop-shadow-md"
            >
              {t("services.hero.label")}
            </motion.span>
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="font-plus-jakarta font-extrabold text-5xl md:text-5xl md:text-7xl mb-6 text-white leading-tight drop-shadow-md"
            >
              {t("services.hero.titleLine1")} <span className="text-pink-100">{t("services.hero.titleHighlight")}</span>
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="font-inter text-lg md:text-xl text-white/95 leading-relaxed drop-shadow-sm font-medium"
            >
              {t("services.hero.subtitle")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-12 md:py-16 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
        <div className="space-y-24">
          {services.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
                key={item.id} 
                className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Showcase */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: isEven ? -30 : 30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  className="w-full lg:w-1/2"
                >
                  <div className="rounded-none overflow-hidden shadow-xl border border-outline-variant/20 relative group">
                    <Image
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt={item.name} 
                      src={item.image}
                      width={800}
                      height={600}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className={`absolute top-6 ${dir === 'rtl' ? 'right-6' : 'left-6'} p-4 glass-card rounded-none border border-white`}>
                      <p className="font-plus-jakarta font-extrabold text-lg text-primary">{item.price}</p>
                      <p className="text-xs text-on-surface-variant font-semibold mt-0.5">{item.duration}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Details Section */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: isEven ? 30 : -30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  className="w-full lg:w-1/2 space-y-6"
                >
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
                  <motion.div 
                    variants={{
                      visible: { transition: { staggerChildren: 0.05 } }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/30"
                  >
                    {item.specs.map((spec, sIdx) => (
                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                        }}
                        key={sIdx} 
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-[#008287] shrink-0" />
                        <span className="font-inter text-sm md:text-base text-on-surface">{spec}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="pt-6">
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center gap-2 gradient-bg text-white font-inter font-semibold py-4 px-8 rounded-none shadow-md hover:shadow-xl active:scale-95 transition-all w-fit"
                    >
                      {t("services.list.bookEventSetup")} <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Add-ons & Customization Section */}
      <section className="py-16 md:py-24 bg-surface-container-low border-t border-outline-variant/20 w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-primary mb-4 block">{t("services.addons.label")}</span>
            <h2 className="font-plus-jakarta font-bold text-4xl text-on-surface">{t("services.addons.title")}</h2>
            <p className="font-inter text-sm md:text-base text-on-surface-variant mt-2 max-w-xl mx-auto">{t("services.addons.subtitle")}</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {addOns.map((add, idx) => (
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
                }}
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
