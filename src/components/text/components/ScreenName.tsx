import { memo } from 'react';
import { TextScreenNameProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './screenName.module.scss';

export const ScreenName = memo(
  ({ children, className, ...props }: TextScreenNameProps) => {
    const cls = clsx(s.ScreenName, className);

    return (
      <h1 className={cls} {...props}>
        {children}
      </h1>
    );
  },
);
