import { TextListProps } from '../Text.types.ts';
import clsx from 'clsx';
import { createElement } from 'react';
import s from './list.module.scss';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export const List = ({
  children,
  className,
  type = 'marked',
  size = 'm',
  style,
  ...props
}: TextListProps) => {
  const { textList = {} } = useConfiguration();

  const cls = clsx(s.List, className, textList.className, {
    [s.List_small]: size === 's',
    [s.List_large]: size === 'l',
  });

  const styles = {
    ...textList.style,
    ...style,
  };

  return createElement(
    type === 'marked' ? 'ol' : 'ul',
    {
      className: cls,
      style: styles,
      ...props,
    },
    children,
  );
};
