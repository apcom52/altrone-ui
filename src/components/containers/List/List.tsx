import React from 'react';
import { ListProps } from './List.types';
import './list.scss';

export const List = <T extends object>({
  data,
  children,
  keyExtractor,
  SeparatorComponent,
  skipRule,
  gap,
  startsFrom,
  limit,
  direction,
  onRefresh,
  className
}: ListProps<T>) => {
  return (
    <div className="alt-list">
      {data.map((item, itemIndex) => {
        if (skipRule && skipRule(item, itemIndex)) {
          return null;
        }

        return (
          <React.Fragment key={keyExtractor(item, itemIndex)}>
            {children(item, itemIndex)}
            {SeparatorComponent && itemIndex < data.length - 1 ? <SeparatorComponent /> : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};
