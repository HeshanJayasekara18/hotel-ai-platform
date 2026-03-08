"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, MapPin, Star, Wind } from "lucide-react";

/* ── Animated counter ─────────────────────────────────────── */
function StatCard({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-1 border-l border-white/10 pl-6"
    >
      <span
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </span>
      <span className="text-xs tracking-[0.2em] uppercase text-white/40 font-medium">
        {label}
      </span>
    </motion.div>
  );
}

/* ── Main Section ─────────────────────────────────────────── */
export default function Section2() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax for the image panel
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  // Left column slides in from left
  const leftX = useTransform(scrollYProgress, [0, 0.5], ["-60px", "0px"]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#111] text-white overflow-hidden min-h-screen"
    >
      {/* Subtle grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Top separator line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-px bg-white/10 origin-left"
      />

      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* ── LEFT: Editorial Content ──────────────────────── */}
        <motion.div
          style={{ x: leftX, opacity: leftOpacity }}
          className="flex flex-col justify-between px-8 md:px-14 lg:px-20 py-20 lg:py-28"
        >
          {/* Label pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-1.5 w-fit mb-12 backdrop-blur-sm"
          >
            <MapPin className="w-3 h-3 text-white/50" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/50 font-medium">
              Terra Resort — Est. 2019
            </span>
          </motion.div>

          {/* Oversized editorial heading */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="overflow-hidden mb-4">
              <motion.p
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-6"
              >
                Our Story
              </motion.p>
            </div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold tracking-tighter text-white uppercase leading-[0.88]"
                style={{ fontSize: "clamp(3.5rem, 7vw, 8rem)" }}
              >
                Where
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold tracking-tighter uppercase leading-[0.88]"
                style={{
                  fontSize: "clamp(3.5rem, 7vw, 8rem)",
                  WebkitTextStroke: "1px rgba(255,255,255,0.25)",
                  color: "transparent",
                }}
              >
                Nature
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, delay: 0.19, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold tracking-tighter text-white uppercase leading-[0.88]"
                style={{ fontSize: "clamp(3.5rem, 7vw, 8rem)" }}
              >
                Meets
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold tracking-tighter uppercase leading-[0.88]"
                style={{
                  fontSize: "clamp(3.5rem, 7vw, 8rem)",
                  WebkitTextStroke: "1px rgba(255,255,255,0.25)",
                  color: "transparent",
                }}
              >
                Luxury
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 text-sm md:text-base text-white/40 leading-relaxed max-w-sm font-light"
            >
              Perched above the coast where ridge meets horizon, Terra is more than
              a retreat — it is an encounter with the elemental. Handcrafted stone,
              open sky, and the quiet pulse of the ocean define every moment here.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex items-center gap-6"
            >
              <button className="group flex items-center gap-2 bg-white text-black text-xs tracking-[0.2em] uppercase font-semibold px-7 py-4 rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-[1.03]">
                Discover More
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button className="text-xs tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors duration-300 font-medium">
                Our Story →
              </button>
            </motion.div>
          </div>

          {/* Stats Row */}
          <div className="mt-16 pt-10 border-t border-white/8 grid grid-cols-3 gap-4 md:gap-8">
            <StatCard value="5★" label="Rating" delay={0.1} />
            <StatCard value="42" label="Suites" delay={0.2} />
            <StatCard value="∞" label="Views" delay={0.3} />
          </div>
        </motion.div>

        {/* ── RIGHT: Image Panel ───────────────────────────── */}
        <div className="relative overflow-hidden lg:min-h-full min-h-[50vh]">
          {/* Parallax image */}
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-[-8%] w-[116%] h-[116%]"
          >
            <img
              src="/img/HeroUpLayer.png"
              alt="Terra landscape"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 40%" }}
            />
            {/* Dark gradient overlays */}
            <div className="absolute inset-0 bg-linear-to-r from-[#111] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-[#111] via-[#111]/20 to-transparent" />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>

          {/* Floating info card */}
          <motion.div
            initial={{ opacity: 0, y: 30, x: 20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-10 right-8 md:bottom-14 md:right-12 z-20 border border-white/10 backdrop-blur-xl bg-white/4 rounded-2xl px-6 py-5 flex flex-col gap-3 max-w-50"
          >
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-white text-white" />
              ))}
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              "An unforgettable stay above the clouds."
            </p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium">
              — Guest Review
            </p>
          </motion.div>

          {/* Floating ambient badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-10 left-8 md:top-14 md:left-12 z-20 border border-white/10 backdrop-blur-xl bg-white/4 rounded-full p-4 flex items-center gap-3"
          >
            <Wind className="w-4 h-4 text-white/50" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 pr-1">
              Ocean Breeze
            </span>
          </motion.div>

          {/* Decorative circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute right-[-10%] top-[-10%] w-[50vw] h-[50vw] max-w-100 max-h-100 border border-white/4 rounded-full pointer-events-none z-10"
          />
        </div>
      </div>

      {/* Bottom separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-px bg-white/10 origin-right"
      />
    </section>
  );
}
