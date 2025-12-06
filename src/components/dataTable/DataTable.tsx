import { DataTableProps } from './DataTable.types';
import { DataTableCoreContext } from './DataTable.context';
import { Action, RowActions, RowAction } from './components';
import s from './dataTable.module.scss';
import { Children, useEffect, useMemo } from 'react';
import { useConfiguration } from '../configuration';
import clsx from 'clsx';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDataTableColumns } from './useDataTableColumns';
import { Body, ColumnHeaders } from './inner';
import { Header, Footer } from './inner';
import { motion } from 'motion/react';
import {
  textFilterFn,
  numberFilterFn,
  passwordFilterFn,
  booleanFilterFn,
  dateFilterFn,
  selectFilterFn,
  colorFilterFn,
} from './filters';

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
    mode = 'read',
    columns,
    showEmptyBanner = true,
    defaultPage = 0,
    defaultSort,
    onPageChange,
    onSortChange,
    onModeChange,
    renderRowActions,
    ...restProps
  } = props;

  const columnDefs = useDataTableColumns(columns);

  const table = useReactTable({
    data,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageIndex: defaultPage,
        pageSize: rowsPerPage,
      },
      sorting: defaultSort
        ? [{ id: defaultSort.field, desc: defaultSort.direction === 'desc' }]
        : undefined,
      ...(mode === 'select' ? { selectableMode: true } : {}),
    },
    meta: {
      mode,
    },
    enableRowSelection: selectable,
    filterFns: {
      text: textFilterFn,
      number: numberFilterFn,
      password: passwordFilterFn,
      boolean: booleanFilterFn,
      date: dateFilterFn,
      select: selectFilterFn,
      color: colorFilterFn,
    },
  });

  useEffect(() => {
    if (mode === 'select') {
      table.setState((old) => ({
        ...old,
        selectableMode: true,
      }));
    }
  }, [mode]);

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
      <motion.div className={s.Wrapper}>
        {dataTableHeaderVisible ? (
          <Header children={children} onModeChange={onModeChange} />
        ) : null}
        <div className={cls} style={styles} {...restProps}>
          <ColumnHeaders hasRowActions={Boolean(renderRowActions)} />
          <Body renderRowActions={renderRowActions} />
        </div>
        {showFooter ? <Footer /> : null}
      </motion.div>
    </DataTableCoreContext.Provider>
  );
};

const DataTableNamespace = Object.assign(DataTableComponent, {
  Action: Action,
  RowActions: RowActions,
  RowAction: RowAction,
});

export { DataTableNamespace as DataTable };
