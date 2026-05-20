import { useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  distance?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
  threshold?: number;
  as?: "div" | "ul" | "ol" | "section";
}

const getOffset = (direction: string, distance: number) => {
  switch (direction) {
    case "up": return { y: distance };
    case "down": return { y: -distance };
    case "left": return { x: distance };
    case "right": return { x: -distance };
    default: return { y: distance };
  }
};

export default function StaggerChildren({
  children,
  className,
  stagger = 0.06,
  duration = 0.5,
  distance = 30,
  direction = "up",
  once = true,
  threshold = 0.1,
  as = "div",
}: StaggerChildrenProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const offset = getOffset(direction, distance);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: {
      opacity: 0,
      ...offset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item} style={{ willChange: isInView ? "auto" : "transform, opacity" }}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={item}>{children}</motion.div>
      }
    </MotionComponent>
  );
}
