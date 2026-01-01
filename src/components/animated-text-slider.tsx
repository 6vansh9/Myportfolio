"use client";
import { useState, useEffect } from "react";

export function AnimatedTextSlider({ 
  texts = ["Text 1", "Text 2", "Text 3"],
  interval = 3500,
  className = ""
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <div className={`relative h-[1.5em] overflow-hidden w-full ${className}`}>
      {texts.map((text, i) => {
        const isCurrent = i === index;
        const isPrev = i === (index - 1 + texts.length) % texts.length;
        
        const shouldTransition = isCurrent || isPrev;
        
        let transformClass = "translate-y-full";
        let opacityClass = "opacity-0";
        
        if (isCurrent) {
          transformClass = "translate-y-0";
          opacityClass = "opacity-100";
        }
        if (isPrev) {
          transformClass = "-translate-y-full";
          opacityClass = "opacity-0";
        }

        return (
          <div 
            key={i} 
            className={`absolute font-mono text-gray-500 h-[1.5em] left-0 w-full ${transformClass} ${opacityClass} ${shouldTransition ? "transition-all duration-700 ease-in-out" : ""}`}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
}
