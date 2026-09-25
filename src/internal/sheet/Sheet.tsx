import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import FocusTrap from 'focus-trap-react';
import {
  AnimatePresence,
  motion,
  useReducedMotionConfig,
  type HTMLMotionProps,
  type Transition,
} from 'motion/react';
import { Box } from 'components/box';
import { Scrollable } from 'components/scrollable';
import { GlobalUtils, useBreakpoint } from 'utils';
import { SheetPlacement, SheetProps } from './Sheet.types.ts';
import { lockPageScroll, unlockPageScroll } from './scrollLock.ts';
import { useVisualViewport } from './useVisualViewport.ts';
import s from './sheet.module.scss';

/** Mirrors `Screen`'s own `mobileBreakpoint` → `useBreakpoint()` flag mapping. */
const BREAKPOINT_FLAG = {
  sm: 'isSm',
  md: 'isMd',
  lg: 'isLg',
} as const;

/**
 * Same recipe as `Drawer`: the slide rides an iOS-style curve (decisive
 * start, soft landing) while the scale eases out past 1 — anchored to the
 * screen edge by `transform-origin` (see `sheet.module.scss`), so the panel
 * reads as inflating out of that edge as it arrives. Exit is a shorter
 * accelerating retreat that shrinks a touch.
 */
const ENTER_TRANSITION_X: Transition = {
  x: { duration: 0.52, ease: [0.32, 0.72, 0, 1] },
  scale: { duration: 0.58, ease: [0.34, 1.56, 0.64, 1] },
};

const ENTER_TRANSITION_Y: Transition = {
  y: { duration: 0.52, ease: [0.32, 0.72, 0, 1] },
  scale: { duration: 0.58, ease: [0.34, 1.56, 0.64, 1] },
};

const EXIT_TRANSITION: Transition = {
  duration: 0.3,
  ease: [0.4, 0, 1, 1],
};

/** A plain fade, independent of the panel's slide/scale — no easing tricks. */
const BACKDROP_TRANSITION: Transition = {
  duration: 0.2,
  ease: 'linear',
};

/** Which transform axis the slide-in animates, per placement. */
const SLIDE_AXIS: Record<SheetPlacement, 'x' | 'y'> = {
  start: 'x',
  end: 'x',
  top: 'y',
  bottom: 'y',
};

/**
 * Off-screen resting value for that axis, as a percentage of the panel's own
 * size — works whether the panel's size is a fixed pixel value or `auto`.
 */
const OFFSCREEN_VALUE: Record<SheetPlacement, string> = {
  start: '-100%',
  end: '100%',
  top: '-100%',
  bottom: '100%',
};

const getPortalRoot = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    document.querySelector<HTMLElement>('[data-altrone-root="true"]') ??
    document.body
  );
};

/**
 * Internal overlay primitive: a `Box` that slides in from a screen edge over
 * a dimmed backdrop. The shared shell `Modal`/`Drawer` are meant to be
 * rebuilt on top of (not wired up yet — they keep their own implementations
 * for now).
 */
export const Sheet = (props: SheetProps) => {
  const {
    ref,
    open = false,
    onClose,
    dismissible = true,
    placement = 'bottom',
    mobileBreakpoint = 'sm',
    inset = 8,
    width,
    height,
    material = 'glass',
    tone = 'neutral',
    elevation = 'overlay',
    radius = 24,
    padding = 'var(--space-content)',
    className,
    style,
    children,
    'aria-labelledby': ariaLabelledBy,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    ...restProps
  } = props;

  const reducedMotion = useReducedMotionConfig() ?? false;
  const panelRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const viewportRect = useVisualViewport(open);

  const breakpoint = useBreakpoint();
  const isMobile = !breakpoint[BREAKPOINT_FLAG[mobileBreakpoint]];

  const resolvedPlacement: SheetPlacement = isMobile ? 'bottom' : placement;
  const isHorizontal =
    resolvedPlacement === 'start' || resolvedPlacement === 'end';
  const resolvedHeight = isMobile
    ? 'auto'
    : (height ?? (isHorizontal ? 'full-screen' : 'auto'));
  const resolvedWidth = isMobile
    ? undefined
    : (width ?? (isHorizontal ? 400 : undefined));
  /** Only `top`/`bottom` + `auto` scrolls at the screen level (the iOS-sheet
      idiom); `full-screen` and `start`/`end` keep the panel's own scroll. */
  const isVerticalAutoScroll = !isHorizontal && resolvedHeight === 'auto';

  const [shaking, setShaking] = useState(false);

  const triggerShake = useCallback(() => {
    /** Forces the animation to restart even if a previous shake is still
        playing — a value change is what re-triggers a CSS animation, so it
        has to actually toggle off first, not just stay `true`. */
    setShaking(false);
    requestAnimationFrame(() => setShaking(true));
  }, []);

  const handleClose = useCallback(
    (event?: MouseEvent | KeyboardEvent) => {
      if (!dismissible) {
        triggerShake();
        return;
      }
      onClose?.(event);
    },
    [dismissible, triggerShake, onClose],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose(event);
      }
    };

    document.body.addEventListener('keydown', onKeyDown);
    return () => document.body.removeEventListener('keydown', onKeyDown);
  }, [open, handleClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    lockPageScroll();
    return () => unlockPageScroll();
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    /**
     * `initialFocus: false` below skips focus-trap's own initial focus, so
     * it never triggers the browser's built-in scroll-into-view — instead
     * focus the panel ourselves with `preventScroll`, keeping the
     * screen-level scroller (for `isVerticalAutoScroll`) at its resting
     * position (spacer at the near edge, panel start at the far edge). Only
     * a fallback: content with its own `autoFocus` element (e.g. `Modal`'s
     * close button) already claims focus synchronously before this effect
     * runs, and that's left alone.
     */
    if (!panelRef.current?.contains(document.activeElement)) {
      panelRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  const offscreen = OFFSCREEN_VALUE[resolvedPlacement];

  const panelAnimation: HTMLMotionProps<'div'> = reducedMotion
    ? {}
    : SLIDE_AXIS[resolvedPlacement] === 'x'
      ? {
          initial: { x: offscreen, scale: 0.85 },
          animate: { x: 0, scale: 1, transition: ENTER_TRANSITION_X },
          exit: { x: offscreen, scale: 0.88, transition: EXIT_TRANSITION },
        }
      : {
          initial: { y: offscreen, scale: 0.85 },
          animate: { y: 0, scale: 1, transition: ENTER_TRANSITION_Y },
          exit: { y: offscreen, scale: 0.88, transition: EXIT_TRANSITION },
        };

  const backdropAnimation: HTMLMotionProps<'div'> = reducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: BACKDROP_TRANSITION,
      };

  /**
   * Sizing is delegated to flexbox instead of computed pixel math: the
   * sliding axis gets an explicit size (numeric `width` for `start`/`end`,
   * `100%`/auto for `top`/`bottom`), the cross axis is `stretch` (fills) or
   * `center` (hugs content) via the container's `align-items` — so an `auto`
   * panel is naturally centered and never needs its own measured size.
   */
  const crossAxisFills = isHorizontal
    ? resolvedHeight === 'full-screen'
    : resolvedWidth == null;

  const slotStyle: CSSProperties = isHorizontal
    ? { width: resolvedWidth, maxWidth: '100%' }
    : {
        ...(resolvedWidth != null && {
          width: resolvedWidth,
          maxWidth: '100%',
        }),
        /** `auto` gets no height constraint here — `.Spacer` (below) enforces
            the minimum far-edge gap, and `.ScrollContent` scrolls the rest. */
        ...(resolvedHeight === 'full-screen' && { height: '100%' }),
      };

  const portalRoot = getPortalRoot();

  const sheet = (
    <AnimatePresence>
      {open && (
        <div
          ref={ref}
          className={clsx(s.Sheet, className)}
          style={
            {
              ...style,
              zIndex: `var(--elevation-${elevation}-z-index)`,
              /** Overrides the CSS `inset: 0` (which tracks the iOS layout
                  viewport, not the keyboard-shrunk visible one) so the sheet
                  never ends up anchored partly behind the keyboard. */
              ...(viewportRect && {
                top: viewportRect.offsetTop,
                height: viewportRect.height,
              }),
            } as CSSProperties
          }
          {...restProps}
        >
          <motion.div
            className={s.Backdrop}
            onClick={handleClose}
            {...backdropAnimation}
          />
          <div
            ref={contentRef}
            className={clsx(s.Content, {
              [s.Start]: resolvedPlacement === 'start',
              [s.End]: resolvedPlacement === 'end',
              [s.Top]: resolvedPlacement === 'top',
              [s.Bottom]: resolvedPlacement === 'bottom',
              [s.ScrollContent]: isVerticalAutoScroll,
            })}
            style={
              {
                '--sheet-inset': `${inset}px`,
                alignItems: crossAxisFills ? 'stretch' : 'center',
              } as CSSProperties
            }
          >
            {isVerticalAutoScroll && resolvedPlacement === 'bottom' && (
              <div className={s.Spacer} />
            )}
            <FocusTrap
              focusTrapOptions={{
                /**
                 * Without this, focus-trap swallows pointer events landing
                 * outside the trap, so a click on the backdrop never reaches
                 * its own `onClick` and wouldn't close the sheet.
                 */
                allowOutsideClick: true,
                tabbableOptions: {
                  displayCheck: GlobalUtils.isTestEnvironment()
                    ? 'none'
                    : 'full',
                },
                /**
                 * Content with no tabbable element of its own (a plain
                 * message, a confirmation blurb) would otherwise make
                 * focus-trap throw — fall back to the panel itself, which is
                 * kept focusable via `tabIndex={-1}`.
                 */
                fallbackFocus: () => panelRef.current ?? document.body,
                /**
                 * Its own initial focus scrolls the target into view, which
                 * would fight the screen-level scroller's resting position
                 * for a panel taller than the viewport — the effect above
                 * focuses the panel itself instead, with `preventScroll`.
                 */
                initialFocus: false,
              }}
            >
              <motion.div
                className={clsx(s.PanelSlot, { [s.Shake]: shaking })}
                style={slotStyle}
                onAnimationEnd={() => setShaking(false)}
                {...panelAnimation}
              >
                <Box
                  ref={panelRef}
                  material={material}
                  tone={tone}
                  elevation={elevation}
                  radius={radius}
                  padding={padding}
                  className={s.Panel}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={ariaLabelledBy}
                  aria-label={ariaLabel}
                  aria-describedby={ariaDescribedBy}
                  tabIndex={-1}
                >
                  {/* `isVerticalAutoScroll` already scrolls at `.ScrollContent`
                      (screen level, see sheet.module.scss) — Scrollable here
                      too would nest a second, inert scroll viewport. */}
                  {isVerticalAutoScroll ? (
                    children
                  ) : (
                    <Scrollable>{children}</Scrollable>
                  )}
                </Box>
              </motion.div>
            </FocusTrap>
            {isVerticalAutoScroll && resolvedPlacement === 'top' && (
              <div className={s.Spacer} />
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  return portalRoot ? createPortal(sheet, portalRoot) : null;
};
