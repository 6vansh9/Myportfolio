import { useEffect, useRef, memo } from "react";
import { gsap } from "gsap";
import { RoughEase } from "gsap/EasePack";

gsap.registerPlugin(RoughEase);

// Reduce star count; use fewer animation segments
const STAR_COUNT = 120;
const ANIMATION_COUNT = 20;

const StarfieldBackground = memo(function StarfieldBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    container.innerHTML = "";

    const eases: gsap.EaseFunction[] = [];
    for (let i = 0; i < ANIMATION_COUNT; i++) {
      const strength = 1 + Math.random() * 2;
      const points = Math.floor(50 + Math.random() * 150);
      eases.push(
        gsap.parseEase(
          `rough({ template: none, strength: ${strength}, points: ${points}, taper: both, randomize: true, clamp: true })`,
        ),
      );
    }

    // Use a single DocumentFragment for batch DOM insertion
    const fragment = document.createDocumentFragment();
    const timelines: gsap.core.Timeline[] = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement("div");
      Object.assign(star.style, {
        position: "absolute",
        width: "4px",
        height: "4px",
        background: "white",
        borderRadius: "50%",
        left: `${Math.random() * width}px`,
        top: `${Math.random() * height}px`,
        transform: "translate(-50%, -50%) scale(0)",
        opacity: "0",
        pointerEvents: "none",
        boxShadow: "0 0 8px 2px white",
        willChange: "transform, opacity",
      });
      fragment.appendChild(star);

      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      for (let j = 0; j < ANIMATION_COUNT; j++) {
        const ease1 = eases[Math.floor(Math.random() * ANIMATION_COUNT)];
        const ease2 = eases[Math.floor(Math.random() * ANIMATION_COUNT)];
        tl.to(
          star,
          {
            opacity: 0.7 + Math.random() * 0.3,
            scale: 0.15 + Math.random() * 0.25,
            ease: ease1,
            duration: 0.3 + Math.random() * 0.7,
          },
          "+=" + (2 + Math.random() * 4),
        ).to(
          star,
          {
            opacity: 0,
            scale: 0,
            ease: ease2,
            duration: 0.3 + Math.random() * 0.7,
          },
          "+=" + (0.3 + Math.random() * 0.5),
        );
      }
      tl.progress(Math.random());
      timelines.push(tl);
    }
    container.appendChild(fragment);

    // Pause/resume on tab visibility
    const handleVisibility = () => {
      const paused = document.hidden;
      timelines.forEach((tl) => tl.paused(paused));
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      timelines.forEach((tl) => tl.kill());
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    />
  );
});

export default StarfieldBackground;
