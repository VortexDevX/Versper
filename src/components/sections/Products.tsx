"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSound } from "@/components/ui/SoundEngine";
import { CartItem } from "@/components/ui/RitualBagDrawer";
import Image from "next/image";

export interface Specimen {
  id: string;
  numeral: string;
  index: string;
  name: string;
  subtitle: string;
  elevation: string;
  process: string;
  tastingNotes: string[];
  price: number;
  image: string;
  philosophy: string;
}

export const CANON_ITEMS: Specimen[] = [
  {
    id: "specimen-void",
    numeral: "I",
    index: "01",
    name: "The Void",
    subtitle: "Dark Absolute Roast",
    elevation: "2,450 MASL",
    process: "Cryogenic Anaerobic Natural",
    tastingNotes: ["Smoked Cedar", "Black Truffle", "Volcanic Ash", "Cacao Nibs"],
    price: 48,
    image: "/images/void.png",
    philosophy:
      "The absence of everything. An uncompromising descent yielding smoked cedar, black truffle, and the quiet of volcanic ash.",
  },
  {
    id: "specimen-eclipse",
    numeral: "II",
    index: "02",
    name: "Eclipse",
    subtitle: "Balanced Core Roast",
    elevation: "2,200 MASL",
    process: "Glacier Water Washed",
    tastingNotes: ["Tart Black Cherry", "Raw Cacao", "Cold Iron", "Cured Fig"],
    price: 52,
    image: "/images/eclipse.png",
    philosophy:
      "The point of surrender. A medium roast reduced to its core—tart cherry, raw ceremonial cacao, and the bite of cold iron.",
  },
  {
    id: "specimen-silhouette",
    numeral: "III",
    index: "03",
    name: "Silhouette",
    subtitle: "Swiss Water Decaf",
    elevation: "1,980 MASL",
    process: "Mountain Glacier Filtered",
    tastingNotes: ["Burnt Salted Caramel", "Dark Rum", "Nightshade", "Toasted Pecan"],
    price: 44,
    image: "/images/silhouette.png",
    philosophy:
      "The residue of a shadow. Decaf, unbroken. A velvety whisper of burnt caramel, dark rum, and botanical nightshade.",
  },
  {
    id: "specimen-nocturne",
    numeral: "IV",
    index: "04",
    name: "Nocturne",
    subtitle: "Ultra-Reserve Gesha",
    elevation: "2,620 MASL",
    process: "Carbonic Maceration 120hr",
    tastingNotes: ["White Peach", "Bergamot Bloom", "Crushed Slate", "Pine Smoke"],
    price: 68,
    image: "/images/void_2.png",
    philosophy:
      "The final frequency. Cold-smoked Gesha conditioned over charred pine embers. White peach framed by crushed volcanic slate.",
  },
];

interface ProductsProps {
  onAddToCart: (item: CartItem) => void;
}

export default function Products({ onAddToCart }: ProductsProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { playChime, playHover } = useSound();

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform vertical scroll progress into horizontal translateX
  // 4 items: moves from 0% to -75% (or with padding -72%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const progressBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="canon" ref={targetRef} className="relative h-[420vh] bg-[#070708]">
      {/* Sticky Fullscreen Pinned Track */}
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        {/* Top Pinned HUD Header */}
        <div className="absolute top-10 left-8 sm:left-14 right-8 sm:right-14 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 font-space text-[9px] tracking-[0.35em] text-[#82807a] uppercase">
            <span>ACT I</span>
            <span>/</span>
            <span className="text-[#e8e6e1]">THE HARVEST CANON</span>
          </div>

          <div className="font-space text-[9px] tracking-[0.3em] text-[#82807a] uppercase hidden sm:block">
            SCROLL DOWN TO TRAVERSE MONOLITHS
          </div>
        </div>

        {/* Translating Horizontal Container */}
        <motion.div style={{ x }} className="flex h-full items-center pl-8 sm:pl-24 pr-40 gap-12 sm:gap-24">
          {CANON_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative flex h-[76vh] w-[88vw] sm:w-[72vw] lg:w-[62vw] shrink-0 items-center justify-between rounded-xl border border-[#e8e6e1]/8 bg-[#0b0b0e] p-8 sm:p-14 transition-colors duration-700 hover:border-[#e8e6e1]/20 overflow-hidden"
            >
              {/* Background Giant Roman Watermark */}
              <span className="pointer-events-none absolute -right-6 -bottom-10 font-cormorant text-[16rem] sm:text-[24rem] font-light text-[#e8e6e1]/3 select-none leading-none">
                {item.numeral}
              </span>

              {/* Left Column: Monolithic Details */}
              <div className="relative z-10 flex h-full max-w-sm flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 font-space text-[9px] tracking-[0.35em] text-[#c9a063] uppercase">
                    <span>SPECIMEN {item.numeral}</span>
                    <span>{"//"}</span>
                    <span>{item.index} OF 04</span>
                  </div>

                  <h3 className="mt-4 font-cormorant text-5xl sm:text-7xl font-light text-[#e8e6e1] tracking-wide leading-none">
                    {item.name}
                  </h3>

                  <p className="mt-6 font-space text-xs text-[#82807a] leading-relaxed">
                    {item.philosophy}
                  </p>

                  {/* Botanical Spec Line */}
                  <div className="mt-8 space-y-2 font-space text-[9px] tracking-[0.25em] text-[#82807a] uppercase border-t border-[#e8e6e1]/8 pt-6">
                    <div className="flex justify-between">
                      <span>ELEVATION</span>
                      <span className="text-[#e8e6e1]">{item.elevation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PROCESS</span>
                      <span className="text-[#e8e6e1]">{item.process}</span>
                    </div>
                  </div>

                  {/* Tasting Notes */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="rounded-full border border-[#e8e6e1]/10 bg-[#121216] px-3 py-1 font-space text-[8px] tracking-wider text-[#82807a]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Acquire CTA */}
                <div className="mt-10 flex items-center gap-6 border-t border-[#e8e6e1]/8 pt-6">
                  <div>
                    <span className="font-space text-[8px] tracking-widest text-[#82807a] block uppercase">
                      ALLOCATION
                    </span>
                    <span className="font-space text-base font-light text-[#e8e6e1]">
                      ${item.price} USD
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      playChime();
                      onAddToCart({
                        id: item.id,
                        name: item.name,
                        numeral: item.numeral,
                        price: item.price,
                        grind: "Whole Bean",
                        quantity: 1,
                        image: item.image,
                      });
                    }}
                    onMouseEnter={() => playHover()}
                    className="flex-1 rounded-full border border-[#e8e6e1]/20 bg-[#141418] py-3.5 font-space text-[9px] tracking-[0.3em] text-[#e8e6e1] uppercase transition-all duration-300 hover:border-[#c9a063] hover:bg-[#c9a063] hover:text-[#070708] cursor-pointer"
                  >
                    Acquire Reserve →
                  </button>
                </div>
              </div>

              {/* Right Column: Monumental Framed Photography */}
              <div className="relative hidden md:block h-full w-[46%] overflow-hidden rounded-lg bg-[#141418]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover filter grayscale contrast-125 brightness-75 transition-all duration-1000 group-hover:scale-105 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-transparent to-transparent opacity-60" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom Pinned Progress Track */}
        <div className="absolute bottom-8 left-8 sm:left-14 right-8 sm:right-14 z-20 flex items-center justify-between font-space text-[8px] tracking-[0.3em] text-[#82807a]">
          <span>01 THE VOID</span>
          <div className="relative h-px w-48 sm:w-80 bg-[#e8e6e1]/10 overflow-hidden">
            <motion.div
              style={{ width: progressBar }}
              className="h-full bg-[#c9a063]"
            />
          </div>
          <span>04 NOCTURNE</span>
        </div>
      </div>
    </section>
  );
}
