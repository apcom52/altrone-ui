import { memo, useState, useCallback, useRef, createElement } from 'react';
import { BoxProps } from './Box.types';
import { clsx } from 'clsx';
import s from './box.module.scss';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { BOX_LOWER_SHADOW, BOX_UPPER_SHADOW } from './Box.constants';
import { Glow } from './inner/Glow';

export const Box = memo<BoxProps>(({ children, ...props }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isGlowMode, setIsGlowMode] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const {
    as = 'div',
    surface = 'solid',
    interaction = [],
    color = 'none',
    radius = 's',
    offset = 0,
    inset = 0,
    shadow = '1',
    style,
    width,
    height,
    alignX = 'start',
    alignY = 'start',
    className,
    focusable = true,
    ref,
    contentClassName,
    cursor = 'default',
    ...restProps
  } = props;

  const isInputElement = as === 'input' || as === 'textarea';

  const contentCls = clsx(
    s.Content,
    {
      [s.Solid]: surface === 'solid',
      [s.Translucent]: surface === 'translucent',
      [s.Transparent]: surface === 'transparent',
      [s.NoShadow]: shadow === 'none',
      [s.Accent]: color === 'accent',
      [s.Input]: isInputElement,
    },
    className
  );

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
    alignItems: alignX || undefined,
    justifyContent: alignY || undefined,
    boxShadow: `var(--box-light-shadow), var(--box-outline-shadow), var(--shadow-${shadow})`,
    cursor: cursor || undefined,
  };

  const focusInteraction: Record<string, boolean> = {};
  const hoverInteraction: Record<string, boolean> = {};
  const pressInteraction: Record<string, boolean> = {};

  interaction.forEach((item) => {
    const [type, effect] = item.split(':');
    if (type === 'focus') {
      focusInteraction[effect] = true;
    } else if (type === 'hover') {
      hoverInteraction[effect] = true;
    } else if (type === 'press') {
      pressInteraction[effect] = true;
    }
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    requestAnimationFrame(() => {
      if (!contentRef.current) return;
      setIsGlowMode(true);
      const rect = contentRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cursorX.set(x);
      cursorY.set(y);
    });
  }, []);

  const handleFocus = useCallback(() => {
    requestAnimationFrame(() => {
      if (!isGlowMode) {
        if (!contentRef.current) return;
        setIsGlowMode(true);
        cursorX.set(0);
        cursorY.set(0);
      }
    });
  }, [isGlowMode]);

  const handleBlur = useCallback(() => {
    setIsGlowMode(false);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (
      pressInteraction.glow &&
      !hoverInteraction.glow &&
      !focusInteraction.glow
    ) {
      setIsGlowMode(false);
    }
  }, [pressInteraction.glow, hoverInteraction.glow]);

  const whileFocus = {
    ...(focusInteraction.scale && { scale: 0.99 }),
    ...(focusInteraction.background && {
      background: 'var(--box-focus-background-color)',
    }),
    ...(focusInteraction.shadow && {
      boxShadow: `var(--box-light-shadow), var(--box-outline-shadow), var(--shadow-${BOX_UPPER_SHADOW[shadow]})`,
    }),
  };
  const whileHover = {
    ...(hoverInteraction.scale && { scale: 1.02 }),
    ...(hoverInteraction.background && {
      background: 'var(--box-hover-background-color)',
    }),
    ...(hoverInteraction.shadow && {
      boxShadow: `var(--box-light-shadow), var(--box-outline-shadow), var(--shadow-${BOX_UPPER_SHADOW[shadow]})`,
    }),
  };
  const whilePress = {
    ...(pressInteraction.scale && { scale: 0.98 }),
    ...(pressInteraction.background && {
      background: 'var(--box-press-background-color)',
    }),
    ...(pressInteraction.shadow && {
      boxShadow: `var(--box-light-shadow), var(--box-outline-shadow), var(--shadow-${BOX_LOWER_SHADOW[shadow]})`,
    }),
  };

  const boxCls = clsx(s.Box, {
    [s.Outline_focus]: focusInteraction.outline,
    [s.Outline_hover]: hoverInteraction.outline,
    [s.Outline_press]: pressInteraction.outline,
  });

  const MotionComponent = motion[as];

  const motionProps = {
    ...restProps,
    onDrag: undefined,
    onDragStart: undefined,
    onDragEnd: undefined,
    onDragEnter: undefined,
    onDragLeave: undefined,
    onDragOver: undefined,
    onDrop: undefined,
  };

  const initialState = {
    scale: 1,
    background: 'var(--box-background-color)',
    boxShadow: `var(--box-light-shadow), var(--box-outline-shadow), var(--shadow-${shadow})`,
  };

  const isGlowMouseEffectActive =
    hoverInteraction.glow || pressInteraction.glow;

  const contentEventHandlers = {
    onMouseMove: isGlowMouseEffectActive ? handleMouseMove : undefined,
    onMouseDown: pressInteraction.glow ? handleMouseMove : undefined,
    onMouseUp: pressInteraction.glow ? handleMouseUp : undefined,
    onFocus: focusInteraction.glow ? handleFocus : undefined,
    onBlur: focusInteraction.glow ? handleBlur : undefined,
    onMouseLeave:
      hoverInteraction.glow || pressInteraction.glow ? handleBlur : undefined,
  };

  if (isInputElement) {
    return (
      <div className={boxCls}>
        <div className={s.InputContent} style={{ borderRadius: radiusValue }}>
          <MotionComponent
            initial={initialState}
            className={contentCls}
            whileFocus={whileFocus}
            whileHover={whileHover}
            whileTap={whilePress}
            tabIndex={
              focusable === true || focusable === 0 ? 0 : focusable || undefined
            }
            style={styles}
            placeholder={children}
            {...motionProps}
            ref={contentRef}
            {...contentEventHandlers}
          />
          <Glow
            contentRef={contentRef}
            cursorX={cursorX}
            cursorY={cursorY}
            isGlowMode={isGlowMode}
          />
        </div>
      </div>
    );
  }

  // Для остальных элементов используем стандартный подход
  return (
    <div className={boxCls}>
      <MotionComponent
        className={contentCls}
        initial={initialState}
        whileFocus={whileFocus}
        whileHover={whileHover}
        whileTap={whilePress}
        tabIndex={
          focusable === true || focusable === 0 ? 0 : focusable || undefined
        }
        style={styles}
        {...motionProps}
        ref={contentRef}
        {...contentEventHandlers}
      >
        {children}
        <Glow
          contentRef={contentRef}
          cursorX={cursorX}
          cursorY={cursorY}
          isGlowMode={isGlowMode}
        />
      </MotionComponent>
    </div>
  );
});
