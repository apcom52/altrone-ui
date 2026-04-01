import { memo } from 'react';
import { TagsProps } from './Tags.types.ts';
import clsx from 'clsx';
import { Flex } from '../flex';
import { Item } from './components/Item.tsx';
import { useConfiguration } from '../configuration';

const Tags = memo<TagsProps>(({ children, className, style, ref, ...props }) => {
  const { tags: tagsConfig = {} } = useConfiguration();

  const cls = clsx(className, tagsConfig.className);

  const styles = {
    ...tagsConfig.style,
    ...style,
  };

  return (
    <Flex
      ref={ref}
      className={cls}
      style={styles}
      direction="horizontal"
      gap="m"
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
