"use client";

import SmoothScroller from "@/components/ui/SmoothScroller";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SmoothScroller>{children}</SmoothScroller>;
}
