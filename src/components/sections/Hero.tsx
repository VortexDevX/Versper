"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background with Parallax */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          y: imageY,
          scale: imageScale,
          zIndex: 0,
        }}
      >
        <img
          src="/images/hero.png"
          alt="Vesper Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(100%) brightness(1)",
          }}
        />
      </motion.div>

      {/* Gradient Overlays */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.8) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.9) 100%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to right, rgba(5,5,5,0.3) 0%, transparent 50%, rgba(5,5,5,0.3) 100%)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 1.5rem",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Brand Name */}
        <motion.h1
          className="font-cormorant font-light text-platinum select-none"
          style={{
            fontSize: "clamp(2.5rem, 15vw, 14rem)",
            letterSpacing: "0.2em",
            lineHeight: 0.9,
            paddingLeft: "0.2em",
          }}
          initial={{ opacity: 0, scale: 1.05, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          VESPER
        </motion.h1>

        {/* Separator */}
        <motion.div
          style={{ margin: "2rem 0" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span style={{ color: "#8A8A8A", fontSize: "0.6rem" }}>◆</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-space uppercase text-gunmetal"
          style={{
            fontSize: "clamp(0.55rem, 1.5vw, 0.9rem)",
            letterSpacing: "0.35em",
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          The quiet absolute
        </motion.p>

        {/* CTA */}
        <motion.div
          style={{ marginTop: "3rem" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1 }}
        >
          <motion.button
            onClick={scrollToProducts}
            className="group font-space uppercase cursor-pointer"
            style={{
              position: "relative",
              fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
              letterSpacing: "0.3em",
              background: "transparent",
              border: "none",
              color: "#8A8A8A",
              padding: "1rem 2rem",
              transition: "color 0.5s ease",
            }}
            whileHover={{ scale: 1.05, color: "#E5E4E2" }}
            whileTap={{ scale: 0.98 }}
          >
            Begin the Ritual
            {/* Animated underline */}
            <motion.span
              style={{
                position: "absolute",
                bottom: "0.5rem",
                left: "2rem",
                right: "2rem",
                height: "1px",
                backgroundColor: "#E5E4E2",
                transformOrigin: "left",
              }}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </motion.button>
        </motion.div>

        {/* Scroll indicator - desktop only */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
          className="hidden sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            style={{
              width: "1px",
              height: "3rem",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(138,138,138,0.5) 50%, rgba(138,138,138,1) 100%)",
            }}
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
