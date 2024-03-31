import { Fragment, memo } from 'react';
import { ListItemContext, ListProps } from './List.types.ts';
import { Direction } from '../../types';
import s from './list.module.scss';
import clsx from 'clsx';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';

const List = <DataType extends object>({
  data,
  renderItem,
  keyExtractor,
  skipRule,
  gap,
  SeparatorComponent,
  direction = Direction.vertical,
  className,
  style,
  ...props
}: ListProps<DataType>) => {
  const { list: listConfig = {} } = useConfiguration();

  const cls = clsx(s.List, className, listConfig.className);

  const styles = {
    ...listConfig.style,
    ...style,
    gap: `${gap}px`,
  };

  const filteredItems = data;

  return (
    <div className={cls} style={styles} {...props}>
      {filteredItems.map((item, currentIndex) => {
        const context: ListItemContext<DataType> = { item, currentIndex, data };
        const key = keyExtractor ? keyExtractor(context) : currentIndex;

        return <Fragment key={key}>{renderItem(context)}</Fragment>;
      })}
    </div>
  );
};

export default memo(List) as typeof List;
