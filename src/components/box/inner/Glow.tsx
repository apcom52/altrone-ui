import { MotionValue, useSpring } from 'motion/react';
import { RefObject, useEffect, useState } from 'react';
import s from '../box.module.scss';

interface GlowProps {
  contentRef: RefObject<HTMLDivElement | null>;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  isGlowMode: boolean;
}

export const Glow = ({
  contentRef,
  cursorX,
  cursorY,
  isGlowMode,
}: GlowProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const glowSize = contentRef.current?.getBoundingClientRect().height;

  const springCursorX = useSpring(cursorX, {
    stiffness: 200,
    damping: 20,
  });
  const springCursorY = useSpring(cursorY, {
    stiffness: 200,
    damping: 20,
  });

  useEffect(() => {
    const unsubX = springCursorX.on('change', (latestX) =>
      setCursorPosition((prev) => ({ ...prev, x: latestX }))
    );
    const unsubY = springCursorY.on('change', (latestY) =>
      setCursorPosition((prev) => ({ ...prev, y: latestY }))
    );
    return () => {
      unsubX();
      unsubY();
    };
  }, [springCursorX, springCursorY]);

  const shadowStyles = {
    background: `radial-gradient(circle at ${Math.round(
      cursorPosition.x
    )}px ${Math.round(
      cursorPosition.y
    )}px, var(--accent-4) 0%, var(--accent-a1) ${glowSize}px)`,
    opacity: isGlowMode ? 1 : 0,
  };

  if (!contentRef.current) return null;

  return <div className={s.Glow} style={shadowStyles} />;
};
