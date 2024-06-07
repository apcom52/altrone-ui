import { memo } from 'react';
import { TagsProps } from './Tags.types.ts';
import clsx from 'clsx';
import { Flex } from '../flex';
import { Item } from './components/Item.tsx';

const Tags = memo<TagsProps>(({ children, className, style, ...props }) => {
  const cls = clsx(className);

  const styles = {
    ...style,
  };

  return (
    <Flex
      className={cls}
      style={styles}
      direction="horizontal"
      gap="medium"
      {...props}
      wrap
    >
      {children}
    </Flex>
  );
});

const TagsNamespace = Object.assign(Tags, {
  Item,
});

export { TagsNamespace as Tags };
