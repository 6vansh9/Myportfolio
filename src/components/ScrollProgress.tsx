import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(to right, #52525b, #a1a1aa, #d4d4d8)",
      }}
    />
  );
}
