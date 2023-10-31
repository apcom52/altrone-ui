import DataTableHeader from './DataTableHeader';
import './data-table.scss';
import DataTableBody from './DataTableBody';
import DataTableHeaderRow from './DataTableHeaderRow';
import DataTableFooter from './DataTableFooter';

import clsx from 'clsx';
import { DataTableProps } from './DataTable.types';
import { DataTableContextProvider } from './DataTable.context';

/**
 * This component is used to show huge amount of data in table view
 * @param data
 * @param columns
 * @param limit
 * @param searchBy
 * @param searchFunc
 * @param sortFunc
 * @param sortKeys
 * @param filters
 * @param mobileColumns
 * @param className
 * @param actions
 * @param selectableActions
 * @param striped
 * @param selectable
 * @param DataTableStatusComponent
 * @constructor
 */
export const DataTable = <T extends object>(props: DataTableProps<T>) => {
  const {
    sortKeys = [],
    filters = [],
    searchBy,
    selectable,
    actions = [],
    selectableActions = [],
    className,
    striped,
    DataTableStatusComponent
  } = props;

  const isHeaderVisible = Boolean(
    sortKeys.length || filters.length || searchBy || selectable || actions?.length
  );

  return (
    <DataTableContextProvider<T> {...props}>
      <table
        className={clsx('alt-data-table', className, {
          'alt-data-table--striped-odd': striped === 'odd',
          'alt-data-table--striped-even': striped === 'even'
        })}
        data-testid="alt-test-datatable">
        <thead>
          {isHeaderVisible && (
            <DataTableHeader<T>
              actions={actions}
              selectableActions={selectableActions}
              selectable={Boolean(selectable)}
            />
          )}
          <DataTableHeaderRow />
        </thead>
        <DataTableBody<T> />
        <DataTableFooter DataTableFooterStatusComponent={DataTableStatusComponent} />
      </table>
    </DataTableContextProvider>
  );
};

export default DataTable;
