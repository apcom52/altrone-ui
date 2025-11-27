import { useDataTableCore } from '../DataTable.context.tsx';
import { useEffect, useRef, useState } from 'react';
import { Tooltip } from 'components/tooltip';
import { Pagination } from 'components/pagination';
import s from './footer.module.scss';
import { useLocalization } from '../../application/useLocalization.tsx';
import { motion } from 'motion/react';

export const Footer = () => {
  const t = useLocalization();

  const tableCore = useDataTableCore();
  const selectableMode = tableCore.getState().selectableMode || false;
  const selectedRowCount = tableCore.getSelectedRowModel().rows.length;

  const currentPage = tableCore.getState().pagination.pageIndex + 1;
  const totalPages = tableCore.getPageCount() + 1;

  const rowsPerPage = tableCore.getState().pagination.pageSize;

  const footerRef = useRef<HTMLTableSectionElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const checkSticky = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        // Определяет, "прилип" ли элемент к нижней части экрана
        setIsSticky(rect.bottom >= windowHeight && rect.top < windowHeight);
      }
    };

    checkSticky();

    const scrollContainer =
      footerRef.current
        ?.closest('[class*="Scrollable"], [class*="scrollable"]')
        ?.querySelector('[data-overlayscrollbars-viewport]') ||
      footerRef.current?.closest('.Wrapper') ||
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

  const statusText = selectableMode ? (
    <div>
      {t('dataTable.selectedRows', {
        plural: true,
        value: selectedRowCount,
        vars: {
          count: selectedRowCount,
        },
      })}
    </div>
  ) : (
    <div>
      {t('dataTable.shownRows', {
        plural: true,
        value: rowsPerPage,
        vars: {
          count: rowsPerPage,
        },
      })}
    </div>
  );

  return (
    <div className={s.Footer} ref={footerRef}>
      <motion.div
        className={s.Backdrop}
        layout
        animate={{
          width: isSticky ? 'calc(100% - 16px)' : '100%',
          height: isSticky ? 'calc(100% - 16px)' : '100%',
          bottom: isSticky ? 8 : 0,
          left: isSticky ? 8 : 0,
          borderTopLeftRadius: isSticky ? 20 : 0,
          borderTopRightRadius: isSticky ? 20 : 0,
          borderBottomLeftRadius: isSticky ? 20 : 'var(--data-table-rounding)',
          borderBottomRightRadius: isSticky ? 20 : 'var(--data-table-rounding)',
        }}
        transition={{ duration: 0.2, ease: 'linear' }}
      />
      <div className={s.StatusBar}>{statusText}</div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages - 1}
          setPage={(page) => {
            console.log('>> set page from pagination', page);
            tableCore.setPageIndex(page - 1);
          }}
        />
      </div>
    </div>
  );
};
