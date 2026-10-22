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
  'green',
  'indigo',
  'orange',
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
  status: 'pale',
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
    icon,
    ...props
  }: LabelProps) => {
    const hue = CATEGORICAL_COLORS.has(color) ? color : undefined;
    const tone = hue ? undefined : (TONE_BY_COLOR[color] ?? 'neutral');
    const isStatus = variant === 'status';

    return (
      <Box
        ref={ref}
        material={MATERIAL_BY_VARIANT[variant]}
        tone={tone}
        color={hue}
        shape={shape === 'pill' ? 'pill' : 'rounded'}
        radius="var(--label-radius)"
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
            [s.Status]: isStatus,
          },
          className,
        )}
        style={style}
        {...props}
      >
        {isStatus ? (
          <span className={clsx(s.Dot, { [s.DotIcon]: !!icon })}>{icon}</span>
        ) : (
          icon && <span className={s.Icon}>{icon}</span>
        )}
        {children}
      </Box>
    );
  },
);
