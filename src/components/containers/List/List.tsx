import React, { useMemo } from 'react';
import { ListProps } from './List.types';
import './list.scss';
import { DEFAULT_KEY_EXTRACTOR } from './List.utils';
import clsx from 'clsx';
import { Direction } from '../../../types';

export const List = <T extends object, ListDirection extends Direction = Direction.vertical>({
  data,
  renderFunc,
  keyExtractor = DEFAULT_KEY_EXTRACTOR,
  SeparatorComponent,
  skipRule,
  gap,
  direction,
  lineBreak,
  className
}: ListProps<T, ListDirection>) => {
  const filteredItems = useMemo(() => {
    return !skipRule ? [...data] : [...data].filter((item, index) => !skipRule(item, index));
  }, [data, skipRule]);

  return (
    <div
      className={clsx('alt-list', className, {
        'alt-list--direction-horizontal': direction === Direction.horizontal,
        'alt-list--line-break': direction === Direction.horizontal && lineBreak
      })}
      style={typeof gap !== 'undefined' ? { gap } : undefined}>
      {filteredItems.map((item, itemIndex) => {
        return (
          <React.Fragment key={keyExtractor(item, itemIndex)}>
            {renderFunc(item, itemIndex)}
            {SeparatorComponent && itemIndex < filteredItems.length - 1 ? (
              <div className="alt-list__separator">
                <SeparatorComponent />
              </div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};
