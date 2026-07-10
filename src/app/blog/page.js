"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogs";
import { useState } from "react";
import { Calendar, ArrowRight, ArrowLeft, User, Clock, Search, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Blog() {
  const { t, locale, dir } = useLanguage();

  const featured = blogs[0];
  const rest = blogs.slice(1);
  const featuredData = locale === 'en' ? featured.en : featured.ar;

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-start overflow-hidden w-full">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/blog-hero.webp" 
            alt="Mirror Mirror blog header background" 
            fill
            priority
            sizes="100vw"
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-20 rtl:from-transparent rtl:via-black/40 rtl:to-black/80"></div>
        </div>

        <div className="relative z-30 max-w-container-max mx-auto w-full px-margin-mobile md:px-gutter py-24 md:py-32">
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
              className="font-inter font-bold text-xs uppercase tracking-[0.25em] text-pink-300 mb-6 block drop-shadow-md"
            >
              {t("nav.blog")}
            </motion.span>
            <h1 className="font-plus-jakarta font-extrabold text-5xl md:text-5xl md:text-7xl mb-6 text-white leading-tight drop-shadow-md">
              {t("blog.heroTitle")} <span className="text-pink-100">{t("blog.heroHighlight")}</span>
            </h1>
            <p className="font-inter text-lg md:text-xl text-white/95 leading-relaxed drop-shadow-sm font-medium">
              {t("blog.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link 
            href={`/blog/${featured.slug}`} 
            className="group flex flex-col lg:flex-row gap-0 overflow-hidden rounded-none border border-outline-variant/20 shadow-sm hover:shadow-xl transition-all duration-500 bg-surface"
          >
            <div className="w-full lg:w-1/2 h-72 lg:h-[400px] relative overflow-hidden">
              <Image
                src={featured.coverImage}
                alt={featuredData.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 px-3 py-1.5 gradient-bg text-white text-xs font-inter font-bold rounded-none uppercase tracking-wider">
                {t("blog.featured") || "Featured"}
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-8 md:p-6 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-on-surface-variant text-xs font-inter mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{featured.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>{featured.author}</span>
                </div>
              </div>

              <h2 className="font-plus-jakarta font-bold text-3xl md:text-4xl text-on-surface leading-tight mb-4 group-hover:text-primary transition-colors">
                {featuredData.title}
              </h2>

              <p className="font-inter text-base text-on-surface-variant leading-relaxed mb-8">
                {featuredData.excerpt}
              </p>

              <div className="flex items-center gap-2 text-sm font-inter font-bold text-primary group-hover:underline transition-colors">
                {t("blog.readArticle")}
                {dir === 'rtl' ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-16 bg-surface-container-low border-t border-outline-variant/20 w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-16">
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-primary mb-4 block">{t("blog.latestArticles") || "Latest Articles"}</span>
            <h2 className="font-plus-jakarta font-bold text-4xl text-on-surface">{t("blog.allPosts") || "All Posts"}</h2>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {rest.map((post) => {
                const data = locale === 'en' ? post.en : post.ar;
                return (
                  <motion.div
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="group flex flex-col h-full bg-surface border border-outline-variant/30 rounded-none overflow-hidden hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl shadow-sm"
                    >
                      <div className="h-56 w-full relative overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={data.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-on-surface-variant text-xs font-inter mb-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                        
                        <h3 className="font-plus-jakarta font-bold text-xl mb-3 text-on-surface leading-tight group-hover:text-primary transition-colors">
                          {data.title}
                        </h3>
                        
                        <p className="font-inter text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">
                          {data.excerpt}
                        </p>
                        
                        <div className="mt-auto pt-4 border-t border-outline-variant/20 flex items-center gap-2 text-sm font-inter font-bold text-primary">
                          {t("blog.readArticle")}
                          {dir === 'rtl' ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
