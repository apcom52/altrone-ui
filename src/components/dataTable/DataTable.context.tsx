import { createContext, useContext } from 'react';
import { ReactTable } from '@tanstack/react-table';
import { AnyObject } from '../../utils';
import type { DataTableFeatures } from './DataTable.features.ts';

export interface DataTableContextValue<T extends object = AnyObject> {
  table: ReactTable<DataTableFeatures, T>;
  /** `true` while `mode === 'loading'` — cells render skeletons. */
  loading: boolean;
  /** Whether row selection is available at all (the `selectable` prop). */
  selectable: boolean;
  /** `true` when the selection column (checkboxes) is visible. */
  selectMode: boolean;
  setSelectMode: (next: boolean) => void;
}

export const DataTableContext =
  createContext<DataTableContextValue<AnyObject> | null>(null);

export const useDataTableContext = <
  T extends object = AnyObject,
>(): DataTableContextValue<T> => {
  const value = useContext(DataTableContext);
  if (!value) {
    throw new Error(
      'DataTable sub-components must be rendered inside <DataTable>',
    );
  }
  return value as unknown as DataTableContextValue<T>;
};
