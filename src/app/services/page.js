"use client";

import Link from "next/link";
import { Sparkles, Camera, Video, Mic, Heart, PenTool, CheckCircle, Gift, ArrowRight, Printer } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "mirror-booth",
      name: "MIRROR PHOTO BOOTH",
      icon: <Camera className="w-8 h-8 text-primary" />,
      desc: "An interactive full-length touchscreen mirror with DSLR photography, instant prints, and digital sharing. Complete with props, backdrops, and on-site assistance for a fun experience.",
      image: "/img/mirror-booth.png",
      price: "3,500 QAR",
      duration: "3 Hours Session",
      specs: ["Full length interactive mirror", "DSLR studio-grade camera", "Instant sharing (SMS/QR/Email)", "Friendly on-site hosts", "Fun props & premium templates"]
    },
    {
      id: "audio-video-booth",
      name: "AUDIO & VIDEO TELEPHONE BOOTH",
      icon: <Video className="w-8 h-8 text-secondary" />,
      desc: "Vintage-style booths where guests record heartfelt audio and video messages. Delivered as a personalized album to relive forever.",
      image: "/img/telephoneBooth.jpg",
      price: "2,500 QAR",
      duration: "Full Event",
      specs: ["Vintage rotary & video hardware", "Studio-quality microphone", "Custom host greeting setup", "Raw audio/video file exports", "Bespoke digital album"]
    },
    {
      id: "polaroid-guestbook",
      name: "POLAROID GUEST LIST PHOTO BOOK",
      icon: <Heart className="w-8 h-8 text-tertiary" />,
      desc: "Guests snap instant Polaroid photos and leave personal notes. A unique keepsake filled with love and memories.",
      image: "/img/polaroid-book.png",
      price: "1,800 QAR",
      duration: "Full Event",
      specs: ["Premium Polaroid cameras", "High-quality film packs", "Leather-bound guestbook", "Metallic pens and adhesives", "Attendant to guide guests"]
    },
    {
      id: "branding-collaterals",
      name: "BRANDING COLLATERALS",
      icon: <Gift className="w-8 h-8 text-primary" />,
      desc: "Custom tote bags, t-shirts, caps, and giveaways. Stylish branded souvenirs that reflect your theme or identity.",
      image: "/img/branding.png",
      price: "Custom Quote",
      duration: "Pre-Event Delivery",
      specs: ["High-quality materials", "Full-color custom printing", "Tote bags, shirts, and caps", "Design consultation included", "Bulk order discounts"]
    },
    {
      id: "videography",
      name: "VIDEOGRAPHY",
      icon: <Video className="w-8 h-8 text-secondary" />,
      desc: "Cinematic highlight reels and full-length event coverage. Creative editing brings every celebration to life on film.",
      image: "/img/videography.png",
      price: "6,000 QAR",
      duration: "Full Event Coverage",
      specs: ["Multi-camera setup", "Drone footage (optional)", "Cinematic color grading", "1 min highlight reel for socials", "Full-length edited feature"]
    },
    {
      id: "photography",
      name: "PHOTOGRAPHY",
      icon: <Camera className="w-8 h-8 text-tertiary" />,
      desc: "Professional event photography with candid, posed, and highlight shots. Online galleries and albums keep memories preserved beautifully.",
      image: "/img/photography.png",
      price: "4,500 QAR",
      duration: "Full Event Coverage",
      specs: ["Senior lead photographer", "Candid and posed portraits", "High-end retouching", "Secure online gallery", "Next-day sneak peeks"]
    }
  ];

  const addOns = [
    { name: "Extra Print Station", price: "500 QAR", desc: "Reduces queue times for larger crowds exceeding 200 guests." },
    { name: "Full Screen UI/UX Wrap", price: "800 QAR", desc: "Custom branding design of the Mirror's software interfaces." },
    { name: "Professional Floral Arch", price: "1,200 QAR", desc: "Premium silk flowers framing the backdrop of your choice." },
    { name: "Live Slide Projection", price: "600 QAR", desc: "Project photo captures onto screens across the venue in real-time." }
  ];

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden px-margin-mobile md:px-gutter w-full">
        {/* Background Image with Premium Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/img/mirror.jpg" 
            alt="Mirror mirror photo booth backdrop" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hero-overlay/10 to-hero-overlay z-20"></div>
        </div>

        <div className="relative z-30 max-w-container-max mx-auto w-full">
          <div className="max-w-3xl">
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-pink-300 mb-4 block">
              Tailored Experiences
            </span>
            <h1 className="font-plus-jakarta font-extrabold text-5xl md:text-7xl mb-6 text-white leading-tight">
              Elevate Your Event with <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-[#731be5] text-transparent bg-clip-text gradient-span">Interactive Magic</span>
            </h1>
            <p className="font-inter text-lg md:text-xl text-white/90 leading-relaxed">
              From high-fidelity interactive photography booths to custom physical branding stations, we design memorable activations for Qatar's finest celebrations.
            </p>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-16 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
        <div className="space-y-24">
          {services.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={item.id} 
                className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Showcase */}
                <div className="w-full lg:w-1/2">
                  <div className="rounded-none overflow-hidden shadow-xl border border-outline-variant/20 relative group">
                    <img 
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt={item.name} 
                      src={item.image} 
                    />
                    <div className="absolute top-6 left-6 p-4 glass-card rounded-none border border-white">
                      <p className="font-plus-jakarta font-extrabold text-lg text-primary">{item.price}</p>
                      <p className="text-xs text-on-surface-variant font-semibold mt-0.5">{item.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="w-12 h-12 rounded-none bg-surface-container-high border border-outline-variant/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h2 className="font-plus-jakarta font-bold text-3xl md:text-4xl text-on-surface leading-tight">
                    {item.name}
                  </h2>
                  <p className="font-inter text-base md:text-lg text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                  
                  {/* Specs / Features Checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/30">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#008287] shrink-0" />
                        <span className="font-inter text-sm md:text-base text-on-surface">{spec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center gap-2 gradient-bg text-white font-inter font-semibold py-4 px-8 rounded-none shadow-md hover:shadow-xl active:scale-95 transition-all"
                    >
                      Book Event Setup <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Add-ons & Customization Section */}
      <section className="py-24 bg-surface-container-low border-t border-outline-variant/20 w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-16">
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-primary mb-4 block">Enhancements</span>
            <h2 className="font-plus-jakarta font-bold text-4xl text-on-surface">Premium Add-ons</h2>
            <p className="font-inter text-sm md:text-base text-on-surface-variant mt-2 max-w-xl mx-auto">Customize your activations to fit the exact guest count and visual requirements of your event.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {addOns.map((add, idx) => (
              <div 
                key={idx} 
                className="bg-surface p-8 rounded-none border border-outline-variant/30 hover:border-primary/40 transition-colors flex justify-between gap-6 shadow-sm group"
              >
                <div className="space-y-2">
                  <h4 className="font-plus-jakarta font-bold text-xl text-on-surface group-hover:text-primary transition-colors">{add.name}</h4>
                  <p className="font-inter text-sm text-on-surface-variant leading-relaxed">{add.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-plus-jakarta font-extrabold text-md md:text-lg text-primary">{add.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
