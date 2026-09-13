import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DataTableColumn, DataTableColumnMeta } from './DataTable.types.ts';
import {
  DataTableFeatures,
  filterFnForType,
  sortFnForType,
} from './DataTable.features.ts';

/**
 * Translates the library's declarative `DataTableColumn` list into TanStack
 * Table `ColumnDef`s. Everything type-specific (renderer, filter fn, sort fn) is
 * resolved here from `column.type`; the rest of the component only ever sees
 * `ColumnDef`s and the table instance.
 */
export function useDataTableColumns<T extends object>(
  columns: DataTableColumn<T>[],
  resizableColumns: boolean,
): ColumnDef<DataTableFeatures, T, unknown>[] {
  return useMemo(() => {
    return columns
      .filter((column) => column.visible !== false)
      .map((column): ColumnDef<DataTableFeatures, T, unknown> => {
        const type = column.type ?? 'string';
        const filterType =
          typeof column.filterable === 'string' ? column.filterable : type;

        return {
          id: String(column.accessor),
          accessorKey: String(column.accessor),
          header: column.label ?? String(column.accessor),
          size: column.width,
          enableSorting: column.sortable === true,
          sortingFn: sortFnForType(type),
          enableColumnFilter: Boolean(column.filterable),
          filterFn: filterFnForType(filterType) ?? 'text',
          enableResizing: column.resizable ?? resizableColumns,
          meta: {
            dataType: type,
            options: column.options,
            columnConfig: column,
          } as DataTableColumnMeta,
        } as ColumnDef<DataTableFeatures, T, unknown>;
      });
  }, [columns, resizableColumns]);
}
