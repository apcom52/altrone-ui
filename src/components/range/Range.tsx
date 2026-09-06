import { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import { RangeProps } from './Range.types';
import s from './range.module.scss';
import clsx from 'clsx';

export const Range = (props: RangeProps) => {
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
    variant = 'default',
    size = 'm',
    style,
    direction = 'horizontal',
    renderLabel,
    disabled,
    readOnly,
    name,
    activeTrackClassName,
    className,
    ...restProps
  } = props;

  const isDragging = useRef(false);
  const rangeValue = useRef(value);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const isFill = variant === 'fill';
  const isVertical = direction === 'vertical';

  // Merge internal root ref with consumer ref.
  // Memoized so a changing callback-ref identity doesn't force React 19 to run
  // detach + attach on every render.
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref],
  );

  const calculateValue = useCallback(
    (clientX: number, clientY: number) => {
      const measureEl = trackRef.current ?? rootRef.current;
      if (!measureEl) return min;

      const rect = measureEl.getBoundingClientRect();
      const ratio =
        direction === 'vertical'
          ? (rect.bottom - clientY) / rect.height
          : (clientX - rect.left) / rect.width;

      const rawValue = min + (max - min) * ratio;
      const stepsCount = Math.round((rawValue - min) / step);
      return Math.min(max, Math.max(min, min + stepsCount * step));
    },
    [min, max, step, direction],
  );

  // Move/up handlers are created inside the pointerdown closure so that
  // removeEventListener always gets the exact reference addEventListener saw —
  // a re-render mid-drag can't leave a stale listener bound to `document`.
  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      isDragging.current = true;
      setIsActive(true);
      onChange(calculateValue(event.clientX, event.clientY), event);

      const handleMove = (e: PointerEvent) => {
        if (!isDragging.current) return;
        onChange(calculateValue(e.clientX, e.clientY), e);
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
    [calculateValue, onChange, onValueCommit],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      let next: number | null = null;
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          next = Math.max(min, value - step);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          next = Math.min(max, value + step);
          break;
        case 'Home':
          next = min;
          break;
        case 'End':
          next = max;
          break;
      }
      if (next === null) return;
      event.preventDefault();
      onChange(next, event);
      onValueCommit?.(next, event);
    },
    [value, min, max, step, onChange, onValueCommit],
  );

  const offset = useMemo(() => {
    const ratio = max === min ? 0 : (value - min) / (max - min);
    return `${Math.min(100, Math.max(0, ratio * 100))}%`;
  }, [value, min, max]);

  const labelElement = useMemo(
    () => (renderLabel ? renderLabel(value) : value),
    [value, renderLabel],
  );

  const fillStyle = isVertical ? { height: offset } : { width: offset };
  const thumbStyle = isVertical ? { bottom: offset } : { left: offset };

  const cls = clsx(
    s.Range,
    {
      [s.Fill]: isFill,
      [s.Mini]: size === 'mini',
      [s.Small]: size === 's',
      [s.Large]: size === 'l',
      [s.XLarge]: size === 'xl',
      [s.Vertical]: isVertical,
      [s.ShowValueAlways]: showCurrentValue === 'always',
      [s.Disabled]: disabled,
      [s.ReadOnly]: readOnly,
    },
    className,
  );

  useEffect(() => {
    rangeValue.current = value;
  }, [value]);

  const showValue =
    showCurrentValue === 'always' || showCurrentValue === 'active';

  return (
    <div
      className={cls}
      style={style}
      onPointerDown={disabled || readOnly ? undefined : handlePointerDown}
      ref={mergedRef}
      data-range-active={isActive}
      tabIndex={disabled || readOnly ? -1 : 0}
      onKeyDown={disabled || readOnly ? undefined : handleKeyDown}
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
      {...restProps}
    >
      <input type="hidden" value={value} tabIndex={-1} name={name} />
      {readOnly ? (
        <div className={s.ReadOnlyLabel}>{labelElement}</div>
      ) : (
        <>
          {icon && !isFill ? <div className={s.Icon}>{icon}</div> : null}
          <div className={s.Track} ref={trackRef}>
            <div
              className={clsx(s.ActiveTrack, activeTrackClassName)}
              style={fillStyle}
            />
            {!isFill ? <div className={s.Thumb} style={thumbStyle} /> : null}
            {icon && isFill ? <div className={s.Icon}>{icon}</div> : null}
            {showValue ? (
              <div className={s.Value} style={isFill ? undefined : thumbStyle}>
                {labelElement}
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};
