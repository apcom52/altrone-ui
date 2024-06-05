import { memo } from 'react';
import { ProgressContext, ProgressProps } from './Progress.types.ts';
import clsx from 'clsx';
import s from './progress.module.scss';
import { Size } from '../../types';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';

export const Progress = memo<ProgressProps>(
  ({
    children,
    className,
    style,
    value = 0,
    max = 100,
    size = Size.medium,
    activeSegmentClassName,
    ...props
  }) => {
    const { progress: progressConfig = {} } = useConfiguration();

    const cls = clsx(
      s.Progress,
      {
        [s.Small]: size === Size.small,
        [s.Large]: size === Size.large,
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
