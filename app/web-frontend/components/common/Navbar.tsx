"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none w-full">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0.1 }}
        className="pointer-events-auto flex items-center mt-6 bg-white/40 backdrop-blur-3xl border border-black rounded-full p-2.5 shadow-2xl w-max mix-blend-normal"
      >
        <div className="flex items-center gap-2 md:gap-5 text-sm font-normal tracking-wider text-black/70 px-2">
          <a 
            href="#" 
            className="flex items-center gap-2 bg-black/5 hover:bg-black/10 text-black px-5 py-2.5 rounded-full transition-all duration-300"
          >
            <span>HOME</span>
          </a>
          
          <a href="#" className="hover:text-black transition-colors px-4 py-2">BOOKING</a>
          <a href="#" className="hover:text-black transition-colors px-4 py-2">GALLERY</a>
          <a href="#" className="hover:text-black transition-colors px-4 py-2 hidden lg:block">PACKAGES</a>
          <a href="#" className="hover:text-black transition-colors px-4 py-2 hidden lg:block">ABOUT</a>
          
          <div className="w-px h-4 bg-black/20 mx-1 hidden sm:block"></div>
          <button aria-label="Search" className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-black/5 text-black transition-all duration-300">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </motion.nav>
    </div>
  );
}
