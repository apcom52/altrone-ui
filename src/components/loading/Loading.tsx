import { memo } from 'react';
import clsx from 'clsx';
import { LoadingProps } from './Loading.types.ts';
import s from './loading.module.scss';

export const Loading = memo<LoadingProps>(
  ({
    color,
    size = '24px',
    strokeWidth = '2',
    className,
    style,
    ...restProps
  }) => {
    const currentColor = color ?? 'var(--loadingColor)';

    const cls = clsx(s.Loading, className);
    const styles = {
      ...style,
      color: currentColor,
    };

    const numericSize = parseInt(size);
    const numericStroke = parseInt(strokeWidth);
    const centerPoint = numericSize / 2;
    const radius = Math.max(0, numericSize / 2 - numericStroke / 2);

    return (
      <div className={cls} style={styles} {...restProps}>
        <svg
          className={s.Spinner}
          viewBox={`0 0 ${numericSize} ${numericSize}`}
          height={size}
          width={size}
        >
          <circle
            className={s.Active}
            cx={centerPoint}
            cy={centerPoint}
            r={radius}
            pathLength="100"
            strokeWidth={strokeWidth + 'px'}
            fill="none"
          />
          <circle
            className={s.Background}
            cx={centerPoint}
            cy={centerPoint}
            r={radius}
            pathLength="100"
            strokeWidth={strokeWidth + 'px'}
            fill="none"
          />
        </svg>
      </div>
    );
  },
);
