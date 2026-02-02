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

const MAX_CONNECTION_DISTANCE = 100;
const MAX_CONNECTION_DISTANCE_SQ =
  MAX_CONNECTION_DISTANCE * MAX_CONNECTION_DISTANCE;
const MIN_CONNECTION_WIDTH = 768;
const CELL_SIZE = MAX_CONNECTION_DISTANCE;
const MAX_PARTICLE_COUNT = 200;
const TARGET_CONNECTION_PARTICLES = 140;
const MAX_CONNECTION_LINES = 300;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | undefined>(undefined);
  const canvasSize = useRef({ width: 0, height: 0 });
  const gridRef = useRef<{
    cells: number[][];
    columns: number;
    rows: number;
  }>({ cells: [], columns: 0, rows: 0 });
  const frameCounter = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    if (prefersReducedMotion.matches) return;

    function initGrid() {
      const columns = Math.max(
        1,
        Math.ceil(canvasSize.current.width / CELL_SIZE)
      );
      const rows = Math.max(
        1,
        Math.ceil(canvasSize.current.height / CELL_SIZE)
      );
      const totalCells = columns * rows;
      const cells = new Array<number[]>(totalCells);

      for (let i = 0; i < totalCells; i++) {
        cells[i] = [];
      }

      gridRef.current = { cells, columns, rows };
    }

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

      initGrid();
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
        MAX_PARTICLE_COUNT
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

      // Update particle positions
      particles.current.forEach((particle) => {
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
      });

      // Draw particles
      particles.current.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      const enableConnections = canvasSize.current.width >= MIN_CONNECTION_WIDTH;
      if (enableConnections) {
        frameCounter.current += 1;
        if (!gridRef.current.columns || !gridRef.current.rows) {
          initGrid();
        }

        const { cells, columns, rows } = gridRef.current;

        for (const cell of cells) {
          cell.length = 0;
        }

        const connectionStride = Math.max(
          1,
          Math.ceil(particles.current.length / TARGET_CONNECTION_PARTICLES)
        );
        const strideOffset = frameCounter.current % connectionStride;
        let lineCount = 0;

        particles.current.forEach((particle, index) => {
          const cellX = Math.min(
            columns - 1,
            Math.max(0, Math.floor(particle.x / CELL_SIZE))
          );
          const cellY = Math.min(
            rows - 1,
            Math.max(0, Math.floor(particle.y / CELL_SIZE))
          );
          cells[cellY * columns + cellX].push(index);
        });

        // Connect particles with lines if they're close enough
        particles.current.forEach((particle, index) => {
          if (lineCount >= MAX_CONNECTION_LINES) return;
          connectParticles(
            particle,
            index,
            cells,
            columns,
            rows,
            connectionStride,
            strideOffset,
            () => lineCount >= MAX_CONNECTION_LINES,
            () => {
              lineCount += 1;
            }
          );
        });
      }

      animationFrameId.current = requestAnimationFrame(animate);
    }

    // Connect particles with lines if they're close enough
    function connectParticles(
      particle: Particle,
      index: number,
      cells: number[][],
      columns: number,
      rows: number,
      connectionStride: number,
      strideOffset: number,
      isLineLimitReached: () => boolean,
      onLineDrawn: () => void
    ) {
      if (!ctx) return;
      if ((index - strideOffset) % connectionStride !== 0) return;
      const cellX = Math.min(
        columns - 1,
        Math.max(0, Math.floor(particle.x / CELL_SIZE))
      );
      const cellY = Math.min(
        rows - 1,
        Math.max(0, Math.floor(particle.y / CELL_SIZE))
      );

      for (let offsetY = -1; offsetY <= 1; offsetY++) {
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
          const neighborX = cellX + offsetX;
          const neighborY = cellY + offsetY;
          if (neighborX < 0 || neighborX >= columns) continue;
          if (neighborY < 0 || neighborY >= rows) continue;

          const bucket = cells[neighborY * columns + neighborX];
          for (const neighborIndex of bucket) {
            if (neighborIndex <= index) continue;
            if ((neighborIndex - strideOffset) % connectionStride !== 0) {
              continue;
            }

            const neighbor = particles.current[neighborIndex];
            const dx = particle.x - neighbor.x;
            const dy = particle.y - neighbor.y;
            const distanceSq = dx * dx + dy * dy;

            if (distanceSq < MAX_CONNECTION_DISTANCE_SQ) {
              if (isLineLimitReached()) return;
              const distance = Math.sqrt(distanceSq);
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0, 162, 255, ${
                0.1 * (1 - distance / MAX_CONNECTION_DISTANCE)
              })`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(neighbor.x, neighbor.y);
              ctx.stroke();
              onLineDrawn();
            }
          }
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
