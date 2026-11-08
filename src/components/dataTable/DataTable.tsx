import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  ColumnFiltersState,
  ColumnVisibilityState,
  functionalUpdate,
  PaginationState,
  SortingState,
  Updater,
  useTable,
} from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  Check,
  Columns3Cog,
  Ellipsis,
  Funnel,
  Minus,
  Plus,
  Square,
  SquareCheckBig,
  Trash,
} from 'lucide-react';
import { AnyObject } from '../../utils';
import {
  DataTableFilter,
  DataTableIconSet,
  DataTableProps,
  Sorting,
} from './DataTable.types';
import { DataTableContext, DataTableContextValue } from './DataTable.context';
import { dataTableFeatures } from './DataTable.features';
import { columnFilterType } from './DataTable.constants';
import { useDataTableColumns } from './useDataTableColumns';
import { useDataTableHorizontalScroll } from './useDataTableHorizontalScroll';
import { Action, RowAction } from './components';
import { Body, ColumnHeaders, Header, Footer } from './inner';
import s from './dataTable.module.scss';

const DEFAULT_DATA_TABLE_ICONS: DataTableIconSet = {
  sortAsc: <ArrowUp />,
  sortDesc: <ArrowDown />,
  filter: <Funnel />,
  columnVisibility: <Columns3Cog />,
  addFilter: <Plus />,
  deleteFilter: <Trash />,
  enableSelection: <SquareCheckBig />,
  disableSelection: <Square />,
  rowActions: <Ellipsis />,
  booleanTrue: <Check />,
  booleanFalse: <Minus />,
};

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
    getRowId,
    mode = 'read',
    columns,
    showEmptyBanner = true,
    resizableColumns = false,
    hideableColumns = false,
    hiddenColumns,
    defaultHiddenColumns,
    onHiddenColumnsChange,
    icons,
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

  const resolvedIcons = useMemo<DataTableIconSet>(
    () => ({ ...DEFAULT_DATA_TABLE_ICONS, ...icons }),
    [icons],
  );

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
          : {
              field: nextSorting[0].id,
              direction: nextSorting[0].desc ? 'desc' : 'asc',
            };
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

  const columnAccessors = useMemo(
    () =>
      columns
        .filter((column) => column.enabled !== false)
        .map((column) => column.accessor),
    [columns],
  );

  const [uncontrolledHiddenColumns, setUncontrolledHiddenColumns] =
    useState(() => defaultHiddenColumns ?? []);
  const currentHiddenColumns = hiddenColumns ?? uncontrolledHiddenColumns;

  const getVisibilityState = useCallback(
    (hidden: Array<keyof DataType>): ColumnVisibilityState => {
      const hiddenAccessors = new Set(hidden);
      const hiddenKeys = columnAccessors.filter((key) =>
        hiddenAccessors.has(key),
      );
      if (hiddenKeys.length === columnAccessors.length) hiddenKeys.shift();
      return Object.fromEntries(hiddenKeys.map((key) => [String(key), false]));
    },
    [columnAccessors],
  );
  const columnVisibility = useMemo(
    () => getVisibilityState(currentHiddenColumns),
    [currentHiddenColumns, getVisibilityState],
  );
  const defaultColumnVisibility = useMemo(
    () => getVisibilityState(defaultHiddenColumns ?? []),
    [defaultHiddenColumns, getVisibilityState],
  );

  const handleColumnVisibilityChange = useCallback(
    (updater: Updater<ColumnVisibilityState>) => {
      const event = consumePendingEvent();
      const next = functionalUpdate(updater, columnVisibility);
      const hidden = columnAccessors.filter(
        (key) => next[String(key)] === false,
      );
      if (hidden.length === columnAccessors.length) hidden.shift();
      if (hiddenColumns === undefined) setUncontrolledHiddenColumns(hidden);
      onHiddenColumnsChange?.(hidden, event);
    },
    [columnVisibility, columnAccessors, hiddenColumns, onHiddenColumnsChange],
  );

  const table = useTable<typeof dataTableFeatures, DataType>({
    features: dataTableFeatures,
    data,
    getRowId,
    columns: columnDefs,
    meta: { mode, icons: resolvedIcons },
    enableRowSelection: selectable,
    enableColumnResizing: resizableColumns,
    enableHiding: hideableColumns,
    columnResizeMode: 'onChange',
    /**
     * With a controlled `page`, the consumer owns page validity (e.g.
     * restoring page + filters together from a URL) — the table must not
     * silently snap it back to 0 whenever sorting/filtering changes.
     */
    autoResetPageIndex: !isPageControlled,
    state: {
      pagination: paginationState,
      columnVisibility,
      sorting: sortingState,
      columnFilters: currentFilters as unknown as ColumnFiltersState,
    },
    onColumnVisibilityChange: handleColumnVisibilityChange,
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
  });

  const setSelectMode = useCallback(
    (
      next: boolean,
      event: React.MouseEvent<HTMLButtonElement>,
      selectedRowId?: string,
    ) => {
      setSelectModeState(next);
      if (selectedRowId !== undefined) {
        table.setRowSelection({ [selectedRowId]: true });
      } else {
        table.resetRowSelection();
      }
      onModeChange?.(next ? 'select' : 'read', event);
    },
    [table, onModeChange],
  );

  const headerVisible = useMemo(
    () =>
      Boolean(actions) ||
      columns.some(
        (column) => column.enabled !== false && columnFilterType(column),
      ) ||
      hideableColumns ||
      selectable,
    [actions, columns, selectable, hideableColumns],
  );

  const contextValue = useMemo(
    () => ({
      table,
      icons: resolvedIcons,
      loading: mode === 'loading',
      selectable,
      selectMode: selectable && selectMode,
      setSelectMode,
      notePendingEvent,
      defaultColumnVisibility,
    }),
    [
      table,
      resolvedIcons,
      mode,
      selectable,
      selectMode,
      setSelectMode,
      notePendingEvent,
      defaultColumnVisibility,
    ],
  );

  const { scrollableRef, headerRowRef, headerTrackRef } =
    useDataTableHorizontalScroll();

  return (
    <DataTableContext.Provider
      value={contextValue as unknown as DataTableContextValue<AnyObject>}
    >
      <div className={s.Wrapper} ref={ref}>
        {headerVisible ? (
          <Header actions={actions} hideableColumns={hideableColumns} />
        ) : null}
        <div
          role="table"
          className={clsx(s.Table, className)}
          style={style}
          {...restProps}
        >
          <ColumnHeaders
            hideableColumns={hideableColumns}
            hasRowActions={Boolean(rowActions)}
            roundTop={!headerVisible}
            rowRef={headerRowRef}
            trackRef={headerTrackRef}
          />
          <Body
            rowActions={rowActions}
            showEmptyBanner={showEmptyBanner}
            scrollableRef={scrollableRef}
          />
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
