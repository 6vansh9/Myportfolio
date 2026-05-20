"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useCallback } from "react";

interface ShootingStar {
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * window.innerWidth;

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 };
    case 1:
      return { x: window.innerWidth, y: offset, angle: 135 };
    case 2:
      return { x: offset, y: window.innerHeight, angle: 225 };
    case 3:
      return { x: 0, y: offset, angle: 315 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 4200,
  maxDelay = 8700,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 20,
  starHeight = 1,
  className,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const starRef = useRef<ShootingStar | null>(null);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const createStar = useCallback(() => {
    const { x, y, angle } = getRandomStartPoint();
    starRef.current = {
      x,
      y,
      angle,
      scale: 1,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      distance: 0,
    };
  }, [minSpeed, maxSpeed]);

  useEffect(() => {
    let disposed = false;

    const animate = () => {
      if (disposed) return;
      const star = starRef.current;
      const rect = rectRef.current;

      if (star && rect) {
        const rad = (star.angle * Math.PI) / 180;
        star.x += star.speed * Math.cos(rad);
        star.y += star.speed * Math.sin(rad);
        star.distance += star.speed;
        star.scale = 1 + star.distance / 100;

        if (
          star.x < -20 ||
          star.x > window.innerWidth + 20 ||
          star.y < -20 ||
          star.y > window.innerHeight + 20
        ) {
          // Star went off screen — hide it and schedule next
          starRef.current = null;
          rect.setAttribute("visibility", "hidden");
          const delay = Math.random() * (maxDelay - minDelay) + minDelay;
          timerRef.current = setTimeout(() => {
            createStar();
            rect.setAttribute("visibility", "visible");
          }, delay);
        } else {
          const w = starWidth * star.scale;
          rect.setAttribute("x", String(star.x));
          rect.setAttribute("y", String(star.y));
          rect.setAttribute("width", String(w));
          rect.setAttribute(
            "transform",
            `rotate(${star.angle}, ${star.x + w / 2}, ${star.y + starHeight / 2})`,
          );
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    // Kick off the first star
    createStar();
    rafRef.current = requestAnimationFrame(animate);

    // Pause when tab hidden
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [createStar, minDelay, maxDelay, starWidth, starHeight]);

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-full absolute inset-0 pointer-events-none", className)}
    >
      <rect
        ref={rectRef}
        x={0}
        y={0}
        width={starWidth}
        height={starHeight}
        fill="url(#gradient)"
        visibility="hidden"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
