"use client";

import Link from "next/link";
import Image from "next/image";
import { Cpu, Zap, Fingerprint, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function About() {
  const { t, dir } = useLanguage();
  const bentoItems = [
    {
      type: "large",
      icon: <Cpu className="w-8 h-8 text-primary" />,
      title: t("about.technology.bento1.title"),
      desc: t("about.technology.bento1.desc"),
      image: "/images/mirror-default.webp",
      alt: "Futuristic digital interface showing AI image enhancement processes in magenta and violet"
    },
    {
      type: "small",
      icon: <Zap className="w-8 h-8 text-secondary" />,
      title: t("about.technology.bento2.title"),
      desc: t("about.technology.bento2.desc")
    },
    {
      type: "small",
      icon: <Fingerprint className="w-8 h-8 text-tertiary" />,
      title: t("about.technology.bento3.title"),
      desc: t("about.technology.bento3.desc")
    },
    {
      type: "large-row",
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: t("about.technology.bento4.title"),
      desc: t("about.technology.bento4.desc"),
      image: "/images/Polaroid.webp",
      alt: "People interacting with giant mirror using golden AR filters in luxury Qatari venue"
    }
  ];

  const timeline = t("about.timeline.events") || [];

  const team = [
    {
      name: t("about.team.members.0.name"),
      role: t("about.team.members.0.role"),
      image: "/images/ahmed.webp",
      alt: "Ahmed Al-Thani CEO Portrait"
    },
    {
      name: t("about.team.members.1.name"),
      role: t("about.team.members.1.role"),
      image: "/images/sarah.webp",
      alt: "Sarah Jenkins Creative Director Portrait"
    },
    {
      name: t("about.team.members.2.name"),
      role: t("about.team.members.2.role"),
      image: "/images/leo.webp",
      alt: "Dr. Leo Chen Lead Engineer Portrait"
    },
    {
      name: t("about.team.members.3.name"),
      role: t("about.team.members.3.role"),
      image: "/images/nadia.webp",
      alt: "Nadia Mahmoud Operations Portrait"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden px-margin-mobile md:px-gutter w-full">
        {/* Background Image with Premium Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-hero.webp"
            alt="Luxury social event background"
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
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="font-plus-jakarta font-extrabold text-5xl md:text-5xl md:text-7xl mb-6 text-white leading-tight drop-shadow-md"
            >
              {t("about.hero.titleLine1")} <span className="text-pink-100">{t("about.hero.titleHighlight")}</span> {t("about.hero.titleLine2")}
            </motion.h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="font-inter text-lg md:text-xl text-white/95 mb-10 leading-relaxed drop-shadow-sm font-medium"
            >
              {t("about.hero.subtitle")}
            </motion.p>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="flex flex-wrap gap-4"
            >
              {(t("about.hero.badges") || []).map((badge, index) => (
                <div key={index} className="px-5 py-2.5 bg-white/10 border border-white/20 text-white rounded-none font-inter font-bold text-xs uppercase tracking-wider">{badge}</div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-16 md:py-24 w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="rounded-none overflow-hidden shadow-2xl border border-outline-variant/10">
                <Image
                  className="w-full h-[450px] object-cover"
                  alt="Luxury event space in Doha with floor-to-ceiling interactive screens reflecting elegant guests"
                  src="/images/services-hero.webp"
                  width={1200}
                  height={450}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="lg:col-span-5"
            >
              <span className="font-inter font-bold text-primary uppercase tracking-widest text-xs mb-4 block">{t("about.mission.label")}</span>
              <h2 className="font-plus-jakarta font-bold text-3xl md:text-4xl mb-6 text-on-surface leading-tight">{t("about.mission.title")}</h2>
              <p className="font-inter text-base text-on-surface-variant mb-6 leading-relaxed">
                {t("about.mission.desc1")}
              </p>
              <p className="font-inter text-base text-on-surface-variant leading-relaxed">
                {t("about.mission.desc2")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Grid (Technology) */}
      <section className="py-16 md:py-24 bg-surface-container-low w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="font-plus-jakarta font-bold text-4xl mb-4 text-on-surface">{t("about.technology.title")}</h2>
            <p className="font-inter text-base text-on-surface-variant max-w-2xl mx-auto">{t("about.technology.subtitle")}</p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Bento Item 1 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="md:col-span-2 bg-surface p-8 rounded-none border border-outline-variant/30 flex flex-col justify-between hover:border-primary/50 transition-colors group shadow-sm"
            >
              <div>
                <div className="mb-4 w-12 h-12 bg-surface-container-high flex items-center justify-center rounded-none">
                  {bentoItems[0].icon}
                </div>
                <h3 className="font-plus-jakarta font-bold text-2xl mb-2 text-on-surface">{bentoItems[0].title}</h3>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">{bentoItems[0].desc}</p>
              </div>
              <div className="mt-8 h-48 rounded-none overflow-hidden relative border border-outline-variant/10">
                <Image className="w-full h-full object-cover" alt={bentoItems[0].alt} src={bentoItems[0].image} fill sizes="(max-width: 768px) 100vw, 66vw" />
              </div>
            </motion.div>
            {/* Bento Item 2 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="bg-surface p-8 rounded-none border border-outline-variant/30 hover:border-primary/50 transition-colors flex flex-col text-center items-center justify-center shadow-sm"
            >
              <div className="mb-6 w-16 h-16 bg-surface-container-high flex items-center justify-center rounded-none">
                {bentoItems[1].icon}
              </div>
              <h3 className="font-plus-jakarta font-bold text-2xl mb-4 text-on-surface">{bentoItems[1].title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{bentoItems[1].desc}</p>
            </motion.div>
            {/* Bento Item 3 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="bg-surface p-8 rounded-none border border-outline-variant/30 hover:border-primary/50 transition-colors shadow-sm flex flex-col justify-between"
            >
              <div className="mb-4 w-12 h-12 bg-surface-container-high flex items-center justify-center rounded-none">
                {bentoItems[2].icon}
              </div>
              <div>
                <h3 className="font-plus-jakarta font-bold text-xl mb-2 text-on-surface">{bentoItems[2].title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{bentoItems[2].desc}</p>
              </div>
            </motion.div>
            {/* Bento Item 4 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="md:col-span-2 bg-surface p-8 rounded-none border border-outline-variant/30 flex flex-col md:flex-row gap-8 items-center hover:border-primary/50 transition-colors shadow-sm"
            >
              <div className="flex-1">
                <div className="mb-4 w-12 h-12 bg-surface-container-high flex items-center justify-center rounded-none">
                  {bentoItems[3].icon}
                </div>
                <h3 className="font-plus-jakarta font-bold text-2xl mb-2 text-on-surface">{bentoItems[3].title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{bentoItems[3].desc}</p>
              </div>
              <div className="w-full md:w-48 h-48 rounded-none overflow-hidden shrink-0 relative border border-outline-variant/10">
                <Image className="w-full h-full object-cover" alt={bentoItems[3].alt} src={bentoItems[3].image} fill sizes="(max-width: 768px) 100vw, 192px" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 overflow-hidden w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-plus-jakarta font-bold text-4xl mb-16 text-center text-on-surface"
          >
            {t("about.timeline.title")}
          </motion.h2>
          <div className="relative max-w-4xl mx-auto">
            {/* Center line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-outline-variant/30 -translate-x-1/2"></div>
            {timeline.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative mb-20 flex flex-col md:flex-row items-center group ${isEven ? "" : "md:flex-row-reverse"}`}
                >
                  <div className={`w-full md:w-1/2 ${isEven ? (dir === 'rtl' ? "pl-0 md:pl-16 text-right md:text-left" : "pr-0 md:pr-16 text-left md:text-right") : (dir === 'rtl' ? "pr-0 md:pr-16 text-right" : "pl-0 md:pl-16 text-left")}`}>
                    <span className="font-plus-jakarta font-extrabold text-4xl md:text-4xl md:text-5xl gradient-text block mb-2">{item.year}</span>
                    <h4 className="font-plus-jakarta font-bold text-2xl mb-2 text-on-surface">{item.title}</h4>
                    <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300"></div>
                  <div className="w-full md:w-1/2 hidden md:block"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-16 md:py-24 bg-surface-bright border-t border-outline-variant/20 w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="font-plus-jakarta font-bold text-4xl mb-4 text-on-surface">{t("about.team.title")}</h2>
              <p className="font-inter text-md text-on-surface-variant">{t("about.team.subtitle")}</p>
            </div>
            <Link
              href="/contact"
              className="px-8 py-3.5 border-2 border-primary text-primary rounded-none font-inter font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300 w-fit flex items-center gap-2"
            >
              {t("about.team.joinTeam")} <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group">
                <div className="aspect-[3/4] rounded-none overflow-hidden mb-4 relative shadow-sm border border-outline-variant/10">
                  <Image
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    alt={member.alt}
                    src={member.image}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h4 className="font-inter font-bold text-md text-on-surface mb-1">{member.name}</h4>
                <p className="text-xs text-on-surface-variant font-semibold tracking-wide uppercase">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
