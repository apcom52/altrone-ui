import { useDataTableContext } from '../DataTable.context.tsx';
import clsx from 'clsx';
import { DataTableCellProps } from '../DataTableCell.tsx';
import { Checkbox } from '../../checkbox';
import s from './body.module.scss';
import { useVisibleColumns } from '../useVisibleColumns.ts';
import { DataTableColumnType } from '../DataTable.types.ts';
import {
  DataTableTextRenderer,
  DataTableCurrencyRenderer,
  DataTableNumberRenderer,
  DataTableDateRenderer,
  DataTableMonthRenderer,
  DataTableYearRenderer,
  DataTableBooleanRenderer,
  DataTableArrayRenderer,
} from '../renderers';
import { createElement } from 'react';
import { useLocalization } from '../../application';

const CELL_RENDERERS: Record<
  DataTableColumnType,
  React.FC<DataTableCellProps<any>>
> = {
  text: DataTableTextRenderer,
  number: DataTableNumberRenderer,
  boolean: DataTableBooleanRenderer,
  array: DataTableArrayRenderer,
  currency: DataTableCurrencyRenderer,
  date: DataTableDateRenderer,
  month: DataTableMonthRenderer,
  year: DataTableYearRenderer,
};

export const Body = <T extends object>() => {
  const {
    data,
    columns,
    page,
    rowsPerPage,
    selectableMode,
    selectedRows,
    selectRow,
  } = useDataTableContext<T>();

  const t = useLocalization();

  const start = (page - 1) * rowsPerPage;
  const end = page * rowsPerPage;

  const visibleColumns = useVisibleColumns(columns);

  return (
    <tbody>
      {data.slice(start, end).map((row, rowIndex) => {
        const currentRowIndex = (page - 1) * rowsPerPage + rowIndex;
        const isSelected = selectedRows.indexOf(currentRowIndex) > -1;

        return (
          <tr
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
                  title={t(
                    isSelected
                      ? 'dataTable.deselectRow'
                      : 'dataTable.selectRow',
                  )}
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
                columnOptions: column.options,
              };

              let content;

              if (column.renderFunc) {
                content = column.renderFunc({ current: null }, props);
              } else if (column.Component) {
                const CellComponent = column.Component;
                content = <CellComponent {...props} />;
              } else {
                const CellComponent =
                  typeof column.type === 'string'
                    ? CELL_RENDERERS[column.type] || DataTableTextRenderer
                    : DataTableTextRenderer;
                content = createElement(CellComponent, props);
              }

              const cls = clsx(s.Cell, {
                [s.CellWithWidth]: Boolean(column.width),
              });

              return (
                <td key={columnIndex} className={cls}>
                  {content}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
