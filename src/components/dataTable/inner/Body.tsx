import { createElement, FC } from 'react';
import { useDataTableContext } from '../DataTable.context.tsx';
import { Checkbox } from '../../checkbox';
import { Empty } from 'components/empty/Empty.tsx';
import { useLocalization } from '../../application';
import {
  CellRenderer,
  DataTableBodyProps,
  DataTableColumn,
} from '../DataTable.types.ts';
import { useDataTableColumnsTemplate } from '../useDataTableColumnsTemplate.ts';
import { CellRenderers } from '../DataTable.constants.ts';
import s from './body.module.scss';

export const Body = <T extends object>({
  renderRowActions,
  showEmptyBanner = true,
}: DataTableBodyProps<T>) => {
  const t = useLocalization();
  const { table, selectMode } = useDataTableContext<T>();

  const columnsTemplate = useDataTableColumnsTemplate(
    selectMode,
    Boolean(renderRowActions),
  );

  const rows = table.getRowModel().rows;

  return (
    <div className={s.TableBody}>
      {rows.length === 0 && showEmptyBanner ? (
        <Empty>{t('dataTable.empty')}</Empty>
      ) : null}
      {rows.map((row) => {
        const isSelected = row.getIsSelected();

        return (
          <div
            key={row.id}
            className={s.Row}
            data-selected={isSelected}
            style={{ gridTemplateColumns: columnsTemplate }}
          >
            {selectMode ? (
              <div className={s.CheckboxCell}>
                <Checkbox
                  checked={isSelected}
                  onChange={() => row.toggleSelected()}
                />
              </div>
            ) : null}
            {row.getVisibleCells().map((cell) => {
              const meta = cell.column.columnDef.meta;
              const columnType = meta?.dataType ?? 'string';
              const Renderer = CellRenderers[columnType] ?? CellRenderers.string;

              const rendererProps: CellRenderer<T> = {
                value: cell.getValue(),
                item: row.original,
                columnConfig:
                  (meta?.columnConfig as DataTableColumn<T>) ??
                  ({ accessor: cell.column.id } as DataTableColumn<T>),
                table,
              };

              return (
                <div key={cell.id} className={s.Cell}>
                  {createElement(
                    Renderer as FC<CellRenderer<T>>,
                    rendererProps,
                  )}
                </div>
              );
            })}
            {renderRowActions ? (
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
