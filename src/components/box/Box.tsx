import { memo, useState, useCallback, useRef } from 'react';
import { BoxProps } from './Box.types';
import { clsx } from 'clsx';
import s from './box.module.scss';

export const Box = memo<BoxProps>(({ children, ...props }) => {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [cursorPressure, setCursorPressure] = useState(0);
  const [isGlowMode, setIsGlowMode] = useState(false);

  console.log('>> pressure', cursorPressure);

  const {
    surface = 'solid',
    interaction = 'hover',
    radius = 's',
    dummy = false,
    offset = 0,
    inset = 0,
    shadow = '2',
    style,
    width,
    height,
    align,
    justify,
  } = props;

  const contentCls = clsx(s.Content, {
    [s.Solid]: surface === 'solid',
    [s.Translucent]: surface === 'translucent',
    [s.Transparent]: surface === 'transparent',
    [s.NoShadow]: shadow === 'none',
  });

  const radiusValue =
    typeof radius === 'number'
      ? `${radius}px`
      : ['none', 'mini', 's', 'm', 'l', 'xl', 'circle'].includes(radius)
      ? `var(--radius-${radius})`
      : undefined;

  const styles = {
    ...style,
    borderRadius: radiusValue,
    padding: inset || undefined,
    margin: offset || undefined,
    width: width || undefined,
    height: height || undefined,
    alignItems: align || undefined,
    justifyContent: justify || undefined,
    '--box-shadow': `var(--shadow-${shadow})`,
  };

  const shadowOpacity = isGlowMode ? 1 : 0;

  const shadowStyles = {
    borderRadius: radiusValue,
    background: `radial-gradient(circle at ${cursorX}px ${cursorY}px, var(--box-glow-cursor-color) ${cursorPressure}%, var(--box-glow-background-color) 100%)`,
    opacity: shadowOpacity,
  };

  // Колбеки для отслеживания позиции курсора относительно Box
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Используем макротаск для низкого приоритета
    requestAnimationFrame(() => {
      if (!contentRef.current) return;
      setIsGlowMode(true);
      const rect = contentRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursorX(x);
      setCursorY(y);
    });
  }, []);

  const handleMouseDown = useCallback(() => {
    console.log('>> down');
    setCursorPressure((old) => (old < 10 ? 10 : old + 1));
  }, []);

  const handleMouseUp = useCallback(() => {
    setCursorPressure(0);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursorPressure(0);
    setIsGlowMode(false);

    setTimeout(() => {
      if (!isGlowMode) {
        setCursorX(0);
        setCursorY(0);
      }
    }, 200);
  }, []);

  return (
    <div
      className={clsx(s.Box, {
        [s.Dummy]: dummy,
      })}
    >
      <div
        className={contentCls}
        style={styles}
        ref={contentRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {children}
        <div className={s.Shadow} style={shadowStyles} />
      </div>
    </div>
  );
});
