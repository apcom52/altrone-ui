// createColumnHelperVersion.ts
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { DataTableColumn } from './DataTable.types';
import { useMemo } from 'react';

export function useDataTableColumns<T extends object>(
  columns: DataTableColumn<T>[]
): ColumnDef<T, any>[] {
  return useMemo(() => {
    const helper = createColumnHelper<T>();

    return columns
      .filter((c) => c.visible !== false)
      .map((c) => {
        return helper.accessor(c.accessor as any, {
          id: String(c.accessor),
          header: () => c.label ?? String(c.accessor),
          cell: (info) => {
            return String(info.getValue());
          },
          size: c.width,
          enableSorting: c.sortable === true,
        });
      });
  }, [columns]);
}
