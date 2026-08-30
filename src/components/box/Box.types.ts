import type { HTMLAttributes, ReactNode, Ref } from 'react';
import type { BasicComponentStyleConfig, Size } from 'types';

export type BoxShape = 'rect' | 'rounded' | 'squircle' | 'circle' | 'pill';

export type BoxMaterial =
  'solid' | 'glass' | 'translucent' | 'transparent' | 'outline' | 'ghost';

export type BoxTone =
  'neutral' | 'accent' | 'danger' | 'success' | 'warning' | 'info';

/** The 10 categorical hues (see colors/_categorical.scss). */
export type BoxColorHue =
  | 'red'
  | 'orange'
  | 'amber'
  | 'green'
  | 'teal'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'brown';

export type BoxElevation =
  'flat' | 'raised' | 'sticky' | 'overlay' | 'modal' | 'toast';

export interface BoxProps
  extends
    BasicComponentStyleConfig,
    Omit<HTMLAttributes<HTMLElement>, 'color' | 'className' | 'style'> {
  ref?: Ref<HTMLElement>;

  /** Corner algorithm. Actual rounding amount still comes from `--radius-outer` (see radius.md) — `shape` doesn't set a radius value itself, except `rect` (forced 0), `circle` (forced 50%), and `pill` (forced capsule ends — stays a capsule at any size). */
  shape?: BoxShape;
  material?: BoxMaterial;
  tone?: BoxTone;

  /**
   * A custom fill color, independent of the accent, taking priority over
   * `tone`. Either one of the categorical hue names (`'teal'`, `'indigo'`,
   * … — resolves to that hue's solid step, `--<hue>-9`) or any CSS color
   * string (`'#f0abfc'`, `'var(--my-token)'`). All materials work on top of
   * it — `solid` fills with it (auto-contrasting text), `translucent`/
   * `glass`/`outline`/`ghost` derive their tints from it.
   *
   * @example
   * <Box color="teal" />
   * <Box material="translucent" color="#f0abfc" />
   */
  color?: BoxColorHue | string;

  /**
   * A named tier (`mini`/`s`/`m`/`l`/`xl`), or an arbitrary length — a number
   * (px) or a CSS string (`'12px'`, `'8em'`, `'50%'`). An arbitrary value turns
   * the box into a **square** of that size (width = height); a named tier
   * doesn't, it only sets the control height + padding. `width`/`height` take
   * priority over `size`. An arbitrary size does not adjust the control
   * padding — use `padding` for that.
   *
   * @example
   * <Box size="l" />
   * <Box size={36} />
   * <Box size="50%" />
   */
  size?: Size | number | string;

  /** Explicit width (number = px). Overrides the width `size` would set. */
  width?: number | string;
  /** Explicit height (number = px). Overrides the height `size` would set. */
  height?: number | string;

  /**
   * Starts a concentric radius scope on this element by seeding `--radius-outer`
   * (a number is px, a string is used verbatim, e.g. `'var(--radius-l)'`), so
   * `rounded`/`squircle` round to it and nested descendants derive from it too
   * (see radius.md). `rect`/`circle`/`pill` force their own radius and ignore it.
   * Without it the amount comes from the inherited `--radius-outer`.
   *
   * For `squircle` this is the value used where the browser supports
   * `corner-shape`; the plain-`border-radius` fallback is scaled down by
   * `--squircle-fallback-ratio` so the corner doesn't look meaningfully rounder
   * in older browsers.
   *
   * @example
   * <Box shape="squircle" radius={48} />
   */
  radius?: number | string;

  /**
   * Internal padding, overriding the value the `size` tier would set. A number
   * is px, a string is used verbatim (e.g. `'var(--space-content)'`), an
   * object sets each axis independently.
   *
   * @example
   * <Box padding={12} />
   * <Box padding={{ x: 16, y: 8 }} />
   * <Box padding="var(--space-inset-compact)" />
   */
  padding?: number | string | { x?: number | string; y?: number | string };

  elevation?: BoxElevation;

  /** Background responds to `:active` (own element) and `:focus-within` (when `editable`). No JS state. */
  pressable?: boolean;
  /** Adds a `:focus-visible` ring, identical across all materials. */
  focusable?: boolean;
  /** For `asChild` over `input`/`textarea`: the interaction trigger switches from hover/active to `:focus-within`. */
  editable?: boolean;

  /**
   * Radix Slot polymorphism — the only way to change the rendered element.
   * Deliberately no `renderFunc`/`as` prop: Box underlies almost every
   * component, and a second polymorphism mechanism would just be two ways
   * to do the same thing.
   */
  asChild?: boolean;
  children?: ReactNode;
}
