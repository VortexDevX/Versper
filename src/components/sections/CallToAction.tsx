"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CallToAction() {
  return (
    <section
      style={{
        padding: "10rem 1.5rem 6rem",
        backgroundColor: "#0b0b0c",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        {/* Expanding Line */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "rgba(166,166,166,0.35)",
            position: "relative",
            marginBottom: "4rem",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              height: "100%",
              backgroundColor: "#E5E4E2",
            }}
            initial={{ width: "0%", left: "50%" }}
            whileInView={{ width: "100%", left: "0%" }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
          />
        </div>

        {/* Heading */}
        <motion.h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
            color: "#E5E4E2",
            fontWeight: 300,
            letterSpacing: "0.05em",
            marginBottom: "3rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          The Inner Circle.
        </motion.h2>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2.5rem",
          }}
        >
          <motion.div
            className="input-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <input
              type="text"
              inputMode="email"
              autoComplete="off"
              placeholder="Enter your address"
              required
              suppressHydrationWarning
              className="premium-input"
              style={{
                fontFamily: "var(--font-space)",
                fontSize: "1.2rem",
                color: "#E5E4E2",
                width: "100%",
                textAlign: "center",
                padding: "1.5rem 0",
                letterSpacing: "0.15em",
              }}
            />
          </motion.div>

          <MagneticButton>
            <span
              style={{
                fontFamily: "var(--font-space)",
                fontSize: "0.8rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#A6A6A6",
                transition: "color 0.3s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E5E4E2")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#A6A6A6")}
            >
              Induct Me
            </span>
          </MagneticButton>
        </form>

        {/* Footer */}
        <div
          style={{
            marginTop: "8rem",
            borderTop: "1px solid rgba(166,166,166,0.24)",
            paddingTop: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-space)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "rgba(166,166,166,0.7)",
              textTransform: "uppercase",
            }}
          >
            © VESPER
          </p>
        </div>
      </div>
    </section>
  );
}
