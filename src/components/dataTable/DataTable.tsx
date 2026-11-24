import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SyntheticEvent } from 'react';
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
import type { Row, RowSelectionState } from '@tanstack/react-table';
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
import { AnyObject, GlobalUtils } from '../../utils';
import {
  DataTableFilter,
  DataTableIconSet,
  DataTableProps,
  Sorting,
} from './DataTable.types';
import { DataTableContext, DataTableContextValue } from './DataTable.context';
import { dataTableFeatures } from './DataTable.features';
import type { DataTableFeatures } from './DataTable.features';
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
    selectable,
    selectionMode: explicitSelectionMode,
    selectedRowIds,
    defaultSelectedRowIds,
    onSelectionChange,
    isRowSelectable,
    selectionToggle = true,
    allowDeselect = true,
    selectOnRowClick = false,
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

  const legacySelection = explicitSelectionMode === undefined;
  const selectionMode =
    explicitSelectionMode ?? (selectable ? 'multiple' : 'none');
  const selectionEnabled = selectionMode !== 'none';
  const showSelectionToggle =
    selectionEnabled && (legacySelection || selectionToggle);
  const loading = mode === 'loading';
  const [selectMode, setSelectModeState] = useState(mode === 'select');
  useEffect(() => {
    setSelectModeState(mode === 'select');
  }, [mode]);

  useEffect(() => {
    if (import.meta.env.DEV && selectable !== undefined) {
      GlobalUtils.deprecatedMessage('DataTable', 'selectable', 'selectionMode');
    }
  }, [selectable]);

  const [uncontrolledRowIds, setUncontrolledRowIds] = useState(
    () => [...(defaultSelectedRowIds ?? [])],
  );
  const rowIds = selectedRowIds ?? uncontrolledRowIds;
  const effectiveRowIds = useMemo(() => {
    if (!selectionEnabled) return new Set<string>();
    return new Set(selectionMode === 'single' ? rowIds.slice(0, 1) : rowIds);
  }, [rowIds, selectionEnabled, selectionMode]);
  const rowSelection = useMemo(() => {
    const state: RowSelectionState = Object.create(null);
    for (const id of effectiveRowIds) state[id] = true;
    return state;
  }, [effectiveRowIds]);

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
    enableRowSelection:
      selectionEnabled &&
      (legacySelection || !isRowSelectable
        ? true
        : (row) => isRowSelectable(row.original)),
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
      ...(!legacySelection && { rowSelection }),
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
      if (legacySelection) {
        if (selectedRowId !== undefined) {
          table.setRowSelection({ [selectedRowId]: true });
        } else {
          table.resetRowSelection();
        }
      }
      onModeChange?.(next ? 'select' : 'read', event);
    },
    [table, legacySelection, onModeChange],
  );

  const commitSelection = (next: Set<string>, event: SyntheticEvent) => {
    const ids = Array.from(next);
    if (selectedRowIds === undefined) setUncontrolledRowIds([...ids]);
    const nativeEvent = event.nativeEvent;
    onSelectionChange?.(ids, {
      rows: table.getCoreRowModel().rows.flatMap((row) =>
        next.has(row.id) ? [row.original] : [],
      ),
      event:
        nativeEvent instanceof MouseEvent ||
        nativeEvent instanceof KeyboardEvent
          ? nativeEvent
          : undefined,
    });
  };

  const toggleRowSelection = (
    row: Row<DataTableFeatures, DataType>,
    event: SyntheticEvent,
  ) => {
    if (!row.getCanSelect()) return;
    if (legacySelection) {
      row.toggleSelected();
      return;
    }
    if (loading) return;

    const selected = effectiveRowIds.has(row.id);
    if (selectionMode === 'single') {
      if (!selected || allowDeselect) {
        commitSelection(new Set(selected ? [] : [row.id]), event);
      }
      return;
    }

    const next = new Set(effectiveRowIds);
    if (selected) next.delete(row.id);
    else next.add(row.id);
    commitSelection(next, event);
  };

  const togglePageSelection = (checked: boolean, event: SyntheticEvent) => {
    const next = new Set(effectiveRowIds);
    for (const row of table.getRowModel().rows) {
      if (!row.getCanSelect()) continue;
      if (checked) next.add(row.id);
      else next.delete(row.id);
    }
    commitSelection(next, event);
  };

  const headerVisible = useMemo(
    () =>
      Boolean(actions) ||
      columns.some(
        (column) => column.enabled !== false && columnFilterType(column),
      ) ||
      hideableColumns ||
      showSelectionToggle,
    [actions, columns, showSelectionToggle, hideableColumns],
  );

  const contextValue: DataTableContextValue<DataType> = {
    table,
    icons: resolvedIcons,
    loading,
    selectionMode,
    showSelectionToggle,
    selectMode: selectionEnabled && (!showSelectionToggle || selectMode),
    selectedRowIds: legacySelection ? undefined : effectiveRowIds,
    allowDeselect,
    selectOnRowClick: !legacySelection && selectOnRowClick,
    toggleRowSelection,
    togglePageSelection,
    setSelectMode,
    notePendingEvent,
    defaultColumnVisibility,
  };

  const { scrollableRef, headerRowRef, headerTrackRef } =
    useDataTableHorizontalScroll();

  if (
    import.meta.env.DEV &&
    !legacySelection &&
    selectionEnabled &&
    !getRowId
  ) {
    throw new Error(
      '[DataTable]: getRowId is required when selectionMode is single or multiple.',
    );
  }

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
