import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'motion/react';
import s from './styles.module.scss';
import { GlassSurfaceProps } from './GlassSurface.types';
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import { useGlassValues } from './useGlassValues';

export const GlassSurface = ({
  children,
  as: Component = 'div',
  glow = false,
  color = 'default',
  size = 1,
  blur = 64,
  opacity = 0.5,
  radius = 8,
  fixed = false,
  cursorSpeed = 0.2,
  className,
  contentClassName,
  childrenClassName,
  style,
  ...restProps
}: GlassSurfaceProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowOpacity = useMotionValue(0);
  const glowSize = useMotionValue(75);
  const boxContentBackground = useMotionValue(1);
  const springX = useSpring(glowX, { damping: 20, stiffness: 150 });
  const springY = useSpring(glowY, { damping: 20, stiffness: 150 });
  const springOpacity = useSpring(glowOpacity, { damping: 20, stiffness: 150 });
  const springSize = useSpring(glowSize, { damping: 20, stiffness: 150 });
  const springBoxContentBackground = useSpring(boxContentBackground, {
    damping: 20,
    stiffness: 150,
  });

  const themeValues = useGlassValues();

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      glowOpacity.set(themeValues.GLOW_OPACITY);
      const rect = boxRef.current?.getBoundingClientRect?.() || {
        left: 0,
        top: 0,
      };
      glowX.set(e.clientX - rect.left);
      glowY.set(e.clientY - rect.top);
    },
    [themeValues]
  );

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const rect = boxRef.current?.getBoundingClientRect() || {
        left: 0,
        top: 0,
      };
      glowX.set(e.clientX - rect.left);
      glowY.set(e.clientY - rect.top);
    },
    []
  );

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> =
    useCallback(() => {
      glowOpacity.set(0);
    }, []);

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      glowOpacity.set(themeValues.GLOW_ACTIVE_OPACITY);
      glowSize.set(85);
      boxContentBackground.set(themeValues.BACKGROUND_ACTIVE);
    },
    [themeValues]
  );

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    glowOpacity.set(themeValues.GLOW_OPACITY);
    glowSize.set(75);
    boxContentBackground.set(themeValues.BACKGROUND_DEFAULT);
  }, [themeValues]);

  const cls = clsx(s.Box, className);
  const boxStyles = {
    ...style,
    borderRadius: radius,
  };

  useEffect(() => {
    boxContentBackground.set(themeValues.BACKGROUND_DEFAULT);
    glowOpacity.set(0);
  }, [themeValues]);

  const glowBackground = useMotionTemplate`radial-gradient(circle at ${springX}px ${springY}px, white 0%, transparent ${springSize}%)`;
  const glowOpacityValue = useMotionTemplate`${springOpacity}`;
  const boxContentBackgroundValue = useMotionTemplate`radial-gradient(circle at top left,color(display-p3 ${springBoxContentBackground} ${springBoxContentBackground} ${springBoxContentBackground} / 0.5),color(display-p3 ${springBoxContentBackground} ${springBoxContentBackground} ${springBoxContentBackground} / 0.3))`;

  return (
    <motion.div
      ref={boxRef}
      className={cls}
      onMouseEnter={glow ? handleMouseEnter : undefined}
      onMouseMove={glow ? handleMouseMove : undefined}
      onMouseLeave={glow ? handleMouseLeave : undefined}
      onMouseDown={glow ? handleMouseDown : undefined}
      onMouseUp={glow ? handleMouseUp : undefined}
      style={boxStyles}
      {...restProps}
    >
      <motion.div
        className={clsx(s.BoxContent, contentClassName)}
        style={{ background: boxContentBackgroundValue }}
      >
        <div className={clsx(s.BoxChildren, childrenClassName)}>{children}</div>

        <motion.div
          className={s.Glow}
          style={{
            background: glowBackground,
            opacity: glowOpacityValue,
          }}
        />
      </motion.div>
    </motion.div>
  );
};
