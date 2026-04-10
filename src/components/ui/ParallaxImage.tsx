"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  height?: string;
  speed?: number;
}

export default function ParallaxImage({
  src,
  alt,
  height = "60vh",
  speed = 10,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // speed maps to percentage movement. If speed is positive, y goes from -speed% to +speed%.
  // If speed is negative, y goes from +|speed|% to -|speed|%.
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed}%`, `${speed}%`]);

  return (
    <div
      ref={ref}
      className="image-hover-wrapper"
      style={{
        height: height,
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 20px 44px -12px rgba(0, 0, 0, 0.55)",
        border: "1px solid rgba(229, 228, 226, 0.12)",
      }}
    >
      <motion.div
        style={{
          y,
          width: "100%",
          height: "140%",
          top: "-20%",
          position: "absolute",
          left: 0,
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            filter: "grayscale(100%) brightness(0.62)",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </motion.div>
    </div>
  );
}
