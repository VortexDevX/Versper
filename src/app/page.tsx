"use client";

import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Story from "@/components/sections/Story";
import CallToAction from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <main className="bg-void" style={{ overflowX: "hidden" }}>
      <Hero />
      <Products />
      <Story />
      <CallToAction />
    </main>
  );
}
