"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  ArrowRight, Play, Camera, Video, Mic, PenTool, Gift, Star,
  ArrowUpRight, Phone, Mail, Loader2, Check, Sparkles, Heart, Printer,
  ChevronDown, ChevronLeft, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero/Hero";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Home() {
  const { t, dir } = useLanguage();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle, sending, success
  const [activeTab, setActiveTab] = useState(0);
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

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const homeProjects = [
    { title: t("portfolio.gallery.projects.project1.title"), type: t("portfolio.gallery.filters.wedding"), image: "/images/portfolio/portfolio-1.webp" },
    { title: t("portfolio.gallery.projects.project2.title"), type: t("portfolio.gallery.filters.corporate"), image: "/images/portfolio/portfolio-2.webp" },
    { title: t("portfolio.gallery.projects.project3.title"), type: t("portfolio.gallery.filters.gala"), image: "/images/portfolio/portfolio-3.webp" },
    { title: t("portfolio.gallery.projects.project4.title"), type: t("portfolio.gallery.filters.wedding"), image: "/images/portfolio/portfolio-4.webp" },
    { title: t("portfolio.gallery.projects.project5.title"), type: t("portfolio.gallery.filters.corporate"), image: "/images/portfolio/portfolio-5.webp" },
    { title: t("portfolio.gallery.projects.project6.title"), type: t("portfolio.gallery.filters.gala"), image: "/images/portfolio/portfolio-6.webp" },
    { title: t("portfolio.gallery.projects.project7.title"), type: t("portfolio.gallery.filters.wedding"), image: "/images/portfolio/portfolio-7.webp" },
    { title: t("portfolio.gallery.projects.project8.title"), type: t("portfolio.gallery.filters.corporate"), image: "/images/portfolio/portfolio-8.webp" },
    { title: t("portfolio.gallery.projects.project9.title"), type: t("portfolio.gallery.filters.gala"), image: "/images/portfolio/portfolio-9.webp" },
    { title: t("portfolio.gallery.projects.project10.title"), type: t("portfolio.gallery.filters.wedding"), image: "/images/portfolio/portfolio-10.webp" },
    { title: t("portfolio.gallery.projects.project11.title"), type: t("portfolio.gallery.filters.corporate"), image: "/images/portfolio/portfolio-11.webp" },
    { title: t("portfolio.gallery.projects.project12.title"), type: t("portfolio.gallery.filters.gala"), image: "/images/portfolio/portfolio-12.webp" },
    { title: t("portfolio.gallery.projects.project13.title"), type: t("portfolio.gallery.filters.wedding"), image: "/images/portfolio/portfolio-13.webp" },
    { title: t("portfolio.gallery.projects.project14.title"), type: t("portfolio.gallery.filters.corporate"), image: "/images/portfolio/portfolio-14.webp" },
    { title: t("portfolio.gallery.projects.project15.title"), type: t("portfolio.gallery.filters.gala"), image: "/images/portfolio/portfolio-15.webp" },
    { title: t("portfolio.gallery.projects.project16.title"), type: t("portfolio.gallery.filters.wedding"), image: "/images/portfolio/portfolio-16.webp" },
    { title: t("portfolio.gallery.projects.project17.title"), type: t("portfolio.gallery.filters.corporate"), image: "/images/portfolio/portfolio-17.webp" },
    { title: t("portfolio.gallery.projects.project18.title"), type: t("portfolio.gallery.filters.gala"), image: "/images/portfolio/portfolio-18.webp" },
    { title: t("portfolio.gallery.projects.project19.title"), type: t("portfolio.gallery.filters.wedding"), image: "/images/portfolio/portfolio-19.webp" },
    { title: t("portfolio.gallery.projects.project20.title"), type: t("portfolio.gallery.filters.corporate"), image: "/images/portfolio/portfolio-20.webp" }
  ];

  const tabs = [
    {
      id: "branding",
      name: t("home.experiences.tabs.branding.name"),
      title: t("home.experiences.tabs.branding.title"),
      description: t("home.experiences.tabs.branding.description"),
      points: t("home.experiences.tabs.branding.points") || [],
      mediaType: "video",
      mediaSrc: "/vid/vedios/short2.webm"
    },
    {
      id: "photo-video",
      name: t("home.experiences.tabs.photoVideo.name"),
      title: t("home.experiences.tabs.photoVideo.title"),
      description: t("home.experiences.tabs.photoVideo.description"),
      points: t("home.experiences.tabs.photoVideo.points") || [],
      mediaType: "video",
      mediaSrc: "/vid/vedios/short4.webm"
    },
    {
      id: "mirror-booth",
      name: t("home.experiences.tabs.mirrorBooth.name"),
      title: t("home.experiences.tabs.mirrorBooth.title"),
      description: t("home.experiences.tabs.mirrorBooth.description"),
      points: t("home.experiences.tabs.mirrorBooth.points") || [],
      mediaType: "video",
      mediaSrc: "/vid/vedios/short1.webm"
    }
  ];

  const stats = [
    { val: "100%", lbl: t("home.experiences.stats.customerSatisfaction") },
    { val: "350+", lbl: t("home.experiences.stats.sessionsCompleted") },
    { val: "50%", lbl: t("home.experiences.stats.experiencedPhotographers") },
    { val: "250+", lbl: t("home.experiences.stats.eventsCovered") }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("sending");
    try {
      const response = await fetch("/send-email.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormState({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitStatus("idle");
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("idle");
      alert("An error occurred. Please try again.");
    }
  };

  const services = [
    {
      name: t("home.servicesSection.mirrorBooth.name"),
      icon: <Camera className="w-5 h-5 text-primary" />,
      desc: t("home.servicesSection.mirrorBooth.desc"),
      image: "/images/mirror-photo-booth.jpg"
    },
    {
      name: t("home.servicesSection.retroBooth.name"),
      icon: <Camera className="w-5 h-5 text-secondary" />,
      desc: t("home.servicesSection.retroBooth.desc"),
      image: "/images/audio-video-booth.webp"
    },
    {
      name: t("home.servicesSection.booth360.name"),
      icon: <Video className="w-5 h-5 text-tertiary" />,
      desc: t("home.servicesSection.booth360.desc"),
      image: "/images/booth-360.webp"
    },
    {
      name: t("home.servicesSection.telephoneBooth.name"),
      icon: <Phone className="w-5 h-5 text-primary" />,
      desc: t("home.servicesSection.telephoneBooth.desc"),
      image: "/images/audio-video-telepone booth.jpg"
    },
    {
      name: t("home.servicesSection.privateBooth.name"),
      icon: <Camera className="w-5 h-5 text-secondary" />,
      desc: t("home.servicesSection.privateBooth.desc"),
      image: "/images/private-booth.webp"
    },
    {
      name: t("home.servicesSection.highAngleBooth.name"),
      icon: <Camera className="w-5 h-5 text-tertiary" />,
      desc: t("home.servicesSection.highAngleBooth.desc"),
      image: "/images/high-angle-booth.webp"
    },
    {
      name: t("home.servicesSection.photography.name"),
      icon: <Camera className="w-5 h-5 text-primary" />,
      desc: t("home.servicesSection.photography.desc"),
      image: "/images/photography.jpg"
    },
    {
      name: t("home.servicesSection.videography.name"),
      icon: <Video className="w-5 h-5 text-secondary" />,
      desc: t("home.servicesSection.videography.desc"),
      image: "/images/videography.jpg"
    },
    {
      name: t("home.servicesSection.studioRental.name"),
      icon: <Camera className="w-5 h-5 text-tertiary" />,
      desc: t("home.servicesSection.studioRental.desc"),
      image: "/images/studio1.webp"
    },
    {
      name: t("home.servicesSection.brandingPhotoWall.name"),
      icon: <PenTool className="w-5 h-5 text-primary" />,
      desc: t("home.servicesSection.brandingPhotoWall.desc"),
      image: "/images/branding-photowall.webp"
    },
    {
      name: t("home.servicesSection.brandingCollaterals.name"),
      icon: <Gift className="w-5 h-5 text-secondary" />,
      desc: t("home.servicesSection.brandingCollaterals.desc"),
      image: "/images/branding-colateral.jpg"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-background">
      <Hero />

      {/* Services Section */}
      <section id="homepage-next-section" className="pt-32 pb-20 px-margin-mobile max-w-container-max mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start mb-16 max-w-3xl"
        >
          <h2 className="font-plus-jakarta font-bold text-4xl md:text-5xl lg:text-6xl text-on-surface leading-tight tracking-tight mb-6">
            {t("home.servicesSection.titleLine1")} <br className="hidden md:block" />
            <span className={`gradient-text italic font-extrabold ${dir === 'rtl' ? 'pl-2' : 'pr-2'}`}>{t("home.servicesSection.titleHighlight")}</span>
          </h2>
          <p className="text-on-surface-variant font-inter text-base md:text-lg max-w-2xl leading-relaxed">
            {t("home.servicesSection.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 grid-flow-row-dense"
        >
          {services.map((item, idx) => {
            let spanClass = "col-span-1 row-span-1 aspect-square";
            if (idx === 0) spanClass = "col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-2 aspect-[4/5] lg:aspect-auto"; // Tall
            else if (idx === 3) spanClass = "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 aspect-video lg:aspect-[2/1]"; // Wide
            else if (idx === 7) spanClass = "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 aspect-video lg:aspect-[2/1]"; // Wide

            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
                }}
                className={`group relative overflow-hidden bg-black ${spanClass} cursor-pointer`}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex flex-col justify-end h-full">
                  <div className="flex items-center gap-4 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-secondary">
                      {item.icon}
                    </div>
                    <h3 className="font-plus-jakarta font-bold text-xl md:text-2xl text-white uppercase tracking-wider">
                      {item.name}
                    </h3>
                  </div>

                  <div className="overflow-hidden">
                    <p className="text-white/80 font-inter text-sm md:text-base leading-relaxed transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 max-w-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <Link
                  href="/services"
                  className={`absolute top-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} w-12 h-12 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform rotate-45 group-hover:rotate-0 transition-all duration-500 hover:bg-white hover:text-black`}
                >
                  <ArrowUpRight className={`w-5 h-5 ${dir === 'rtl' ? '-rotate-90' : ''}`} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Narrative Section 1: Who We Are (Brand Manifesto) */}
      <section className="py-32 md:py-48 bg-black w-full border-t border-gray-900 relative overflow-hidden flex items-center justify-center min-h-[70vh]">
        {/* Background Video with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            src="/vid/whoweare.webm"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-0"></div>
        <div className="absolute inset-0 bg-black/20 z-0 backdrop-blur-[2px]"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto px-margin-mobile md:px-gutter relative z-10 text-center flex flex-col items-center"
        >
          <span className="px-5 py-2 rounded-none border border-white/20 text-white font-inter font-bold uppercase tracking-widest text-[10px] bg-black/50 backdrop-blur-md inline-block mb-8">
            {t("home.whoWeAre.label")}
          </span>
          <h2 className="font-plus-jakarta font-bold text-5xl md:text-5xl md:text-7xl text-white leading-tight mb-8 tracking-tight">
            {t("home.whoWeAre.titleLine1")} <span className="gradient-text font-extrabold italic">{t("home.whoWeAre.titleHighlight")}</span>
          </h2>
          <p className="font-inter text-lg md:text-2xl text-white leading-relaxed max-w-3xl mx-auto drop-shadow-md font-medium">
            {t("home.whoWeAre.desc1")} <strong className="text-white font-extrabold">{t("home.whoWeAre.descBrand")}</strong>{t("home.whoWeAre.desc2")}
          </p>
        </motion.div>
      </section>

      {/* Narrative Section 2: Interactive Services Overview */}
      <section className="py-16 md:py-24 bg-gray-50 w-full border-t border-b border-gray-200 relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left Column: Interactive Accordions */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-10">
              <div className="space-y-4">
                <h3 className="font-plus-jakarta font-bold text-3xl md:text-4xl text-black">
                  {t("home.experiences.titleLine1")} <span className="gradient-text italic">{t("home.experiences.titleHighlight")}</span>
                </h3>
                <p className="font-inter text-gray-600 text-sm md:text-base">
                  {t("home.experiences.subtitle")}
                </p>
              </div>

              {/* Horizontal Tab Buttons */}
              <div className="flex flex-wrap gap-1 border-b border-gray-200 pb-1">
                {tabs.map((tab, idx) => {
                  const isActive = activeTab === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      className={`px-3 py-2 font-plus-jakarta font-bold text-xs tracking-wider uppercase transition-all duration-300 relative rounded-none ${isActive
                        ? "text-black font-extrabold"
                        : "text-gray-400 hover:text-gray-600"
                        }`}
                    >
                      {tab.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeTabUnderline"
                          className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-full h-[2px] bg-secondary`}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Content area */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="font-plus-jakarta font-bold text-sm md:text-base text-secondary uppercase tracking-wider">
                    {tabs[activeTab].title}
                  </h3>

                  <p className="font-inter text-xs md:text-sm text-gray-600 leading-relaxed">
                    {tabs[activeTab].description}
                  </p>

                  {/* Staggered Checklist Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {tabs[activeTab].points.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15, delay: index * 0.03 }}
                        className="flex items-start gap-2.5"
                      >
                        <Check className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                        <span className="font-inter text-xs text-gray-700">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Media Viewport (Perfect height matching) */}
            <div className="w-full lg:w-1/2 h-[260px] sm:h-[320px] lg:h-[350px] relative overflow-hidden bg-black border border-gray-200 shadow-sm self-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full"
                >
                  {tabs[activeTab].mediaType === "video" ? (
                    <video
                      src={tabs[activeTab].mediaSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={tabs[activeTab].mediaSrc}
                      alt={tabs[activeTab].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"></div>

                  {/* Status badge */}
                  {tabs[activeTab].mediaType === "video" && (
                    <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} px-2.5 py-1 bg-black/75 backdrop-blur-sm text-secondary font-inter font-bold text-[9px] uppercase tracking-wider flex items-center gap-1.5 border border-secondary/20`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                      {t("home.experiences.videoLoop")}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Stats Bar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="mt-20 pt-8 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="space-y-1"
              >
                <p className="font-plus-jakarta font-extrabold text-3xl text-black">{stat.val}</p>
                <p className="font-inter text-xs text-gray-500 uppercase tracking-wider">{stat.lbl}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Explore Our Work (Projects) Section */}
      <section className="py-32 px-margin-mobile max-w-container-max mx-auto w-full bg-white relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
        >
          <div>
            <span className="px-4 py-1.5 border border-black/10 text-black font-inter font-bold uppercase tracking-widest text-xs bg-gray-50 inline-block mb-4">
              {t("home.portfolio.label")}
            </span>
            <h2 className="font-plus-jakarta font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-black tracking-tight">
              {t("home.portfolio.titleLine1")} <span className="gradient-text">{t("home.portfolio.titleHighlight")}</span>
            </h2>
            <p className="text-gray-600 font-inter text-md md:text-lg max-w-2xl leading-relaxed">
              {t("home.portfolio.subtitle")}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {[
            { title: t("home.portfolio.projects.sunlifeOpening"), image: "/images/nadia.webp" },
            { title: t("home.portfolio.projects.rnbOpening"), image: "/images/rnb-opening.png" },
            { title: t("home.portfolio.projects.hamadHospital"), image: "/images/hamad-hospital.jpg" },
            { title: t("home.portfolio.projects.graduation"), image: "/images/home-projects/graduation.png" },
            { title: t("home.portfolio.projects.weddingProject"), image: "/images/home-projects/wedding.png" },
            { title: t("home.portfolio.projects.birthdaysPrivate"), image: "/images/birthday.jpg" }
          ].map((proj, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden bg-black aspect-square"
            >
              <Image
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                alt={proj.title}
                src={proj.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none group-hover:from-black/60 transition-colors duration-500"></div>

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-bold text-xl md:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {proj.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Link
            href="/portfolio"
            className="px-8 md:px-12 py-5 bg-black text-white hover:bg-gray-900 rounded-none font-inter font-bold text-sm tracking-widest uppercase transition-colors shadow-2xl"
          >
            {t("home.portfolio.viewMore")}
          </Link>
        </div>
      </section>

      {/* Featured Testimonial Banner Section */}
      <section className="py-16 md:py-24 px-margin-mobile max-w-container-max mx-auto w-full">
        <div className="relative overflow-hidden bg-black p-8 md:p-12 lg:p-16 shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none z-0"></div>

          {testimonials.length > 0 && (
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Testimonial Content */}
              <div className="flex-1 space-y-8 w-full">
                {/* Rating */}
                <div className="flex gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current text-primary" />
                  ))}
                </div>

                {/* Animated quote container */}
                <div className="min-h-[160px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <blockquote className="font-plus-jakarta font-bold text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed tracking-tight">
                        {testimonials[currentTestimonial].quote}
                      </blockquote>

                      {/* Author info */}
                      <div>
                        <p className="font-plus-jakarta font-extrabold text-xl text-white">
                          {testimonials[currentTestimonial].author}
                        </p>
                        <p className="font-inter text-sm text-secondary uppercase tracking-widest font-bold mt-2">
                          {testimonials[currentTestimonial].role}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Indicators / Dots */}
                <div className="flex gap-2 pt-4">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={`h-2 transition-all duration-300 cursor-pointer rounded-none ${currentTestimonial === idx ? "w-8 bg-secondary" : "w-2 bg-neutral-800"
                        }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Featured Photo / Review Image */}
              <div className="w-full lg:w-[400px] shrink-0">
                <div className="aspect-[4/5] rounded-none overflow-hidden relative group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentTestimonial}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      src={testimonials[currentTestimonial].image}
                      alt={`Review by ${testimonials[currentTestimonial].author}`}
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 px-margin-mobile relative overflow-hidden w-full bg-white border-t border-gray-200" id="contact">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="px-4 py-1.5 border border-black/10 text-black font-inter font-bold uppercase tracking-widest text-xs bg-gray-50 inline-block mb-6">
              {t("home.contact.label")}
            </span>
            <h2 className="font-plus-jakarta font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-black tracking-tight">
              {t("home.contact.titleLine1")} <br />
              {t("home.contact.titleLine2")} <span className="gradient-text italic">{t("home.contact.titleHighlight")}</span>
            </h2>
            <p className="font-inter text-lg text-gray-600 mb-12 leading-relaxed max-w-md">
              {t("home.contact.subtitle")}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="bg-gray-50 p-8 md:p-6 md:p-12 rounded-none border border-gray-200 relative shadow-sm"
          >
            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-6 py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-plus-jakarta font-bold text-3xl text-black">
                  {t("home.contact.form.sentSuccessfully")}
                </h3>
                <p className="font-inter text-gray-600 max-w-sm">
                  Thank you for reaching out. We have received your inquiry and will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-8 px-8 py-4 bg-black text-white hover:bg-gray-900 font-inter font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className={`font-inter font-bold text-gray-800 uppercase text-xs tracking-widest block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t("home.contact.form.nameLabel")}</label>
                  <input
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 h-12 rounded-none border border-gray-300 bg-white transition-all text-black focus:border-black focus:ring-1 focus:ring-black outline-none"
                    placeholder={t("home.contact.form.namePlaceholder")}
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className={`font-inter font-bold text-gray-800 uppercase text-xs tracking-widest block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t("home.contact.form.emailLabel")}</label>
                  <input
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 h-12 rounded-none border border-gray-300 bg-white transition-all text-black focus:border-black focus:ring-1 focus:ring-black outline-none"
                    placeholder={t("home.contact.form.emailPlaceholder")}
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <label className={`font-inter font-bold text-gray-800 uppercase text-xs tracking-widest block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t("home.contact.form.phoneLabel")}</label>
                  <input
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 h-12 rounded-none border border-gray-300 bg-white transition-all text-black focus:border-black focus:ring-1 focus:ring-black outline-none"
                    placeholder={t("home.contact.form.phonePlaceholder")}
                    type="tel"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <label className={`font-inter font-bold text-gray-800 uppercase text-xs tracking-widest block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t("home.contact.form.messageLabel")}</label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-none border border-gray-300 bg-white transition-all text-black focus:border-black focus:ring-1 focus:ring-black outline-none"
                    placeholder={t("home.contact.form.messagePlaceholder")}
                    rows="4"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitStatus !== "idle"}
                  className={`w-full py-4 rounded-none font-inter font-bold text-lg text-white tracking-widest uppercase transition-all ${submitStatus === "success"
                    ? "gradient-bg text-white"
                    : "bg-black hover:bg-gray-900"
                    } flex items-center justify-center gap-2 mt-4`}
                >
                  {submitStatus === "sending" && (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  )}
                  {submitStatus === "sending" ? (
                    t("home.contact.form.sending")
                  ) : (
                    t("home.contact.form.submitBtn")
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
