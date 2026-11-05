"use client";

import React, { useState } from "react";
import Preloader from "@/components/ui/Preloader";
import AmbientAtmosphere from "@/components/ui/AmbientAtmosphere";
import FluidCanvas from "@/components/ui/FluidCanvas";
import Navbar from "@/components/ui/Navbar";
import RitualBagDrawer, { CartItem } from "@/components/ui/RitualBagDrawer";

import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Story from "@/components/sections/Story";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id && item.grind === newItem.grind);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id && item.grind === newItem.grind
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, newItem];
    });
    setIsBagOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleUpdateGrind = (id: string, grind: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, grind } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-[#070708] text-[#e8e6e1]">
      {/* 1. Cinematic Typographic Preloader */}
      <Preloader />

      {/* 2. Atmospheric Effects: Analog Noise + Radial Mouse Spotlight */}
      <AmbientAtmosphere />

      {/* 3. Fluid Interactive Dark Smoke Trail (loved by user) */}
      <FluidCanvas />

      {/* 4. Minimalist Brutalist Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsBagOpen(true)}
      />

      {/* 5. Slide-Over Allocation Bag */}
      <RitualBagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateGrind={handleUpdateGrind}
        onRemoveItem={handleRemoveItem}
      />

      {/* 6. Coherent Core Acts: Arrival -> Canon -> Origin -> Induction */}
      <main className="relative z-1">
        <Hero />
        <Products onAddToCart={handleAddToCart} />
        <Story />
        <CallToAction />
      </main>

      {/* 7. Monolithic Footer */}
      <Footer />
    </div>
  );
}
