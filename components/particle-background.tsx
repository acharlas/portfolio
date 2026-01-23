"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | undefined>(undefined);
  const canvasSize = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    if (prefersReducedMotion.matches) return;

    // Set canvas to full screen
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      canvasSize.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      initParticles();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Initialize particles
    function initParticles() {
      if (!canvas) return;

      particles.current = [];
      const particleCount = Math.min(
        Math.floor(canvasSize.current.width / 5),
        200
      ); // Responsive particle count

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvasSize.current.width,
          y: Math.random() * canvasSize.current.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`, // Blue with varying opacity
        });
      }
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvasSize.current.width, canvasSize.current.height);

      // Update and draw particles
      particles.current.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (
          particle.x > canvasSize.current.width ||
          particle.x < 0
        ) {
          particle.speedX = -particle.speedX;
        }
        if (
          particle.y > canvasSize.current.height ||
          particle.y < 0
        ) {
          particle.speedY = -particle.speedY;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Connect particles with lines if they're close enough
        connectParticles(particle, index);
      });

      animationFrameId.current = requestAnimationFrame(animate);
    }

    // Connect particles with lines if they're close enough
    function connectParticles(particle: Particle, index: number) {
      if (!ctx) return;
      const maxDistance = 100;
      const maxDistanceSq = maxDistance * maxDistance;

      for (let i = index + 1; i < particles.current.length; i++) {
        const dx = particle.x - particles.current[i].x;
        const dy = particle.y - particles.current[i].y;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < maxDistanceSq) {
          const distance = Math.sqrt(distanceSq);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 162, 255, ${
            0.1 * (1 - distance / maxDistance)
          })`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particles.current[i].x, particles.current[i].y);
          ctx.stroke();
        }
      }
    }

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current !== undefined) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-70 motion-reduce:hidden"
      aria-hidden="true"
    />
  );
}
