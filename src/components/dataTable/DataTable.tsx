import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  ColumnFiltersState,
  functionalUpdate,
  PaginationState,
  SortingState,
  Updater,
  useTable,
} from '@tanstack/react-table';
import { AnyObject } from '../../utils';
import { DataTableFilter, DataTableProps, Sorting } from './DataTable.types';
import { DataTableContext, DataTableContextValue } from './DataTable.context';
import { dataTableFeatures } from './DataTable.features';
import { useDataTableColumns } from './useDataTableColumns';
import { Action, RowAction } from './components';
import { Body, ColumnHeaders, Header, Footer } from './inner';
import s from './dataTable.module.scss';

const DataTableComponent = <DataType extends object>(
  props: DataTableProps<DataType>,
) => {
  const {
    ref,
    actions,
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
    page,
    sort,
    filters,
    onPageChange,
    onSortChange,
    onFilterChange,
    onModeChange,
    rowActions,
    className,
    style,
    ...restProps
  } = props;

  const [selectMode, setSelectModeState] = useState(mode === 'select');
  useEffect(() => {
    setSelectModeState(mode === 'select');
  }, [mode]);

  const columnDefs = useDataTableColumns<DataType>(columns, resizableColumns);

  const isPageControlled = page !== undefined;
  const isSortControlled = sort !== undefined;
  const isFiltersControlled = filters !== undefined;

  const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage + 1);
  const [uncontrolledSort, setUncontrolledSort] = useState(defaultSort);
  const [uncontrolledFilters, setUncontrolledFilters] = useState(
    defaultFilters ?? [],
  );

  const currentPage = isPageControlled ? page : uncontrolledPage;
  const currentSort = isSortControlled ? (sort ?? undefined) : uncontrolledSort;
  const currentFilters = isFiltersControlled ? filters : uncontrolledFilters;

  /** See `DataTableContextValue.notePendingEvent`. */
  const pendingEventRef = useRef<React.SyntheticEvent | undefined>(undefined);
  const notePendingEvent = useCallback((event: React.SyntheticEvent) => {
    pendingEventRef.current = event;
  }, []);
  const consumePendingEvent = () => {
    const event = pendingEventRef.current;
    pendingEventRef.current = undefined;
    return event;
  };

  const handlePaginationChange = useCallback(
    (updater: Updater<PaginationState>) => {
      const next = functionalUpdate(updater, {
        pageIndex: currentPage - 1,
        pageSize: rowsPerPage,
      });
      if (!isPageControlled) setUncontrolledPage(next.pageIndex + 1);
      onPageChange?.(
        next.pageIndex + 1,
        consumePendingEvent() as React.MouseEvent<HTMLButtonElement>,
      );
    },
    [currentPage, rowsPerPage, isPageControlled, onPageChange],
  );

  const handleSortingChange = useCallback(
    (updater: Updater<SortingState>) => {
      const prevSorting: SortingState = currentSort
        ? [{ id: currentSort.field, desc: currentSort.direction === 'desc' }]
        : [];
      const nextSorting = functionalUpdate(updater, prevSorting);
      const next: Sorting | undefined =
        nextSorting.length === 0
          ? undefined
          : { field: nextSorting[0].id, direction: nextSorting[0].desc ? 'desc' : 'asc' };
      if (!isSortControlled) setUncontrolledSort(next);
      onSortChange?.(next, consumePendingEvent() as React.MouseEvent);
    },
    [currentSort, isSortControlled, onSortChange],
  );

  const handleColumnFiltersChange = useCallback(
    (updater: Updater<ColumnFiltersState>) => {
      const next = functionalUpdate(
        updater,
        currentFilters as unknown as ColumnFiltersState,
      );
      const nextFilters = next as unknown as DataTableFilter[];
      if (!isFiltersControlled) setUncontrolledFilters(nextFilters);
      onFilterChange?.(
        nextFilters,
        consumePendingEvent() as React.MouseEvent<HTMLButtonElement>,
      );
    },
    [currentFilters, isFiltersControlled, onFilterChange],
  );

  /**
   * TanStack memoizes the sorted/filtered row models on referential identity
   * of `state.sorting`/`state.pagination` — a fresh literal on every render
   * (even with the same value) looks like a change and re-triggers
   * `autoResetPageIndex`, snapping the page back to 0 after every interaction.
   */
  const paginationState = useMemo<PaginationState>(
    () => ({ pageIndex: currentPage - 1, pageSize: rowsPerPage }),
    [currentPage, rowsPerPage],
  );

  const sortingState = useMemo<SortingState>(
    () =>
      currentSort
        ? [{ id: currentSort.field, desc: currentSort.direction === 'desc' }]
        : [],
    [currentSort?.field, currentSort?.direction],
  );

  const table = useTable<typeof dataTableFeatures, DataType>({
    features: dataTableFeatures,
    data,
    columns: columnDefs,
    meta: { mode },
    enableRowSelection: selectable,
    enableColumnResizing: resizableColumns,
    columnResizeMode: 'onChange',
    /**
     * With a controlled `page`, the consumer owns page validity (e.g.
     * restoring page + filters together from a URL) — the table must not
     * silently snap it back to 0 whenever sorting/filtering changes.
     */
    autoResetPageIndex: !isPageControlled,
    state: {
      pagination: paginationState,
      sorting: sortingState,
      columnFilters: currentFilters as unknown as ColumnFiltersState,
    },
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
  });

  const setSelectMode = useCallback(
    (next: boolean, event: React.MouseEvent<HTMLButtonElement>) => {
      setSelectModeState(next);
      table.resetRowSelection();
      onModeChange?.(next ? 'select' : 'read', event);
    },
    [table, onModeChange],
  );

  const headerVisible = useMemo(
    () =>
      Boolean(actions) ||
      columns.some((column) => column.filterable) ||
      selectable,
    [actions, columns, selectable],
  );

  const contextValue = useMemo(
    () => ({
      table,
      loading: mode === 'loading',
      selectable,
      selectMode: selectable && selectMode,
      setSelectMode,
      notePendingEvent,
    }),
    [table, mode, selectable, selectMode, setSelectMode, notePendingEvent],
  );

  return (
    <DataTableContext.Provider
      value={contextValue as unknown as DataTableContextValue<AnyObject>}
    >
      <div className={s.Wrapper} ref={ref}>
        {headerVisible ? <Header actions={actions} /> : null}
        <div className={clsx(s.Table, className)} style={style} {...restProps}>
          <ColumnHeaders hasRowActions={Boolean(rowActions)} />
          <Body rowActions={rowActions} showEmptyBanner={showEmptyBanner} />
        </div>
        {showFooter ? <Footer /> : null}
      </div>
    </DataTableContext.Provider>
  );
};

const DataTableNamespace = Object.assign(DataTableComponent, {
  Action,
  RowAction,
});

export { DataTableNamespace as DataTable };
