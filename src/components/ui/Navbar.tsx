"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "@/components/ui/SoundEngine";
import { Volume2, VolumeX } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const { isMuted, toggleMute, playClick } = useSound();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#070708]/85 backdrop-blur-xl border-b border-[#e8e6e1]/8 py-4"
          : "bg-transparent py-7"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 sm:px-12">
        {/* Brand */}
        <a
          href="#"
          onClick={() => playClick()}
          className="group flex items-baseline gap-3"
        >
          <span className="font-cormorant text-2xl font-light tracking-[0.3em] text-[#e8e6e1] transition-colors group-hover:text-[#c9a063]">
            VESPER
          </span>
          <span className="font-space text-[8px] tracking-[0.3em] text-[#82807a] uppercase hidden sm:inline">
            {"// ALT 2,450M"}
          </span>
        </a>

        {/* Center Navigation Acts */}
        <nav className="hidden md:flex items-center gap-10 font-space text-[9px] tracking-[0.35em] text-[#82807a]">
          <a
            href="#canon"
            onClick={() => playClick()}
            className="hover:text-[#e8e6e1] transition-colors"
          >
            I. THE CANON
          </a>
          <a
            href="#origin"
            onClick={() => playClick()}
            className="hover:text-[#e8e6e1] transition-colors"
          >
            II. THE ORIGIN
          </a>
          <a
            href="#induction"
            onClick={() => playClick()}
            className="hover:text-[#e8e6e1] transition-colors"
          >
            III. INDUCTION
          </a>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-6">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleMute();
              playClick();
            }}
            aria-label="Toggle Sound"
            className="flex items-center gap-2 font-space text-[9px] tracking-[0.25em] text-[#82807a] hover:text-[#e8e6e1] transition-colors cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="h-3 w-3" />
                <span className="hidden sm:inline">SOUND OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3 w-3 text-[#c9a063]" />
                <div className="flex items-center gap-0.5">
                  <span className="h-2 w-0.5 bg-[#c9a063] animate-pulse" />
                  <span className="h-3 w-0.5 bg-[#c9a063] animate-pulse delay-75" />
                  <span className="h-1.5 w-0.5 bg-[#c9a063] animate-pulse delay-150" />
                </div>
              </>
            )}
          </button>

          {/* Allocation Cart Trigger */}
          <button
            onClick={() => {
              playClick();
              onOpenCart();
            }}
            className="font-space text-[9px] tracking-[0.3em] text-[#e8e6e1] border-b border-[#e8e6e1]/30 pb-0.5 hover:border-[#c9a063] hover:text-[#c9a063] transition-colors cursor-pointer"
          >
            RESERVE ({cartCount})
          </button>
        </div>
      </div>
    </motion.header>
  );
}
