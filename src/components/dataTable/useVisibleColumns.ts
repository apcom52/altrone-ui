import { DataTableColumn } from './DataTable.types.ts';
import { AnyObject } from '../../utils';
import { useMemo } from 'react';

export function useVisibleColumns(columns: DataTableColumn<AnyObject>[]) {
  return useMemo(() => {
    return columns.filter((column) =>
      typeof column.visible === 'boolean' ? column.visible : true,
    );
  }, [columns]);
}
