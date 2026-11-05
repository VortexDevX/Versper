"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/components/ui/SoundEngine";
import Image from "next/image";

interface Chapter {
  id: string;
  numeral: string;
  roman: string;
  title: string;
  tagline: string;
  headline: string;
  body: string;
  spec: string;
  image: string;
}

const chapters: Chapter[] = [
  {
    id: "chapter-1",
    numeral: "01",
    roman: "I",
    title: "THE REJECTION",
    tagline: "SURRENDER THE COMFORT",
    headline: "We discarded the noise.\nWe killed the light.",
    body: "This is not coffee to accelerate production or comfort routine. It is an uncompromised ritual of stillness.",
    spec: "ZERO-LUX OPTICAL ROASTING",
    image: "/images/story.png",
  },
  {
    id: "chapter-2",
    numeral: "02",
    roman: "II",
    title: "THE ALTITUDE",
    tagline: "TROPOSPHERIC VEIL",
    headline: "Forged in the shadows\nof forgotten altitudes.",
    body: "Cultivated above 2,450 meters in volcanic caldera ash, where freezing night winds compress bean density to stone.",
    spec: "2,450 MASL VOLCANIC CALDERA",
    image: "/images/void.png",
  },
  {
    id: "chapter-3",
    numeral: "03",
    roman: "III",
    title: "THE ABSOLUTE",
    tagline: "CRYOGENIC INITIATION",
    headline: "Not a morning comfort.\nA midnight conviction.",
    body: "Roasted in optical silence. Sealed under nitrogen cryogenic blankets. What remains is absolute.",
    spec: "-196°C NITROGEN VAULT SEAL",
    image: "/images/silhouette.png",
  },
];

export default function Story() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const { playClick, playHover } = useSound();

  return (
    <section id="origin" className="relative bg-[#070708] px-6 sm:px-14 py-28 border-t border-[#e8e6e1]/8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#e8e6e1]/8 pb-8">
          <div>
            <div className="flex items-center gap-3 font-space text-[9px] tracking-[0.35em] text-[#c9a063] uppercase">
              <span>ACT II</span>
              <span>/</span>
              <span>THE ORIGIN DOCTRINE</span>
            </div>
            <h2 className="mt-3 font-cormorant text-4xl sm:text-6xl font-light text-[#e8e6e1] tracking-wide">
              The Doctrine.
            </h2>
          </div>

          <p className="mt-4 md:mt-0 max-w-sm font-space text-xs text-[#82807a] leading-relaxed">
            Three core convictions etched in darkness. Select a monolith to reveal the origin thesis.
          </p>
        </div>

        {/* Desktop: Expanding 3-Column Monolith Stage (h-[68vh]) */}
        <div className="hidden md:flex mt-12 h-[68vh] w-full gap-4 overflow-hidden">
          {chapters.map((ch, idx) => {
            const isActive = activeIdx === idx;
            return (
              <motion.div
                key={ch.id}
                layout
                onClick={() => {
                  playClick();
                  setActiveIdx(idx);
                }}
                onMouseEnter={() => {
                  if (!isActive) playHover();
                }}
                transition={{ type: "spring", damping: 28, stiffness: 220 }}
                className={`relative flex cursor-pointer overflow-hidden rounded-xl border transition-colors duration-500 ${
                  isActive
                    ? "flex-3 border-[#c9a063]/50 bg-[#0c0c10]"
                    : "flex-1 border-[#e8e6e1]/8 bg-[#09090c] hover:border-[#e8e6e1]/20"
                }`}
              >
                {/* Background Image Layer */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive ? "opacity-35" : "opacity-10"
                  }`}
                >
                  <Image
                    src={ch.image}
                    alt={ch.title}
                    fill
                    className="object-cover filter grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/70 to-[#070708]/30" />
                </div>

                {/* Inactive State: Vertical Compact Monolith */}
                {!isActive ? (
                  <div className="relative z-10 flex h-full w-full flex-col justify-between p-8 items-center text-center">
                    <span className="font-space text-xs text-[#82807a] tracking-widest">
                      {ch.numeral}
                    </span>

                    {/* Vertical Title */}
                    <div className="flex flex-col items-center">
                      <span className="font-cormorant text-6xl font-light text-[#e8e6e1]/20">
                        {ch.roman}
                      </span>
                      <span className="font-space text-[10px] tracking-[0.35em] text-[#82807a] uppercase mt-4 writing-vertical rotate-180">
                        {ch.title}
                      </span>
                    </div>

                    <span className="text-xs text-[#82807a]/40 hover:text-[#c9a063] transition-colors">
                      +
                    </span>
                  </div>
                ) : (
                  /* Active State: Expanded Editorial Monograph */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 flex h-full w-full flex-col justify-between p-10 sm:p-14"
                  >
                    {/* Top Metadata */}
                    <div className="flex items-center justify-between border-b border-[#e8e6e1]/10 pb-4">
                      <div className="flex items-center gap-3 font-space text-[9px] tracking-[0.35em] text-[#c9a063] uppercase">
                        <span>CHAPTER {ch.numeral}</span>
                        <span>{"//"}</span>
                        <span>{ch.title}</span>
                      </div>
                      <span className="font-space text-[9px] tracking-widest text-[#82807a]">
                        {ch.tagline}
                      </span>
                    </div>

                    {/* Center Headline */}
                    <div className="my-auto max-w-xl">
                      <h3 className="font-cormorant text-4xl sm:text-6xl font-light text-[#e8e6e1] leading-[1.1] whitespace-pre-line tracking-wide">
                        {ch.headline}
                      </h3>
                      <p className="mt-6 font-space text-xs sm:text-sm text-[#82807a] leading-relaxed max-w-md">
                        {ch.body}
                      </p>
                    </div>

                    {/* Bottom Spec Badge */}
                    <div className="flex items-center justify-between border-t border-[#e8e6e1]/10 pt-4 font-space text-[9px] tracking-[0.25em]">
                      <span className="text-[#c9a063]">{ch.spec}</span>
                      <span className="text-[#82807a]/60">ACT II MONOGRAPH</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: Accordion Drawer (Stacked) */}
        <div className="flex md:hidden flex-col gap-3 mt-8">
          {chapters.map((ch, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={ch.id}
                onClick={() => {
                  playClick();
                  setActiveIdx(idx);
                }}
                className={`overflow-hidden rounded-xl border transition-colors ${
                  isActive
                    ? "border-[#c9a063]/50 bg-[#0c0c10]"
                    : "border-[#e8e6e1]/8 bg-[#09090c]"
                }`}
              >
                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-3">
                    <span className="font-space text-xs text-[#c9a063]">{ch.numeral}</span>
                    <span className="font-cormorant text-2xl font-light text-[#e8e6e1]">
                      {ch.title}
                    </span>
                  </div>
                  <span className="text-xs text-[#82807a]">{isActive ? "−" : "+"}</span>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-6 border-t border-[#e8e6e1]/6 pt-4"
                    >
                      <h4 className="font-cormorant text-2xl font-light text-[#e8e6e1] whitespace-pre-line leading-tight">
                        {ch.headline}
                      </h4>
                      <p className="mt-3 font-space text-xs text-[#82807a] leading-relaxed">
                        {ch.body}
                      </p>
                      <div className="mt-4 font-space text-[8px] tracking-widest text-[#c9a063]">
                        {ch.spec}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
