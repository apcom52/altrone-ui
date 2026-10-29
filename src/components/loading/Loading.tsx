import { memo } from 'react';
import clsx from 'clsx';
import { LoadingProps } from './Loading.types.ts';
import s from './loading.module.scss';
import { useLocalization } from '../application';

const PX_LENGTH = /^\d*\.?\d+(px)?$/;
const DEFAULT_GEOMETRY_SIZE = 24;

export const Loading = memo<LoadingProps>(
  ({
    ref,
    color,
    size = '24px',
    strokeWidth = '2',
    value,
    className,
    style,
    'aria-label': ariaLabel,
    ...restProps
  }) => {
    const t = useLocalization();

    /* SVG geometry needs a number: px sizes map 1:1, any other CSS length
       (`2rem`, `50%`) draws in a 24-unit box that the `width`/`height`
       scale, so `strokeWidth` stays relative to 24. */
    const numericSize = PX_LENGTH.test(String(size).trim())
      ? parseFloat(String(size))
      : DEFAULT_GEOMETRY_SIZE;
    const numericStroke = parseFloat(String(strokeWidth));
    const center = numericSize / 2;
    const radius = Math.max(0, numericSize / 2 - numericStroke / 2);

    const isDeterminate = value !== undefined && !Number.isNaN(value);
    const clampedValue = isDeterminate
      ? Math.min(100, Math.max(0, value))
      : undefined;

    const cls = clsx(s.Loading, className);

    return (
      <div
        ref={ref}
        className={cls}
        style={color === undefined ? style : { ...style, color }}
        data-motion-essential=""
        role={isDeterminate ? 'progressbar' : 'status'}
        aria-label={ariaLabel ?? t('loading.label')}
        aria-valuenow={clampedValue}
        aria-valuemin={isDeterminate ? 0 : undefined}
        aria-valuemax={isDeterminate ? 100 : undefined}
        {...restProps}
      >
        <svg
          className={clsx(s.Spinner, { [s.Determinate]: isDeterminate })}
          viewBox={`0 0 ${numericSize} ${numericSize}`}
          width={size}
          height={size}
          aria-hidden="true"
        >
          <circle
            className={s.Track}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={numericStroke}
            fill="none"
          />
          <circle
            className={clsx(s.Active, { [s.Determinate]: isDeterminate })}
            cx={center}
            cy={center}
            r={radius}
            pathLength="100"
            strokeWidth={numericStroke}
            /* Inline style, not the stroke-dasharray attribute — a CSS class
               rule (.Active's own dasharray) always beats a presentation
               attribute, so the attribute alone would be silently ignored. */
            style={
              isDeterminate
                ? { strokeDasharray: `${clampedValue}, 100` }
                : undefined
            }
            fill="none"
          />
        </svg>
      </div>
    );
  },
);
