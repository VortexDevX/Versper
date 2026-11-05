"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useSound } from "@/components/ui/SoundEngine";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { playClick, playHover } = useSound();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Differential Magnetic Physics for the CTA
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const springBtnX = useSpring(btnX, { stiffness: 180, damping: 18 });
  const springBtnY = useSpring(btnY, { stiffness: 180, damping: 18 });

  const textMagneticX = useTransform(springBtnX, (v) => v * 1.6);
  const textMagneticY = useTransform(springBtnY, (v) => v * 1.6);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    btnX.set((e.clientX - centerX) * 0.35);
    btnY.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  const scrollToCanon = () => {
    playClick();
    document.getElementById("canon")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#070708]"
    >
      {/* Background Image Layer with Parallax */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <Image
          src="/images/hero.png"
          alt="Vesper Monolith Terroir"
          fill
          priority
          className="object-cover filter grayscale contrast-125 brightness-60"
        />
      </motion.div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-[#070708]/80 via-[#070708]/30 to-[#070708]" />
      <div className="absolute inset-0 z-1 bg-radial-gradient from-transparent via-[#070708]/40 to-[#070708]" />

      {/* Hero Typography Stage */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Top Micro-Metadata */}
        <div className="overflow-hidden mb-6">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 font-space text-[9px] tracking-[0.4em] text-[#82807a] uppercase"
          >
            <span>REYKJAVIK ARCHIVE</span>
            <span className="text-[#c9a063]">◆</span>
            <span>ALTITUDE 2,450 MASL</span>
          </motion.div>
        </div>

        {/* Monumental Headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant font-light text-[#e8e6e1] select-none tracking-[0.18em]"
            style={{
              fontSize: "clamp(4.5rem, 18vw, 17rem)",
              lineHeight: 0.85,
            }}
          >
            VESPER
          </motion.h1>
        </div>

        {/* Narrative Subtitle */}
        <div className="overflow-hidden mt-6">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md font-space text-[11px] sm:text-xs tracking-[0.25em] text-[#82807a] uppercase leading-relaxed"
          >
            The quiet absolute. Forged in the shadows of forgotten altitudes.
          </motion.p>
        </div>

        {/* Differential Magnetic CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <motion.button
            ref={buttonRef}
            onClick={scrollToCanon}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => playHover()}
            style={{ x: springBtnX, y: springBtnY }}
            className="group relative flex items-center justify-center overflow-hidden rounded-full border border-[#e8e6e1]/20 bg-[#070708]/60 px-10 py-5 backdrop-blur-md transition-colors hover:border-[#c9a063] cursor-pointer"
          >
            <motion.span
              style={{ x: textMagneticX, y: textMagneticY }}
              className="flex items-center gap-3 font-space text-[10px] tracking-[0.35em] text-[#e8e6e1] uppercase transition-colors group-hover:text-[#c9a063]"
            >
              <span>Begin The Ritual</span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-1.5">↓</span>
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Ambient Coordinates Ribbon (Bottom Left) */}
      <div className="absolute bottom-8 left-8 sm:left-14 z-10 hidden sm:flex items-center gap-3 font-space text-[8px] tracking-[0.3em] text-[#82807a]">
        <span>64°08&apos;43&quot;N 21°56&apos;28&quot;W</span>
        <span className="text-[#82807a]/40">{"//"}</span>
        <span>ZERO-LUX VAULT</span>
      </div>

      {/* Scroll indicator (Bottom Right) */}
      <div className="absolute bottom-8 right-8 sm:right-12 z-10 flex items-center gap-3 font-space text-[8px] tracking-[0.3em] text-[#82807a]">
        <span>ACT I</span>
        <div className="h-px w-8 bg-[#82807a]/40" />
        <span>SCROLL TO ADVANCE</span>
      </div>
    </section>
  );
}
