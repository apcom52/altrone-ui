import { useDataTableCore } from '../DataTable.context.tsx';
import { Checkbox } from '../../checkbox';
import s from './body.module.scss';
import { DataTableColumnType } from '../DataTable.types.ts';
import { createElement } from 'react';
import { Empty } from 'components/empty/Empty.tsx';
import { useDataTableColumnsTemplate } from '../useDataTableColumnsTemplate.ts';
import { CellRenderers } from '../DataTable.constants.ts';

export const Body = () => {
  const table = useDataTableCore();
  const selectableMode = table.getState().selectableMode || false;

  const columnsTemplate = useDataTableColumnsTemplate(selectableMode);

  return (
    <div className={s.TableBody}>
      {table.getRowModel().rows.length === 0 ? <Empty>No data</Empty> : null}
      {table.getRowModel().rows.map((row) => {
        const isSelected = row.getIsSelected();

        return (
          <div
            key={row.id}
            className={s.Row}
            data-selected={isSelected}
            style={{ gridTemplateColumns: columnsTemplate }}
          >
            {selectableMode ? (
              <div className={s.CheckboxCell}>
                <Checkbox
                  checked={isSelected}
                  onChange={() => row.toggleSelected()}
                />
              </div>
            ) : null}
            {row.getVisibleCells().map((cell) => {
              // Получаем тип колонки и конфигурацию из метаданных
              const meta = cell.column.columnDef.meta as
                | {
                    type?: DataTableColumnType;
                    options?: any;
                    columnConfig?: any;
                  }
                | undefined;
              const columnType =
                (meta?.type as DataTableColumnType) || 'string';
              const columnConfig = meta?.columnConfig;
              const Renderer =
                CellRenderers[columnType] || CellRenderers.string;

              return (
                <div key={cell.id} className={s.Cell}>
                  {createElement(Renderer, {
                    value: cell.getValue(),
                    item: row.original,
                    columnConfig: columnConfig || {
                      accessor: cell.column.id,
                      type: columnType,
                    },
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
