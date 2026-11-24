import { createElement, FC, useId } from 'react';
import { useDataTableContext } from '../DataTable.context.tsx';
import { Checkbox } from '../../checkbox';
import { Radio } from '../../radio';
import { RadioContextWrapper } from '../../radio/Radio.context';
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

const interactiveTarget = [
  'a, button, input, select, textarea, label, summary, video[controls], audio[controls]',
  '[tabindex]:not([role="row"], [role="cell"])',
  '[contenteditable]:not([contenteditable="false"])',
  '[role="button"], [role="link"], [role="checkbox"], [role="radio"], [role="switch"]',
  '[role="combobox"], [role="textbox"], [role="slider"], [role="spinbutton"]',
  '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="tab"]',
].join(', ');

export const Body = <T extends object>({
  rowActions,
  showEmptyBanner = true,
  scrollableRef,
}: DataTableBodyProps<T>) => {
  const t = useLocalization();
  const {
    table,
    loading,
    selectionMode,
    selectMode,
    selectedRowIds,
    allowDeselect,
    selectOnRowClick,
    setSelectMode,
    toggleRowSelection,
  } = useDataTableContext<T>();
  const radioName = useId();

  const columnsTemplate = useDataTableColumnsTemplate(
    selectMode,
    Boolean(rowActions),
  );

  const rows = table.getRowModel().rows;
  const single = selectionMode === 'single';
  const modernSelection = selectedRowIds !== undefined;
  const radioGroup = {
    name: radioName,
    value: selectedRowIds?.values().next().value,
    size: 'm' as const,
    disabled: loading,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      const row = rows.find(({ id }) => id === event.currentTarget.value);
      if (row) toggleRowSelection(row, event);
    },
  };

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
        const canSelect = row.getCanSelect();
        const visibleCells = row.getVisibleCells();
        const firstCell = visibleCells[0];
        const firstValue =
          selectMode && firstCell?.column.columnDef.meta?.dataType !== 'password'
            ? firstCell?.getValue()
            : undefined;
        const rowLabel =
          typeof firstValue === 'number' ||
          (typeof firstValue === 'string' && firstValue.trim())
            ? String(firstValue)
            : row.id;
        const selectionLabel = selectMode
          ? t('dataTable.selectRowLabel', { vars: { row: rowLabel } })
          : undefined;
        const canSelectFromRow = modernSelection && canSelect && !loading;
        const canSelectWithKeyboard =
          canSelectFromRow && (selectMode || selectOnRowClick);
        const actions =
          typeof rowActions === 'function'
            ? rowActions({
                row: row.original,
                rowIndex: row.index,
                selected: isSelected,
              })
            : rowActions;

        return (
          <div
            key={row.id}
            role="row"
            aria-selected={
              selectMode || (modernSelection && selectionMode !== 'none')
                ? isSelected
                : undefined
            }
            tabIndex={canSelectWithKeyboard ? 0 : undefined}
            className={s.Row}
            data-selected={isSelected}
            style={{ gridTemplateColumns: columnsTemplate }}
            onKeyDown={
              canSelectWithKeyboard
                ? (event) => {
                    if (
                      event.target !== event.currentTarget ||
                      event.key !== ' ' ||
                      event.defaultPrevented
                    ) {
                      return;
                    }
                    event.preventDefault();
                    if (!event.repeat) toggleRowSelection(row, event);
                  }
                : undefined
            }
            onClick={
              canSelectFromRow && selectOnRowClick
                ? (event) => {
                    const { target, currentTarget } = event;
                    if (
                      event.defaultPrevented ||
                      !(target instanceof Element) ||
                      !currentTarget.contains(target)
                    ) {
                      return;
                    }
                    const control = target.closest(interactiveTarget);
                    if (!control || !currentTarget.contains(control)) {
                      toggleRowSelection(row, event);
                    }
                  }
                : undefined
            }
          >
            {selectMode ? (
              <div role="cell" className={s.CheckboxCell}>
                {single ? (
                  <RadioContextWrapper.Provider value={radioGroup}>
                    <Radio.Item
                      value={row.id}
                      disabled={!canSelect}
                      aria-label={selectionLabel}
                      onClick={
                        isSelected && allowDeselect
                          ? (event) => {
                              if (event.target instanceof HTMLInputElement) {
                                toggleRowSelection(row, event);
                              }
                            }
                          : undefined
                      }
                    />
                  </RadioContextWrapper.Provider>
                ) : (
                  <Checkbox
                    checked={isSelected}
                    disabled={modernSelection ? !canSelect || loading : undefined}
                    aria-label={selectionLabel}
                    onChange={(_, event) => toggleRowSelection(row, event)}
                  />
                )}
              </div>
            ) : null}
            {visibleCells.map((cell) => {
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
                  rowActions={actions}
                  rowSelected={isSelected}
                  onToggleRowSelection={
                    canSelect && (!single || !isSelected || allowDeselect)
                      ? (event) => {
                          if (!selectMode) {
                            setSelectMode(
                              true,
                              event,
                              modernSelection ? undefined : row.id,
                            );
                            if (!modernSelection) return;
                          }
                          toggleRowSelection(row, event);
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
                <RowActionsCell>{actions}</RowActionsCell>
              </div>
            ) : null}
          </div>
        );
      })}
    </Scrollable>
  );
};
