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
        <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-black/30 z-10 pointer-events-none" />
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
          className="absolute w-full text-center font-bold tracking-tighter text-white uppercase leading-none top-[45%] sm:top-[40%] lg:top-[25%]"
          style={{
            transform: 'translateY(-50%)',
            textShadow: "0 8px 40px rgba(0,0,0,0.55)",
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
            className="flex gap-2 sm:gap-3 lg:gap-4"
          >
            <a href="#" aria-label="Send" className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border border-white/20 rounded-full flex justify-center items-center hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 backdrop-blur-md group">
              <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:text-black" />
            </a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border border-white/20 rounded-full flex justify-center items-center hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 backdrop-blur-md group">
              <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:text-black" />
            </a>
          </motion.div>

          {/* Search — hidden on xs, visible sm+ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:block"
          >
            <button aria-label="Search" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border border-white/20 rounded-full flex justify-center items-center hover:bg-white hover:text-black transition-all hover:scale-105 backdrop-blur-md group cursor-pointer">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:text-black" />
            </button>
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