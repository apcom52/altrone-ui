import { CSSProperties, memo, ReactElement, Ref } from 'react';
import clsx from 'clsx';
import s from './box.module.scss';
import { BoxProps } from './Box.types.ts';
import { Slot } from 'utils/components/Slot.tsx';
import { AnyObject } from 'utils/types.ts';

const SIZE_TIERS: readonly string[] = ['mini', 's', 'm', 'l', 'xl'];

const CATEGORICAL_HUES: ReadonlySet<string> = new Set([
  'red',
  'orange',
  'amber',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'pink',
  'brown',
]);

const toBoxLength = (value: number | string): string =>
  typeof value === 'number' ? `${value}px` : value;

const boxPaddingVars = (
  padding: BoxProps['padding'],
): Record<string, string> | undefined => {
  if (padding == null) return undefined;

  if (typeof padding !== 'object') {
    const len = toBoxLength(padding);

    return { '--box-padding-x': len, '--box-padding-y': len };
  }

  const vars: Record<string, string> = {};

  if (padding.x != null) vars['--box-padding-x'] = toBoxLength(padding.x);
  if (padding.y != null) vars['--box-padding-y'] = toBoxLength(padding.y);

  return Object.keys(vars).length ? vars : undefined;
};

export const Box = memo((props: BoxProps) => {
  const {
    ref,
    shape = 'rounded',
    material = 'solid',
    tone = 'neutral',
    color,
    size = 'm',
    width,
    height,
    radius,
    padding,
    elevation = 'flat',
    pressable = false,
    focusable = false,
    editable = false,
    asChild = false,
    className,
    style,
    children,
    ...restProps
  } = props;

  /* An arbitrary `size` (number or non-tier string) turns the box into a
     square of that value; `width`/`height` override it per axis. */
  const customSquare =
    size == null || (typeof size === 'string' && SIZE_TIERS.includes(size))
      ? undefined
      : toBoxLength(size);

  const dimensionVars: Record<string, string> = {};
  if (customSquare !== undefined) {
    dimensionVars['--box-square'] = customSquare;
    dimensionVars['--box-size'] = customSquare;
  }
  if (width != null) dimensionVars['--box-width'] = toBoxLength(width);
  if (height != null) {
    const h = toBoxLength(height);
    dimensionVars['--box-height'] = h;
    dimensionVars['--box-size'] = h;
  }

  const customRadius =
    radius == null
      ? undefined
      : typeof radius === 'number'
        ? `${radius}px`
        : radius;

  /* A categorical hue name resolves to that hue's solid step; any other string
     is used as a raw CSS color. Either drives every --box-tone-* var and wins
     over `tone`. */
  const customColor =
    color == null
      ? undefined
      : CATEGORICAL_HUES.has(color)
        ? `var(--${color}-9)`
        : color;

  const paddingVars = boxPaddingVars(padding);

  const rootStyle =
    Object.keys(dimensionVars).length === 0 &&
    customRadius === undefined &&
    customColor === undefined &&
    !paddingVars
      ? style
      : ({
          ...style,
          ...dimensionVars,
          /* Seed the concentric radius scope on this element rather than a
             parallel variable — rounded/squircle read --radius-outer, and
             descendants derive from it too (see radius.md). */
          ...(customRadius !== undefined && { '--radius-outer': customRadius }),
          ...(customColor !== undefined && { '--box-color': customColor }),
          ...paddingVars,
        } as CSSProperties);

  const cls = clsx(
    s.Box,
    {
      [s.ShapeRect]: shape === 'rect',
      [s.ShapeRounded]: shape === 'rounded',
      [s.ShapeSquircle]: shape === 'squircle',
      [s.ShapeCircle]: shape === 'circle',
      [s.ShapePill]: shape === 'pill',

      [s.MaterialSolid]: material === 'solid',
      [s.MaterialGlass]: material === 'glass',
      [s.MaterialPlate]: material === 'plate',
      [s.MaterialTranslucent]: material === 'translucent',
      [s.MaterialTransparent]: material === 'transparent',
      [s.MaterialOutline]: material === 'outline',
      [s.MaterialGhost]: material === 'ghost',
      [s.MaterialHatch]: material === 'hatch',

      [s.ToneNeutral]: !customColor && tone === 'neutral',
      [s.ToneAccent]: !customColor && tone === 'accent',
      [s.ToneDanger]: !customColor && tone === 'danger',
      [s.ToneSuccess]: !customColor && tone === 'success',
      [s.ToneWarning]: !customColor && tone === 'warning',
      [s.ToneInfo]: !customColor && tone === 'info',
      [s.ToneCustom]: customColor !== undefined,

      [s.Mini]: size === 'mini',
      [s.Small]: size === 's',
      [s.Large]: size === 'l',
      [s.XLarge]: size === 'xl',

      [s.ElevationRaised]: elevation === 'raised',
      [s.ElevationSticky]: elevation === 'sticky',
      [s.ElevationOverlay]: elevation === 'overlay',
      [s.ElevationModal]: elevation === 'modal',
      [s.ElevationToast]: elevation === 'toast',

      [s.Pressable]: pressable,
      [s.Focusable]: focusable,
      [s.Editable]: editable,
    },
    className,
  );

  if (asChild) {
    return (
      <Slot ref={ref} className={cls} style={rootStyle} {...restProps}>
        {children as ReactElement<AnyObject>}
      </Slot>
    );
  }

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={cls}
      style={rootStyle}
      {...restProps}
    >
      {children}
    </div>
  );
});
