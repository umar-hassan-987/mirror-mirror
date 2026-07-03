"use client";

import Link from "next/link";
import { Cpu, Zap, Fingerprint, Sparkles, ArrowRight } from "lucide-react";

export default function About() {
  const bentoItems = [
    {
      type: "large",
      icon: <Cpu className="w-8 h-8 text-primary" />,
      title: "AI-Driven Post Processing",
      desc: "Every image is instantly optimized using our custom neural network, ensuring studio-quality results in milliseconds, regardless of venue lighting.",
      image: "/img/mirror.jpg",
      alt: "Futuristic digital interface showing AI image enhancement processes in magenta and violet"
    },
    {
      type: "small",
      icon: <Zap className="w-8 h-8 text-secondary" />,
      title: "Instant Cloud Sync",
      desc: "Guests receive their high-resolution content via secure QR code within 3 seconds of capture, ready for global sharing."
    },
    {
      type: "small",
      icon: <Fingerprint className="w-8 h-8 text-tertiary" />,
      title: "Haptic Interactivity",
      desc: "4K touch-sensitive surfaces allow for live digital signatures and custom emoji placements directly on the mirror surface."
    },
    {
      type: "large-row",
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Custom AR Filters",
      desc: "Bespoke augmented reality overlays designed specifically for your brand or event theme, created by our in-house motion designers.",
      image: "/img/branding.png",
      alt: "People interacting with giant mirror using golden AR filters in luxury Qatari venue"
    }
  ];

  const timeline = [
    { year: "2018", title: "The Inception", desc: "Founded in Doha with our first flagship 'Reflect One' mirror unit.", color: "primary" },
    { year: "2020", title: "Digital Pivot", desc: "Launched contactless 'Aura' capture to serve the luxury market during changing times.", color: "secondary" },
    { year: "2022", title: "World Stage", desc: "Official technology partner for three major international sporting venues in Qatar.", color: "tertiary" },
    { year: "2024", title: "Mirror Mirror Pro", desc: "Introducing AI-synthesized backgrounds and large-scale architectural integration.", color: "primary-container" }
  ];

  const team = [
    {
      name: "Ahmed Al-Thani",
      role: "Founder & CEO",
      image: "/img/photographer.jpg",
      alt: "Ahmed Al-Thani CEO Portrait"
    },
    {
      name: "Sarah Jenkins",
      role: "Creative Director",
      image: "/img/polaroid-book.png",
      alt: "Sarah Jenkins Creative Director Portrait"
    },
    {
      name: "Dr. Leo Chen",
      role: "Lead Software Engineer",
      image: "/img/mirror-booth.png",
      alt: "Dr. Leo Chen Lead Engineer Portrait"
    },
    {
      name: "Nadia Mahmoud",
      role: "Head of Operations",
      image: "/img/audio-booth.png",
      alt: "Nadia Mahmoud Operations Portrait"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-start overflow-hidden px-margin-mobile md:px-gutter w-full">
        {/* Background Image with Premium Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/img/photobook.jpg" 
            alt="Luxury social event background" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hero-overlay/10 to-hero-overlay z-20"></div>
        </div>

        <div className="relative z-30 max-w-container-max mx-auto w-full">
          <div className="max-w-3xl">
            <h1 className="font-plus-jakarta font-extrabold text-5xl md:text-7xl mb-6 text-white leading-tight">
              Redefining <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-[#731be5] text-transparent bg-clip-text gradient-span">Reflection</span> in Doha.
            </h1>
            <p className="font-inter text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
              Mirror Mirror Photowall Qatar is the state's premier event technology partner, blending interactive digital art with luxury hospitality to create unforgettable visual narratives.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-5 py-2.5 bg-white/10 border border-white/20 text-white rounded-none font-inter font-bold text-xs uppercase tracking-wider">Est. 2018</div>
              <div className="px-5 py-2.5 bg-white/10 border border-white/20 text-white rounded-none font-inter font-bold text-xs uppercase tracking-wider">500+ Events</div>
              <div className="px-5 py-2.5 bg-white/10 border border-white/20 text-white rounded-none font-inter font-bold text-xs uppercase tracking-wider">Innovation Award '23</div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="rounded-none overflow-hidden shadow-2xl border border-outline-variant/10">
                <img
                  className="w-full h-[450px] object-cover"
                  alt="Luxury event space in Doha with floor-to-ceiling interactive screens reflecting elegant guests"
                  src="/img/photographer.jpg"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <span className="font-inter font-bold text-primary uppercase tracking-widest text-xs mb-4 block">Our Mission</span>
              <h2 className="font-plus-jakarta font-bold text-3xl md:text-4xl mb-6 text-on-surface leading-tight">Capturing the Pulse of Qatar's Finest Moments.</h2>
              <p className="font-inter text-base text-on-surface-variant mb-6 leading-relaxed">
                Born from a passion for both technology and human connection, Mirror Mirror set out to transform the traditional photo booth into a high-tech masterpiece. We don't just take photos; we create digital canvases where guests become the art.
              </p>
              <p className="font-inter text-base text-on-surface-variant leading-relaxed">
                Our mission is to elevate Qatar's social landscape by providing immersive technology that sparks conversation, enhances brand identity, and preserves memories in stunning high-definition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid (Technology) */}
      <section className="py-24 bg-surface-container-low w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center mb-16">
            <h2 className="font-plus-jakarta font-bold text-4xl mb-4 text-on-surface">The Magic Behind the Glass</h2>
            <p className="font-inter text-base text-on-surface-variant max-w-2xl mx-auto">Our proprietary technology stack delivers seamless interactivity and gallery-grade visual output.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Item 1 */}
            <div className="md:col-span-2 bg-surface p-8 rounded-none border border-outline-variant/30 flex flex-col justify-between hover:border-primary/50 transition-colors group shadow-sm">
              <div>
                <div className="mb-4 w-12 h-12 bg-surface-container-high flex items-center justify-center rounded-none">
                  {bentoItems[0].icon}
                </div>
                <h3 className="font-plus-jakarta font-bold text-2xl mb-2 text-on-surface">{bentoItems[0].title}</h3>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">{bentoItems[0].desc}</p>
              </div>
              <div className="mt-8 h-48 rounded-none overflow-hidden relative border border-outline-variant/10">
                <img className="w-full h-full object-cover" alt={bentoItems[0].alt} src={bentoItems[0].image} />
              </div>
            </div>
            {/* Bento Item 2 */}
            <div className="bg-surface p-8 rounded-none border border-outline-variant/30 hover:border-primary/50 transition-colors flex flex-col text-center items-center justify-center shadow-sm">
              <div className="mb-6 w-16 h-16 bg-surface-container-high flex items-center justify-center rounded-none">
                {bentoItems[1].icon}
              </div>
              <h3 className="font-plus-jakarta font-bold text-2xl mb-4 text-on-surface">{bentoItems[1].title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{bentoItems[1].desc}</p>
            </div>
            {/* Bento Item 3 */}
            <div className="bg-surface p-8 rounded-none border border-outline-variant/30 hover:border-primary/50 transition-colors shadow-sm flex flex-col justify-between">
              <div className="mb-4 w-12 h-12 bg-surface-container-high flex items-center justify-center rounded-none">
                {bentoItems[2].icon}
              </div>
              <div>
                <h3 className="font-plus-jakarta font-bold text-xl mb-2 text-on-surface">{bentoItems[2].title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{bentoItems[2].desc}</p>
              </div>
            </div>
            {/* Bento Item 4 */}
            <div className="md:col-span-2 bg-surface p-8 rounded-none border border-outline-variant/30 flex flex-col md:flex-row gap-8 items-center hover:border-primary/50 transition-colors shadow-sm">
              <div className="flex-1">
                <div className="mb-4 w-12 h-12 bg-surface-container-high flex items-center justify-center rounded-none">
                  {bentoItems[3].icon}
                </div>
                <h3 className="font-plus-jakarta font-bold text-2xl mb-2 text-on-surface">{bentoItems[3].title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{bentoItems[3].desc}</p>
              </div>
              <div className="w-full md:w-48 h-48 rounded-none overflow-hidden shrink-0 border border-outline-variant/10">
                <img className="w-full h-full object-cover" alt={bentoItems[3].alt} src={bentoItems[3].image} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 overflow-hidden w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <h2 className="font-plus-jakarta font-bold text-4xl mb-16 text-center text-on-surface">Our Journey in Qatar</h2>
          <div className="relative max-w-4xl mx-auto">
            {/* Center line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-outline-variant/30 -translate-x-1/2"></div>
            {timeline.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`relative mb-20 flex flex-col md:flex-row items-center group ${isEven ? "" : "md:flex-row-reverse"}`}>
                  <div className={`w-full md:w-1/2 ${isEven ? "pr-0 md:pr-16 text-left md:text-right" : "pl-0 md:pl-16 text-left"}`}>
                    <span className="font-plus-jakarta font-extrabold text-4xl md:text-5xl gradient-text block mb-2">{item.year}</span>
                    <h4 className="font-plus-jakarta font-bold text-2xl mb-2 text-on-surface">{item.title}</h4>
                    <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300"></div>
                  <div className="w-full md:w-1/2 hidden md:block"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-surface-bright border-t border-outline-variant/20 w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="font-plus-jakarta font-bold text-4xl mb-4 text-on-surface">Meet the Visionaries</h2>
              <p className="font-inter text-md text-on-surface-variant">A multidisciplinary team of engineers, designers, and event specialists dedicated to excellence.</p>
            </div>
            <Link
              href="/contact"
              className="px-8 py-3.5 border-2 border-primary text-primary rounded-none font-inter font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300 w-fit flex items-center gap-2"
            >
              Join Our Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group">
                <div className="aspect-[3/4] rounded-none overflow-hidden mb-4 relative shadow-sm border border-outline-variant/10">
                  <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    alt={member.alt}
                    src={member.image}
                  />
                </div>
                <h4 className="font-inter font-bold text-md text-on-surface mb-1">{member.name}</h4>
                <p className="text-xs text-on-surface-variant font-semibold tracking-wide uppercase">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
