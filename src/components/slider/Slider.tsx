import { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset as floatingOffset,
  shift,
  useFloating,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'motion/react';
import { SliderProps } from './Slider.types';
import s from './slider.module.scss';
import clsx from 'clsx';
import { useFormField } from '../form/components/Field.context.ts';

/**
 * `:focus-visible` in `Element.matches()` throws on browsers that don't support
 * the selector; check once so the focus handler can fall back to plain focus.
 */
const FOCUS_VISIBLE_SUPPORTED =
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('selector(:focus-visible)');

/**
 * The value bubble is portaled to the shared app root, so its own z-index
 * alone decides whether it renders above unrelated content elsewhere on the
 * page (an open `Select`/`Dropdown`, `--level-popover`). Returns the highest
 * ancestor z-index at/above `--level-offcanvas-backdrop` (the slider is
 * nested inside some overlay) so `Slider.tsx` can clear exactly that
 * ancestor instead of jumping to a fixed tier that would out-rank overlays
 * opened elsewhere.
 */
const findAncestorOverlayZIndex = (node: HTMLElement): number | null => {
  const threshold =
    parseInt(
      getComputedStyle(node).getPropertyValue('--level-offcanvas-backdrop'),
      10,
    ) || 1040;

  let highest: number | null = null;
  for (let el = node.parentElement; el; el = el.parentElement) {
    const zIndex = Number(getComputedStyle(el).zIndex);
    if (!Number.isNaN(zIndex) && (highest === null || zIndex > highest)) {
      highest = zIndex;
    }
  }
  return highest !== null && highest >= threshold ? highest : null;
};

export const Slider = (props: SliderProps) => {
  const {
    ref,
    value,
    onChange,
    onChangeEnd,
    min = 0,
    max = 100,
    step = 1,
    icon,
    showCurrentValue = 'active',
    variant = 'default',
    size,
    style,
    orientation = 'horizontal',
    renderLabel,
    disabled,
    readOnly,
    name,
    activeClassName,
    activeStyle,
    className,
    ...restProps
  } = props;

  const {
    name: formFieldName,
    disabled: formFieldDisabled,
    size: formFieldSize,
  } = useFormField();

  const sliderName = typeof name === 'string' ? name : formFieldName;
  const sliderDisabled =
    typeof disabled === 'boolean' ? disabled : formFieldDisabled;
  const sliderSize = size || formFieldSize || 'm';

  const isDragging = useRef(false);
  const sliderValue = useRef(value);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [overlayZIndex, setOverlayZIndex] = useState<number | null>(null);

  const isFill = variant === 'fill';
  const isVertical = orientation === 'vertical';

  /**
   * The value bubble is anchored to the thumb through a portal, so it escapes
   * any `overflow` ancestor (a scrolling `Drawer` body, a `Popover`, a table
   * cell) instead of being clipped by it. The `fill` variant keeps its inline
   * chip — it lives inside the slab and is meant to.
   */
  const { refs: valueRefs, floatingStyles: valueFloatingStyles } = useFloating({
    open: true,
    placement: isVertical ? 'right' : 'top',
    middleware: [floatingOffset(10), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  // Merge internal root ref with consumer ref.
  // Memoized so a changing callback-ref identity doesn't force React 19 to run
  // detach + attach on every render.
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      setPortalRoot(
        node
          ? ((node.closest('[data-altrone-root]') as HTMLElement) ??
              document.body)
          : null,
      );
      setOverlayZIndex(node ? findAncestorOverlayZIndex(node) : null);
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
        orientation === 'vertical'
          ? (rect.bottom - clientY) / rect.height
          : (clientX - rect.left) / rect.width;

      const rawValue = min + (max - min) * ratio;
      const stepsCount = Math.round((rawValue - min) / step);
      return Math.min(max, Math.max(min, min + stepsCount * step));
    },
    [min, max, step, orientation],
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
        onChangeEnd?.(sliderValue.current, e);
        isDragging.current = false;
        setIsActive(false);
        document.removeEventListener('pointermove', handleMove);
        document.removeEventListener('pointerup', handleUp);
      };

      document.addEventListener('pointermove', handleMove);
      document.addEventListener('pointerup', handleUp);
    },
    [calculateValue, onChange, onChangeEnd],
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
      onChangeEnd?.(next, event);
    },
    [value, min, max, step, onChange, onChangeEnd],
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
    s.Slider,
    {
      [s.Fill]: isFill,
      [s.Mini]: sliderSize === 'mini',
      [s.Small]: sliderSize === 's',
      [s.Large]: sliderSize === 'l',
      [s.XLarge]: sliderSize === 'xl',
      [s.Vertical]: isVertical,
      [s.ShowValueAlways]: showCurrentValue === 'always',
      [s.Disabled]: sliderDisabled,
      [s.ReadOnly]: readOnly,
    },
    className,
  );

  useEffect(() => {
    sliderValue.current = value;
  }, [value]);

  const showValue =
    showCurrentValue === 'always' || showCurrentValue === 'active';

  const valueVisible =
    showValue &&
    (showCurrentValue === 'always' || isActive || isHovered || isFocusVisible);

  return (
    <div
      className={cls}
      style={style}
      onPointerDown={sliderDisabled || readOnly ? undefined : handlePointerDown}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={(event) =>
        setIsFocusVisible(
          FOCUS_VISIBLE_SUPPORTED
            ? event.target.matches(':focus-visible')
            : true,
        )
      }
      onBlur={() => setIsFocusVisible(false)}
      ref={mergedRef}
      data-slider-active={isActive}
      tabIndex={sliderDisabled || readOnly ? -1 : 0}
      onKeyDown={sliderDisabled || readOnly ? undefined : handleKeyDown}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={
        typeof labelElement === 'string' ? labelElement : String(value)
      }
      aria-disabled={sliderDisabled}
      aria-readonly={readOnly}
      aria-orientation={orientation}
      {...restProps}
    >
      <input type="hidden" value={value} tabIndex={-1} name={sliderName} />
      {readOnly ? (
        <div className={s.ReadOnlyLabel}>{labelElement}</div>
      ) : (
        <>
          {icon && !isFill ? <div className={s.Icon}>{icon}</div> : null}
          <div className={s.Track} ref={trackRef}>
            <div
              className={clsx(s.ActiveTrack, activeClassName)}
              style={{ ...fillStyle, ...activeStyle }}
            />
            {!isFill ? (
              <div
                ref={valueRefs.setReference}
                className={s.Thumb}
                style={thumbStyle}
              />
            ) : null}
            {icon && isFill ? <div className={s.Icon}>{icon}</div> : null}
            {showValue && isFill ? (
              <div
                className={clsx(s.Value, {
                  [s.ValueElevated]: overlayZIndex !== null,
                })}
              >
                {labelElement}
              </div>
            ) : null}
          </div>
          {showValue && !isFill && portalRoot ? (
            <FloatingPortal root={portalRoot}>
              <AnimatePresence>
                {valueVisible ? (
                  <motion.div
                    ref={valueRefs.setFloating}
                    className={s.ValueFloating}
                    style={{
                      ...valueFloatingStyles,
                      ...(overlayZIndex !== null
                        ? { zIndex: overlayZIndex + 1 }
                        : undefined),
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                  >
                    {labelElement}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </FloatingPortal>
          ) : null}
        </>
      )}
    </div>
  );
};
