import { useDataTableCore } from '../DataTable.context.tsx';
import s from './columnHeaders.module.scss';
import clsx from 'clsx';
import { Text } from '../../text';
import { flexRender } from '@tanstack/react-table';
import { useDataTableColumnsTemplate } from '../useDataTableColumnsTemplate.ts';
import { motion } from 'motion/react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ColumnHeaderProps {
  hasRowActions?: boolean;
}

export const ColumnHeaders = ({ hasRowActions = false }: ColumnHeaderProps) => {
  const table = useDataTableCore();

  const selectableMode = table.getState().selectableMode || false;
  const columnsTemplate = useDataTableColumnsTemplate(
    selectableMode,
    hasRowActions
  );

  function cycleSortForColumn(columnId: string) {
    const current = table.getState().sorting?.[0];
    // reset → desc
    if (!current || current.id !== columnId) {
      table.setSorting([{ id: columnId, desc: true }]);
      return;
    }

    // desc → asc
    if (current.desc === true) {
      table.setSorting([{ id: columnId, desc: false }]);
      return;
    }

    // asc → reset
    table.setSorting([]);
  }

  const cls = clsx(s.Wrapper, s.HeaderRow);

  return (
    <div className={cls} style={{ gridTemplateColumns: columnsTemplate }}>
      <div className={s.Backdrop} />
      {selectableMode ? <div /> : null}
      {table.getFlatHeaders().map((header) => {
        const isSortable = header.column.columnDef.enableSorting;

        const sortedDirection = header.column.getIsSorted();

        return (
          <div
            key={header.id}
            className={clsx(s.Cell, {
              [s.Sortable]: isSortable,
            })}
            title={header.id}
            onClick={() =>
              isSortable ? cycleSortForColumn(header.id) : undefined
            }
          >
            <Text size={4} weight="bold" className={s.Label}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </Text>
            {sortedDirection === 'asc' ? (
              <div className={s.SortIcon}>
                <ArrowUp />
              </div>
            ) : null}
            {sortedDirection === 'desc' ? (
              <div className={s.SortIcon}>
                <ArrowDown />
              </div>
            ) : null}
          </div>
        );
      })}
      {hasRowActions ? (
        <div className={s.Cell}>
          <Text size={4} weight="bold" className={s.Label}>
            Actions
          </Text>
        </div>
      ) : null}
    </div>
  );
};
