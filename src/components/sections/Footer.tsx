"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useSound } from "@/components/ui/SoundEngine";

export default function Footer() {
  const { playClick } = useSound();
  const [times, setTimes] = useState({ reykjavik: "", tokyo: "", newYork: "" });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const formatTime = (timeZone: string) =>
        now.toLocaleTimeString("en-US", {
          timeZone,
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

      setTimes({
        reykjavik: formatTime("Atlantic/Reykjavik"),
        tokyo: formatTime("Asia/Tokyo"),
        newYork: formatTime("America/New_York"),
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050506] px-8 py-24 sm:px-14 border-t border-[#e8e6e1]/8 text-[#e8e6e1]">
      <div className="mx-auto max-w-7xl">
        {/* World Clocks Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-[#e8e6e1]/8 pb-12 font-space">
          <div>
            <span className="text-[9px] tracking-[0.3em] text-[#82807a] uppercase block">
              REYKJAVIK // ROASTERY
            </span>
            <span className="text-sm font-light text-[#e8e6e1] mt-1 block">
              {times.reykjavik || "00:00:00"}
            </span>
          </div>

          <div>
            <span className="text-[9px] tracking-[0.3em] text-[#82807a] uppercase block">
              TOKYO // GUILD
            </span>
            <span className="text-sm font-light text-[#e8e6e1] mt-1 block">
              {times.tokyo || "00:00:00"}
            </span>
          </div>

          <div>
            <span className="text-[9px] tracking-[0.3em] text-[#82807a] uppercase block">
              NEW YORK // ATELIER
            </span>
            <span className="text-sm font-light text-[#e8e6e1] mt-1 block">
              {times.newYork || "00:00:00"}
            </span>
          </div>
        </div>

        {/* Huge Monolithic Watermark */}
        <div className="my-16 select-none overflow-hidden">
          <span
            className="font-cormorant font-light text-[#e8e6e1]/5 tracking-[0.25em] block text-center leading-none"
            style={{ fontSize: "clamp(4rem, 20vw, 18rem)" }}
          >
            VESPER
          </span>
        </div>

        {/* Bottom Bar: Coordinates, Copyright, Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#e8e6e1]/8 pt-8 font-space text-[9px] tracking-[0.3em] text-[#82807a]">
          <span>© 2026 VESPER. 64°08&apos;43&quot;N 21°56&apos;28&quot;W // BATCH 009</span>

          <button
            onClick={scrollToTop}
            className="mt-4 sm:mt-0 flex items-center gap-2 hover:text-[#c9a063] transition-colors cursor-pointer"
          >
            <span>RETURN TO SUMMIT</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
