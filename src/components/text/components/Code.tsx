import { memo } from 'react';
import { TextCodeProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './code.module.scss';
import { Size } from '../../../types';

export const Code = memo(
  ({ children, className, size = Size.medium, ...props }: TextCodeProps) => {
    const cls = clsx(s.Code, className);

    return (
      <code className={cls} {...props}>
        {children}
      </code>
    );
  },
);
