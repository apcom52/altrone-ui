import { memo } from 'react';
import './data-table-footer.scss';
import DataTablePagination from './DataTablePagination';
import { useDataTableContext } from '../../../contexts';
import { useWindowSize } from '../../../hooks';

interface DataTableFooterProps {
  DataTableFooterStatusComponent: () => JSX.Element;
}

const DataTableFooter = ({ DataTableFooterStatusComponent }: DataTableFooterProps) => {
  const { initialData, limit, columns, mobileColumns, selectableMode } = useDataTableContext();
  const { ltePhoneL } = useWindowSize();

  return (
    <tfoot>
      <tr>
        <td
          className="alt-data-table-footer-wrapper"
          colSpan={
            ltePhoneL
              ? mobileColumns.length + (selectableMode ? 2 : 1)
              : selectableMode
              ? columns.length + 1
              : columns.length
          }>
          <div className="alt-data-table-footer">
            <div className="alt-data-table-footer__status" data-testid="alt-test-datatable-status">
              <DataTableFooterStatusComponent />
            </div>
            {initialData.length > limit && (
              <div className="alt-data-table-footer__pagination">
                <DataTablePagination />
              </div>
            )}
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default memo(DataTableFooter) as typeof DataTableFooter;
