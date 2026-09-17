import { Ref } from 'react';
import clsx from 'clsx';
import { TagsProps } from './Tags.types.ts';
import { Flex } from '../flex';
import { Item } from './components/Item.tsx';
import s from './tags.module.scss';

const TagsBase = ({
  ref,
  children,
  className,
  style,
  size = 'm',
  ...props
}: TagsProps) => (
  <Flex
    ref={ref as Ref<HTMLElement>}
    className={clsx(
      {
        [s.Mini]: size === 'mini',
        [s.Small]: size === 's',
        [s.Large]: size === 'l',
        [s.XLarge]: size === 'xl',
      },
      className,
    )}
    style={style}
    orientation="horizontal"
    gap="m"
    wrap
    {...props}
  >
    {children}
  </Flex>
);

export const Tags = Object.assign(TagsBase, { Item });
