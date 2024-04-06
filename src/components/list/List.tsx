import { Fragment, memo } from 'react';
import { ListItemContext, ListProps } from './List.types.ts';
import s from './list.module.scss';
import clsx from 'clsx';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import { Flex } from 'components';

const List = <DataType extends object>({
  data,
  renderItem,
  keyExtractor,
  skipRule,
  gap,
  SeparatorComponent,
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

  const filteredItems = data.filter((item, currentIndex) => {
    const context: ListItemContext<DataType> = { item, currentIndex, data };

    if (skipRule) {
      return skipRule(context);
    }

    return true;
  });

  return (
    <Flex className={cls} style={styles} gap={gap} {...props}>
      {filteredItems.map((item, currentIndex) => {
        const isLastItem = currentIndex === filteredItems.length - 1;
        const context: ListItemContext<DataType> = { item, currentIndex, data };
        const key = keyExtractor ? keyExtractor(context) : currentIndex;

        let Separator = null;
        if (!isLastItem && SeparatorComponent) {
          if (typeof SeparatorComponent === 'function') {
            Separator = SeparatorComponent(context);
          } else {
            Separator = SeparatorComponent;
          }
        }

        return (
          <Fragment key={key}>
            {renderItem(context)}
            {Separator}
          </Fragment>
        );
      })}
    </Flex>
  );
};

export default memo(List) as typeof List;
