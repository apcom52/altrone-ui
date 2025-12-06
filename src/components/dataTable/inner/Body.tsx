import { useDataTableCore } from '../DataTable.context.tsx';
import { Checkbox } from '../../checkbox';
import s from './body.module.scss';
import {
  DataTableColumnType,
  DataTableRenderRowActionsContext,
  DataTableRowActionsProps,
} from '../DataTable.types.ts';
import { createElement, ReactElement } from 'react';
import { Empty } from 'components/empty/Empty.tsx';
import { useDataTableColumnsTemplate } from '../useDataTableColumnsTemplate.ts';
import { CellRenderers } from '../DataTable.constants.ts';

interface BodyProps {
  renderRowActions: (
    context: DataTableRenderRowActionsContext
  ) => ReactElement<DataTableRowActionsProps>;
}

export const Body = ({ renderRowActions }: BodyProps) => {
  const table = useDataTableCore();
  const selectableMode = table.getState().selectableMode || false;

  const columnsTemplate = useDataTableColumnsTemplate(
    selectableMode,
    Boolean(renderRowActions)
  );

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
            {row.getVisibleCells().map((cell, cellIndex) => {
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
                <div key={`${cell.id}-${cellIndex}`} className={s.Cell}>
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
            {Boolean(renderRowActions) ? (
              <div className={s.Cell}>
                {renderRowActions({
                  row: row.original,
                  rowIndex: row.index,
                  selected: isSelected,
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
