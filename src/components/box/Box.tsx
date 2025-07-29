import { memo, useState, useCallback, useRef, createElement } from 'react';
import { BoxProps } from './Box.types';
import { clsx } from 'clsx';
import s from './box.module.scss';
import { motion } from 'motion/react';

export const Box = memo<BoxProps>(({ children, ...props }) => {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [cursorPressure, setCursorPressure] = useState(0);
  const [isGlowMode, setIsGlowMode] = useState(false);

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
    '--box-shadow': `var(--shadow-${shadow})`,
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

  const whileFocus = {
    ...(focusInteraction.scale && { scale: 0.98 }),
    ...(focusInteraction.background && {
      background: 'var(--box-focus-background-color)',
    }),
  };
  const whileHover = {
    ...(hoverInteraction.scale && { scale: 1.02 }),
    ...(hoverInteraction.background && {
      background: 'var(--box-hover-background-color)',
    }),
  };
  const whilePress = {
    ...(pressInteraction.scale && { scale: 0.96 }),
    ...(pressInteraction.background && {
      background: 'var(--box-press-background-color)',
    }),
  };

  const boxCls = clsx(s.Box, {
    [s.Outline_focus]: focusInteraction.outline,
    [s.Outline_hover]: hoverInteraction.outline,
    [s.Outline_press]: pressInteraction.outline,
  });

  const MotionComponent = motion[as];

  // Проверяем, является ли элемент input или textarea

  // Фильтруем пропсы для MotionComponent, исключая несовместимые
  const motionProps = {
    ...restProps,
    // Исключаем пропсы, которые могут конфликтовать с motion
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
  };

  if (isInputElement) {
    // Для input элементов создаем обертку, но сам input остается внутри
    return (
      <div className={boxCls}>
        <div className={s.InputContent}>
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
          />
          <div className={s.Shadow} />
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
      >
        {children}
        <div className={s.Shadow} />
      </MotionComponent>
    </div>
  );
});
