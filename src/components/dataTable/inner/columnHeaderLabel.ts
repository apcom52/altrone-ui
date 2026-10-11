import { Column } from '@tanstack/react-table';
import { AnyObject } from '../../../utils';
import { DataTableFeatures } from '../DataTable.features.ts';

export const columnHeaderLabel = (
  column: Column<DataTableFeatures, AnyObject>,
) =>
  typeof column.columnDef.header === 'string'
    ? column.columnDef.header
    : String(column.id);
