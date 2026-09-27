import { memo } from 'react';
import clsx from 'clsx';
import { Box } from 'components/box';
import type { BoxMaterial, BoxTone } from 'components/box';
import { LabelProps } from './Label.types';
import s from './styles.module.scss';

const CATEGORICAL_COLORS = new Set([
  'amber',
  'blue',
  'brown',
  'indigo',
  'pink',
  'purple',
  'red',
  'teal',
]);

const TONE_BY_COLOR: Record<string, BoxTone> = {
  default: 'neutral',
  primary: 'accent',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
};

const MATERIAL_BY_VARIANT: Record<string, BoxMaterial> = {
  solid: 'solid',
  soft: 'pale',
  outline: 'outline',
};

/** Rounding per size tier — Label seeds its own fixed radius rather than
    inheriting the ambient concentric-radius scope, matching its pre-Box
    values. */
const RADIUS_BY_SIZE: Record<string, number> = {
  mini: 4,
  s: 6,
  m: 8,
  l: 8,
  xl: 12,
};

export const Label = memo(
  ({
    ref,
    children,
    className,
    style,
    color = 'default',
    size = 'm',
    variant = 'solid',
    shape = 'rounded',
    ...props
  }: LabelProps) => {
    const hue = CATEGORICAL_COLORS.has(color) ? color : undefined;
    const tone = hue ? undefined : (TONE_BY_COLOR[color] ?? 'neutral');

    return (
      <Box
        ref={ref}
        material={MATERIAL_BY_VARIANT[variant]}
        tone={tone}
        color={hue}
        shape={shape === 'pill' ? 'pill' : 'rounded'}
        radius={RADIUS_BY_SIZE[size]}
        width="auto"
        height="auto"
        padding={{ x: 'var(--label-padding-x)', y: 'var(--label-padding-y)' }}
        className={clsx(
          s.Label,
          {
            [s.Mini]: size === 'mini',
            [s.Small]: size === 's',
            [s.Large]: size === 'l',
            [s.XLarge]: size === 'xl',
          },
          className,
        )}
        style={style}
        {...props}
      >
        {children}
      </Box>
    );
  },
);
