import { memo } from 'react';
import { TagsProps } from './Tags.types.ts';
import clsx from 'clsx';
import s from './tags.module.scss';
import { Direction, Gap } from '../../types';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import { Flex } from '../flex';
import { Item } from './components/Item.tsx';

const Tags = memo<TagsProps>(({ children, className, style, ...props }) => {
  const { progress: progressConfig = {} } = useConfiguration();

  const cls = clsx(s.Progress, className, progressConfig.className);

  const styles = {
    ...progressConfig.style,
    ...style,
  };

  return (
    <Flex
      className={cls}
      style={styles}
      direction={Direction.horizontal}
      gap={Gap.medium}
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
