import { Ref } from 'react';
import { TagsProps } from './Tags.types.ts';
import { Flex } from '../flex';
import { Item } from './components/Item.tsx';

const TagsBase = ({ ref, children, className, style, ...props }: TagsProps) => (
  <Flex
    ref={ref as Ref<HTMLElement>}
    className={className}
    style={style}
    direction="horizontal"
    gap="m"
    wrap
    {...props}
  >
    {children}
  </Flex>
);

export const Tags = Object.assign(TagsBase, { Item });
