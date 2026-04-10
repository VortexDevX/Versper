"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const storyLines = [
  "Born in the altitudes the world forgot,",
  "where light fails and the canopy reigns.",
  "",
  "We discarded the noise. We killed the light.",
  "What remains is absolute.",
  "",
  "Not a morning comfort.",
  "A midnight conviction.",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem",
        overflow: "hidden",
        backgroundColor: "#050505",
      }}
    >
      {/* Background Image with Parallax */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: "-10%",
            left: 0,
            width: "100%",
            height: "120%",
            y: imageY,
          }}
        >
          <img
            src="/images/story.png"
            alt="The Origin"
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
      </div>

      {/* Gradient overlays */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.9) 0%, transparent 30%, transparent 70%, rgba(5,5,5,0.9) 100%)",
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
          backgroundColor: "rgba(5,5,5,0.4)",
          zIndex: 2,
        }}
      />

      {/* Text Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "900px",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {storyLines.map((line, i) => {
            if (line === "") {
              return <div key={i} style={{ height: "2rem" }} />;
            }

            return (
              <motion.p
                key={i}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="font-cormorant text-platinum font-light"
                style={{
                  fontSize: "clamp(1.25rem, 4vw, 2.5rem)",
                  lineHeight: 1.6,
                  marginBottom: "0.5rem",
                }}
              >
                {line.split("").map((char, j) => (
                  <motion.span
                    key={j}
                    variants={charVariants}
                    style={{
                      display: "inline-block",
                      whiteSpace: char === " " ? "pre" : "normal",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
            );
          })}
        </div>

        {/* Decorative element */}
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            marginTop: "3rem",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span
            style={{
              width: "3rem",
              height: "1px",
              backgroundColor: "rgba(138,138,138,0.3)",
            }}
          />
          <span style={{ color: "#8A8A8A", fontSize: "0.5rem" }}>◆</span>
          <span
            style={{
              width: "3rem",
              height: "1px",
              backgroundColor: "rgba(138,138,138,0.3)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
