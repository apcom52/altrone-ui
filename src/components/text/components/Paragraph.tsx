import { memo } from 'react';
import { TextParagraphProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './paragraph.module.scss';
import { Size } from '../../../types';

export const Paragraph = memo(
  ({
    children,
    className,
    size = Size.medium,
    ...props
  }: TextParagraphProps) => {
    const cls = clsx(
      s.Paragraph,
      {
        [s.Paragraph_small]: size === Size.small,
        [s.Paragraph_large]: size === Size.large,
      },
      className,
    );

    return (
      <p className={cls} {...props}>
        {children}
      </p>
    );
  },
);
