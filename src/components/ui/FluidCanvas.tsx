"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export default function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    const particles: Particle[] = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let prevMouseX = -1000;
    let prevMouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Calculate cursor speed
      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Spawn fluid smoke particles along trajectory if mouse moved
      if (prevMouseX > 0 && speed > 2) {
        const count = Math.min(6, Math.floor(speed / 4));
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const force = Math.random() * 0.8;
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 15,
            y: mouseY + (Math.random() - 0.5) * 15,
            vx: dx * 0.05 + Math.cos(angle) * force,
            vy: dy * 0.05 + Math.sin(angle) * force - 0.3, // slight upward thermal drift
            life: 1,
            maxLife: Math.random() * 50 + 40,
            size: Math.random() * 32 + 16,
            color: Math.random() > 0.85 ? "rgba(201, 160, 99," : "rgba(232, 230, 225,",
          });
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update fluid smoke particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96; // drag
        p.vy *= 0.96;
        p.size += 0.4; // dissipation expansion
        p.life -= 1 / p.maxLife;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = Math.sin(p.life * Math.PI) * 0.045; // gentle bell curve opacity
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `${p.color} ${alpha})`);
        grad.addColorStop(0.6, `${p.color} ${alpha * 0.4})`);
        grad.addColorStop(1, `${p.color} 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-15"
      aria-hidden="true"
    />
  );
}
