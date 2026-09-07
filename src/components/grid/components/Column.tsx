import { createElement } from 'react';
import { GridColumnProps } from '../Grid.types.ts';
import clsx from 'clsx';
import s from './column.module.scss';

export const Column = ({
  ref,
  tagName = 'div',
  size = 'auto',
  offset = 0,
  className,
  style,
  children,
  ...restProps
}: GridColumnProps) =>
  createElement(
    tagName,
    {
      ...restProps,
      ref,
      className: clsx(
        s.Column,
        {
          [s.AutoSize]: size === 'auto',
          [s.Offset]: offset > 0,
        },
        className,
      ),
      style: {
        ...style,
        '--grid-column-size': size === 'auto' ? undefined : size,
        ...(offset > 0 && { '--grid-column-offset': offset }),
      },
    },
    children,
  );
