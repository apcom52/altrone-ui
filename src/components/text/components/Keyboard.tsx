import { memo } from 'react';
import { TextKeyboardProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './keyboard.module.scss';

export const Keyboard = memo(
  ({ children, className, bold, ...props }: TextKeyboardProps) => {
    const cls = clsx(
      s.Keyboard,
      {
        [s.Bold]: bold,
      },
      className,
    );

    return (
      <kbd className={cls} {...props}>
        {children}
      </kbd>
    );
  },
);
