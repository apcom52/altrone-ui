import { useDataTableCore } from '../DataTable.context.tsx';
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
    <div className={s.Footer}>
      <div className={s.Backdrop} />
      <div className={s.StatusBar}>{statusText}</div>
      <div className={s.Pagination}>
        {totalPages - 1 > 0
          ? 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages - 1}
                onChange={(page) => {
                  tableCore.setPageIndex(page - 1);
                }}
              />
            )
          : null}
      </div>
    </div>
  );
};
