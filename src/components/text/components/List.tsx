import { TextListProps, TextListType } from '../Text.types.ts';
import clsx from 'clsx';
import { Size } from 'types';
import { createElement } from 'react';
import s from './list.module.scss';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export const List = ({
  children,
  className,
  type = TextListType.unordered,
  size = Size.medium,
  style,
  ...props
}: TextListProps) => {
  const { textList = {} } = useConfiguration();

  const cls = clsx(s.List, className, textList.className, {
    [s.List_small]: size === Size.small,
    [s.List_large]: size === Size.large,
  });

  const styles = {
    ...textList.style,
    ...style,
  };

  return createElement(
    type === TextListType.ordered ? 'ol' : 'ul',
    {
      className: cls,
      style: styles,
      ...props,
    },
    children,
  );
};