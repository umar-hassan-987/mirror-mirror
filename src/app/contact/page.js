"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MessageSquare, Share2, MapPin, ChevronDown, Loader2, Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Contact() {
  const { t, dir } = useLanguage();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    eventType: "Corporate Gala",
    date: "",
    location: "",
    guestCount: "100-250",
    vision: ""
  });
  
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle, sending, success
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus("sending");
    setTimeout(() => {
      setSubmitStatus("success");
      setTimeout(() => {
        setFormState({
          name: "",
          email: "",
          eventType: "Corporate Gala",
          date: "",
          location: "",
          guestCount: "100-250",
          vision: ""
        });
        setSubmitStatus("idle");
      }, 3000);
    }, 1500);
  };

  const guestOptions = ["50-100", "100-250", "250-500", "500+"];

  const faqs = [
    {
      q: t("contact.faq.q1.q"),
      a: t("contact.faq.q1.a")
    },
    {
      q: t("contact.faq.q2.q"),
      a: t("contact.faq.q2.a")
    },
    {
      q: t("contact.faq.q3.q"),
      a: t("contact.faq.q3.a")
    },
    {
      q: t("contact.faq.q4.q"),
      a: t("contact.faq.q4.a")
    }
  ];

  const contactItems = [
    { icon: <Phone className="w-5 h-5" />, label: t("contact.getInTouch.phone"), value: "+974 7156 7348", href: "tel:+97471567348" },
    { icon: <Mail className="w-5 h-5" />, label: t("contact.getInTouch.email"), value: "info@mirrormirrorphotowallqatar.net", href: "mailto:info@mirrormirrorphotowallqatar.net" },
    { icon: <MessageSquare className="w-5 h-5" />, label: t("contact.getInTouch.whatsapp"), value: "+974 7156 7348", href: "https://wa.me/97471567348" },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      ), 
      label: t("contact.getInTouch.instagram"), 
      value: "@mirrormirrorphotowall.qatar", 
      href: "https://www.instagram.com/mirrormirrorphotowall.qatar/" 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ), 
      label: t("contact.getInTouch.facebook"), 
      value: "Mirror Mirror Photo Wall Qatar", 
      href: "https://www.facebook.com/profile.php?id=61581485352697" 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
        </svg>
      ), 
      label: t("contact.getInTouch.tiktok"), 
      value: "@mirror_mirror_photobooth", 
      href: "https://www.tiktok.com/@mirror_mirror_photobooth?_r=1&_t=ZN-97tYy2rH8Ug" 
    }
  ];

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden px-margin-mobile md:px-gutter w-full">
        {/* Background Image with Premium Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/contact-hero-img.webp" 
            alt="Contact us background" 
            fill
            priority
            sizes="100vw"
            className="w-full h-full object-cover" 
          />
          {/* Strong gradient and solid overlay to ensure text readability against the bright window */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-20 rtl:from-transparent rtl:via-black/40 rtl:to-black/80"></div>
        </div>

        <div className="relative z-30 max-w-container-max mx-auto w-full">
          <div className="max-w-3xl">
            <h1 className="font-plus-jakarta font-extrabold text-5xl md:text-5xl md:text-7xl mb-6 text-white leading-tight drop-shadow-md">
              {t("contact.hero.titleLine1")} <span className="text-pink-100">{t("contact.hero.titleHighlight")}</span>
            </h1>
            <p className="font-inter text-lg md:text-xl text-white/95 leading-relaxed mb-10 drop-shadow-sm font-medium">
              {t("contact.hero.subtitle")}
            </p>
            <button 
              onClick={() => {
                document.getElementById('inquiry-form').scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-primary font-inter font-bold text-base py-4 px-8 md:px-10 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {t("contact.hero.startInquiry")}
            </button>
          </div>
        </div>
      </section>

      <main id="inquiry-form" className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-16 md:py-24 w-full">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Contact Details & Map */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <h2 className="font-plus-jakarta font-bold text-3xl text-on-surface">{t("contact.getInTouch.title")}</h2>
              <div className="space-y-6">
                {contactItems.map((item, i) => (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-inter font-bold text-xs text-on-surface-variant uppercase tracking-widest">{item.label}</p>
                      <p className="font-inter text-base md:text-lg font-bold text-on-surface mt-1 group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-[32px] overflow-hidden shadow-sm h-[380px] bg-surface-container-low border border-outline-variant/30 relative group">
              <div className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700">
                <div className="w-full h-full relative overflow-hidden">
                  <Image 
                    src="/images/audio-video-booth.webp"
                    alt="Map placeholder"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-2xl flex justify-between items-center translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white">
                <div>
                  <p className="font-inter font-bold text-sm text-on-surface">{t("contact.getInTouch.addressTitle")}</p>
                  <p className="text-xs text-on-surface-variant mt-1">{t("contact.getInTouch.addressSubtitle")}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 md:p-6 md:p-12 rounded-[40px] shadow-sm relative overflow-hidden border border-outline-variant/30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <h2 className="font-plus-jakarta font-bold text-3xl mb-8 text-on-surface">{t("contact.form.title")}</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`font-inter font-bold text-[10px] tracking-widest text-on-surface-variant uppercase block ${dir === 'rtl' ? 'text-right' : 'ml-1 text-left'}`}>{t("contact.form.nameLabel")}</label>
                      <input
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        required
                        className="w-full h-14 px-6 rounded-2xl bg-white border border-outline-variant/50 focus:ring-0 transition-all text-on-surface"
                        placeholder={t("contact.form.namePlaceholder")}
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`font-inter font-bold text-[10px] tracking-widest text-on-surface-variant uppercase block ${dir === 'rtl' ? 'text-right' : 'ml-1 text-left'}`}>{t("contact.form.emailLabel")}</label>
                      <input
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        required
                        className="w-full h-14 px-6 rounded-2xl bg-white border border-outline-variant/50 focus:ring-0 transition-all text-on-surface"
                        placeholder={t("contact.form.emailPlaceholder")}
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`font-inter font-bold text-[10px] tracking-widest text-on-surface-variant uppercase block ${dir === 'rtl' ? 'text-right' : 'ml-1 text-left'}`}>{t("contact.form.eventTypeLabel")}</label>
                      <select
                        value={formState.eventType}
                        onChange={(e) => setFormState({ ...formState, eventType: e.target.value })}
                        className={`w-full h-14 px-6 rounded-2xl bg-white border border-outline-variant/50 focus:ring-0 transition-all appearance-none cursor-pointer text-on-surface ${dir === 'rtl' ? 'bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")] bg-no-repeat bg-[position:left_1.5rem_center] bg-[length:1em_1em]' : ''}`}
                      >
                        <option>{t("contact.form.eventTypes.corporate")}</option>
                        <option>{t("contact.form.eventTypes.wedding")}</option>
                        <option>{t("contact.form.eventTypes.launch")}</option>
                        <option>{t("contact.form.eventTypes.other")}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className={`font-inter font-bold text-[10px] tracking-widest text-on-surface-variant uppercase block ${dir === 'rtl' ? 'text-right' : 'ml-1 text-left'}`}>{t("contact.form.dateLabel")}</label>
                      <input
                        value={formState.date}
                        onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                        required
                        className="w-full h-14 px-6 rounded-2xl bg-white border border-outline-variant/50 focus:ring-0 transition-all text-on-surface-variant"
                        type="date"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={`font-inter font-bold text-[10px] tracking-widest text-on-surface-variant uppercase block ${dir === 'rtl' ? 'text-right' : 'ml-1 text-left'}`}>{t("contact.form.locationLabel")}</label>
                    <input
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      required
                      className="w-full h-14 px-6 rounded-2xl bg-white border border-outline-variant/50 focus:ring-0 transition-all text-on-surface"
                      placeholder={t("contact.form.locationPlaceholder")}
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`font-inter font-bold text-[10px] tracking-widest text-on-surface-variant uppercase block ${dir === 'rtl' ? 'text-right' : 'ml-1 text-left'}`}>{t("contact.form.guestCountLabel")}</label>
                    <div className="grid grid-cols-4 gap-4">
                      {guestOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setFormState({ ...formState, guestCount: opt })}
                          className={`h-12 rounded-xl border font-inter font-bold text-sm transition-colors ${
                            formState.guestCount === opt
                              ? "border-primary bg-primary-fixed text-primary"
                              : "border-outline-variant/50 text-on-surface-variant hover:bg-primary-fixed/20"
                          }`}
                          type="button"
                          dir="ltr"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={`font-inter font-bold text-[10px] tracking-widest text-on-surface-variant uppercase block ${dir === 'rtl' ? 'text-right' : 'ml-1 text-left'}`}>{t("contact.form.visionLabel")}</label>
                    <textarea
                      value={formState.vision}
                      onChange={(e) => setFormState({ ...formState, vision: e.target.value })}
                      required
                      className="w-full p-6 rounded-2xl bg-white border border-outline-variant/50 focus:ring-0 transition-all text-on-surface"
                      placeholder={t("contact.form.visionPlaceholder")}
                      rows="4"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={submitStatus !== "idle"}
                    className={`w-full h-16 rounded-2xl font-inter font-bold text-sm text-white shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 ${
                      submitStatus === "success"
                        ? "bg-[#008287]"
                        : "gradient-bg hover:opacity-90"
                    }`}
                  >
                    {submitStatus === "sending" && (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    )}
                    {submitStatus === "success" && (
                      <Check className="w-5 h-5" />
                    )}
                    {submitStatus === "sending"
                      ? t("contact.form.sending")
                      : submitStatus === "success"
                      ? t("contact.form.sentSuccessfully")
                      : t("contact.form.submitBtn")}
                  </button>
                  <p className="text-center text-xs text-on-surface-variant opacity-70">
                    {t("contact.form.responseTime")}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-24">
          <div className="text-center mb-16">
            <h2 className="font-plus-jakarta font-bold text-4xl mb-4 text-on-surface">{t("contact.faq.title")}</h2>
            <div className="w-24 h-1.5 gradient-bg mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div 
                  key={i} 
                  className="group border border-outline-variant/30 rounded-2xl overflow-hidden bg-white hover:border-primary/50 transition-all shadow-sm"
                >
                  <button 
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                  >
                    <span className="font-inter font-bold text-base md:text-lg text-on-surface">{faq.q}</span>
                    <ChevronDown 
                      className={`w-6 h-6 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : "text-on-surface-variant"
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-on-surface-variant font-inter text-sm md:text-base leading-relaxed animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
