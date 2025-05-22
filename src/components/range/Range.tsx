import { memo, useMemo, useCallback, useRef, useEffect, useState } from 'react';
import { RangeProps } from './Range.types';
import s from './range.module.scss';
import clsx from 'clsx';

export const Range = memo<RangeProps>((props) => {
  const {
    value,
    onChange,
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
    ...restProps
  } = props;

  const isDragging = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const isFocused = useRef(false);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isFocused.current) return;

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          event.preventDefault();
          onChange(Math.max(min, value - step));
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          event.preventDefault();
          onChange(Math.min(max, value + step));
          break;
        case 'Home':
          event.preventDefault();
          onChange(min);
          break;
        case 'End':
          event.preventDefault();
          onChange(max);
          break;
      }
    },
    [value, min, max, step, onChange],
  );

  const calculateValue = useCallback(
    (clientX: number, clientY: number) => {
      if (!trackRef.current) return value;

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
    [min, max, step, value, direction],
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      isDragging.current = true;
      setIsActive(true);
      const newValue = calculateValue(event.clientX, event.clientY);
      onChange(newValue);
    },
    [calculateValue, onChange],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (!isDragging.current) return;
      const newValue = calculateValue(event.clientX, event.clientY);
      onChange(newValue);
    },
    [calculateValue, onChange],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    setIsActive(false);
  }, []);

  useEffect(() => {
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  const leftOffset = useMemo(() => {
    return `${((value - min) / (max - min)) * 100}%`;
  }, [value, min, max]);

  const labelElement = useMemo(() => {
    if (renderLabel) {
      return renderLabel(value);
    }
    return value;
  }, [value, renderLabel]);

  const cls = clsx(s.Range, {
    [s.Small]: size === 's',
    [s.Large]: size === 'l',
    [s.Vertical]: direction === 'vertical',
    [s.ShowLabelAlways]: showCurrentValue === 'always',
    [s.Disabled]: disabled,
    [s.ReadOnly]: readOnly,
  });

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

  return (
    <div
      className={cls}
      style={style}
      onPointerDown={disabled ? undefined : handlePointerDown}
      ref={trackRef}
      data-range-active={isActive}
      tabIndex={0}
      onFocus={() => (isFocused.current = true)}
      onBlur={() => (isFocused.current = false)}
      onKeyDown={!disabled ? handleKeyDown : undefined}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={
        typeof labelElement === 'string' ? labelElement : String(value)
      }
      aria-orientation={direction}
      {...restProps}
    >
      <input
        type="range"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        disabled={disabled}
        className={s.Input}
        tabIndex={-1}
      />
      {!readOnly ? (
        <>
          <div className={s.ActiveTrack} style={activeTrackStyle} />
          {showCurrentValue === 'always' || showCurrentValue === 'active' ? (
            <div className={s.Value}>{labelElement}</div>
          ) : null}
          {icon ? <div className={s.Icon}>{icon}</div> : null}
        </>
      ) : (
        <div className={s.ReadOnlyLabel}>{labelElement}</div>
      )}
    </div>
  );
});
