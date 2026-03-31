import { DataTableProps, Filter, FilterType } from './DataTable.types';
import { DataTableCoreContext } from './DataTable.context';
import { Action, RowActions, RowAction } from './components';
import s from './dataTable.module.scss';
import { Children, useEffect, useMemo, useRef } from 'react';
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
    ref,
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
    defaultFilters,
    onPageChange,
    onSortChange,
    onFilterChange,
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
      columnFilters:
        defaultFilters?.map((f) => ({ id: f.field, value: f.conditions[0] })) ??
        [],
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
  }, [mode, table]);

  // Ref to skip firing callbacks on initial mount
  const isFirstRender = useRef(true);

  const pageIndex = table.getState().pagination.pageIndex;
  useEffect(() => {
    if (isFirstRender.current) return;
    onPageChange?.(pageIndex + 1);
  }, [pageIndex]);

  const sorting = table.getState().sorting;
  useEffect(() => {
    if (isFirstRender.current) return;
    if (!onSortChange) return;
    if (sorting.length === 0) {
      onSortChange(undefined);
    } else {
      onSortChange({
        field: sorting[0].id,
        direction: sorting[0].desc ? 'desc' : 'asc',
      });
    }
  }, [sorting]);

  const columnFilters = table.getState().columnFilters;
  useEffect(() => {
    if (isFirstRender.current) return;
    if (!onFilterChange) return;
    if (columnFilters.length === 0) {
      onFilterChange(undefined);
    } else {
      const filters = columnFilters.map((cf) => {
        const col = columns.find((c) => String(c.accessor) === cf.id);
        return {
          field: cf.id,
          type: FilterType.string,
          columnType: col?.type ?? 'string',
          conditions: [cf.value],
        } as Filter;
      });
      onFilterChange(filters);
    }
  }, [columnFilters]);

  // Must be declared after the callback effects so they see isFirstRender = true on first mount
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

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
      <motion.div className={s.Wrapper} ref={ref}>
        {dataTableHeaderVisible ? (
          <Header children={children} onModeChange={onModeChange} />
        ) : null}
        <div className={cls} style={styles} {...restProps}>
          <ColumnHeaders hasRowActions={Boolean(renderRowActions)} />
          <Body
            renderRowActions={renderRowActions}
            showEmptyBanner={showEmptyBanner}
          />
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
