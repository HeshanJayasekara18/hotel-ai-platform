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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Image native aspect ratios
  const BG_RATIO = 2938 / 1440;   // TERRA.png — 2.04:1
  const FG_RATIO = 5500 / 3335;   // HeroUpLayer.png — 1.65:1

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#111] text-white font-sans selection:bg-white/30">

      {/* LAYER 1: Background with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-black/20 z-10 pointer-events-none" />
        {/* 
          Use min-w/min-h + translate-center approach so TERRA.png always fills
          the viewport from the same center point on every screen size.
        */}
        <img
          src="/img/TERRA.png"
          alt="TERRA Landscape"
          className="absolute"
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `max(100%, calc(100vh * ${BG_RATIO}))`,
            height: `max(100%, calc(100vw / ${BG_RATIO}))`,
            objectFit: 'cover',
          }}
        />
      </motion.div>

      {/* LAYER 2: TERRA title text (between bg and fg) */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 px-0"
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold tracking-tighter text-white uppercase w-screen text-center leading-none"
          style={{
            textShadow: "0 8px 40px rgba(0,0,0,0.55)",
            fontSize: 'min(18vw, 18vh)',
          }}
        >
          TERRA
        </motion.h1>
      </motion.div>

      {/* LAYER 3: Foreground transparent PNG — sits on top of text */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden"
      >
        {/*
          HeroUpLayer.png has a different native aspect ratio to TERRA.png.
          We scale it so it ALWAYS covers the viewport at the same relative crop
          point as the background. This prevents the vertical drift on mobile/tablet.
        */}
        <img
          src="/img/HeroUpLayer.png"
          alt=""
          aria-hidden="true"
          className="absolute"
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `max(100%, calc(100vh * ${FG_RATIO}))`,
            height: `max(100%, calc(100vw / ${FG_RATIO}))`,
            objectFit: 'cover',
          }}
        />
      </motion.div>

      {/* UI Overlay */}
      <motion.div 
        style={{ opacity }}
        className="relative z-50 h-full w-full flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 pb-12"
      >
        <div className="grid grid-cols-12 gap-4 h-full relative">
          
          {/* Social Icons & Search Footer */}
          <div className="absolute left-0 bottom-0 lg:bottom-4 flex justify-between w-full items-end z-30">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-3 lg:gap-4"
            >
              <a href="#" className="w-10 h-10 lg:w-12 lg:h-12 border border-white/20 rounded-full flex justify-center items-center hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 backdrop-blur-md group">
                <span className="text-xs lg:text-sm font-bold font-serif group-hover:text-black">Bē</span>
              </a>
              <a href="#" className="w-10 h-10 lg:w-12 lg:h-12 border border-white/20 rounded-full flex justify-center items-center hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 backdrop-blur-md group">
                <Send className="w-3.5 h-3.5 lg:w-4 lg:h-4 ml-[-2px] group-hover:text-black" />
              </a>
              <a href="#" className="w-10 h-10 lg:w-12 lg:h-12 border border-white/20 rounded-full flex justify-center items-center hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 backdrop-blur-md group">
                <Instagram className="w-4 h-4 group-hover:text-black" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="hidden sm:block"
            >
              <button className="w-12 h-12 lg:w-16 lg:h-16 border border-white/20 rounded-full flex justify-center items-center hover:bg-white hover:text-black transition-all hover:scale-105 backdrop-blur-md group cursor-pointer">
                <Search className="w-5 h-5 lg:w-6 lg:h-6 font-light group-hover:text-black" />
              </button>
            </motion.div>
          </div>

          {/* Abstract Circle Graphics */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
            className="absolute left-[-15%] bottom-[-15%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] border border-white/5 rounded-full pointer-events-none z-0 mix-blend-screen"
          />
          <motion.div 
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 2.5, delay: 0.4, ease: "easeOut" }}
            className="absolute left-[-5%] bottom-[-10%] w-[25vw] h-[25vw] max-w-[300px] max-h-[300px] bg-white/[0.015] rounded-full pointer-events-none backdrop-blur-[2px] z-0"
          />
          <motion.div 
            initial={{ scale: 0, x: 50 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
            className="absolute right-[-5%] bottom-[-5%] w-[20vw] h-[20vw] border border-white/5 rounded-full pointer-events-none z-0"
          />
          
        </div>
      </motion.div>

    </div>
  );
}