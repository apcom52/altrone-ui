import clsx from 'clsx';
import { motion } from 'motion/react';
import { flexRender } from '@tanstack/react-table';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useDataTableContext } from '../DataTable.context.tsx';
import { Text } from '../../text';
import { useLocalization } from '../../application';
import { useDataTableColumnsTemplate } from '../useDataTableColumnsTemplate.ts';
import s from './columnHeaders.module.scss';

interface ColumnHeadersProps {
  hasRowActions?: boolean;
}

/** Grow-in / active-bump for the resize handle. The active label is propagated
 *  from the header cell via `whileHover` / `animate`. */
const resizeHandleVariants = {
  rest: { opacity: 0, scaleY: 0.4 },
  hover: { opacity: 1, scaleY: 1 },
  resizing: { opacity: 1, scaleY: 1.15 },
};

export const ColumnHeaders = ({ hasRowActions = false }: ColumnHeadersProps) => {
  const t = useLocalization();
  const { table, selectMode } = useDataTableContext();

  const columnsTemplate = useDataTableColumnsTemplate(selectMode, hasRowActions);

  /** none → desc → asc → none */
  const cycleSort = (columnId: string) => {
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
      className={clsx(s.Wrapper, s.HeaderRow)}
      style={{ gridTemplateColumns: columnsTemplate }}
    >
      <div className={s.Backdrop} />
      {selectMode ? <div /> : null}
      {table.getFlatHeaders().map((header) => {
        const isSortable = header.column.getCanSort();
        const sortDirection = header.column.getIsSorted();
        const canResize = header.column.getCanResize();

        const isResizing = header.column.getIsResizing();

        return (
          <motion.div
            key={header.id}
            className={clsx(s.Cell, { [s.Sortable]: isSortable })}
            title={header.id}
            onClick={isSortable ? () => cycleSort(header.id) : undefined}
            initial="rest"
            animate={isResizing ? 'resizing' : 'rest'}
            whileHover="hover"
          >
            <Text size={4} weight="bold" className={s.Label}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </Text>
            {sortDirection === 'asc' ? (
              <div className={s.SortIcon}>
                <ArrowUp />
              </div>
            ) : null}
            {sortDirection === 'desc' ? (
              <div className={s.SortIcon}>
                <ArrowDown />
              </div>
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
      })}
      {hasRowActions ? (
        <div className={s.Cell}>
          <Text size={4} weight="bold" className={s.Label}>
            {t('dataTable.actions')}
          </Text>
        </div>
      ) : null}
    </div>
  );
};
