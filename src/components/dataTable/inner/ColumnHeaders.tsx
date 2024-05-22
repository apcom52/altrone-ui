import { memo, useMemo } from 'react';
import { useDataTableContext } from '../DataTable.context.tsx';
import { filterVisibleColumns } from '../functions.ts';
import s from './columnHeaders.module.scss';
import { Icon } from '../../icon';
import clsx from 'clsx';
import { Checkbox } from '../../checkbox';
import range from 'lodash/range';

export const ColumnHeaders = memo(() => {
  const {
    columns,
    page,
    data,
    limit,
    sortBy,
    sortType,
    mobileColumns,
    selectableMode,
    selectedRows,
    setSelectedRows,
    setSortBy,
    setSortType,
  } = useDataTableContext();

  const visibleColumns = useMemo(() => {
    return filterVisibleColumns(columns, mobileColumns, false);
  }, [columns, mobileColumns]);

  const start = (page - 1) * limit;
  const visibleData = data.slice(start, page * limit);
  const end = start + visibleData.length;

  const checkboxState = useMemo(() => {
    const visibleColumnIds = range(start, end);

    if (selectedRows.length === 0) {
      return 'none';
    }

    return visibleColumnIds.reduce((acc, itemIndex) => {
      if (acc === 'partial' || selectedRows.indexOf(itemIndex) === -1) {
        return 'partial';
      }

      return 'all';
    }, 'all');
  }, [start, end, selectedRows]);

  const onCheckboxChange = (state: boolean) => {
    const visibleColumnIds = range(start, end);

    const currentRows = new Set(selectedRows);

    for (const index of visibleColumnIds) {
      if (state) {
        currentRows.add(index);
      } else {
        currentRows.delete(index);
      }
    }

    setSelectedRows(Array.from(currentRows));
  };

  const onColumnHeaderClick = (accessor: string) => {
    if (sortBy === accessor) {
      if (sortType === 'asc') {
        setSortType('desc');
      } else if (sortType === 'desc') {
        setSortType('asc');
        setSortBy(undefined);
      }
    } else {
      setSortType('asc');
      setSortBy(accessor);
    }
  };

  console.log('>> sort', sortBy, sortType);

  return (
    <div className={s.ColumnHeaders}>
      {selectableMode && (
        <div className={clsx(s.Cell, s.CheckableColumn)}>
          <Checkbox
            checked={checkboxState === 'all'}
            indeterminate={checkboxState === 'partial'}
            onChange={onCheckboxChange}
          />
        </div>
      )}
      {visibleColumns.map((column, columnIndex) => {
        const isCurrentColumnSorted = sortBy === column.accessor;

        const cls = clsx(s.Cell, {
          [s.SortableColumn]: column.sortable,
          [s.SortedColumn]: isCurrentColumnSorted,
        });

        return (
          <div
            key={columnIndex}
            className={cls}
            onClick={
              column.sortable
                ? () => onColumnHeaderClick(column.accessor)
                : undefined
            }
          >
            <span className={s.Title}>
              {String(column.label || column.accessor)}
              {column.sortable ? (
                <div className={s.SortIcon}>
                  <Icon
                    i={
                      isCurrentColumnSorted
                        ? sortType === 'asc'
                          ? 'arrow_upward'
                          : 'arrow_downward'
                        : 'swap_vert'
                    }
                  />
                </div>
              ) : null}
            </span>
          </div>
        );
      })}
    </div>
  );
});
