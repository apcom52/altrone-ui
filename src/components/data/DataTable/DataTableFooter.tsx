import { memo } from 'react';
import './data-table-footer.scss';
import DataTablePagination from './DataTablePagination';
import { useDataTableContext } from '../../../contexts';
import { useLocalization, useWindowSize } from '../../../hooks';

const DataTableFooter = () => {
  const { data, initialData, limit, columns, mobileColumns } = useDataTableContext();
  const { ltePhoneL } = useWindowSize();
  const t = useLocalization();

  return (
    <tfoot>
      <td
        className="alt-data-table-footer-wrapper"
        colSpan={ltePhoneL ? mobileColumns.length + 1 : columns.length}>
        <div className="alt-data-table-footer">
          <div className="alt-data-table-footer__status" data-testid="alt-test-datatable-status">
            {ltePhoneL ? (
              t('data.dataTable.lines', {
                plural: true,
                value: data.length,
                vars: { count: data.length }
              })
            ) : (
              <>
                {t('data.dataTable.showing')}{' '}
                {t('data.dataTable.lines', {
                  plural: true,
                  value: data.length,
                  vars: { count: data.length }
                })}
              </>
            )}
          </div>
          {initialData.length > limit && (
            <div className="alt-data-table-footer__pagination">
              <DataTablePagination />
            </div>
          )}
        </div>
      </td>
    </tfoot>
  );
};

export default memo(DataTableFooter);
