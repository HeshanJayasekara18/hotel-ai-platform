"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 text-white mix-blend-difference w-full pointer-events-auto"
    >
      <div className="flex items-center gap-4 text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase">
        <a href="#" className="bg-white text-black px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors">HOME</a>
        <a href="#" className="border border-white/20 px-6 py-2.5 rounded-full hover:bg-white/10 transition-colors backdrop-blur-md hidden md:block">BOOKING</a>
        <a href="#" className="border border-white/20 px-6 py-2.5 rounded-full hover:bg-white/10 transition-colors backdrop-blur-md hidden md:block">Gallary</a>
        <a href="#" className="border border-white/20 px-6 py-2.5 rounded-full hover:bg-white/10 transition-colors backdrop-blur-md hidden lg:block">Packages</a>
        <a href="#" className="border border-white/20 px-6 py-2.5 rounded-full hover:bg-white/10 transition-colors backdrop-blur-md hidden lg:block">About</a>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 font-bold text-lg md:text-xl tracking-widest flex items-center gap-3">
        <div className="grid grid-cols-3 gap-0.5">
          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
          <div className="w-1.5 h-1.5 bg-white/40 rounded-sm"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
        </div>
        <div className="leading-[1.1]">
          ZROBIM<br />
          <span className="text-[9px] font-normal tracking-[0.3em] text-white/80">architects</span>
        </div>
      </div>

      <div className="flex items-center gap-6 text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase">
        <a href="#" className="hover:text-white/70 transition-colors hidden md:block">Контакты</a>
        <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          Заказать Проект <ArrowRight className="w-4 h-4 font-light ml-1" />
        </a>
      </div>
    </motion.nav>
  );
}
