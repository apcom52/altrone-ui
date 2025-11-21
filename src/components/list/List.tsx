import { memo, useId, useMemo, useRef } from 'react';
import { ListItemKey, ListProps } from './List.types.ts';
import s from './list.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import { Scrollable } from 'components/scrollable/index.ts';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Item } from './inner/Item.tsx';

const List = <DataType extends object>({
  data,
  selectedItemKeys = [],
  multiple = false,
  onSelect,
  children,
  className,
  style,
  ...props
}: ListProps) => {
  const { list: listConfig = {} } = useConfiguration();

  const scrollableRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => scrollableRef.current,
    estimateSize: () => 60,
    gap: 4,
  });

  const handleSelect = (key: ListItemKey) => {
    console.log('>> select', key, multiple);
    if (multiple) {
      if (selectedItemKeys.includes(key)) {
        onSelect?.(selectedItemKeys.filter((k) => k !== key));
      } else {
        onSelect?.([...selectedItemKeys, key]);
      }
    } else {
      onSelect?.([key]);
    }
  };

  const actions = useMemo(() => {
    if (!children) return null;

    if (typeof children === 'function') {
      return children({ selectedItemKeys });
    }

    return children;
  }, [children]);

  const cls = clsx(s.List, className, listConfig.className);

  const styles = {
    ...listConfig.style,
    ...style,
    height: `${virtualizer.getTotalSize()}px`,
  };

  return (
    <Scrollable maxHeight="100%" ref={scrollableRef}>
      <div className={cls} style={styles}>
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = data[virtualItem.index];

          return (
            <Item
              key={item.key}
              itemKey={item.key}
              title={item.title}
              description={item.description}
              icon={item.icon}
              meta={item.meta}
              disabled={item.disabled}
              onSelect={handleSelect}
              selected={selectedItemKeys.includes(item.key)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            />
          );
        })}
      </div>
      {children ? <div>{children}</div> : null}
    </Scrollable>
  );
};

export default memo(List) as typeof List;
