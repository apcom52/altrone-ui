// createColumnHelperVersion.ts
import {
  createColumnHelper,
  ColumnDef,
  FilterFnOption,
  FilterFn,
} from '@tanstack/react-table';
import { DataTableColumn, DataTableColumnType } from './DataTable.types';
import { useMemo } from 'react';

export function useDataTableColumns<T extends object>(
  columns: DataTableColumn<T>[]
): ColumnDef<T, any>[] {
  const resolveFilterFn = (type: DataTableColumnType) => {
    if (['string', 'text'].includes(type)) {
      return 'text';
    }

    if (['number', 'currency'].includes(type)) {
      return 'number';
    }

    return 'customText';
  };

  return useMemo(() => {
    const helper = createColumnHelper<T>();

    return columns
      .filter((c) => c.visible !== false)
      .map((c) => {
        const filterType: DataTableColumnType =
          typeof c.filterable === 'string' ? c.filterable : c.type || 'string';

        return helper.accessor(c.accessor as any, {
          id: String(c.accessor),
          header: () => c.label ?? String(c.accessor),
          cell: (info) => {
            return String(info.getValue());
          },
          size: c.width,
          enableSorting: c.sortable === true,
          enableColumnFilter: Boolean(c.filterable),
          filterFn: resolveFilterFn(filterType) as unknown as FilterFn<T>,
        });
      });
  }, [columns]);
}
