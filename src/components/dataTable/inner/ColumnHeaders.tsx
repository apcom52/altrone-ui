import type { Ref } from 'react';
import clsx from 'clsx';
import { motion } from 'motion/react';
import { flexRender } from '@tanstack/react-table';
import { EyeOff } from 'lucide-react';
import { useDataTableContext } from '../DataTable.context.tsx';
import { Text } from '../../text';
import { Dropdown } from '../../dropdown';
import { Divider } from '../../divider';
import { Checkbox } from '../../checkbox';
import { useLocalization } from '../../application';
import { useDataTableColumnsTemplate } from '../useDataTableColumnsTemplate.ts';
import s from './columnHeaders.module.scss';

interface ColumnHeadersProps {
  hasRowActions?: boolean;
  hideableColumns: boolean;
  /** True when there's no `DataTable.Header` row above this one — see `.RoundTop`. */
  roundTop?: boolean;
  /** The sticky row itself — receives the per-side inset/radius custom properties. */
  rowRef?: Ref<HTMLDivElement>;
  /** Shifted by `transform` to mirror the body's horizontal scroll — see `useDataTableHorizontalScroll`. */
  trackRef?: Ref<HTMLDivElement>;
}

/** Grow-in / active-bump for the resize handle. The active label is propagated
 *  from the header cell via `whileHover` / `animate`. */
const resizeHandleVariants = {
  rest: { opacity: 0, scaleY: 0.4 },
  hover: { opacity: 1, scaleY: 1 },
  resizing: { opacity: 1, scaleY: 1.15 },
};

export const ColumnHeaders = ({
  hasRowActions = false,
  hideableColumns,
  roundTop = false,
  rowRef,
  trackRef,
}: ColumnHeadersProps) => {
  const t = useLocalization();
  const {
    table,
    icons,
    loading,
    selectMode,
    selectionMode,
    selectedRowIds,
    togglePageSelection,
    notePendingEvent,
  } = useDataTableContext();

  const hasPageSelection =
    selectMode && selectionMode === 'multiple' && selectedRowIds !== undefined;
  const selectableRows = hasPageSelection
    ? table.getRowModel().rows.filter((row) => row.getCanSelect())
    : [];
  const selectedOnPage = selectableRows.filter((row) => row.getIsSelected()).length;
  const allSelected =
    selectableRows.length > 0 && selectedOnPage === selectableRows.length;
  const partiallySelected = !allSelected && selectedOnPage > 0;

  const canHideColumn = table.getVisibleLeafColumns().length > 1;

  const columnsTemplate = useDataTableColumnsTemplate(
    selectMode,
    hasRowActions,
  );

  /** none → desc → asc → none */
  const cycleSort = (
    columnId: string,
    event: React.MouseEvent | React.KeyboardEvent,
  ) => {
    notePendingEvent(event);
    const current = table.state.sorting[0];
    if (!current || current.id !== columnId) {
      table.setSorting([{ id: columnId, desc: true }]);
      return;
    }
    if (current.desc) {
      table.setSorting([{ id: columnId, desc: false }]);
      return;
    }
    table.setSorting([]);
  };

  return (
    <div
      ref={rowRef}
      role="rowgroup"
      className={clsx(s.Wrapper, s.HeaderRow, { [s.RoundTop]: roundTop })}
    >
      <div className={s.Backdrop} aria-hidden="true" />
      <div
        ref={trackRef}
        role="row"
        className={s.HeaderRowTrack}
        style={{ gridTemplateColumns: columnsTemplate }}
      >
        {selectMode ? (
          <div
            role="columnheader"
            className={s.CheckboxCell}
            aria-label={t('dataTable.selectableMode')}
          >
            {hasPageSelection ? (
              <Checkbox
                aria-label={t('dataTable.selectPageRows')}
                checked={allSelected}
                indeterminate={partiallySelected}
                disabled={loading || selectableRows.length === 0}
                onChange={(checked, event) => {
                  event.currentTarget.indeterminate = partiallySelected;
                  togglePageSelection(checked, event);
                }}
              />
            ) : null}
          </div>
        ) : null}
        {table.getFlatHeaders().map((header) => {
          const isSortable = header.column.getCanSort();
          const sortDirection = header.column.getIsSorted();
          const canResize = header.column.getCanResize();

          const isResizing = header.column.getIsResizing();

          const hasMenu = !loading && (isSortable || hideableColumns);

          const cell = (
            <motion.div
              key={header.id}
              className={clsx(s.Cell, { [s.Sortable]: isSortable })}
              title={header.id}
              onClick={
                isSortable ? (event) => cycleSort(header.id, event) : undefined
              }
              onKeyDown={
                isSortable
                  ? (event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        cycleSort(header.id, event);
                      }
                    }
                  : undefined
              }
              tabIndex={isSortable || hasMenu ? 0 : undefined}
              role="columnheader"
              aria-sort={
                !isSortable
                  ? undefined
                  : sortDirection === 'asc'
                    ? 'ascending'
                    : sortDirection === 'desc'
                      ? 'descending'
                      : 'none'
              }
              initial="rest"
              animate={isResizing ? 'resizing' : 'rest'}
              whileHover="hover"
            >
              <Text size={4} weight="bold" className={s.Label}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </Text>
              {sortDirection === 'asc' ? (
                <div className={s.SortIcon}>{icons.sortAsc}</div>
              ) : null}
              {sortDirection === 'desc' ? (
                <div className={s.SortIcon}>{icons.sortDesc}</div>
              ) : null}
              {canResize ? (
                <div
                  data-resize-handle={header.id}
                  className={clsx(s.Resizer, { [s.ResizerActive]: isResizing })}
                  onMouseDown={(event) => header.getResizeHandler()(event)}
                  onTouchStart={(event) => header.getResizeHandler()(event)}
                  onClick={(event) => event.stopPropagation()}
                >
                  <motion.div
                    className={s.ResizerHandle}
                    variants={resizeHandleVariants}
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                  />
                </div>
              ) : null}
            </motion.div>
          );

          if (!hasMenu) return cell;

          return (
            <Dropdown
              key={header.id}
              trigger="contextmenu"
              closeParentPopover={false}
              content={({ hide }) => (
                <Dropdown.Menu>
                  {isSortable ? (
                    <Dropdown.RadioList
                      aria-label={t('dataTable.sortColumn')}
                      value={sortDirection || 'none'}
                      onChange={(direction, event) => {
                        notePendingEvent(event);
                        table.setSorting(
                          direction === 'none'
                            ? []
                            : [{ id: header.column.id, desc: direction === 'desc' }],
                        );
                        hide();
                      }}
                    >
                      <Dropdown.RadioItem
                        value="none"
                        label={t('dataTable.noSort')}
                      />
                      <Dropdown.RadioItem
                        value="asc"
                        label={t('dataTable.sortAscending')}
                      />
                      <Dropdown.RadioItem
                        value="desc"
                        label={t('dataTable.sortDescending')}
                      />
                    </Dropdown.RadioList>
                  ) : null}
                  {isSortable && hideableColumns ? <Divider /> : null}
                  {hideableColumns ? (
                    <Dropdown.Action
                      label={t('dataTable.hideColumn')}
                      icon={<EyeOff />}
                      disabled={!canHideColumn}
                      onClick={(event) => {
                        notePendingEvent(event);
                        header.column.toggleVisibility(false);
                      }}
                    />
                  ) : null}
                </Dropdown.Menu>
              )}
            >
              {cell}
            </Dropdown>
          );
        })}
        {hasRowActions ? (
          <div role="columnheader" className={s.Cell}>
            <Text size={4} weight="bold" className={s.Label}>
              {t('dataTable.actions')}
            </Text>
          </div>
        ) : null}
      </div>
    </div>
  );
};
