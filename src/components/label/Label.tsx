import { memo } from 'react';
import clsx from 'clsx';
import { LabelProps } from './Label.types';
import s from './styles.module.scss';
import { useConfiguration } from '../configuration/AltroneConfiguration.context';

export const Label = memo(
  ({ ref, children, className, style, color = 'default', size = 'm', variant = 'solid', rounding = 'rounded', ...props }: LabelProps) => {
    const { label: labelConfig = {} } = useConfiguration();

    const cls = clsx(s.Label, className, labelConfig.className, {
      [s.Soft]: variant === 'soft',
      [s.Outline]: variant === 'outline',
      [s.Pill]: rounding === 'pill',
      [s.Primary]: color === 'primary',
      [s.Success]: color === 'success',
      [s.Danger]: color === 'danger',
      [s.Warning]: color === 'warning',
      [s.Amber]: color === 'amber',
      [s.Blue]: color === 'blue',
      [s.Brown]: color === 'brown',
      [s.Indigo]: color === 'indigo',
      [s.Pink]: color === 'pink',
      [s.Purple]: color === 'purple',
      [s.Red]: color === 'red',
      [s.Teal]: color === 'teal',
      [s.Small]: size === 's',
      [s.Mini]: size === 'mini',
      [s.Large]: size === 'l',
      [s.XLarge]: size === 'xl',
    });

    const styles = { ...labelConfig.style, ...style };

    return <div ref={ref} className={cls} style={styles} {...props}>{children}</div>;
  },
);
