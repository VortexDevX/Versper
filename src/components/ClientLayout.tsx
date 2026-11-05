"use client";

import SmoothScroller from "@/components/ui/SmoothScroller";
import { SoundProvider } from "@/components/ui/SoundEngine";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SoundProvider>
      <SmoothScroller>{children}</SmoothScroller>
    </SoundProvider>
  );
}
