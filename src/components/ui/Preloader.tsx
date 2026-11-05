"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            onComplete?.();
          }, 200);
          return 100;
        }
        const inc = Math.floor(Math.random() * 8) + 5;
        return Math.min(100, prev + inc);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-10000 flex flex-col justify-between bg-[#070708] px-8 sm:px-14 py-12 text-[#e8e6e1]"
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          onClick={() => {
            setIsDone(true);
            onComplete?.();
          }}
        >
          {/* Top metadata */}
          <div className="flex items-center justify-between font-space text-[9px] tracking-[0.35em] text-[#82807a] uppercase">
            <span>REYKJAVIK ARCHIVE</span>
            <span>ALTITUDE 2,450M</span>
          </div>

          {/* Center Brand Monogram */}
          <div className="flex flex-col items-center justify-center text-center">
            <motion.h1
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9 }}
              className="font-cormorant text-6xl sm:text-8xl font-light tracking-[0.3em] text-[#e8e6e1]"
            >
              VESPER
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="my-5 h-px w-20 bg-[#c9a063]"
            />
            <p className="font-space text-[9px] tracking-[0.4em] text-[#82807a] uppercase">
              The quiet absolute
            </p>
          </div>

          {/* Bottom Progress Counter */}
          <div className="flex flex-col gap-3 font-space">
            <div className="flex items-end justify-between text-xs tracking-[0.3em]">
              <span className="text-[9px] text-[#82807a]">COORDINATES // 64°08&apos;N 21°56&apos;W</span>
              <span className="text-sm font-light text-[#c9a063]">
                {progress.toString().padStart(2, "0")}%
              </span>
            </div>
            <div className="h-0.5 w-full overflow-hidden bg-[#18181f]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#c9a063]/30 via-[#c9a063] to-[#e8e6e1]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
