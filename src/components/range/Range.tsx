import { memo, useMemo, useCallback, useRef, useEffect, useState } from 'react';
import { RangeProps } from './Range.types';
import s from './range.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import { motion } from 'framer-motion';

export const Range = memo<RangeProps>((props) => {
  const {
    ref,
    value,
    onChange,
    onValueCommit,
    min = 0,
    max = 100,
    step = 1,
    icon,
    showCurrentValue = 'active',
    size = 'm',
    style,
    direction = 'horizontal',
    renderLabel,
    disabled,
    readOnly,
    name,
    activeTrackClassName,
    ...restProps
  } = props;

  const { range: rangeConfig = {} } = useConfiguration();

  const isDragging = useRef(false);
  const rangeValue = useRef(value);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  // Merge internal measurement ref with consumer ref.
  // Memoized to avoid unnecessary ref flushes on every render (React 19 calls
  // cleanup + setup each time the callback ref identity changes).
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      trackRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref]
  );

  const calculateValue = useCallback(
    (clientX: number, clientY: number) => {
      if (!trackRef.current) return min;

      const rect = trackRef.current.getBoundingClientRect();
      let percentage;

      if (direction === 'vertical') {
        const clickPosition = rect.bottom - clientY;
        percentage = clickPosition / rect.height;
      } else {
        const clickPosition = clientX - rect.left;
        percentage = clickPosition / rect.width;
      }

      const rawValue = min + (max - min) * percentage;
      const stepsCount = Math.round((rawValue - min) / step);
      return Math.min(max, Math.max(min, min + stepsCount * step));
    },
    [min, max, step, direction]
  );

  // Handlers are created inside pointerdown closure so removeEventListener
  // always removes the exact same reference that was registered — no stale ref leak.
  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      isDragging.current = true;
      setIsActive(true);
      const newValue = calculateValue(event.clientX, event.clientY);
      onChange(newValue, event);

      const handleMove = (e: PointerEvent) => {
        if (!isDragging.current) return;
        const movedValue = calculateValue(e.clientX, e.clientY);
        onChange(movedValue, e);
      };

      const handleUp = (e: PointerEvent) => {
        onValueCommit?.(rangeValue.current, e);
        isDragging.current = false;
        setIsActive(false);
        document.removeEventListener('pointermove', handleMove);
        document.removeEventListener('pointerup', handleUp);
      };

      document.addEventListener('pointermove', handleMove);
      document.addEventListener('pointerup', handleUp);
    },
    [calculateValue, onChange, onValueCommit]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          event.preventDefault();
          onChange(Math.max(min, value - step), event);
          onValueCommit?.(Math.max(min, value - step), event);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          event.preventDefault();
          onChange(Math.min(max, value + step), event);
          onValueCommit?.(Math.min(max, value + step), event);
          break;
        case 'Home':
          event.preventDefault();
          onChange(min, event);
          onValueCommit?.(min, event);
          break;
        case 'End':
          event.preventDefault();
          onChange(max, event);
          onValueCommit?.(max, event);
          break;
      }
    },
    [value, min, max, step, onChange, onValueCommit]
  );

  const leftOffset = useMemo(() => {
    return `${((value - min) / (max - min)) * 100}%`;
  }, [value, min, max]);

  const labelElement = useMemo(() => {
    if (renderLabel) {
      return renderLabel(value);
    }
    return value;
  }, [value, renderLabel]);

  const activeTrackStyle = useMemo(() => {
    if (direction === 'vertical') {
      return {
        height: leftOffset,
        bottom: 0,
        top: 'auto',
      };
    }
    return { width: leftOffset };
  }, [direction, leftOffset]);

  const cls = clsx(
    s.Range,
    {
      [s.Small]: size === 's',
      [s.Large]: size === 'l',
      [s.Vertical]: direction === 'vertical',
      [s.ShowLabelAlways]: showCurrentValue === 'always',
      [s.Disabled]: disabled,
      [s.ReadOnly]: readOnly,
    },
    rangeConfig.className
  );

  useEffect(() => {
    rangeValue.current = value;
  }, [value]);

  const activeTrackCls = clsx(
    s.ActiveTrack,
    activeTrackClassName,
    rangeConfig.activeTrackClassName
  );

  const styles = {
    ...rangeConfig.style,
    ...style,
  };

  return (
    <motion.div
      className={cls}
      style={styles}
      onPointerDown={disabled ? undefined : handlePointerDown}
      ref={mergedRef}
      data-range-active={isActive}
      tabIndex={0}
      onKeyDown={!disabled ? handleKeyDown : undefined}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={
        typeof labelElement === 'string' ? labelElement : String(value)
      }
      aria-disabled={disabled}
      aria-readonly={readOnly}
      aria-orientation={direction}
      whileTap={{ scale: 1.02 }}
      {...restProps}
    >
      <input type="hidden" value={value} tabIndex={-1} name={name} />
      {!readOnly ? (
        <>
          <div className={activeTrackCls} style={activeTrackStyle} />
          {showCurrentValue === 'always' || showCurrentValue === 'active' ? (
            <div className={s.Value}>{labelElement}</div>
          ) : null}
          {icon ? <div className={s.Icon}>{icon}</div> : null}
        </>
      ) : (
        <div className={s.ReadOnlyLabel}>{labelElement}</div>
      )}
    </motion.div>
  );
});
