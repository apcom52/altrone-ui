import React, { useMemo } from 'react';
import { ListProps } from './List.types';
import './list.scss';
import { DEFAULT_KEY_EXTRACTOR } from './List.utils';
import clsx from 'clsx';
import { Direction } from '../../../types';

export const List = <T extends object, ListDirection extends Direction>({
  data,
  children,
  keyExtractor = DEFAULT_KEY_EXTRACTOR,
  SeparatorComponent,
  skipRule,
  gap = 4,
  startsFrom,
  limit,
  direction,
  lineBreak,
  onRefresh,
  className
}: ListProps<T, ListDirection>) => {
  const filteredItems = useMemo(() => {
    if (!skipRule) {
      return [...data];
    }

    return [...data].filter((item, index) => !skipRule(item, index));
  }, [data, skipRule]);

  return (
    <div
      className={clsx('alt-list', className, {
        'alt-list--direction-horizontal': direction === Direction.horizontal,
        'alt-list--line-break': direction === Direction.horizontal && lineBreak
      })}
      style={gap !== 4 ? { gap } : undefined}>
      {filteredItems.map((item, itemIndex) => {
        return (
          <React.Fragment key={keyExtractor(item, itemIndex)}>
            {children(item, itemIndex)}
            {SeparatorComponent && itemIndex < filteredItems.length - 1 ? (
              <SeparatorComponent />
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};
