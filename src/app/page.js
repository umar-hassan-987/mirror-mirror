"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowRight, Play, Camera, Video, Mic, PenTool, Gift, Star, 
  ArrowUpRight, Phone, Mail, Loader2, Check, Sparkles, Heart, Printer,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero/Hero";

export default function Home() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle, sending, success
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: "branding",
      name: "Event Branding & Personalization",
      title: "Why Choose Us for Branding & Personalization?",
      description: "At Mirror, Mirror Photowall Qatar, we go beyond photography—we create experiences. Our team blends creativity and passion to ensure every event is memorable, engaging, and truly unique.",
      points: [
        "Creative, interactive, and memorable experiences",
        "All-in-one services under one roof",
        "Fully customized solutions for every event",
        "Expertise in weddings",
        "Parties & corporate activations",
        "Qatar-based with international quality"
      ],
      mediaType: "video",
      mediaSrc: "/vid/vedios/short2.mp4"
    },
    {
      id: "photo-video",
      name: "Photography & Videography",
      title: "PHOTOGRAPHY & VIDEOGRAPHY",
      description: "Capturing candid emotions, cinematic highlight reels, and high-fidelity photos. We use industry-leading cameras, expert styling, and professional editing to preserve every memory in stunning clarity.",
      points: [
        "High-definition cinematic videography",
        "Candid and posed event photography",
        "State-of-the-art lighting and sound captures",
        "High-speed digital gallery delivery links",
        "Custom photo album layouts & books",
        "Expert post-production creative styling"
      ],
      mediaType: "video",
      mediaSrc: "/vid/vedios/short4.mp4"
    },
    {
      id: "mirror-booth",
      name: "Interactive Mirror Photobooths",
      title: "MIRROR BOOTH",
      description: "We’re proud to have been part of countless weddings, private celebrations, and corporate events across Qatar. Every smile, every laugh, and every captured moment reflects the trust our clients place in us.",
      points: [
        "Interactive full-length touchscreen mirror",
        "DSLR-quality captures for pristine prints",
        "Custom animations, overlays, and templates",
        "Instant printouts in under 10 seconds",
        "Instant digital sharing via QR, email, or SMS",
        "Curated premium props and signature options"
      ],
      mediaType: "video",
      mediaSrc: "/vid/vedios/short1.mp4"
    }
  ];

  const stats = [
    { val: "100%", lbl: "CUSTOMER SATISFACTION" },
    { val: "350+", lbl: "SESSIONS COMPLETED" },
    { val: "50%", lbl: "EXPERIENCED PHOTOGRAPHERS" },
    { val: "250+", lbl: "EVENTS COVERED" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus("sending");
    setTimeout(() => {
      setSubmitStatus("success");
      setTimeout(() => {
        setFormState({ name: "", email: "", phone: "", message: "" });
        setSubmitStatus("idle");
      }, 3000);
    }, 1500);
  };

  const services = [
    {
      name: "MIRROR PHOTO BOOTH",
      icon: <Camera className="w-5 h-5 text-primary" />,
      desc: "An interactive full-length touchscreen mirror with DSLR photography, instant prints, and digital sharing. Complete with props, backdrops, and on-site assistance for a fun experience.",
      image: "/img/mirror.jpg"
    },
    {
      name: "AUDIO & VIDEO TELEPHONE BOOTH",
      icon: <Phone className="w-5 h-5 text-secondary" />,
      desc: "Vintage-style booths where guests record heartfelt audio and video messages. Delivered as a personalized album to relive forever.",
      image: "/img/audio-booth.png"
    },
    {
      name: "POLAROID GUEST LIST PHOTO BOOK",
      icon: <Heart className="w-5 h-5 text-tertiary" />,
      desc: "Guests snap instant Polaroid photos and leave personal notes. A unique keepsake filled with love and memories.",
      image: "/img/photobook.jpg"
    },
    {
      name: "BRANDING COLLATERALS",
      icon: <Gift className="w-5 h-5 text-primary" />,
      desc: "Custom tote bags, t-shirts, caps, and giveaways. Stylish branded souvenirs that reflect your theme or identity.",
      image: "/img/branding.png"
    },
    {
      name: "VIDEOGRAPHY",
      icon: <Video className="w-5 h-5 text-secondary" />,
      desc: "Cinematic highlight reels and full-length event coverage. Creative editing brings every celebration to life on film.",
      image: "/img/videography.png"
    },
    {
      name: "PHOTOGRAPHY",
      icon: <Camera className="w-5 h-5 text-tertiary" />,
      desc: "Professional event photography with candid, posed, and highlight shots. Online galleries and albums keep memories preserved beautifully.",
      image: "/img/photographer.jpg"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-background">
      <Hero />

      {/* Services Section */}
      <section id="homepage-next-section" className="pt-32 pb-20 px-margin-mobile max-w-container-max mx-auto w-full">
        <div className="flex flex-col items-start mb-16 max-w-3xl">
          <h2 className="font-plus-jakarta font-bold text-4xl md:text-5xl lg:text-6xl text-on-surface leading-tight tracking-tight mb-6">
            Experiences That Engage, <br className="hidden md:block" />
            <span className="gradient-text italic font-extrabold pr-2">Memories That Last</span>
          </h2>
          <p className="text-on-surface-variant font-inter text-base md:text-lg max-w-2xl leading-relaxed">
            Elevate your event with our premium interactive photo and video experiences designed for modern celebrations in Doha.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 grid-flow-row-dense">
          {services.map((item, idx) => {
            let spanClass = "col-span-1 row-span-1 aspect-square";
            if (idx === 0) spanClass = "col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-2 aspect-[4/5] lg:aspect-auto"; // Tall
            else if (idx === 3) spanClass = "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 aspect-video lg:aspect-[2/1]"; // Wide
            else if (idx === 4) spanClass = "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 aspect-video lg:aspect-[2/1]"; // Wide

            return (
              <div key={idx} className={`group relative overflow-hidden bg-black ${spanClass} cursor-pointer`}>
                <img 
                  src={item.image} 
                  alt={item.name} 
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
                  className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform rotate-45 group-hover:rotate-0 transition-all duration-500 hover:bg-white hover:text-black"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Narrative Section 1: Who We Are (Brand Manifesto) */}
      <section className="py-32 md:py-48 bg-black w-full border-t border-gray-900 relative overflow-hidden flex items-center justify-center min-h-[70vh]">
        {/* Background Video with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <video 
            src="/vid/whoweare.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-0"></div>
        <div className="absolute inset-0 bg-black/20 z-0 backdrop-blur-[2px]"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-gutter relative z-10 text-center flex flex-col items-center">
          <span className="px-5 py-2 rounded-none border border-white/20 text-white font-inter font-bold uppercase tracking-widest text-[10px] bg-black/50 backdrop-blur-md inline-block mb-8">
            Every event a lasting memory
          </span>
          <h2 className="font-plus-jakarta font-bold text-5xl md:text-7xl text-white leading-tight mb-8 tracking-tight">
            Who We <span className="gradient-text font-extrabold italic">Are</span>
          </h2>
          <p className="font-inter text-lg md:text-2xl text-white leading-relaxed max-w-3xl mx-auto drop-shadow-md font-medium">
            At <strong className="text-white font-extrabold">Mirror Mirror Photowall Qatar</strong>, we believe every event deserves to be more than an occasion, it should be a celebration of joy, connection, and unforgettable memories.
          </p>
        </div>
      </section>

      {/* Narrative Section 2: Interactive Services Overview */}
      <section className="py-24 bg-gray-50 w-full border-t border-b border-gray-200 relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
          
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Column: Interactive Accordions */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-10">
              <div className="space-y-4">
                <h3 className="font-plus-jakarta font-bold text-3xl md:text-4xl text-black">
                  Our <span className="gradient-text italic">Experiences</span>
                </h3>
                <p className="font-inter text-gray-600 text-sm md:text-base">
                  Explore our premium offerings designed to elevate your celebrations across Qatar.
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
                        className={`px-3 py-2 font-plus-jakarta font-bold text-xs tracking-wider uppercase transition-all duration-300 relative rounded-none ${
                          isActive 
                            ? "text-black font-extrabold" 
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {tab.name}
                        {isActive && (
                          <motion.div 
                            layoutId="activeTabUnderline"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary"
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
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={tabs[activeTab].mediaSrc} 
                      alt={tabs[activeTab].title} 
                      className="w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"></div>
                  
                  {/* Status badge */}
                  {tabs[activeTab].mediaType === "video" && (
                    <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/75 backdrop-blur-sm text-secondary font-inter font-bold text-[9px] uppercase tracking-wider flex items-center gap-1.5 border border-secondary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                      Video Loop
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Stats Bar */}
          <div className="mt-20 pt-8 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="font-plus-jakarta font-extrabold text-3xl text-black">{stat.val}</p>
                <p className="font-inter text-xs text-gray-500 uppercase tracking-wider">{stat.lbl}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Explore Our Work (Projects) Section */}
      <section className="py-32 px-margin-mobile max-w-container-max mx-auto w-full bg-white relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="px-4 py-1.5 border border-black/10 text-black font-inter font-bold uppercase tracking-widest text-xs bg-gray-50 inline-block mb-4">
              Portfolio
            </span>
            <h2 className="font-plus-jakarta font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-black tracking-tight">
              Explore Our <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-600 font-inter text-md md:text-lg max-w-2xl leading-relaxed">
              Discover a gallery of our high-profile events, custom installations, and unforgettable memories captured across Qatar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {[
            { title: "The Royal Gala", type: "Wedding", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80" },
            { title: "Tech Summit '24", type: "Corporate", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" },
            { title: "VIP Reception", type: "Launch", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80" },
            { title: "Neon Birthday", type: "Private Party", image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80" },
            { title: "Behind The Scenes", type: "Studio Setup", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80" },
            { title: "Custom Photo Wall", type: "Activation", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80" },
          ].map((proj, idx) => (
            <div 
              key={idx}
              className="relative group overflow-hidden bg-black aspect-square"
            >
              <img
                className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:opacity-50 transition-all duration-700 ease-in-out"
                alt={proj.title}
                src={proj.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <span className="text-secondary text-[10px] uppercase font-inter font-bold tracking-widest mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {proj.type}
                </span>
                <h3 className="text-white font-plus-jakarta font-bold text-2xl md:text-3xl tracking-tight">{proj.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Link
            href="/portfolio"
            className="px-12 py-5 bg-black text-white hover:bg-gray-900 rounded-none font-inter font-bold text-sm tracking-widest uppercase transition-colors shadow-2xl"
          >
            View More
          </Link>
        </div>
      </section>

      {/* Featured Testimonial Banner Section */}
      <section className="py-24 px-margin-mobile max-w-container-max mx-auto w-full">
        <div className="relative overflow-hidden bg-black p-8 md:p-12 lg:p-16 shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Testimonial Content */}
            <div className="flex-1 space-y-8">
              {/* Rating */}
              <div className="flex gap-1 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current text-primary" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="font-plus-jakarta font-bold text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed tracking-tight">
                "The mirror booth was the absolute highlight of our wedding! Our guests couldn't get enough of it, and the print quality was amazing. Highly recommend!"
              </blockquote>

              {/* Author info */}
              <div>
                <p className="font-plus-jakarta font-extrabold text-xl text-white">Aisha & Omar</p>
                <p className="font-inter text-sm text-secondary uppercase tracking-widest font-bold mt-2">Wedding Couple • Doha, Qatar</p>
              </div>
            </div>

            {/* Featured Photo */}
            <div className="w-full lg:w-[400px] shrink-0">
              <div className="aspect-[4/5] rounded-none overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" 
                  alt="Happy wedding couple guests" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-margin-mobile relative overflow-hidden w-full bg-white border-t border-gray-200" id="contact">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <span className="px-4 py-1.5 border border-black/10 text-black font-inter font-bold uppercase tracking-widest text-xs bg-gray-50 inline-block mb-6">
              Contact Us
            </span>
            <h2 className="font-plus-jakarta font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-black tracking-tight">
              Let's make your <br />
              next event <span className="gradient-text italic">unforgettable.</span>
            </h2>
            <p className="font-inter text-lg text-gray-600 mb-12 leading-relaxed max-w-md">
              Ready to elevate your celebration? Drop us a line and let's design an interactive, premium experience together.
            </p>
          </div>
          <div className="bg-gray-50 p-8 md:p-12 rounded-none border border-gray-200 relative shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="font-inter font-bold text-gray-800 uppercase text-xs tracking-widest">Name</label>
                <input
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 h-12 rounded-none border border-gray-300 bg-white transition-all text-black focus:border-black focus:ring-1 focus:ring-black outline-none"
                  placeholder="John Doe"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="font-inter font-bold text-gray-800 uppercase text-xs tracking-widest">Email Address</label>
                <input
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 h-12 rounded-none border border-gray-300 bg-white transition-all text-black focus:border-black focus:ring-1 focus:ring-black outline-none"
                  placeholder="john@example.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label className="font-inter font-bold text-gray-800 uppercase text-xs tracking-widest">Phone Number</label>
                <input
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 h-12 rounded-none border border-gray-300 bg-white transition-all text-black focus:border-black focus:ring-1 focus:ring-black outline-none"
                  placeholder="+974 7156 7348"
                  type="tel"
                />
              </div>
              <div className="space-y-2">
                <label className="font-inter font-bold text-gray-800 uppercase text-xs tracking-widest">Message</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-none border border-gray-300 bg-white transition-all text-black focus:border-black focus:ring-1 focus:ring-black outline-none"
                  placeholder="Tell us about your event..."
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={submitStatus !== "idle"}
                className={`w-full py-4 rounded-none font-inter font-bold text-lg text-white tracking-widest uppercase transition-all ${
                  submitStatus === "success"
                    ? "gradient-bg text-white"
                    : "bg-black hover:bg-gray-900"
                } flex items-center justify-center gap-2 mt-4`}
              >
                {submitStatus === "sending" && (
                  <Loader2 className="w-5 h-5 animate-spin" />
                )}
                {submitStatus === "success" ? (
                  <>
                    <Check className="w-5 h-5" />
                    Sent Successfully
                  </>
                ) : submitStatus === "sending" ? (
                  "Sending..."
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
