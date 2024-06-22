import { TextListProps } from '../Text.types.ts';
import clsx from 'clsx';
import { createElement } from 'react';
import s from './list.module.scss';
import { useConfiguration } from 'components/configuration';

export const List = ({
  children,
  className,
  type = 'marked',
  size = 'm',
  style,
  ...props
}: TextListProps) => {
  const { text: { list: listConfig = {} } = {} } = useConfiguration();

  const cls = clsx(s.List, className, listConfig.className, {
    [s.List_small]: size === 's',
    [s.List_large]: size === 'l',
  });

  const styles = {
    ...listConfig.style,
    ...style,
  };

  return createElement(
    type === 'marked' ? 'ul' : 'ol',
    {
      className: cls,
      style: styles,
      ...props,
    },
    children,
  );
};
