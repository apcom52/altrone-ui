import { CSSProperties, memo, useMemo, useRef } from 'react';
import { ListItemKey, ListProps } from './List.types.ts';
import s from './list.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import { Scrollable } from 'components/scrollable/index.ts';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Item } from './inner/Item.tsx';

const List = ({
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

  console.log('>> data', data);

  const scrollableRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => scrollableRef.current,
    estimateSize: () => 60,
    gap: 4,
    paddingEnd: children ? 48 : 0,
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
      return children({
        selectedItemKeys,
        selectedItems: data.filter((item) =>
          selectedItemKeys.includes(item.key)
        ),
        setSelection: (keys: ListItemKey[]) => onSelect?.(keys),
        clearSelection: () => onSelect?.([]),
      });
    }

    return children;
  }, [children, data, selectedItemKeys, onSelect]);

  const cls = clsx(s.List, className, listConfig.className);

  const listStyles: CSSProperties = {
    height: `${virtualizer.getTotalSize()}px`,
    position: 'relative',
  };

  const containerStyles: CSSProperties = {
    ...listConfig.style,
    ...style,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  return (
    <div className={s.ListWrapper} style={containerStyles} {...props}>
      <Scrollable
        maxHeight="100%"
        ref={scrollableRef}
        style={{ flex: 1, minHeight: 0 }}
      >
        <div className={cls} style={listStyles}>
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
      </Scrollable>
      {actions ? <div className={s.ListActions}>{actions}</div> : null}
    </div>
  );
};

export default memo(List) as typeof List;
