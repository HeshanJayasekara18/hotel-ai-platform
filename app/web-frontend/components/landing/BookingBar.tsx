"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Calendar, Users, ChevronDown, ArrowRight } from "lucide-react";

const roomTypes = ["Cliff Suite", "Ocean Villa", "Garden Cottage", "Penthouse"];

export default function BookingBar() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [room, setRoom] = useState(roomTypes[0]);
  const [visible, setVisible] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show only after scrolling past 60% of viewport height
    setVisible(latest > window.innerHeight * 0.2);
  });

  return (
    <div className="relative w-full h-0 overflow-visible z-30">
      <AnimatePresence>
        {visible && (
          <motion.div
            key="booking-bar"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 -translate-y-1/2 px-4 sm:px-8 lg:px-16 xl:px-24"
          >
        {/* Bar container */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.4)] mt-20">
          
          {/* Top label strip */}
          <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-black/8">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-black/30" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-black/80 font-medium">Reserve Your Stay</span>
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-black/85 font-light hidden sm:block">Terra Resort — Cliff Coast</span>
          </div>

          {/* Fields row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/8">

            {/* Check-in */}
            <div className="flex flex-col gap-1 px-6 py-5 group hover:bg-black/3 transition-colors duration-300">
              <label className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-black/80 font-medium mb-1">
                <Calendar className="w-3 h-3" />
                Check In
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-black text-sm font-light tracking-wide outline-none border-none w-full cursor-pointer"
                style={{ colorScheme: "light" }}
              />
            </div>

            {/* Check-out */}
            <div className="flex flex-col gap-1 px-6 py-5 group hover:bg-black/3 transition-colors duration-300">
              <label className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-black/80 font-medium mb-1">
                <Calendar className="w-3 h-3" />
                Check Out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-black text-sm font-light tracking-wide outline-none border-none w-full cursor-pointer"
                style={{ colorScheme: "light" }}
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-1 px-6 py-5 group hover:bg-black/3 transition-colors duration-300">
              <label className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-black/80 font-medium mb-1">
                <Users className="w-3 h-3" />
                Guests
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-6 h-6 rounded-full border border-black/20 text-black/50 hover:text-black hover:border-black/60 transition-all duration-200 flex items-center justify-center text-sm leading-none"
                >−</button>
                <span className="text-black text-sm font-light tracking-wider min-w-4 text-center">{guests}</span>
                <button
                  onClick={() => setGuests(Math.min(10, guests + 1))}
                  className="w-6 h-6 rounded-full border border-black/20 text-black/80 hover:text-black hover:border-black/60 transition-all duration-200 flex items-center justify-center text-sm leading-none"
                >+</button>
                <span className="text-black/85 text-xs tracking-wider">{guests === 1 ? "Guest" : "Guests"}</span>
              </div>
            </div>

            {/* Room Type */}
            <div className="flex flex-col gap-1 px-6 py-5 group hover:bg-black/3 transition-colors duration-300">
              <label className="text-[10px] tracking-[0.25em] uppercase text-black/80 font-medium mb-1">
                Room Type
              </label>
              <div className="relative">
                <select
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="appearance-none bg-transparent text-black text-sm font-light tracking-wide outline-none border-none w-full cursor-pointer pr-6"
                  style={{ colorScheme: "light" }}
                >
                  {roomTypes.map((r) => (
                    <option key={r} value={r} className="bg-white text-black">{r}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/30 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Bottom CTA strip */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-black/8 bg-black/2">
            <p className="text-[10px] tracking-[0.2em] uppercase text-black/80 font-light hidden sm:block">
              Complimentary breakfast · Free cancellation within 48h
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2.5 bg-black text-white text-xs tracking-[0.2em] uppercase font-semibold px-7 py-3.5 rounded-full hover:bg-black/80 transition-all duration-300 ml-auto"
            >
              Check Availability
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
