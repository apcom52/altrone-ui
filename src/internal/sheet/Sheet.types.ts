import type { HTMLAttributes, ReactNode, Ref } from 'react';
import type {
  BoxElevation,
  BoxMaterial,
  BoxProps,
  BoxTone,
} from 'components/box';

export type SheetPlacement = 'top' | 'bottom' | 'start' | 'end';

/**
 * Sizing along the placement's sliding axis when that axis is expressed as a
 * mode rather than a pixel value (see `SheetProps.height`): `auto` hugs the
 * content, `full-screen` fills the viewport minus `inset`.
 */
export type SheetSize = 'auto' | 'full-screen';

export interface SheetProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'content'
> {
  ref?: Ref<HTMLDivElement>;

  /**
   * Most `HTMLAttributes` (`className`, `style`, `data-*`, ...) land on the
   * outer fixed-position wrapper, not the panel. `aria-labelledby`/
   * `aria-label`/`aria-describedby` are the exception — the panel `Box` is
   * the actual `role="dialog"` element (it also sets `aria-modal="true"`
   * itself), so those three are forwarded there instead.
   */

  open?: boolean;

  /**
   * `event` is the triggering backdrop click / Escape keydown, or undefined
   * when closed programmatically.
   */
  onClose?: (event?: React.MouseEvent | KeyboardEvent) => void;

  /**
   * When `false`, a backdrop click or `Esc` no longer calls `onClose` — the
   * panel gives a brief shake instead, signalling the attempt was rejected.
   * `onClose` still fires normally for any other trigger a consumer wires up
   * itself (a close button, a confirm action). Defaults to `true`.
   */
  dismissible?: boolean;

  /**
   * Screen edge the panel slides in from. Ignored below `mobileBreakpoint`,
   * where the sheet always renders as `bottom`/full-width/`auto` height (the
   * iOS-sheet idiom) regardless of `placement`/`width`/`height`.
   */
  placement?: SheetPlacement;

  /**
   * The `useBreakpoint()` tier at and above which `placement`/`width`/
   * `height` are honoured as passed. Below it, the sheet forces itself into
   * the iOS-sheet idiom (`bottom`, full-width, `auto` height) — same pattern
   * as `Screen`'s own `mobileBreakpoint`. Defaults to `sm` (768px).
   */
  mobileBreakpoint?: 'sm' | 'md' | 'lg';

  /** Gap kept between the panel and the viewport edges, in px. */
  inset?: number;

  /**
   * For `placement="start"`/`"end"` this is the panel's width (its sliding
   * axis) — pixel number, defaults to `400`. For `placement="top"`/`"bottom"`
   * it instead constrains the panel's width on its cross axis, centering it;
   * omitted, the panel spans the full available width.
   *
   * @example
   * <Sheet placement="start" width={480} />
   * <Sheet placement="bottom" width={480} />
   */
  width?: number;

  /**
   * For `placement="top"`/`"bottom"` this is the panel's height (its sliding
   * axis): `auto` hugs its content — iOS-sheet-style, always leaving at
   * least 15% of the viewport clear on the far edge from the anchor however
   * tall the content gets. That scroll happens at the screen level (the
   * whole panel scrolls into view), not inside the panel. `full-screen`
   * fills the viewport minus `inset`. For `placement="start"`/`"end"` it
   * instead sizes the cross axis: `auto` hugs the content and centers it
   * vertically, `full-screen` (the default there) spans the full available
   * height, matching `Drawer`.
   *
   * Defaults to `full-screen` for `start`/`end` and `auto` for `top`/`bottom`.
   */
  height?: SheetSize;

  /** Forwarded to the panel `Box`. Defaults to `glass`. */
  material?: BoxMaterial;
  /** Forwarded to the panel `Box`. Defaults to `neutral`. */
  tone?: BoxTone;
  /**
   * Forwarded to the panel `Box`. Defaults to `overlay` (see `elevation.md`) —
   * `Modal`, once rebuilt on `Sheet`, is expected to pass `modal` instead.
   */
  elevation?: BoxElevation;
  /** Forwarded to the panel `Box`. Defaults to `24`. */
  radius?: BoxProps['radius'];
  /** Forwarded to the panel `Box`. Defaults to `var(--space-content)`. */
  padding?: BoxProps['padding'];

  children?: ReactNode;
}
