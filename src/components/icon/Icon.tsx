import { memo } from 'react';
import s from './icon.module.scss';
import clsx from 'clsx';
import { IconProps } from './Icon.types.ts';
import '@material-symbols/font-500/index.scss';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';

/**
 * This component is used to show action icon
 * @param i
 * @param size
 * @param className
 * @param style
 * @param props
 * @constructor
 */
export const Icon = memo(
  ({
    i,
    size,
    className,
    iconStyle = 'outlined',
    style,
    ...props
  }: IconProps) => {
    const { icon = {} } = useConfiguration();

    const cls = clsx(
      s.Icon,
      `material-symbols-${iconStyle}`,
      className,
      icon.className,
    );
    const styles = {
      ...style,
      ...icon.style,
      fontSize: size || '1em',
    };

    return (
      <span className={cls} style={styles} {...props}>
        {i}
      </span>
    );
  },
);
