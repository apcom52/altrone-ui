import { memo } from 'react';
import s from './badge.module.scss';
import clsx from 'clsx';
import { BadgeProps } from './Badge.types';

export const Badge = memo((props: BadgeProps) => {
  const { children, className, style, ...restProps } = props;

  const cls = clsx(s.Badge, className);

  return (
    <div className={cls} style={style} {...restProps}>
      {children}
    </div>
  );
});
