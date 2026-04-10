"use client";

import { motion } from "framer-motion";
import ParallaxImage from "@/components/ui/ParallaxImage";

const products = [
  {
    id: 1,
    numeral: "I",
    name: "The Void",
    description:
      "The absence of everything. An uncompromising dark roast yielding smoked cedar, black truffle, and the quiet of volcanic ash.",
    price: "$48",
    image: "/images/void.png",
    reverse: false,
    fullWidth: false,
  },
  {
    id: 2,
    numeral: "II",
    name: "Eclipse",
    description:
      "The point of surrender. A medium roast reduced to its core—tart cherry, raw cacao, and the bite of cold iron.",
    price: "$52",
    image: "/images/eclipse.png",
    reverse: true,
    fullWidth: false,
  },
  {
    id: 3,
    numeral: "III",
    name: "Silhouette",
    description:
      "The residue of a shadow. Decaf, unbroken. A velvety whisper of burnt caramel, dark rum, and nightshade.",
    price: "$44",
    image: "/images/silhouette.png",
    reverse: false,
    fullWidth: true,
  },
];

const ProductText = ({ product }: { product: (typeof products)[0] }) => (
  <motion.div
    initial={{ opacity: 0, x: product.reverse ? 50 : -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <motion.span
      style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "8rem",
        color: "rgba(166,166,166,0.46)",
        lineHeight: 1,
        display: "block",
        marginBottom: "-1.5rem",
        userSelect: "none",
      }}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {product.numeral}
    </motion.span>

    <h2
      style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "clamp(3rem, 5vw, 5rem)",
        letterSpacing: "0.05em",
        color: "#E5E4E2",
        marginBottom: "2rem",
        fontWeight: 300,
      }}
    >
      {product.name}
    </h2>
    <p
      style={{
        fontFamily: "var(--font-space)",
        fontSize: "1rem",
        lineHeight: 1.8,
        color: "#A6A6A6",
        maxWidth: "400px",
        marginBottom: "2.5rem",
      }}
    >
      {product.description}
    </p>
    <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
      <span
        className="transition-colors duration-300"
        style={{
          fontFamily: "var(--font-space)",
          fontSize: "1rem",
          letterSpacing: "0.2em",
          color: "#A6A6A6",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#E5E4E2")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#A6A6A6")}
      >
        {product.price}
      </span>
      <div
        style={{
          height: "1px",
          width: "3rem",
          backgroundColor: "rgba(166,166,166,0.5)",
        }}
      />
      <button
        className="hover-underline"
        style={{
          fontFamily: "var(--font-space)",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#A6A6A6",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          transition: "color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#E5E4E2")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#A6A6A6")}
      >
        Acquire
      </button>
    </div>
  </motion.div>
);

export default function Products() {
  return (
    <section
      id="products"
      style={{ padding: "8rem 1.5rem", backgroundColor: "#0b0b0c" }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <motion.div
          style={{
            marginBottom: "6rem",
            borderBottom: "1px solid rgba(166,166,166,0.35)",
            paddingBottom: "1.5rem",
          }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p
            style={{
              fontFamily: "var(--font-space)",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#A6A6A6",
            }}
          >
            The Canon
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8rem" }}>
          {products.map((product, index) =>
            product.fullWidth ? (
              <motion.div
                key={product.id}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "70vh",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 20px 44px -12px rgba(0, 0, 0, 0.55)",
                  border: "1px solid rgba(229, 228, 226, 0.12)",
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ParallaxImage
                  src={product.image}
                  alt={product.name}
                  height="100%"
                  speed={-8}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(11,11,12,0.78) 0%, rgba(11,11,12,0) 60%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "4rem",
                    zIndex: 10,
                  }}
                >
                  <ProductText product={product} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={product.id}
                style={{
                  display: "flex",
                  flexDirection: product.reverse ? "row-reverse" : "row",
                  alignItems: "center",
                  gap: "4rem",
                  flexWrap: "wrap",
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
                  <ParallaxImage
                    src={product.image}
                    alt={product.name}
                    height="60vh"
                  />
                </div>

                <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
                  <ProductText product={product} />
                </div>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
