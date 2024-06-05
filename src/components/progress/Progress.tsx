import { memo } from 'react';
import { ProgressContext, ProgressProps } from './Progress.types.ts';
import clsx from 'clsx';
import s from './progress.module.scss';

export const Progress = memo<ProgressProps>(
  ({ children, className, style, value = 0, max = 100, ...props }) => {
    const cls = clsx(s.Progress, className);

    const styles = {
      ...style,
    };

    const percentage = Math.round((value / max) * 100);

    const progressContext: ProgressContext = {
      value,
      max,
      percentage,
    };

    const childrenElement =
      typeof children === 'function'
        ? children(progressContext)
        : children
          ? children
          : `${percentage}%`;

    return (
      <div className={cls} style={styles} {...props}>
        <div
          className={s.Active}
          style={{
            width: `${percentage}%`,
          }}
        />
        <div className={s.Label}>{childrenElement}</div>
      </div>
    );
  },
);
