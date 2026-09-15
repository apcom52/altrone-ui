import { Ref } from 'react';
import clsx from 'clsx';
import { Box } from 'components/box';
import { ProgressContext, ProgressProps } from './Progress.types.ts';
import s from './progress.module.scss';

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const Progress = ({
  ref,
  label: labelProp,
  className,
  style,
  min = 0,
  value = 0,
  max = 100,
  size = 'm',
  activeClassName,
  activeStyle,
  ...props
}: ProgressProps) => {
  const cls = clsx(
    s.Progress,
    {
      [s.Mini]: size === 'mini',
      [s.Small]: size === 's',
      [s.Large]: size === 'l',
      [s.XLarge]: size === 'xl',
    },
    className,
  );

  /* Guard against min === max (span of 0) so the ratio isn't NaN/Infinity. */
  const span = max - min || 1;
  const percentage = clamp(Math.round(((value - min) / span) * 100), 0, 100);
  const clampedValue = clamp(value, min, max);

  const progressContext: ProgressContext = { value, min, max, percentage };

  const label =
    typeof labelProp === 'function'
      ? labelProp(progressContext)
      : (labelProp ?? `${percentage}%`);

  return (
    <Box
      ref={ref as Ref<HTMLElement>}
      shape="pill"
      material="glass"
      tone="neutral"
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={typeof labelProp === 'string' ? labelProp : undefined}
      className={cls}
      style={style}
      {...props}
    >
      <div
        className={clsx(s.Active, activeClassName)}
        style={{ width: `${percentage}%`, ...activeStyle }}
      />
      <div className={s.Label}>{label}</div>
    </Box>
  );
};
