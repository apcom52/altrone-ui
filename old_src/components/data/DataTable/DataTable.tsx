import DataTableHeader from './DataTableHeader';
import './data-table.scss';
import DataTableBody from './DataTableBody';
import DataTableHeaderRow from './DataTableHeaderRow';
import DataTableFooter from './DataTableFooter';

import clsx from 'clsx';
import { DataTableProps, DataTableRenderContext } from './DataTable.types';
import { DataTableContextProvider } from './DataTable.context';
import DataTableFooterStatus from './DataTableFooterStatus';
import { DataTableAction } from './DataTableAction';

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
const DataTableComponent = <DataType extends object>(props: DataTableProps<DataType>) => {
  const {
    children,
    selectable,
    className,
    striped,
    DataTableStatusComponent = DataTableFooterStatus
  } = props;

  return (
    <DataTableContextProvider<DataType> {...props}>
      <table
        className={clsx('alt-data-table', className, {
          'alt-data-table--striped-odd': striped === 'odd',
          'alt-data-table--striped-even': striped === 'even'
        })}
        data-testid="alt-test-datatable">
        <thead>
          <DataTableHeader<DataType> selectable={Boolean(selectable)}>{children}</DataTableHeader>
          <DataTableHeaderRow />
        </thead>
        <DataTableBody<DataType> />
        <DataTableFooter DataTableFooterStatusComponent={DataTableStatusComponent} />
      </table>
    </DataTableContextProvider>
  );
};

const DataTableNamespace = Object.assign(DataTableComponent, {
  Action: DataTableAction
});

export { DataTableNamespace as DataTable };
