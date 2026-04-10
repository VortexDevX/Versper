import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VESPER — Darkness, distilled.",
  description:
    "Forged in the shadows of forgotten altitudes. This is not a morning drink. It is a midnight ritual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${space.variable}`}>
      <body className="font-space bg-void text-platinum antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
