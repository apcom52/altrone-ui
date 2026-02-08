import clsx from 'clsx';
import { LabelProps } from './Label.types';
import s from './styles.module.scss';

export const Label = ({ children, color = 'default', size = 'm', variant = 'solid', rounding = 'rounded', ...props }: LabelProps) => {
  const cls = clsx(s.Label, {
    [s.Solid]: variant === 'solid',
    [s.Soft]: variant === 'soft',
    [s.Outline]: variant === 'outline',
    [s.Rounded]: rounding === 'rounded',
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

  return <div className={cls} {...props}>{children}</div>;
};