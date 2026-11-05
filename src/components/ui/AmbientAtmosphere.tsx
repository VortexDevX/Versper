"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AmbientAtmosphere() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mouse spotlight tracker
  useEffect(() => {
    let frameId: number;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updateGlow = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      setMousePos({ x: Math.round(currentX), y: Math.round(currentY) });
      frameId = requestAnimationFrame(updateGlow);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    frameId = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Floating ash & steam particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Particle definition: 26 delicate ash/ember particles
    const particleCount = 26;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      speedY: Math.random() * 0.35 + 0.15,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.45 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseAngle: Math.random() * Math.PI * 2,
    }));

    let animFrame: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.pulseAngle += p.pulseSpeed;
        const currentOpacity = p.opacity + Math.sin(p.pulseAngle) * 0.12;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Soft amber-tinted ash ember
        ctx.fillStyle = `rgba(225, 200, 175, ${Math.max(0.04, currentOpacity)})`;
        ctx.fill();
      });

      animFrame = requestAnimationFrame(render);
    };

    animFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      {/* 1. Analog Film Grain Texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* 2. Interactive Ambient Mouse Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-700"
        aria-hidden="true"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 163, 115, 0.045), rgba(14, 14, 18, 0.015) 45%, transparent 75%)`,
        }}
      />

      {/* 3. Floating Ash / Steam Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-1"
        aria-hidden="true"
      />
    </>
  );
}
