"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Play, ArrowRight, Loader2, X, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Portfolio() {
  const { t, dir } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [isPlaying, setIsPlaying] = useState(false);

  const filters = [
    { label: t("portfolio.gallery.filters.all"), id: "all" },
    { label: t("portfolio.gallery.filters.wedding"), id: "wedding" },
    { label: t("portfolio.gallery.filters.corporate"), id: "corporate" },
    { label: t("portfolio.gallery.filters.gala"), id: "gala" },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = t("home.testimonials") || [];

  const nextTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

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
      {/* Showreel Section (Hero) */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden px-margin-mobile md:px-gutter py-12 md:py-16 w-full">
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
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hero-overlay/10 to-hero-overlay z-20"></div>
        </div>

        <div className="relative z-30 max-w-container-max mx-auto w-full flex flex-col items-center">
          <div className="flex flex-col items-center text-center mb-10 max-w-3xl mt-16">
            <h1 className="font-plus-jakarta font-extrabold text-5xl md:text-5xl md:text-7xl mb-6 text-white">
              {t("portfolio.hero.titleLine1")} <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-[#731be5] text-transparent bg-clip-text gradient-span">{t("portfolio.hero.titleHighlight")}</span>
            </h1>
            <p className="font-inter text-md md:text-lg text-white/90 max-w-2xl leading-relaxed">
              {t("portfolio.hero.subtitle")}
            </p>
          </div>

          {/* Video Player Container */}
          <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden bg-surface-container-highest shadow-2xl group cursor-pointer border border-outline-variant/30">
            <div className="absolute inset-0 z-10 bg-black/25 group-hover:bg-black/15 transition-colors duration-500"></div>
            
            {isPlaying ? (
              <div className="absolute inset-0 z-30 bg-black flex items-center justify-center">
                <video 
                  src="/vid/whoweare.webm" 
                  controls 
                  autoPlay 
                  preload="none"
                  className="w-full h-full object-cover"
                  onEnded={() => setIsPlaying(false)}
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(false);
                  }}
                  className="absolute top-6 right-6 z-40 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-md transition-colors"
                  aria-label="Close video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <div className="w-full h-full relative overflow-hidden transition-transform duration-700 group-hover:scale-105">
                  <Image 
                    src="/images/services-hero.webp"
                    alt="Services showreel thumbnail"
                    fill
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="object-cover"
                  />
                </div>
                {/* Play Button Overlay */}
                <div 
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 z-20 flex items-center justify-center"
                >
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full gradient-bg flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 md:w-12 md:h-12 fill-white text-white" />
                  </div>
                </div>
                {/* Glassmorphic Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 z-20 md:max-w-xs glass-card p-6 rounded-2xl border border-white/20">
                  <p className="font-inter font-bold text-xs text-secondary mb-1">NOW PLAYING</p>
                  <h3 className="font-plus-jakarta font-bold text-xl text-on-surface">The Future of Interaction</h3>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Filterable Gallery Section */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
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
                className={`font-inter font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-full transition-all duration-300 border ${
                  activeFilter === filter.id
                    ? "gradient-bg text-white border-transparent shadow-md"
                    : "bg-surface-container-low text-on-surface-variant hover:text-primary border-outline-variant/30"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 transition-all duration-500">
          {filteredProjects.map((p) => (
            <div
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
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Experience Stats */}
      <section className="py-16 md:py-24 bg-surface-container-low border-y border-outline-variant/20 w-full">
        <div className="px-margin-mobile md:px-gutter max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className={`font-plus-jakarta font-extrabold text-5xl md:text-6xl mb-2 ${s.color}`}>
                {s.value}
              </div>
              <div className="font-inter font-bold text-xs uppercase tracking-widest text-on-surface-variant mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full border-t border-outline-variant/20">
        <div className="max-w-xl mb-16">
          <h2 className="font-plus-jakarta font-bold text-4xl text-on-surface mb-4">
            {dir === 'rtl' ? 'ماذا يقول ' : 'What Our Clients '} <span className="gradient-text">{dir === 'rtl' ? 'عملاؤنا' : 'Say'}</span>
          </h2>
          <p className="font-inter text-base text-on-surface-variant leading-relaxed">
            {dir === 'rtl' 
              ? 'الآراء والتقييمات من بعض عملائنا الكرام الذين شاركناهم نجاح فعالياتهم.' 
              : 'Read real feedback from event hosts, wedding couples, and corporate partners across Qatar.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div 
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
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-gutter max-w-container-max mx-auto text-center w-full">
        <div className="glass-card p-12 md:p-24 rounded-[40px] relative overflow-hidden border border-outline-variant/30">
          <div className="absolute inset-0 -z-10 opacity-5">
            <div className="w-full h-full gradient-bg animate-pulse"></div>
          </div>
          <h2 className="font-plus-jakarta font-extrabold text-4xl md:text-4xl md:text-5xl mb-8 leading-tight text-on-surface">
              {t("portfolio.cta.titleLine1")} <br />
              {t("portfolio.cta.titleLine2")} <span className="gradient-text italic">{t("portfolio.cta.titleHighlight")}</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/contact"
              className="gradient-bg text-white font-inter font-bold text-base py-5 px-8 md:px-12 rounded-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
            >
              {t("portfolio.cta.requestProposal")}
            </Link>
            <Link
              href="/services"
              className="gradient-border text-on-surface bg-white/20 font-inter font-bold text-base py-5 px-8 md:px-12 rounded-full hover:bg-surface-container-highest transition-all duration-300 active:scale-95"
            >
              {t("portfolio.cta.viewPackages")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
