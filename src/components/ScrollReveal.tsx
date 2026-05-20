import { useRef } from "react";
import { motion, useInView, type Variant } from "motion/react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  scale?: number;
  once?: boolean;
  threshold?: number;
  as?: "div" | "section" | "article" | "footer";
}

const directionOffset = (direction: Direction, distance: number): { x: number; y: number } => {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    case "none":
      return { x: 0, y: 0 };
  }
};

export default function ScrollReveal({
  children,
  className,
  direction = "up",
  distance = 40,
  duration = 0.6,
  delay = 0,
  scale,
  once = true,
  threshold = 0.15,
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const offset = directionOffset(direction, distance);

  const hidden: Variant = {
    opacity: 0,
    x: offset.x,
    y: offset.y,
    ...(scale !== undefined && { scale }),
  };

  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
    ...(scale !== undefined && { scale: 1 }),
  };

  const Component = motion[as] || motion.div;

  return (
    <Component
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={{ willChange: isInView ? "auto" : "transform, opacity" }}
    >
      {children}
    </Component>
  );
}
