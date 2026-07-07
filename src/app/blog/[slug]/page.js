"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import { ArrowLeft, ArrowRight, Calendar, User, Clock } from "lucide-react";
import { notFound, useParams } from "next/navigation";

export default function BlogPost() {
  const { t, locale, dir } = useLanguage();
  const params = useParams();
  
  const post = blogs.find(b => b.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  const data = locale === 'en' ? post.en : post.ar;
  const heroImage = post.coverImage || "/images/mirror-default.jpg";

  // Get other posts for "related" section
  const otherPosts = blogs.filter(b => b.slug !== post.slug).slice(0, 2);

  const renderContent = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith('# ')) {
        return null; // Skip main title, we render it separately
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={index} className="font-plus-jakarta font-bold text-2xl md:text-3xl text-on-surface mt-12 mb-5">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('- **')) {
        const parts = trimmed.split('**');
        return (
          <li key={index} className="font-inter text-on-surface-variant mb-3 leading-relaxed ms-5 list-disc">
            <strong className="text-on-surface">{parts[1]}</strong>{parts[2]}
          </li>
        );
      }
      return (
        <p key={index} className="font-inter text-base md:text-lg text-on-surface-variant mb-5 leading-relaxed">
          {trimmed}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden w-full pt-32">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-hero-overlay via-hero-overlay/40 to-transparent z-20"></div>
        </div>

        <div className="relative z-30 max-w-container-max mx-auto w-full px-margin-mobile md:px-gutter pb-16">
          {/* Back Link */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 font-inter text-sm font-medium group"
          >
            {dir === 'rtl' ? <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
            {t("blog.backToBlog")}
          </Link>

          <h1 className="font-plus-jakarta font-extrabold text-4xl md:text-6xl text-white leading-tight mb-6 max-w-4xl">
            {data.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm font-inter">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-pink-300" />
              <span>{t("blog.publishedOn")} {post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-pink-300" />
              <span>{t("blog.by")} {post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-pink-300" />
              <span>{t("blog.readTime") || "5 min read"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16 px-margin-mobile md:px-gutter">
        <div className="max-w-3xl mx-auto">
          {renderContent(data.content)}
        </div>
      </section>

      {/* Related Articles */}
      {otherPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-surface-container-low border-t border-outline-variant/20 w-full">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <h3 className="font-plus-jakarta font-bold text-3xl text-on-surface mb-10">{t("blog.relatedArticles") || "Related Articles"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherPosts.map((related) => {
                const relData = locale === 'en' ? related.en : related.ar;
                const relImg = related.coverImage || "/images/mirror-default.jpg";
                return (
                  <Link 
                    href={`/blog/${related.slug}`} 
                    key={related.slug}
                    className="group flex flex-col sm:flex-row bg-surface border border-outline-variant/30 rounded-none overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-lg shadow-sm"
                  >
                    <div className="w-full sm:w-48 h-40 sm:h-auto relative overflow-hidden shrink-0">
                      <img 
                        src={relImg}
                        alt={relData.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-1.5 text-on-surface-variant text-xs font-inter mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{related.date}</span>
                      </div>
                      <h4 className="font-plus-jakarta font-bold text-lg text-on-surface leading-tight mb-2 group-hover:text-primary transition-colors">
                        {relData.title}
                      </h4>
                      <span className="text-sm font-inter font-bold text-primary flex items-center gap-1.5">
                        {t("blog.readArticle")}
                        {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
