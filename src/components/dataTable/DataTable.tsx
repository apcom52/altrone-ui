import {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import {
  ColumnFiltersState,
  SortingState,
  useTable,
} from '@tanstack/react-table';
import { AnyObject } from '../../utils';
import { DataTableFilter, DataTableProps } from './DataTable.types';
import { DataTableContext, DataTableContextValue } from './DataTable.context';
import { dataTableFeatures } from './DataTable.features';
import { useDataTableColumns } from './useDataTableColumns';
import { Action, RowActions, RowAction } from './components';
import { Body, ColumnHeaders, Header, Footer } from './inner';
import s from './dataTable.module.scss';

const DataTableComponent = <DataType extends object>(
  props: DataTableProps<DataType>,
) => {
  const {
    ref,
    children,
    selectable = false,
    showFooter = true,
    rowsPerPage = 20,
    data,
    mode = 'read',
    columns,
    showEmptyBanner = true,
    resizableColumns = false,
    defaultPage = 0,
    defaultSort,
    defaultFilters,
    onPageChange,
    onSortChange,
    onFilterChange,
    onModeChange,
    renderRowActions,
    className,
    style,
    ...restProps
  } = props;

  const [selectMode, setSelectModeState] = useState(mode === 'select');
  useEffect(() => {
    setSelectModeState(mode === 'select');
  }, [mode]);

  const columnDefs = useDataTableColumns<DataType>(columns, resizableColumns);

  const table = useTable<typeof dataTableFeatures, DataType>({
    features: dataTableFeatures,
    data,
    columns: columnDefs,
    meta: { mode },
    enableRowSelection: selectable,
    enableColumnResizing: resizableColumns,
    columnResizeMode: 'onChange',
    initialState: {
      pagination: { pageIndex: defaultPage, pageSize: rowsPerPage },
      sorting: defaultSort
        ? ([
            { id: defaultSort.field, desc: defaultSort.direction === 'desc' },
          ] as SortingState)
        : [],
      columnFilters: (defaultFilters ?? []) as ColumnFiltersState,
    },
  });

  /** Callbacks fire on user interaction only, never on the initial mount. */
  const isFirstRender = useRef(true);

  const { pageIndex } = table.state.pagination;
  useEffect(() => {
    if (isFirstRender.current) return;
    onPageChange?.(pageIndex + 1);
  }, [pageIndex]);

  const { sorting } = table.state;
  useEffect(() => {
    if (isFirstRender.current || !onSortChange) return;
    onSortChange(
      sorting.length === 0
        ? undefined
        : {
            field: sorting[0].id,
            direction: sorting[0].desc ? 'desc' : 'asc',
          },
    );
  }, [sorting]);

  const { columnFilters } = table.state;
  useEffect(() => {
    if (isFirstRender.current || !onFilterChange) return;
    onFilterChange(columnFilters as unknown as DataTableFilter[]);
  }, [columnFilters]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const setSelectMode = useCallback(
    (next: boolean) => {
      setSelectModeState(next);
      table.resetRowSelection();
      onModeChange?.(next ? 'select' : 'read');
    },
    [table, onModeChange],
  );

  const headerVisible = useMemo(
    () =>
      Children.count(children) > 0 ||
      columns.some((column) => column.filterable) ||
      selectable,
    [children, columns, selectable],
  );

  const contextValue = useMemo(
    () => ({
      table,
      loading: mode === 'loading',
      selectable,
      selectMode: selectable && selectMode,
      setSelectMode,
    }),
    [table, mode, selectable, selectMode, setSelectMode],
  );

  return (
    <DataTableContext.Provider
      value={contextValue as unknown as DataTableContextValue<AnyObject>}
    >
      <div className={s.Wrapper} ref={ref}>
        {headerVisible ? <Header>{children}</Header> : null}
        <div className={clsx(s.Table, className)} style={style} {...restProps}>
          <ColumnHeaders hasRowActions={Boolean(renderRowActions)} />
          <Body
            renderRowActions={renderRowActions}
            showEmptyBanner={showEmptyBanner}
          />
        </div>
        {showFooter ? <Footer /> : null}
      </div>
    </DataTableContext.Provider>
  );
};

const DataTableNamespace = Object.assign(DataTableComponent, {
  Action,
  RowActions,
  RowAction,
});

export { DataTableNamespace as DataTable };
