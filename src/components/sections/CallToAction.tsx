"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/components/ui/SoundEngine";

export default function CallToAction() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [key, setKey] = useState("");
  const { playClick, playChime } = useSound();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    playChime();
    setKey(`VSP-${Math.floor(1000 + Math.random() * 9000)}-ARCHIVE`);
    setIsSubmitted(true);
  };

  return (
    <section id="induction" className="relative bg-[#070708] px-8 py-36 sm:px-14 border-t border-[#e8e6e1]/8">
      <div className="mx-auto max-w-2xl text-center">
        {/* Section Marker */}
        <div className="flex items-center justify-center gap-3 font-space text-[9px] tracking-[0.35em] text-[#c9a063] uppercase">
          <span>ACT IV</span>
          <span>/</span>
          <span>THE REGISTER</span>
        </div>

        <h2 className="mt-4 font-cormorant text-5xl sm:text-7xl font-light text-[#e8e6e1] tracking-wide">
          The Induction.
        </h2>

        <p className="mt-4 font-space text-xs sm:text-sm text-[#82807a] leading-relaxed max-w-md mx-auto">
          We allocate one hundred and forty canisters per harvest batch. Leave your coordinates to be notified when the vault unlocks.
        </p>

        {/* Minimal Underline Input Form */}
        <div className="mt-14">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-8"
              >
                <div className="input-wrapper w-full max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter dispatch coordinates"
                    className="premium-input w-full py-4 text-center font-space text-base tracking-widest text-[#e8e6e1]"
                  />
                </div>

                <button
                  type="submit"
                  onClick={() => playClick()}
                  className="group relative flex items-center justify-center overflow-hidden rounded-full border border-[#e8e6e1]/20 bg-[#0b0b0e] px-10 py-4 font-space text-[10px] tracking-[0.35em] text-[#e8e6e1] uppercase transition-all duration-500 hover:border-[#c9a063] hover:text-[#c9a063] cursor-pointer"
                >
                  <span>Submit to the Vault →</span>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center rounded-xl border border-[#c9a063]/30 bg-[#0a0a0d] p-8 text-center"
              >
                <span className="font-space text-[9px] tracking-[0.3em] text-[#c9a063] uppercase">
                  RECORD ASSIGNED
                </span>

                <h3 className="mt-2 font-cormorant text-4xl font-light text-[#e8e6e1]">
                  Induction Recorded.
                </h3>

                <div className="mt-4 rounded border border-[#e8e6e1]/10 bg-[#121216] px-5 py-2 font-space text-xs tracking-widest text-[#c9a063]">
                  {key}
                </div>

                <p className="mt-3 max-w-sm font-space text-xs text-[#82807a] leading-relaxed">
                  Your entry is sealed in the Reykjavik roastery index. Dispatch will occur at midnight before public release.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
