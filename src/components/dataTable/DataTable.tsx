import { DataTableProps } from './DataTable.types';
import { DataTableCoreContext } from './DataTable.context';
import { Action, RowActions, RowAction } from './components';
import s from './dataTable.module.scss';
import { Children, useMemo } from 'react';
import { useConfiguration } from '../configuration';
import clsx from 'clsx';
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDataTableColumns } from './useDataTableColumns';
import { Body, ColumnHeaders } from './inner';
import { Header, Footer } from './inner';

const DataTableComponent = <DataType extends object>(
  props: DataTableProps<DataType>
) => {
  const { dataTable: dataTableConfig = {} } = useConfiguration();

  const {
    children,
    selectable,
    showFooter = true,
    rowsPerPage = 20,
    data,
    columns,
    showEmptyBanner = true,
    defaultPage = 0,
    onPageChange,
    ...restProps
  } = props;

  const columnDefs = useDataTableColumns(columns);

  console.log('columnDefs', columnDefs);

  const table = useReactTable({
    data,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: defaultPage,
        pageSize: rowsPerPage,
      },
    },
    enableRowSelection: selectable,
    onPaginationChange: (updater) => {
      table.setState((old) => ({
        ...old,
        pagination:
          typeof updater === 'function' ? updater(old.pagination) : updater,
      }));
      onPageChange?.(table.getState().pagination.pageIndex);
    },
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
        {dataTableHeaderVisible ? <Header>{children}</Header> : null}
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
