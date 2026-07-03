"use client";

import { useState } from "react";
import { Phone, Mail, MessageSquare, Share2, MapPin, ChevronDown, Loader2, Check } from "lucide-react";

export default function Contact() {
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
      q: "How much space is required for the Mirror Mirror Photo Wall?",
      a: "We recommend a minimum footprint of 3m x 3m to allow for the hardware, background, and guest flow. A standard 220V power outlet is also required within 5 meters of the setup."
    },
    {
      q: "Do you offer custom digital branding?",
      a: "Absolutely. All our packages include basic digital branding (logo overlay). Our premium tiers offer full UI/UX customization of the screen interface and animated overlays to match your event theme perfectly."
    },
    {
      q: "How far in advance should I book?",
      a: "For weekends and peak seasons (October–March in Qatar), we recommend booking at least 3-6 months in advance. However, we do occasionally have last-minute availability, so please inquire regardless."
    },
    {
      q: "Can guests receive photos instantly?",
      a: "Yes, photos and videos are delivered via QR code scanning, SMS, or Email within seconds of capture. We also offer high-speed professional thermal printing on-site for physical keepsakes."
    }
  ];

  const contactItems = [
    { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+974 7156 7348", href: "tel:+97471567348" },
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "info@mirrormirrorphotowallqatar.com", href: "mailto:info@mirrormirrorphotowallqatar.com" },
    { icon: <MessageSquare className="w-5 h-5" />, label: "WhatsApp", value: "+974 7156 7348", href: "https://wa.me/97471567348" },
    { icon: <Share2 className="w-5 h-5" />, label: "Instagram", value: "@mirrormirrorphotowallqatar", href: "https://instagram.com/mirrormirrorphotowallqatar" }
  ];

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden px-margin-mobile md:px-gutter w-full">
        {/* Background Image with Premium Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/img/mirror.jpg" 
            alt="Luxury ballroom lighting background" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hero-overlay/10 to-hero-overlay z-20"></div>
        </div>

        <div className="relative z-30 max-w-container-max mx-auto w-full">
          <div className="max-w-3xl">
            <h1 className="font-plus-jakarta font-extrabold text-5xl md:text-7xl mb-6 text-white leading-tight">
              Let's Make Your <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-[#731be5] text-transparent bg-clip-text gradient-span">Event Unforgettable</span>
            </h1>
            <p className="font-inter text-lg md:text-xl text-white/90 leading-relaxed mb-8">
              Whether it's a high-profile corporate gala or a private celebration, Mirror Mirror brings cutting-edge luxury photography to Qatar. Reach out to secure your date.
            </p>
            <button 
              onClick={() => {
                document.getElementById('inquiry-form').scrollIntoView({ behavior: 'smooth' });
              }}
              className="gradient-bg text-white font-inter font-bold text-base py-4 px-10 rounded-full hover:shadow-xl transition-all"
            >
              Start Your Inquiry
            </button>
          </div>
        </div>
      </section>

      <main id="inquiry-form" className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-24 w-full">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Contact Details & Map */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <h2 className="font-plus-jakarta font-bold text-3xl text-on-surface">Get in Touch</h2>
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
                <div 
                  className="w-full h-full bg-cover bg-center" 
                  style={{
                    backgroundImage: "url('/img/telephoneBooth.jpg')"
                  }}
                ></div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-2xl flex justify-between items-center translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white">
                <div>
                  <p className="font-inter font-bold text-sm text-on-surface">Al Hilal District</p>
                  <p className="text-xs text-on-surface-variant mt-1">Doha, Qatar</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 md:p-12 rounded-[40px] shadow-sm relative overflow-hidden border border-outline-variant/30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <h2 className="font-plus-jakarta font-bold text-3xl mb-8 text-on-surface">Inquiry Form</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-inter font-bold text-[10px] tracking-widest text-on-surface-variant uppercase ml-1">Full Name</label>
                      <input
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        required
                        className="w-full h-14 px-6 rounded-2xl bg-white border border-outline-variant/50 focus:ring-0 transition-all text-on-surface"
                        placeholder="John Doe"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-inter font-bold text-[10px] tracking-widest text-on-surface-variant uppercase ml-1">Email Address</label>
                      <input
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        required
                        className="w-full h-14 px-6 rounded-2xl bg-white border border-outline-variant/50 focus:ring-0 transition-all text-on-surface"
                        placeholder="john@company.com"
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-inter font-bold text-[10px] tracking-widest text-on-surface-variant uppercase ml-1">Event Type</label>
                      <select
                        value={formState.eventType}
                        onChange={(e) => setFormState({ ...formState, eventType: e.target.value })}
                        className="w-full h-14 px-6 rounded-2xl bg-white border border-outline-variant/50 focus:ring-0 transition-all appearance-none cursor-pointer text-on-surface"
                      >
                        <option>Corporate Gala</option>
                        <option>Private Wedding</option>
                        <option>Launch Event</option>
                        <option>Other Celebration</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="font-inter font-bold text-[10px] tracking-widest text-on-surface-variant uppercase ml-1">Event Date</label>
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
                    <label className="font-inter font-bold text-[10px] tracking-widest text-on-surface-variant uppercase ml-1">Location / Venue</label>
                    <input
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      required
                      className="w-full h-14 px-6 rounded-2xl bg-white border border-outline-variant/50 focus:ring-0 transition-all text-on-surface"
                      placeholder="Ritz-Carlton, Doha"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-inter font-bold text-[10px] tracking-widest text-on-surface-variant uppercase ml-1">Guest Count (Estimated)</label>
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
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-inter font-bold text-[10px] tracking-widest text-on-surface-variant uppercase ml-1">Tell Us About Your Vision</label>
                    <textarea
                      value={formState.vision}
                      onChange={(e) => setFormState({ ...formState, vision: e.target.value })}
                      required
                      className="w-full p-6 rounded-2xl bg-white border border-outline-variant/50 focus:ring-0 transition-all text-on-surface"
                      placeholder="Share any specific details or themes for your photo wall experience..."
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
                      ? "Sending..."
                      : submitStatus === "success"
                      ? "Request Sent!"
                      : "SUBMIT INQUIRY"}
                  </button>
                  <p className="text-center text-xs text-on-surface-variant opacity-70">
                    Typical response time: within 4 business hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-24">
          <div className="text-center mb-16">
            <h2 className="font-plus-jakarta font-bold text-4xl mb-4 text-on-surface">Frequently Asked Questions</h2>
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
