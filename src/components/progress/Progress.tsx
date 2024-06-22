import { memo } from 'react';
import { ProgressContext, ProgressProps } from './Progress.types.ts';
import clsx from 'clsx';
import s from './progress.module.scss';
import { useConfiguration } from 'components/configuration';

export const Progress = memo<ProgressProps>(
  ({
    children,
    className,
    style,
    value = 0,
    max = 100,
    size = 'm',
    activeSegmentClassName,
    ...props
  }) => {
    const { progress: progressConfig = {} } = useConfiguration();

    const cls = clsx(
      s.Progress,
      {
        [s.Small]: size === 's',
        [s.Large]: size === 'l',
      },
      className,
      progressConfig.className,
    );

    const styles = {
      ...progressConfig.style,
      ...style,
    };

    const activeCls = clsx(
      s.Active,
      activeSegmentClassName,
      progressConfig.activeSegmentClassName,
    );

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
          className={activeCls}
          style={{
            width: `${percentage}%`,
          }}
        />
        <div className={s.Label}>{childrenElement}</div>
      </div>
    );
  },
);
