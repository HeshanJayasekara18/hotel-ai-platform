"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Compass, BookOpen, Star, ArrowRight } from "lucide-react";

const stats = [
  { value: "42+", label: "Private Suites" },
  { value: "5★", label: "Rated Experience" },
  { value: "12+", label: "Years Crafted" },
];

const features = [
  {
    icon: Compass,
    title: "Curated Escapes",
    desc: "Every stay is tailored to your rhythm — from arrival to the last sunrise over the cliff.",
    hoverImage: "/img/sec3_card1.png",
  },
  {
    icon: BookOpen,
    title: "Expert Concierge",
    desc: "Our team crafts bespoke itineraries, private tours, and sea experiences on demand.",
    hoverImage: "/img/sec3_card2.png",
  },
  {
    icon: Star,
    title: "Seamless Booking",
    desc: "Reserve your suite, activities and dining in one place. Effortless from start to finish.",
    hoverImage: "/img/sec3_card3.png",
  },
];

const cards = [
  { image: "/img/sec3_card1.png", rotate: "-rotate-6", z: "z-10", top: "top-0" },
  { image: "/img/sec3_card2.png", rotate: "rotate-0",  z: "z-20", top: "top-10" },
  { image: "/img/sec3_card3.png", rotate: "rotate-6",  z: "z-10", top: "top-20" },
];

export default function Section3() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Dual-video seamless 1s crossfade loop logic
  const v1Ref = useRef<HTMLVideoElement>(null);
  const v2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

  useEffect(() => {
    if (v1Ref.current) v1Ref.current.playbackRate = 1.0;
    if (v2Ref.current) v2Ref.current.playbackRate = 1.0;
  }, []);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>, selfId: 1 | 2) => {
    const vid = e.currentTarget;
    // Crossfade 1 second before end
    if (vid.duration > 0 && vid.duration - vid.currentTime <= 1.0 && activeVideo === selfId) {
      const nextId = selfId === 1 ? 2 : 1;
      const nextVid = selfId === 1 ? v2Ref.current : v1Ref.current;
      if (nextVid) {
        nextVid.currentTime = 0;
        nextVid.play().catch(() => {});
        setActiveVideo(nextId);
      }
    }
  };

  return (
    <section ref={ref} className="relative w-full bg-[#111] text-white overflow-hidden z-10">

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Background videos — Seamless 1s Crossfade Loop */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#111]">
        <video
          ref={v1Ref}
          src="/videos/Stable_Drone_Footage_of_Sea_Waves.mp4"
          autoPlay
          muted
          playsInline
          onTimeUpdate={(e) => handleTimeUpdate(e, 1)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            activeVideo === 1 ? "opacity-100" : "opacity-0"
          }`}
        />
        <video
          ref={v2Ref}
          src="/videos/Stable_Drone_Footage_of_Sea_Waves.mp4"
          muted
          playsInline
          onTimeUpdate={(e) => handleTimeUpdate(e, 2)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            activeVideo === 2 ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Dark overlay to keep content legible */}
        <div className="absolute inset-0 bg-[#111]/80" />
        {/* Subtle vignette edge fading */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-[#111]/60" />
      </div>

      {/* ── TOP: Cards + Right content ─────────────────────── */}
      <div className="relative z-10 px-8 md:px-14 lg:px-20 pt-48 pb-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-center">

          {/* Left: overlapping image stack */}
          <div className="relative shrink-0 w-full max-w-sm lg:max-w-none lg:w-[42%] h-80 md:h-96 lg:h-105">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                animate={inView ? { opacity: 1, y: 0, rotate: parseInt(card.rotate) || 0 } : {}}
                whileHover={{
                  y: -16,
                  scale: 1.06,
                  rotate: 0,
                  zIndex: 30,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute rounded-3xl overflow-hidden shadow-xl cursor-pointer ${card.rotate}`}
                style={{ left: `${i * 14}%`, top: `${i * 8}%`, width: "clamp(160px, 18vw, 260px)", height: "clamp(220px, 28vw, 340px)" }}
              >
                <img src={card.image} alt={`Terra experience ${i + 1}`} className="w-full h-full object-cover" />
                {/* Hover overlay shimmer */}
                <motion.div
                  className="absolute inset-0 bg-white/0 hover:bg-white/8 transition-colors duration-300"
                />
              </motion.div>
            ))}
          </div>

          {/* Right: heading + stats */}
          <div className="flex-1 flex flex-col gap-8">

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-semibold">About Terra</span>
              <div className="w-10 h-px bg-amber-500" />
            </motion.div>

            {/* Heading */}
            <div className="overflow-hidden">
              {["We Craft", "Extraordinary", "Cliff Stays"].map((line, i) => (
                <div key={line} className="overflow-hidden">
                  <motion.h2
                    initial={{ y: "100%" }}
                    animate={inView ? { y: "0%" } : {}}
                    transition={{ duration: 1, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="font-bold tracking-tighter text-white uppercase leading-[0.92]"
                    style={{ fontSize: "clamp(2rem, 4.5vw, 5rem)" }}
                  >
                    {line}
                  </motion.h2>
                </div>
              ))}
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-white/45 leading-relaxed font-light max-w-md"
            >
              Choose your moments here. We provide bespoke experiences crafted for those who seek the extraordinary — perched above the Atlantic coast, every week.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-8 pt-4 border-t border-white/10"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-3xl md:text-4xl font-bold tracking-tighter text-white">{stat.value}</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-medium">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Thin divider */}
      <div className="mx-8 md:mx-14 lg:mx-20 h-px bg-white/10" />

      {/* ── BOTTOM: Features grid ──────────────────────────── */}
      <div className="relative z-10 px-8 md:px-14 lg:px-20 pt-16 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left label */}
          <div className="lg:w-64 xl:w-72 shrink-0 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-semibold">What We Give</span>
              <div className="w-10 h-px bg-amber-500" />
            </div>
            <div className="overflow-hidden">
              <motion.h3
                initial={{ y: "100%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold tracking-tighter text-white uppercase leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)" }}
              >
                Best Features For You
              </motion.h3>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="text-sm text-white/45 leading-relaxed font-light max-w-xs"
            >
              We will provide the best features for those who want to travel comfortably with their family.
            </motion.p>
          </div>

          {/* Right: feature cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col gap-3 group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Hover image popup */}
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      key="popup"
                      initial={{ opacity: 0, scale: 0.82, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.88, y: 8 }}
                      transition={{ type: "spring", stiffness: 320, damping: 24 }}
                      className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-52 h-36 rounded-2xl overflow-hidden shadow-2xl z-50 border-2 border-white pointer-events-none"
                    >
                      <img src={feat.hoverImage} alt={feat.title} className="w-full h-full object-cover" />
                      {/* subtle label */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent flex items-end p-3">
                        <span className="text-white text-[10px] tracking-[0.2em] uppercase font-semibold">{feat.title}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="w-12 h-12 rounded-xl bg-white/8 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-300">
                  <feat.icon className="w-5 h-5 text-amber-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-base font-semibold tracking-tight text-white">{feat.title}</h4>
                <p className="text-sm text-white/45 leading-relaxed font-light">{feat.desc}</p>
                <button className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-amber-500 font-semibold mt-1 group-hover:gap-3 transition-all duration-300">
                  Learn More <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
