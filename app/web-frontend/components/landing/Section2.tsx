"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

/* ── Experience Slider Data ─────────────────────────────────────── */
const sliderExperiences = [
  { label: "Spa & Wellness", sublabel: "Rejuvenate above the waves", image: "/images/exp_spa.png" },
  { label: "Organic Dining", sublabel: "Cliffside culinary journeys", image: "/images/exp_dining.png" },
  { label: "Ocean Access", sublabel: "Private coastal coves", image: "/images/exp_ocean.png" },
  { label: "Fire Lounge", sublabel: "Twilight under the stars", image: "/images/exp_fire.png" }
];

/* ── Suite cards ──────────────────────────────────────────── */
const suites = [
  {
    label: "Cliff Suite",
    sublabel: "Ocean-facing, 120m²",
    image: "/img/suite_cliff.png",
    offset: "translate-y-8",
  },
  {
    label: "Garden Villa",
    sublabel: "Private terrace, 180m²",
    image: "/img/suite_garden_villa.png",
    offset: "-translate-y-2",
  },
  {
    label: "Penthouse",
    sublabel: "Panoramic roof, 260m²",
    image: "/img/suite_penthouse.png",
    offset: "translate-y-12",
  },
];

export default function Section2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.4], ["-40px", "0px"]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const amenitiesInView = useInView(amenitiesRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white text-[#111] overflow-hidden min-h-screen pb-32 -mb-20 z-20"
      style={{
        maskImage: `linear-gradient(black, black), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 60' preserveAspectRatio='none'%3E%3Cpath fill='black' d='M0,0 L0,15 L0,17 L3,17 L6,18 L9,18 L12,18 L15,19 L18,20 L21,18 L24,15 L27,15 L30,16 L33,18 L36,19 L39,22 L42,22 L45,24 L48,22 L51,26 L54,23 L57,21 L60,23 L63,25 L66,24 L69,23 L72,20 L75,24 L78,27 L81,23 L84,20 L87,23 L90,23 L93,24 L96,23 L99,24 L102,22 L105,19 L108,21 L111,25 L114,23 L117,20 L120,22 L123,20 L126,16 L129,16 L132,13 L135,10 L138,12 L141,16 L144,17 L147,15 L150,15 L153,13 L156,17 L159,17 L162,20 L165,20 L168,19 L171,22 L174,18 L177,16 L180,15 L183,15 L186,14 L189,10 L192,8 L195,11 L198,11 L201,15 L204,18 L207,20 L210,23 L213,26 L216,26 L219,22 L222,26 L225,23 L228,27 L231,28 L234,32 L237,32 L240,30 L243,33 L246,35 L249,37 L252,36 L255,32 L258,30 L261,34 L264,36 L267,36 L270,34 L273,40 L276,41 L279,44 L282,44 L285,43 L288,39 L291,37 L294,37 L297,40 L300,37 L303,43 L306,42 L309,39 L312,39 L315,38 L318,41 L321,38 L324,40 L327,39 L330,38 L333,36 L336,37 L339,40 L342,37 L345,35 L348,35 L351,37 L354,37 L357,35 L360,38 L363,39 L366,43 L369,46 L372,47 L375,51 L378,53 L381,52 L384,49 L387,52 L390,50 L393,50 L396,54 L399,52 L402,51 L405,52 L408,55 L411,51 L414,50 L417,47 L420,48 L423,44 L426,47 L429,48 L432,48 L435,47 L438,48 L441,49 L444,50 L447,50 L450,52 L453,53 L456,53 L459,51 L462,55 L465,52 L468,51 L471,55 L474,52 L477,50 L480,51 L483,51 L486,54 L489,52 L492,53 L495,50 L498,52 L501,51 L504,55 L507,51 L510,50 L513,54 L516,54 L519,52 L522,55 L525,51 L528,53 L531,53 L534,53 L537,52 L540,53 L543,51 L546,51 L549,47 L552,46 L555,43 L558,46 L561,48 L564,48 L567,51 L570,48 L573,49 L576,53 L579,53 L582,53 L585,52 L588,54 L591,52 L594,51 L597,51 L600,52 L603,49 L606,45 L609,43 L612,45 L615,45 L618,42 L621,44 L624,43 L627,43 L630,46 L633,46 L636,47 L639,51 L642,54 L645,52 L648,49 L651,51 L654,53 L657,50 L660,46 L663,46 L666,48 L669,52 L672,48 L675,44 L678,43 L681,40 L684,37 L687,40 L690,41 L693,41 L696,41 L699,40 L702,42 L705,39 L708,42 L711,38 L714,36 L717,34 L720,34 L723,33 L726,33 L729,32 L732,30 L735,30 L738,32 L741,32 L744,31 L747,28 L750,25 L753,23 L756,20 L759,19 L762,21 L765,20 L768,20 L771,18 L774,14 L777,18 L780,21 L783,25 L786,23 L789,26 L792,18 L795,20 L798,18 L801,16 L804,20 L807,20 L810,17 L813,17 L816,17 L819,20 L822,21 L825,26 L828,29 L831,29 L834,26 L837,30 L840,28 L843,31 L846,33 L849,34 L852,35 L855,38 L858,41 L861,38 L864,35 L867,32 L870,30 L873,26 L876,29 L879,32 L882,32 L885,35 L888,32 L891,34 L894,38 L897,34 L900,35 L903,38 L906,38 L909,40 L912,43 L915,40 L918,32 L921,32 L924,27 L927,24 L930,28 L933,26 L936,23 L939,25 L942,28 L945,32 L948,32 L951,35 L954,36 L957,36 L960,34 L963,32 L966,30 L969,33 L972,29 L975,32 L978,34 L981,38 L984,42 L987,41 L990,39 L993,43 L996,41 L999,44 L1002,42 L1005,45 L1008,44 L1011,43 L1014,40 L1017,41 L1020,39 L1023,38 L1026,36 L1029,39 L1032,41 L1035,44 L1038,46 L1041,46 L1044,43 L1047,40 L1050,42 L1053,45 L1056,42 L1059,41 L1062,44 L1065,48 L1068,44 L1071,40 L1074,39 L1077,38 L1080,41 L1083,38 L1086,41 L1089,43 L1092,41 L1095,40 L1098,38 L1101,41 L1104,43 L1107,44 L1110,42 L1113,45 L1116,49 L1119,51 L1122,47 L1125,46 L1128,45 L1131,42 L1134,40 L1137,37 L1140,36 L1143,36 L1146,37 L1149,39 L1152,42 L1155,38 L1158,38 L1161,36 L1164,32 L1167,30 L1170,26 L1173,26 L1176,28 L1179,26 L1182,26 L1185,29 L1188,32 L1191,28 L1194,28 L1197,32 L1200,30 L1200,15 L1200,0 Z' /%3E%3C/svg%3E")`,
        maskPosition: `top center, bottom center`,
        maskSize: `100% calc(100% - 59px), 100% 60px`,
        maskRepeat: `no-repeat, no-repeat`,
        WebkitMaskImage: `linear-gradient(black, black), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 60' preserveAspectRatio='none'%3E%3Cpath fill='black' d='M0,0 L0,15 L0,17 L3,17 L6,18 L9,18 L12,18 L15,19 L18,20 L21,18 L24,15 L27,15 L30,16 L33,18 L36,19 L39,22 L42,22 L45,24 L48,22 L51,26 L54,23 L57,21 L60,23 L63,25 L66,24 L69,23 L72,20 L75,24 L78,27 L81,23 L84,20 L87,23 L90,23 L93,24 L96,23 L99,24 L102,22 L105,19 L108,21 L111,25 L114,23 L117,20 L120,22 L123,20 L126,16 L129,16 L132,13 L135,10 L138,12 L141,16 L144,17 L147,15 L150,15 L153,13 L156,17 L159,17 L162,20 L165,20 L168,19 L171,22 L174,18 L177,16 L180,15 L183,15 L186,14 L189,10 L192,8 L195,11 L198,11 L201,15 L204,18 L207,20 L210,23 L213,26 L216,26 L219,22 L222,26 L225,23 L228,27 L231,28 L234,32 L237,32 L240,30 L243,33 L246,35 L249,37 L252,36 L255,32 L258,30 L261,34 L264,36 L267,36 L270,34 L273,40 L276,41 L279,44 L282,44 L285,43 L288,39 L291,37 L294,37 L297,40 L300,37 L303,43 L306,42 L309,39 L312,39 L315,38 L318,41 L321,38 L324,40 L327,39 L330,38 L333,36 L336,37 L339,40 L342,37 L345,35 L348,35 L351,37 L354,37 L357,35 L360,38 L363,39 L366,43 L369,46 L372,47 L375,51 L378,53 L381,52 L384,49 L387,52 L390,50 L393,50 L396,54 L399,52 L402,51 L405,52 L408,55 L411,51 L414,50 L417,47 L420,48 L423,44 L426,47 L429,48 L432,48 L435,47 L438,48 L441,49 L444,50 L447,50 L450,52 L453,53 L456,53 L459,51 L462,55 L465,52 L468,51 L471,55 L474,52 L477,50 L480,51 L483,51 L486,54 L489,52 L492,53 L495,50 L498,52 L501,51 L504,55 L507,51 L510,50 L513,54 L516,54 L519,52 L522,55 L525,51 L528,53 L531,53 L534,53 L537,52 L540,53 L543,51 L546,51 L549,47 L552,46 L555,43 L558,46 L561,48 L564,48 L567,51 L570,48 L573,49 L576,53 L579,53 L582,53 L585,52 L588,54 L591,52 L594,51 L597,51 L600,52 L603,49 L606,45 L609,43 L612,45 L615,45 L618,42 L621,44 L624,43 L627,43 L630,46 L633,46 L636,47 L639,51 L642,54 L645,52 L648,49 L651,51 L654,53 L657,50 L660,46 L663,46 L666,48 L669,52 L672,48 L675,44 L678,43 L681,40 L684,37 L687,40 L690,41 L693,41 L696,41 L699,40 L702,42 L705,39 L708,42 L711,38 L714,36 L717,34 L720,34 L723,33 L726,33 L729,32 L732,30 L735,30 L738,32 L741,32 L744,31 L747,28 L750,25 L753,23 L756,20 L759,19 L762,21 L765,20 L768,20 L771,18 L774,14 L777,18 L780,21 L783,25 L786,23 L789,26 L792,18 L795,20 L798,18 L801,16 L804,20 L807,20 L810,17 L813,17 L816,17 L819,20 L822,21 L825,26 L828,29 L831,29 L834,26 L837,30 L840,28 L843,31 L846,33 L849,34 L852,35 L855,38 L858,41 L861,38 L864,35 L867,32 L870,30 L873,26 L876,29 L879,32 L882,32 L885,35 L888,32 L891,34 L894,38 L897,34 L900,35 L903,38 L906,38 L909,40 L912,43 L915,40 L918,32 L921,32 L924,27 L927,24 L930,28 L933,26 L936,23 L939,25 L942,28 L945,32 L948,32 L951,35 L954,36 L957,36 L960,34 L963,32 L966,30 L969,33 L972,29 L975,32 L978,34 L981,38 L984,42 L987,41 L990,39 L993,43 L996,41 L999,44 L1002,42 L1005,45 L1008,44 L1011,43 L1014,40 L1017,41 L1020,39 L1023,38 L1026,36 L1029,39 L1032,41 L1035,44 L1038,46 L1041,46 L1044,43 L1047,40 L1050,42 L1053,45 L1056,42 L1059,41 L1062,44 L1065,48 L1068,44 L1071,40 L1074,39 L1077,38 L1080,41 L1083,38 L1086,41 L1089,43 L1092,41 L1095,40 L1098,38 L1101,41 L1104,43 L1107,44 L1110,42 L1113,45 L1116,49 L1119,51 L1122,47 L1125,46 L1128,45 L1131,42 L1134,40 L1137,37 L1140,36 L1143,36 L1146,37 L1149,39 L1152,42 L1155,38 L1158,38 L1161,36 L1164,32 L1167,30 L1170,26 L1173,26 L1176,28 L1179,26 L1182,26 L1185,29 L1188,32 L1191,28 L1194,28 L1197,32 L1200,30 L1200,15 L1200,0 Z' /%3E%3C/svg%3E")`,
        WebkitMaskPosition: `top center, bottom center`,
        WebkitMaskSize: `100% calc(100% - 59px), 100% 60px`,
        WebkitMaskRepeat: `no-repeat, no-repeat`,
      }}
    >
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Top divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-px bg-black/10 origin-left"
      />

      {/* ── PART 1: Heading + Cards ─────────────────────────── */}
      <div className="relative z-20 px-8 md:px-14 lg:px-20 pt-60 pb-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-start">

          {/* Left: Heading + CTA */}
          <motion.div
            style={{ x: leftX, opacity: leftOpacity }}
            className="flex flex-col gap-6 lg:w-72 xl:w-80 shrink-0 lg:pt-6"
          >
            {/* Label pill */}
            <div className="inline-flex items-center gap-2 border border-black/15 rounded-full px-4 py-1.5 w-fit backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-black/40" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-black/50 font-medium">
                Terra Resort
              </span>
            </div>

            {/* Heading */}
            <div>
              {["Our", "Private", "Suites"].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.h2
                    initial={{ y: "110%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1.1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className={`font-bold tracking-tighter uppercase leading-[0.9] ${
                      i === 1
                        ? "text-[#111]/20"
                        : "text-[#111]"
                    }`}
                    style={{
                      fontSize: "clamp(2.8rem, 5.5vw, 6rem)",
                      WebkitTextStroke: i === 1 ? "1px rgba(17,17,17,0.25)" : undefined,
                      color: i === 1 ? "transparent" : undefined,
                    }}
                  >
                    {word}
                  </motion.h2>
                </div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-[#111]/40 leading-relaxed font-light max-w-xs"
            >
              Each suite is handcrafted for those who seek solitude above the cliffs. Curated for you, individually.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4"
            >
              <button className="group flex items-center gap-2 bg-[#111] text-white text-xs tracking-[0.2em] uppercase font-semibold px-6 py-3.5 rounded-full hover:bg-[#111]/90 transition-all duration-300 hover:scale-[1.03]">
                Explore All
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Overlapping Cards */}
          <div ref={cardsRef} className="flex-1 flex items-end gap-4 md:gap-5 min-w-0">
              {suites.map((suite, i) => (
                <motion.div
                  key={suite.label}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex-1 rounded-2xl overflow-hidden cursor-pointer group ${suite.offset}`}
                  style={{ height: "clamp(260px, 36vw, 420px)" }}
                >
                  {/* Image */}
                  <img
                    src={suite.image}
                    alt={suite.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Top corner button */}
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>

                  {/* Bottom gradient + label */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                    <p className="text-white text-sm font-semibold tracking-tight leading-tight">{suite.label}</p>
                    <p className="text-white/50 text-[10px] tracking-[0.15em] uppercase mt-0.5">{suite.sublabel}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {/* ── PART 2: Amenities Grid ──────────────────────────── */}
      <div ref={amenitiesRef} className="relative z-20 px-8 md:px-14 lg:px-20 pt-16 pb-20">
        
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="overflow-hidden mb-3">
              <motion.p
                initial={{ y: "100%" }}
                animate={amenitiesInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10px] tracking-[0.3em] uppercase text-[#111]/40 font-medium"
              >
                What We Offer
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h3
                initial={{ y: "100%" }}
                animate={amenitiesInView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-[#111] uppercase"
              >
                Experiences
              </motion.h3>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={amenitiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-[#111]/45 leading-relaxed font-light max-w-xs text-left sm:text-right"
          >
            Thoughtfully curated wellness and adventure programmes at Terra — above the coast, beyond the ordinary.
          </motion.p>
        </div>

        {/* Thin divider */}
        <div className="h-px bg-black/8 mb-10" />

        {/* Image Slider */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:pb-12 scrollbar-none" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style dangerouslySetInnerHTML={{ __html: `
            .scrollbar-none::-webkit-scrollbar { display: none; }
          `}} />
          {sliderExperiences.map((exp, i) => (
            <motion.div
              key={exp.label}
              initial={{ opacity: 0, x: 40 }}
              animate={amenitiesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] h-80 sm:h-96 rounded-2xl overflow-hidden snap-center cursor-pointer group"
            >
              <img
                src={exp.image}
                alt={exp.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              {/* Text content */}
              <div className="absolute bottom-0 left-0 p-6 sm:p-8 shrink-0">
                <h4 className="text-white text-xl sm:text-2xl font-bold tracking-tight mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {exp.label}
                </h4>
                <p className="text-white/60 text-xs tracking-[0.1em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {exp.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-px bg-black/10 origin-right"
      />
    </section>
  );
}
