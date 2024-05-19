import { memo, useMemo } from 'react';
import { useDataTableContext } from '../DataTable.context.tsx';
import { filterVisibleColumns } from '../functions.ts';
import s from './columnHeaders.module.scss';
import { Icon } from '../../icon';

export const ColumnHeaders = memo(() => {
  const { columns, sortBy, sortType, mobileColumns, selectableMode } =
    useDataTableContext();

  const visibleColumns = useMemo(() => {
    return filterVisibleColumns(columns, mobileColumns, false);
  }, [columns, mobileColumns]);

  return (
    <div className={s.ColumnHeaders}>
      {selectableMode && <div className={s.Cell} />}
      {visibleColumns.map((column, columnIndex) => (
        <div key={columnIndex} className={s.Cell}>
          <span className={s.Title}>
            {String(column.label || column.accessor)}
            <div className={s.SortIcon}>
              <Icon i="swap_vert" />
            </div>
          </span>
          {sortBy === column.accessor && (
            <div className="alt-data-table__sort-indicator">
              <Icon
                i={sortType === 'desc' ? 'arrow_drop_down' : 'arrow_drop_up'}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
});
