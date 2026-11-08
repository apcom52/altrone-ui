import { createElement, FC } from 'react';
import { useDataTableContext } from '../DataTable.context.tsx';
import { Checkbox } from '../../checkbox';
import { Result } from 'components/result';
import { Scrollable } from '../../scrollable';
import { useLocalization } from '../../application';
import {
  CellRenderer,
  DataTableBodyProps,
  DataTableColumn,
} from '../DataTable.types.ts';
import { useDataTableColumnsTemplate } from '../useDataTableColumnsTemplate.ts';
import { CellRenderers } from '../DataTable.constants.ts';
import { BodyCell } from './BodyCell';
import { RowActionsCell } from './RowActionsCell.tsx';
import s from './body.module.scss';

export const Body = <T extends object>({
  rowActions,
  showEmptyBanner = true,
  scrollableRef,
}: DataTableBodyProps<T>) => {
  const t = useLocalization();
  const { table, selectMode, setSelectMode } = useDataTableContext<T>();

  const columnsTemplate = useDataTableColumnsTemplate(
    selectMode,
    Boolean(rowActions),
  );

  const rows = table.getRowModel().rows;

  return (
    <Scrollable
      controlRef={scrollableRef}
      overflowX="scroll"
      overflowY="visible"
      role="rowgroup"
      className={s.TableBody}
    >
      {rows.length === 0 && showEmptyBanner ? (
        <Result>{t('dataTable.empty')}</Result>
      ) : null}
      {rows.map((row) => {
        const isSelected = row.getIsSelected();

        return (
          <div
            key={row.id}
            role="row"
            aria-selected={selectMode ? isSelected : undefined}
            className={s.Row}
            data-selected={isSelected}
            style={{ gridTemplateColumns: columnsTemplate }}
          >
            {selectMode ? (
              <div role="cell" className={s.CheckboxCell}>
                <Checkbox
                  checked={isSelected}
                  onChange={() => row.toggleSelected()}
                />
              </div>
            ) : null}
            {row.getVisibleCells().map((cell) => {
              const meta = cell.column.columnDef.meta;
              const columnType = meta?.dataType ?? 'string';
              const Renderer =
                CellRenderers[columnType] ?? CellRenderers.string;

              const rendererProps: CellRenderer<T> = {
                value: cell.getValue(),
                item: row.original,
                columnConfig:
                  (meta?.columnConfig as DataTableColumn<T>) ??
                  ({ accessor: cell.column.id } as DataTableColumn<T>),
                table,
              };

              const copyFallback =
                columnType === 'boolean' || columnType === 'color'
                  ? String(rendererProps.value ?? '')
                  : undefined;

              return (
                <BodyCell
                  key={cell.id}
                  copyFallback={copyFallback}
                  rowSelected={isSelected}
                  onToggleRowSelection={
                    row.getCanSelect()
                      ? (event) => {
                          if (selectMode) {
                            row.toggleSelected();
                          } else {
                            setSelectMode(true, event, row.id);
                          }
                        }
                      : undefined
                  }
                >
                  {createElement(
                    Renderer as FC<CellRenderer<T>>,
                    rendererProps,
                  )}
                </BodyCell>
              );
            })}
            {rowActions ? (
              <div role="cell" className={s.Cell}>
                <RowActionsCell>
                  {typeof rowActions === 'function'
                    ? rowActions({
                        row: row.original,
                        rowIndex: row.index,
                        selected: isSelected,
                      })
                    : rowActions}
                </RowActionsCell>
              </div>
            ) : null}
          </div>
        );
      })}
    </Scrollable>
  );
};
