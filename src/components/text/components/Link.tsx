import { memo } from 'react';
import { TextLinkProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './link.module.scss';

export const Link = memo(
  ({ children, className, bold, italic, ...props }: TextLinkProps) => {
    const cls = clsx(s.Link, className, {
      [s.Bold]: bold,
      [s.Italic]: italic,
    });

    return (
      <a className={cls} {...props}>
        {children}
      </a>
    );
  },
);
