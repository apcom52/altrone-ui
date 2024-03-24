import { memo } from 'react';
import { TextCodeProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './code.module.scss';

export const Code = memo(
  ({ children, className, bold, italic, ...props }: TextCodeProps) => {
    const cls = clsx(s.Code, className, {
      [s.Bold]: bold,
      [s.Italic]: italic,
    });

    return (
      <code className={cls} {...props}>
        {children}
      </code>
    );
  },
);
