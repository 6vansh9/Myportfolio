import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const splitRef = useRef<SplitText | null>(null);
  const isHoveringRef = useRef<boolean>(false);

  useEffect(() => {
    if (!rootRef.current || !textRef.current) return;

    const split = SplitText.create(textRef.current, {
      type: 'chars',
      charsClass: 'inline-block will-change-transform'
    });

    splitRef.current = split;

    split.chars.forEach(el => {
      const c = el as HTMLElement;
      gsap.set(c, { attr: { 'data-content': c.innerHTML } });
    });

    const handleEnter = () => {
      isHoveringRef.current = true;

      // Instant color change to white
      if (textRef.current) {
        textRef.current.style.color = '#ffffff';
      }

      // Scramble animation
      split.chars.forEach(el => {
        const c = el as HTMLElement;
        gsap.to(c, {
          overwrite: true,
          duration: duration,
          scrambleText: {
            text: c.dataset.content || '',
            chars: scrambleChars,
            speed
          },
          ease: 'none'
        });
      });
    };

    const handleLeave = () => {
      isHoveringRef.current = false;

      // Instant color change to gray
      if (textRef.current) {
        textRef.current.style.color = '#9ca3af';
      }

      // Let the scramble animation complete naturally
      // Don't kill it - just let it finish
    };

    const el = rootRef.current;
    el.addEventListener('pointerenter', handleEnter);
    el.addEventListener('pointerleave', handleLeave);

    return () => {
      el.removeEventListener('pointerenter', handleEnter);
      el.removeEventListener('pointerleave', handleLeave);
      split.revert();
    };
  }, [duration, speed, scrambleChars]);

  return (
    <div
      ref={rootRef}
      className={className}
      style={style}
    >
      <p ref={textRef} style={{ color: '#9ca3af' }}>{children}</p>
    </div>
  );
};

export default ScrambledText;