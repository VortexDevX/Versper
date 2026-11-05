"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useSound } from "@/components/ui/SoundEngine";
import Image from "next/image";

export interface CartItem {
  id: string;
  name: string;
  numeral: string;
  price: number;
  grind: string;
  quantity: number;
  image: string;
}

interface RitualBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onUpdateGrind: (id: string, grind: string) => void;
  onRemoveItem: (id: string) => void;
}

export default function RitualBagDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onUpdateGrind,
  onRemoveItem,
}: RitualBagDrawerProps) {
  const { playClick, playChime } = useSound();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    playChime();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
    }, 1800);
  };

  const grindOptions = ["Whole Bean", "Espresso", "Cold Brew"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-10000 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playClick();
              onClose();
            }}
            className="fixed inset-0 bg-[#070708]/85 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 300 }}
            className="relative z-10 flex h-full w-full max-w-md flex-col justify-between border-l border-[#e8e6e1]/10 bg-[#09090c] p-8 text-[#e8e6e1] shadow-2xl"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-[#e8e6e1]/8 pb-5">
                <div className="flex items-center gap-3">
                  <span className="font-cormorant text-3xl font-light tracking-[0.15em]">
                    RESERVE BAG
                  </span>
                  <span className="rounded-full border border-[#e8e6e1]/10 bg-[#141418] px-2.5 py-0.5 text-[8px] font-space tracking-widest text-[#c9a063]">
                    {items.length} {items.length === 1 ? "CANISTER" : "CANISTERS"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    playClick();
                    onClose();
                  }}
                  className="rounded-full p-2 text-[#82807a] transition-colors hover:bg-[#141418] hover:text-[#e8e6e1] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Free Courier Notice */}
              <div className="my-6 rounded border border-[#e8e6e1]/6 bg-[#0e0e12] p-3.5">
                <div className="flex items-center justify-between text-[9px] font-space tracking-[0.25em] text-[#82807a] uppercase">
                  <span>DISPATCH ALLOCATION</span>
                  <span className="text-[#c9a063]">
                    {subtotal >= 100 ? "COMPLIMENTARY AIR COURIER" : `$${Math.max(0, 100 - subtotal)} AWAY`}
                  </span>
                </div>
                <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-[#18181f]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#c9a063]/50 to-[#c9a063]"
                    style={{ width: `${Math.min(100, (subtotal / 100) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Body Item List */}
            <div className="my-4 flex-1 overflow-y-auto pr-1">
              {isSuccess ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <CheckCircle2 className="h-10 w-10 text-[#c9a063]" />
                  <h3 className="mt-4 font-cormorant text-3xl font-light tracking-wide text-[#e8e6e1]">
                    Allocation Locked
                  </h3>
                  <p className="mt-2 max-w-xs font-space text-xs text-[#82807a] leading-relaxed">
                    Batch #009 assigned. Verification dispatch routed to your secure coordinates.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      onClose();
                    }}
                    className="mt-6 rounded-full border border-[#c9a063] px-6 py-2.5 font-space text-[9px] tracking-[0.25em] text-[#c9a063] uppercase transition-colors hover:bg-[#c9a063] hover:text-[#070708]"
                  >
                    Return to Summit
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-[#82807a]">
                  <span className="font-cormorant text-5xl font-light text-[#e8e6e1]/20">Void</span>
                  <p className="mt-3 font-space text-xs tracking-[0.25em] uppercase">
                    Your allocation bag is empty.
                  </p>
                  <p className="mt-1 font-space text-[9px] text-[#82807a]/60">
                    Traverse the Canon to reserve a canister.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="group flex flex-col gap-3 rounded-lg border border-[#e8e6e1]/8 bg-[#0e0e12] p-4 transition-colors hover:border-[#e8e6e1]/15"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded bg-[#16161b] shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover grayscale contrast-125 transition-all group-hover:grayscale-0"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-space text-[9px] text-[#c9a063] tracking-[0.25em]">
                              SPECIMEN {item.numeral}
                            </span>
                            <span className="font-space text-xs tracking-wider text-[#e8e6e1]">
                              ${item.price * item.quantity} USD
                            </span>
                          </div>
                          <h4 className="font-cormorant text-xl font-light text-[#e8e6e1]">
                            {item.name}
                          </h4>

                          {/* Grind selector */}
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {grindOptions.map((g) => (
                              <button
                                key={g}
                                onClick={() => {
                                  playClick();
                                  onUpdateGrind(item.id, g);
                                }}
                                className={`rounded px-2 py-0.5 font-space text-[8px] tracking-[0.15em] uppercase transition-colors ${
                                  item.grind === g
                                    ? "bg-[#c9a063] text-[#070708] font-semibold"
                                    : "bg-[#18181f] text-[#82807a] hover:text-[#e8e6e1]"
                                }`}
                              >
                                {g}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Quantity row */}
                      <div className="flex items-center justify-between border-t border-[#e8e6e1]/6 pt-2 font-space">
                        <button
                          onClick={() => {
                            playClick();
                            onRemoveItem(item.id);
                          }}
                          className="text-[9px] tracking-widest text-[#82807a] transition-colors hover:text-rose-400"
                        >
                          RELEASE
                        </button>
                        <div className="flex items-center gap-3 rounded border border-[#e8e6e1]/10 bg-[#14141a] px-2 py-1">
                          <button
                            onClick={() => {
                              playClick();
                              onUpdateQuantity(item.id, -1);
                            }}
                            className="text-[#82807a] hover:text-[#e8e6e1]"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs text-[#e8e6e1]">{item.quantity}</span>
                          <button
                            onClick={() => {
                              playClick();
                              onUpdateQuantity(item.id, 1);
                            }}
                            className="text-[#82807a] hover:text-[#e8e6e1]"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && !isSuccess && (
              <div className="border-t border-[#e8e6e1]/10 pt-5">
                <div className="flex items-center justify-between font-space text-xs tracking-[0.25em] text-[#82807a]">
                  <span>SUBTOTAL</span>
                  <span className="text-sm font-light text-[#e8e6e1]">${subtotal} USD</span>
                </div>
                <div className="mt-1 flex items-center justify-between font-space text-[9px] tracking-[0.25em] text-[#82807a]/70">
                  <span>DISPATCH ALLOCATION</span>
                  <span>COMPLIMENTARY</span>
                </div>

                <button
                  disabled={isCheckingOut}
                  onClick={handleCheckout}
                  className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-[#e8e6e1] py-3.5 font-space text-xs font-medium tracking-[0.3em] text-[#070708] uppercase transition-all hover:bg-[#c9a063] disabled:opacity-50 cursor-pointer"
                >
                  {isCheckingOut ? (
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#070708] animate-ping" />
                      <span>ALLOCATING BATCH...</span>
                    </div>
                  ) : (
                    <>
                      <span>Confirm Allocation</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="mt-3 flex items-center justify-center gap-2 text-center font-space text-[8px] text-[#82807a]/60 tracking-wider">
                  <ShieldCheck className="h-3 w-3 text-[#c9a063]" />
                  <span>VAULT DISPATCH // 256-BIT CRYOGENIC ENCRYPTION</span>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
