// import DataTableHeader from './DataTableHeader';
// import './data-table.scss';
// import DataTableBody from './DataTableBody';
// import DataTableHeaderRow from './DataTableHeaderRow';
// import DataTableFooter from './DataTableFooter';

import { DataTableProps } from './DataTable.types';
import { DataTableContextProvider } from './DataTable.context';
// import DataTableFooterStatus from './DataTableFooterStatus';
// import { DataTableAction } from './DataTableAction';
import s from './dataTable.module.scss';
import { Body, ColumnHeaders, DataTableHeader } from './inner';
import { useMemo } from 'react';
import { Footer } from './inner/Footer.tsx';

const DataTableComponent = <DataType extends object>(
  props: DataTableProps<DataType>,
) => {
  const { children, selectable, className, striped, DataTableStatusComponent } =
    props;

  return (
    <DataTableContextProvider<DataType> {...props}>
      <div className={s.Wrapper}>
        <DataTableHeader<DataType> selectable={Boolean(selectable)}>
          {children}
        </DataTableHeader>
        <ColumnHeaders />
        <Body />
        <Footer />
        {/*<DataTableHeaderRow />*/}
        {/*<DataTableBody<DataType> />*/}
        {/*<DataTableFooter*/}
        {/*  DataTableFooterStatusComponent={DataTableStatusComponent}*/}
        {/*/>*/}
      </div>
    </DataTableContextProvider>
  );
};

const DataTableNamespace = Object.assign(DataTableComponent, {
  // Action: DataTableAction,
});

export { DataTableNamespace as DataTable };
