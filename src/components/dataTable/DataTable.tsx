import { DataTableProps } from './DataTable.types';
import { DataTableCoreContext } from './DataTable.context';
import { Action, RowActions, RowAction } from './components';
import s from './dataTable.module.scss';
import { Children, useMemo } from 'react';
import { useConfiguration } from '../configuration';
import clsx from 'clsx';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useDataTableColumns } from './useDataTableColumns';
import { Body, ColumnHeaders } from './inner';
import { Footer } from './inner/Footer.tsx';

const DataTableComponent = <DataType extends object>(
  props: DataTableProps<DataType>
) => {
  const { dataTable: dataTableConfig = {} } = useConfiguration();

  const {
    children,
    selectable,
    showFooter = true,
    rowsPerPage,
    data,
    columns,
    showEmptyBanner = true,
    ...restProps
  } = props;

  const columnDefs = useDataTableColumns(columns);

  console.log('columnDefs', columnDefs);

  const table = useReactTable({
    data,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
  });

  const cls = clsx(s.Table, props.className, dataTableConfig.className);
  const styles = {
    ...dataTableConfig.style,
    ...props.style,
  };

  const dataTableHeaderVisible = useMemo(() => {
    return (
      Children.count(children) > 0 ||
      props.columns.filter((column) => column.filterable).length > 0
    );
  }, [children, props.columns]);

  return (
    <DataTableCoreContext.Provider value={table}>
      <div className={s.Wrapper}>
        {/* {dataTableHeaderVisible ? (
          <Header<DataType> selectable={Boolean(selectable)}>{children}</Header>
        ) : null} */}
        <table className={cls} style={styles} {...restProps}>
          <ColumnHeaders />
          <Body />
        </table>
        {showFooter ? <Footer /> : null}
      </div>
    </DataTableCoreContext.Provider>
  );
};

const DataTableNamespace = Object.assign(DataTableComponent, {
  Action: Action,
  RowActions: RowActions,
  RowAction: RowAction,
});

export { DataTableNamespace as DataTable };
