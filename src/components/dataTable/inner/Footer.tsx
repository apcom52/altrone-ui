import { useDataTableContext } from '../DataTable.context.tsx';
import { Pagination } from 'components/pagination';
import { useLocalization } from '../../application/useLocalization.tsx';
import s from './footer.module.scss';

export const Footer = () => {
  const t = useLocalization();
  const { table, selectMode } = useDataTableContext();

  const selectedRowCount = table.getSelectedRowModel().rows.length;
  const visibleRowCount = table.getRowModel().rows.length;
  const { pageIndex } = table.state.pagination;
  const pageCount = table.getPageCount();

  const statusText = selectMode
    ? t('dataTable.selectedRows', {
        plural: true,
        value: selectedRowCount,
        vars: { count: selectedRowCount },
      })
    : t('dataTable.shownRows', {
        plural: true,
        value: visibleRowCount,
        vars: { count: visibleRowCount },
      });

  return (
    <div className={s.Footer}>
      <div className={s.Backdrop} />
      <div className={s.StatusBar}>{statusText}</div>
      {pageCount > 1 ? (
        <div className={s.Pagination}>
          <Pagination
            currentPage={pageIndex + 1}
            totalPages={pageCount}
            onChange={(page) => table.setPageIndex(page - 1)}
          />
        </div>
      ) : null}
    </div>
  );
};
