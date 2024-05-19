import { useDataTableContext } from '../DataTable.context.tsx';
import DataTablePagination from '../DataTablePagination.tsx';
import { memo } from 'react';
import { Pagination } from '../../pagination';
import s from './footer.module.scss';

export const Footer = memo(() => {
  const {
    initialData,
    limit,
    columns,
    setPage,
    mobileColumns,
    selectableMode,
  } = useDataTableContext();

  return (
    <div className={s.Footer}>
      <div className={s.StatusBar}>20 rows are shown</div>
      <div>
        <Pagination currentPage={1} totalPages={2} setPage={setPage} />
      </div>
    </div>
  );
});
