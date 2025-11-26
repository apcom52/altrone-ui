import { memo, useEffect, useRef, useState } from 'react';
import { useDataTableCore } from '../DataTable.context.tsx';
import s from './columnHeaders.module.scss';
import clsx from 'clsx';
import { DataTableProps } from '../DataTable.types.ts';
import { Text } from '../../text';
import { flexRender } from '@tanstack/react-table';
import { useDataTableColumnsTemplate } from '../useDataTableColumnsTemplate.ts';
import { motion } from 'motion/react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const ColumnHeaders = () => {
  const table = useDataTableCore();

  const selectableMode = table.getState().selectableMode || false;
  const columnsTemplate = useDataTableColumnsTemplate(selectableMode);

  const headerRef = useRef<HTMLTableSectionElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const checkSticky = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0 && rect.bottom > 0);
      }
    };

    checkSticky();

    const scrollContainer =
      headerRef.current
        ?.closest('[class*="Scrollable"], [class*="scrollable"]')
        ?.querySelector('[data-overlayscrollbars-viewport]') ||
      headerRef.current?.closest('.Wrapper') ||
      window;

    scrollContainer.addEventListener('scroll', checkSticky, {
      passive: true,
    });
    window.addEventListener('scroll', checkSticky, { passive: true });
    window.addEventListener('resize', checkSticky, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', checkSticky);
      window.removeEventListener('scroll', checkSticky);
      window.removeEventListener('resize', checkSticky);
    };
  }, []);

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
    <div
      className={cls}
      ref={headerRef}
      style={{ gridTemplateColumns: columnsTemplate }}
    >
      <motion.div
        className={s.Backdrop}
        layout
        animate={{
          width: isSticky ? 'calc(100% - 16px)' : '100%',
          height: isSticky ? 'calc(100% - 16px)' : '100%',
          top: isSticky ? 8 : 0,
          left: isSticky ? 8 : 0,
          borderTopLeftRadius: isSticky ? 20 : 'var(--data-table-rounding)',
          borderTopRightRadius: isSticky ? 20 : 'var(--data-table-rounding)',
          borderBottomLeftRadius: isSticky ? 20 : 0,
          borderBottomRightRadius: isSticky ? 20 : 0,
        }}
        transition={{ duration: 0.2, ease: 'linear' }}
      />
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
    </div>
  );
};
