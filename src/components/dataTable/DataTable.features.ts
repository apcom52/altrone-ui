import {
  tableFeatures,
  columnFilteringFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  metaHelper,
} from '@tanstack/react-table';
import {
  textFilterFn,
  numberFilterFn,
  passwordFilterFn,
  booleanFilterFn,
  dateFilterFn,
  selectFilterFn,
  colorFilterFn,
} from './filters';
import type {
  DataTableColumnMeta,
  DataTableColumnType,
  DataTableMeta,
} from './DataTable.types.ts';

/**
 * The one place where TanStack Table features are wired up. Kept module-level so
 * the feature set is stable across renders (recommended by the library).
 */
export const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: {
    text: textFilterFn,
    number: numberFilterFn,
    password: passwordFilterFn,
    boolean: booleanFilterFn,
    date: dateFilterFn,
    select: selectFilterFn,
    color: colorFilterFn,
  },
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
  },
  tableMeta: metaHelper<DataTableMeta>(),
  columnMeta: metaHelper<DataTableColumnMeta>(),
});

export type DataTableFeatures = typeof dataTableFeatures;

/** Registered `filterFns` key for a column type, or `undefined` when it has no filter. */
export const filterFnForType = (
  type: DataTableColumnType,
): keyof DataTableFeatures['filterFns'] | undefined => {
  switch (type) {
    case 'string':
    case 'text':
    case 'link':
      return 'text';
    case 'number':
    case 'currency':
      return 'number';
    case 'password':
      return 'password';
    case 'boolean':
      return 'boolean';
    case 'date':
      return 'date';
    case 'select':
      return 'select';
    case 'color':
      return 'color';
    default:
      return undefined;
  }
};

/** Registered `sortFns` key for a column type. */
export const sortFnForType = (
  type: DataTableColumnType,
): keyof DataTableFeatures['sortFns'] => {
  if (type === 'number' || type === 'currency') return 'basic';
  if (type === 'date') return 'datetime';
  return 'alphanumeric';
};
