"use client";

import Link from "next/link";
import { useState } from "react";
import { Play, ArrowRight, Loader2, X } from "lucide-react";
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

  const projects = [
    {
      id: "royal-gala",
      title: t("portfolio.gallery.projects.royalGala.title"),
      category: "gala",
      tags: [t("portfolio.gallery.tags.gala"), t("portfolio.gallery.tags.luxury")],
      desc: t("portfolio.gallery.projects.royalGala.desc"),
      image: "/images/studio1.jpg",
      gridSpan: "md:col-span-8",
      aspect: "aspect-[16/10]"
    },
    {
      id: "tech-summit",
      title: t("portfolio.gallery.projects.techSummit.title"),
      category: "corporate",
      tags: [t("portfolio.gallery.tags.corporate")],
      desc: t("portfolio.gallery.projects.techSummit.desc"),
      image: "/images/studio2.jpg",
      gridSpan: "md:col-span-4",
      aspect: "h-full min-h-[400px]"
    },
    {
      id: "desert-wedding",
      title: t("portfolio.gallery.projects.desertWedding.title"),
      category: "wedding",
      tags: [t("portfolio.gallery.tags.weddings")],
      desc: t("portfolio.gallery.projects.desertWedding.desc"),
      image: "/images/studio3.jpg",
      gridSpan: "md:col-span-4",
      aspect: "aspect-square"
    },
    {
      id: "mall-launch",
      title: t("portfolio.gallery.projects.mallLaunch.title"),
      category: "corporate",
      tags: [t("portfolio.gallery.tags.corporate")],
      desc: t("portfolio.gallery.projects.mallLaunch.desc"),
      image: "/images/branding-service.jpg",
      gridSpan: "md:col-span-4",
      aspect: "aspect-square"
    },
    {
      id: "charity-ball",
      title: t("portfolio.gallery.projects.charityBall.title"),
      category: "gala",
      tags: [t("portfolio.gallery.tags.gala")],
      desc: t("portfolio.gallery.projects.charityBall.desc"),
      image: "/images/audio-video-booth.jpg",
      gridSpan: "md:col-span-4",
      aspect: "aspect-square"
    }
  ];

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
          <img 
            src="/images/portHero.jpg" 
            alt="Vibrant event background"
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
                  src="/vid/whoweare.mp4" 
                  controls 
                  autoPlay 
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
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                  style={{
                    backgroundImage: "url('/images/services-hero.jpg')"
                  }}
                ></div>
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
              className={`${p.gridSpan} group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-surface-container-low border border-outline-variant/20`}
            >
              <div className={`${p.aspect} overflow-hidden`}>
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={p.title}
                  src={p.image}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                <div className="flex gap-2 mb-3">
                  {p.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-white/20 backdrop-blur-md border border-white/20 text-white py-1 px-3 rounded-full font-inter font-bold text-[10px] uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-plus-jakarta font-bold text-2xl md:text-3xl mb-2">{p.title}</h3>
                <p className="font-inter text-sm text-white/80 max-w-lg mb-6 leading-relaxed">{p.desc}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-inter font-bold text-sm hover:gap-4 transition-all text-white border-b border-white pb-1 w-fit"
                >
                  {t("portfolio.gallery.bookSimilar")} <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </Link>
              </div>
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
