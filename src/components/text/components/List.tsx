import { TextListProps, TextListType } from '../Text.types.ts';
import clsx from 'clsx';
import { Size } from 'types';
import { createElement } from 'react';
import s from './list.module.scss';

export const List = ({
  children,
  className,
  type = TextListType.unordered,
  size = Size.medium,
  ...props
}: TextListProps) => {
  const cls = clsx(s.List, className, {
    [s.List_small]: size === Size.small,
    [s.List_large]: size === Size.large,
  });

  return createElement(
    type === TextListType.ordered ? 'ol' : 'ul',
    {
      className: cls,
      ...props,
    },
    children,
  );
};
