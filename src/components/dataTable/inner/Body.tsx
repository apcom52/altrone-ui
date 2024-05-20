import { useMemo } from 'react';
import { useDataTableContext } from '../DataTable.context.tsx';
import { filterVisibleColumns } from '../functions.ts';
import clsx from 'clsx';
import DataTableCell from '../DataTableCell.tsx';
import { Checkbox } from '../../checkbox';
import s from './body.module.scss';

export const Body = <T extends object>() => {
  const {
    data,
    columns,
    page,
    limit,
    mobileColumns,
    selectableMode,
    selectedRows,
    selectRow,
  } = useDataTableContext<T>();

  const start = (page - 1) * limit;
  const end = page * limit;

  const visibleColumns = useMemo(() => {
    return filterVisibleColumns(columns, mobileColumns, false);
  }, [columns, mobileColumns]);

  return (
    <div>
      {data.slice(start, end).map((row, rowIndex) => {
        const currentRowIndex = (page - 1) * limit + rowIndex;
        const isSelected = selectedRows.indexOf(currentRowIndex) > -1;

        return (
          <div
            key={rowIndex}
            className={clsx(s.Row, {
              [s.Selected]: isSelected,
            })}
          >
            {selectableMode && (
              <td className={clsx(s.Cell, s.CheckboxCell)}>
                <Checkbox
                  checked={isSelected}
                  onChange={() => selectRow(currentRowIndex)}
                />
              </td>
            )}
            {visibleColumns.map((column, columnIndex) => {
              const accessor = column.accessor as keyof T;

              const props = {
                accessor: accessor,
                item: row,
                value: row[accessor],
                rowIndex,
                columnIndex,
              };

              let content;

              if (column.Component) {
                const CellComponent = column.Component;
                content = <CellComponent {...props} />;
              } else {
                content = <DataTableCell {...props} />;
              }

              return (
                <div key={columnIndex} className={s.Cell}>
                  {content}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
