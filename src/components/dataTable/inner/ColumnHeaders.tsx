import { memo, useMemo } from 'react';
import { useDataTableContext } from '../DataTable.context.tsx';
import s from './columnHeaders.module.scss';
import { Icon } from '../../icon';
import clsx from 'clsx';
import { Checkbox } from '../../checkbox';
import range from 'lodash/range';
import { useVisibleColumns } from '../useVisibleColumns.ts';

interface ColumnHeadersProps {
  headingVisible?: boolean;
}

export const ColumnHeaders = memo<ColumnHeadersProps>(
  ({ headingVisible = true }) => {
    const {
      columns,
      page,
      data,
      rowsPerPage,
      sortBy,
      sortType,
      selectableMode,
      selectedRows,
      setSelectedRows,
      setSortType,
      setSortBy,
    } = useDataTableContext();

    const visibleColumns = useVisibleColumns(columns);

    const start = (page - 1) * rowsPerPage;
    const visibleData = data.slice(start, page * rowsPerPage);
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

    const onColumnHeaderClick = (accessor: keyof (typeof data)[0]) => {
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

    const cls = clsx(s.Wrapper, {
      [s.WithoutHeading]: !headingVisible,
    });

    return (
      <thead className={cls}>
        <tr className={s.HeaderRow}>
          {selectableMode && (
            <th className={clsx(s.Cell, s.CheckableColumn)}>
              <Checkbox
                checked={checkboxState === 'all'}
                indeterminate={checkboxState === 'partial'}
                onChange={onCheckboxChange}
              />
            </th>
          )}
          {visibleColumns.map((column, columnIndex) => {
            const isCurrentColumnSorted = sortBy === column.accessor;

            const cls = clsx(s.Cell, {
              [s.SortableColumn]: column.sortable,
              [s.SortedColumn]: isCurrentColumnSorted,
              [s.CellWithWidth]: Boolean(column.width),
            });

            return (
              <th
                key={columnIndex}
                className={cls}
                onClick={
                  column.sortable
                    ? () =>
                        onColumnHeaderClick(
                          column.accessor as keyof (typeof data)[0],
                        )
                    : undefined
                }
                style={{
                  width: column.width ? column.width : undefined,
                }}
              >
                <div className={s.CellContent}>
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
              </th>
            );
          })}
        </tr>
      </thead>
    );
  },
);
