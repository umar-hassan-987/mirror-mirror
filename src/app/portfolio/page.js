"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Portfolio() {
  const { t, dir } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");


  const filters = [
    { label: t("portfolio.gallery.filters.all"), id: "all" },
    { label: t("portfolio.gallery.filters.wedding"), id: "wedding" },
    { label: t("portfolio.gallery.filters.corporate"), id: "corporate" },
    { label: t("portfolio.gallery.filters.gala"), id: "gala" },
  ];

  const testimonials = t("home.testimonials") || [];

  const projects = Array.from({ length: 20 }, (_, idx) => {
    const id = idx + 1;
    let category = "wedding";
    if (id % 3 === 2) category = "corporate";
    else if (id % 3 === 0) category = "gala";

    let tags = [];
    if (category === "wedding") {
      tags = [t("portfolio.gallery.tags.weddings"), t("portfolio.gallery.tags.luxury")];
    } else if (category === "corporate") {
      tags = [t("portfolio.gallery.tags.corporate")];
    } else {
      tags = [t("portfolio.gallery.tags.gala"), t("portfolio.gallery.tags.luxury")];
    }

    let gridSpan = "md:col-span-4";
    let aspect = "aspect-square";
    if (idx % 5 === 0) {
      gridSpan = "md:col-span-8";
      aspect = "aspect-[16/10]";
    } else if (idx % 5 === 2) {
      gridSpan = "md:col-span-4";
      aspect = "h-full min-h-[400px]";
    }

    return {
      id: `project-${id}`,
      title: t(`portfolio.gallery.projects.project${id}.title`),
      category: category,
      tags: tags,
      desc: t(`portfolio.gallery.projects.project${id}.desc`),
      image: `/images/portfolio/portfolio-${id}.webp`,
      gridSpan: gridSpan,
      aspect: aspect
    };
  });

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const stats = [
    { value: "500+", label: t("portfolio.stats.eventsManaged"), color: "text-primary" },
    { value: "120k", label: t("portfolio.stats.photosCaptured"), color: "text-secondary" },
    { value: "99%", label: t("portfolio.stats.clientSatisfaction"), color: "text-primary" },
    { value: "15+", label: t("portfolio.stats.exclusiveBrands"), color: "text-secondary" }
  ];

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Hero Section — Immersive Mosaic */}
      <section className="relative min-h-screen flex items-center overflow-hidden w-full">
        {/* Background Image with Premium Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/portHero.webp"
            alt="Vibrant event background"
            fill
            priority
            sizes="100vw"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-20 rtl:from-transparent rtl:via-black/40 rtl:to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-hero-overlay via-transparent to-transparent z-20"></div>
        </div>

        <div className="relative z-30 max-w-container-max mx-auto w-full px-margin-mobile md:px-gutter py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="flex flex-col"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="font-inter font-bold text-xs uppercase tracking-[0.25em] text-primary mb-6 flex items-center gap-3"
              >
                <span className="w-10 h-[2px] gradient-bg inline-block"></span>
                {t("portfolio.hero.label")}
              </motion.span>
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="font-plus-jakarta font-extrabold text-5xl md:text-7xl mb-6 text-white leading-[1.1]"
              >
                {t("portfolio.hero.titleLine1")} <br />
                <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-[#731be5] text-transparent bg-clip-text gradient-span">{t("portfolio.hero.titleHighlight")}</span>
              </motion.h1>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="font-inter text-base md:text-lg text-white/80 max-w-lg leading-relaxed mb-10"
              >
                {t("portfolio.hero.subtitle")}
              </motion.p>

              {/* Floating Stats Row */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="flex flex-wrap gap-4"
              >
                {stats.map((s, i) => (
                  <div key={i} className="px-5 py-4 bg-white/[0.07] backdrop-blur-md border border-white/[0.12] flex flex-col items-center min-w-[100px] hover:bg-white/[0.12] transition-colors duration-300 group">
                    <span className={`font-plus-jakarta font-extrabold text-2xl md:text-3xl ${s.color} group-hover:scale-105 transition-transform duration-300`}>{s.value}</span>
                    <span className="font-inter text-[10px] uppercase tracking-wider text-white/60 mt-1 text-center">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Staggered Image Mosaic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="hidden lg:block relative h-[560px]"
            >
              {/* Main large image */}
              <div className="absolute top-0 right-0 w-[75%] h-[65%] overflow-hidden shadow-2xl group border border-white/10">
                <Image
                  src="/images/portfolio/portfolio-1.webp"
                  alt="Elegant Royal Wedding"
                  fill
                  sizes="(max-width: 1024px) 0vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Bottom-left overlapping image */}
              <div className="absolute bottom-0 left-0 w-[55%] h-[50%] overflow-hidden shadow-2xl group border border-white/10 z-10">
                <Image
                  src="/images/port-hero-1.webp"
                  alt="Annual Charity Ball"
                  fill
                  sizes="(max-width: 1024px) 0vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Small accent image */}
              <div className="absolute bottom-[10%] right-[3%] w-[45%] h-[35%] overflow-hidden rounded-2xl shadow-2xl group border border-white/10 z-20">
                <Image
                  src="/images/graduation.webp"
                  alt="National Day Gala"
                  fill
                  sizes="(max-width: 1024px) 0vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>

              {/* Decorative gradient accent line */}
              <div className="absolute -left-4 top-[20%] w-1 h-[40%] gradient-bg opacity-60"></div>
              <div className="absolute -bottom-4 right-[30%] h-1 w-[30%] gradient-bg opacity-40"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filterable Gallery Section */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16"
        >
          <div className="max-w-xl">
            <h2 className="font-plus-jakarta font-bold text-4xl text-on-surface mb-4">
              {t("portfolio.gallery.titleLine1")} <span className="gradient-text">{t("portfolio.gallery.titleHighlight")}</span>
            </h2>
            <p className="font-inter text-base text-on-surface-variant leading-relaxed">
              {t("portfolio.gallery.subtitle")}
            </p>
          </div>
          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`font-inter font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-full transition-all duration-300 border ${activeFilter === filter.id
                  ? "gradient-bg text-white border-transparent shadow-md"
                  : "bg-surface-container-low text-on-surface-variant hover:text-primary border-outline-variant/30"
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bento Grid Gallery */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-8 transition-all duration-500">
          <AnimatePresence>
            {filteredProjects.map((p) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={p.id}
                className={`${p.gridSpan} ${p.aspect} group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-surface-container-low border border-outline-variant/20`}
              >
                <Image
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={p.title}
                  src={p.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 33vw"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Dynamic Experience Stats */}
      <section className="py-16 md:py-24 bg-surface-container-low border-y border-outline-variant/20 w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="px-margin-mobile md:px-gutter max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              <div className={`font-plus-jakarta font-extrabold text-5xl md:text-6xl mb-2 ${s.color}`}>
                {s.value}
              </div>
              <div className="font-inter font-bold text-xs uppercase tracking-widest text-on-surface-variant mt-2">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Client Reviews Section */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full border-t border-outline-variant/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mb-16"
        >
          <h2 className="font-plus-jakarta font-bold text-4xl text-on-surface mb-4">
            {dir === 'rtl' ? 'ماذا يقول ' : 'What Our Clients '} <span className="gradient-text">{dir === 'rtl' ? 'عملاؤنا' : 'Say'}</span>
          </h2>
          <p className="font-inter text-base text-on-surface-variant leading-relaxed">
            {dir === 'rtl'
              ? 'الآراء والتقييمات من بعض عملائنا الكرام الذين شاركناهم نجاح فعالياتهم.'
              : 'Read real feedback from event hosts, wedding couples, and corporate partners across Qatar.'}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
              }}
              key={idx}
              className="flex flex-col sm:flex-row bg-surface-container-low border border-outline-variant/20 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Review Image Viewport */}
              <div className="w-full sm:w-[180px] shrink-0 aspect-[4/5] sm:aspect-auto overflow-hidden relative">
                <Image
                  src={t.image}
                  alt={`Event review by ${t.author}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 180px"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Review Content */}
              <div className="p-8 flex flex-col justify-between flex-1">
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex gap-0.5 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-primary" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="font-inter text-sm text-on-surface-variant leading-relaxed italic">
                    {t.quote}
                  </p>
                </div>
                {/* Author Info */}
                <div className="mt-6 pt-4 border-t border-outline-variant/10">
                  <h4 className="font-plus-jakarta font-bold text-base text-on-surface">{t.author}</h4>
                  <p className="font-inter text-xs text-on-surface-variant font-medium mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-gutter max-w-container-max mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="p-12 md:p-24 rounded-[40px] relative overflow-hidden shadow-2xl border border-white/10 z-0"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/portfolio-hero.webp"
              alt="CTA Background"
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px]"></div>

          <div className="relative z-20">
            <h2 className="font-plus-jakarta font-extrabold text-4xl md:text-4xl md:text-5xl mb-8 leading-tight text-white drop-shadow-lg">
              {t("portfolio.cta.titleLine1")} <br />
              {t("portfolio.cta.titleLine2")} <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-[#731be5] text-transparent bg-clip-text italic">{t("portfolio.cta.titleHighlight")}</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/contact"
                className="gradient-bg text-white font-inter font-bold text-base py-5 px-8 md:px-12 rounded-full shadow-[0_0_20px_rgba(115,27,229,0.3)] hover:shadow-[0_0_30px_rgba(115,27,229,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
              >
                {t("portfolio.cta.requestProposal")}
              </Link>
              <Link
                href="/services"
                className="border border-white/30 text-white bg-white/10 backdrop-blur-md font-inter font-bold text-base py-5 px-8 md:px-12 rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300 active:scale-95"
              >
                {t("portfolio.cta.viewPackages")}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
