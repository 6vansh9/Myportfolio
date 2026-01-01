import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { RoughEase } from "gsap/EasePack";

// Register the plugin if not already
gsap.registerPlugin(RoughEase);

const STAR_COUNT = 300;
const ANIMATION_COUNT = 50;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

export default function StarfieldBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous stars if any
    container.innerHTML = "";

    // Create stars
    const stars: HTMLDivElement[] = [];
    const eases: gsap.EaseFunction[] = [];

    // Fill the eases array
    for (let i = 0; i < ANIMATION_COUNT; i++) {
      const strength = random(1, 3);
      const points = Math.floor(random(50, 200));
      const roughString = `rough({ template: none, strength: ${strength}, points: ${points}, taper: both, randomize: true, clamp: true })`;
      const ease = gsap.parseEase(roughString);
      eases.push(ease);
    }

    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement("div");
      star.className = "star";
      container.appendChild(star);

      gsap.set(star, {
        position: "absolute",
        width: 4,
        height: 4,
        background: "white",
        borderRadius: "50%",
        left: random(WIDTH),
        top: random(HEIGHT),
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 0,
        pointerEvents: "none",
        boxShadow: "0 0 8px 2px white",
      });

      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      for (let j = 0; j < ANIMATION_COUNT; j++) {
        const ease1 = eases[Math.floor(random(ANIMATION_COUNT))];
        const ease2 = eases[Math.floor(random(ANIMATION_COUNT))];
        const alpha = random(0.7, 1);
        const scale = random(0.15, 0.4);
        const appear = "+=" + random(0.3, 0.8);
        const delay = "+=" + random(2, 6);
        const duration1 = random(0.3, 1);
        const duration2 = random(0.3, 1);

        tl.to(
          star,
          {
            opacity: alpha,
            scale: scale,
            ease: ease1,
            duration: duration1,
          },
          delay,
        ).to(
          star,
          {
            opacity: 0,
            scale: 0,
            ease: ease2,
            duration: duration2,
          },
          appear,
        );
      }
      tl.progress(random(1));
      stars.push(star);
    }

    // Cleanup on unmount
    return () => {
      gsap.globalTimeline.clear();
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
}

// Utility
function random(min: number, max?: number) {
  if (max == null) {
    max = min;
    min = 0;
  }
  if (min > max) {
    const tmp = min;
    min = max;
    max = tmp;
  }
  return min + (max - min) * Math.random();
}
