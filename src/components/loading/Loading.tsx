import { memo } from 'react';
import clsx from 'clsx';
import { LoadingProps } from './Loading.types.ts';
import s from './loading.module.scss';
import { useLocalization } from '../application';

export const Loading = memo<LoadingProps>(
  ({
    ref,
    color,
    size = '24px',
    strokeWidth = '2',
    className,
    style,
    'aria-label': ariaLabel,
    ...restProps
  }) => {
    const t = useLocalization();

    /* parseFloat, not parseInt — sizes may carry a unit ('24px') and stroke
       widths a fraction ('1.5'). */
    const numericSize = parseFloat(String(size));
    const numericStroke = parseFloat(String(strokeWidth));
    const center = numericSize / 2;
    const radius = Math.max(0, numericSize / 2 - numericStroke / 2);

    const cls = clsx(s.Loading, className);

    return (
      <div
        ref={ref}
        className={cls}
        style={{ ...style, color: color ?? 'var(--loading-color)' }}
        role="status"
        aria-label={ariaLabel ?? t('loading.label')}
        {...restProps}
      >
        <svg
          className={s.Spinner}
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
            className={s.Active}
            cx={center}
            cy={center}
            r={radius}
            pathLength="100"
            strokeWidth={numericStroke}
            fill="none"
          />
        </svg>
      </div>
    );
  },
);
