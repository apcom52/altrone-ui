import React, { useEffect, useMemo, useState } from 'react';
import { ListProps } from './List.types';
import './list.scss';
import { DEFAULT_KEY_EXTRACTOR } from './List.utils';
import clsx from 'clsx';
import { Direction } from '../../../types';
import { Pagination } from '../../indicators';

export const List = <T extends object, ListDirection extends Direction = Direction.vertical>({
  data,
  renderFunc,
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
  const [currentPage, setCurrentPage] = useState(() => {
    if (startsFrom && limit) {
      return Math.floor(startsFrom / limit);
    }

    return 0;
  });

  const [filteredItems, hasPagination, totalPages] = useMemo(() => {
    const visibleRows = !skipRule
      ? [...data]
      : [...data].filter((item, index) => !skipRule(item, index));

    const hasPagination = typeof startsFrom === 'number' && typeof limit === 'number';

    if (hasPagination) {
      const totalItems = visibleRows.length;
      const totalPages = Math.ceil(totalItems / limit);

      const currentPageItems = visibleRows.slice(currentPage * limit, (currentPage + 1) * limit);

      return [currentPageItems, hasPagination, totalPages];
    } else {
      return [visibleRows, false, 0];
    }
  }, [data, currentPage, limit, skipRule]);

  useEffect(() => {
    if (startsFrom && limit) {
      setCurrentPage(Math.floor(startsFrom / limit));
    }
  }, [startsFrom, limit]);

  return (
    <div className="alt-list-wrapper">
      <div
        className={clsx('alt-list', className, {
          'alt-list--direction-horizontal': direction === Direction.horizontal,
          'alt-list--line-break': direction === Direction.horizontal && lineBreak
        })}
        style={gap !== 4 ? { gap } : undefined}>
        {filteredItems.map((item, itemIndex) => {
          return (
            <React.Fragment key={keyExtractor(item, itemIndex)}>
              {renderFunc(item, itemIndex)}
              {SeparatorComponent && itemIndex < filteredItems.length - 1 ? (
                <SeparatorComponent />
              ) : null}
            </React.Fragment>
          );
        })}
      </div>
      {hasPagination && (
        <div className="alt-list-pagination">
          <Pagination
            page={currentPage + 1}
            totalPages={totalPages}
            onChange={(value) => setCurrentPage(value - 1)}
          />
        </div>
      )}
    </div>
  );
};
