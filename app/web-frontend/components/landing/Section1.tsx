"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Instagram, Send, Search } from "lucide-react";

export default function Section1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div ref={containerRef} className="relative h-svh w-full overflow-hidden bg-[#111] text-white font-sans selection:bg-white/30">

      {/* LAYER 1: Background with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full z-0"
      >
        {/* Bottom gradient merging into background color */}
        <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-transparent z-10 pointer-events-none" />
        {/* Soft top gradient to ensure nav bar contrast against the sky */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-linear-to-b from-black/60 via-black/20 to-transparent z-10 pointer-events-none" />
        
        <img
          src="/img/TERRA.png"
          alt="TERRA Landscape"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* LAYER 2: TERRA title text (between bg and fg) */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-full text-center font-bold tracking-tighter uppercase leading-none top-[45%] sm:top-[40%] lg:top-[25%]"
          style={{
            transform: 'translateY(-50%)',
            background: 'linear-gradient(to bottom, #ffffff 65%, rgba(0,0,0,0.6) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0px 10px 10px rgba(0,0,0,0.4))',
            fontSize: 'clamp(5rem, 28vw, 37vh)',
          }}
        >
          TERRA
        </motion.h1>
      </motion.div>

      {/* LAYER 3: Foreground transparent PNG — sits on top of text */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      >
        <img
          src="/img/HeroUpLayer.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* UI Overlay — social icons + search */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 z-50 flex flex-col justify-end pb-6 px-4 sm:px-8 md:px-12 lg:px-20"
      >
        {/* Bottom bar: social icons left, search right */}
        <div className="flex justify-between items-end w-full">
          
          {/* Social icons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-1 sm:gap-2 bg-white/5 backdrop-blur-3xl border border-white/20 rounded-full p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          >
            <a href="#" aria-label="Send" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex justify-center items-center hover:bg-white/20 transition-all duration-300 md:group">
              <Send className="w-4 h-4 sm:w-4 sm:h-4 text-white group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" aria-label="Instagram" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex justify-center items-center hover:bg-white/20 transition-all duration-300 md:group">
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
            </a>
          </motion.div>

        </div>

        {/* Decorative circles — hidden on mobile to reduce clutter */}
        <div className="hidden md:block pointer-events-none">
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
            className="absolute left-[-10%] bottom-[-10%] w-[30vw] h-[30vw] max-w-100 max-h-100 border border-white/5 rounded-full mix-blend-screen"
          />
          <motion.div 
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 2.5, delay: 0.4, ease: "easeOut" }}
            className="absolute left-[-3%] bottom-[-8%] w-[20vw] h-[20vw] max-w-62.5 max-h-62.5 bg-white/1.5 rounded-full backdrop-blur-[2px]"
          />
        </div>
      </motion.div>

    </div>
  );
}