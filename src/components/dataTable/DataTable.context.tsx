import { createContext, useContext, MouseEvent, SyntheticEvent } from 'react';
import { ReactTable } from '@tanstack/react-table';
import { AnyObject } from '../../utils';
import type { DataTableFeatures } from './DataTable.features.ts';
import type { DataTableIconSet } from './DataTable.types.ts';

export interface DataTableContextValue<T extends object = AnyObject> {
  table: ReactTable<DataTableFeatures, T>;
  icons: DataTableIconSet;
  /** `true` while `mode === 'loading'` — cells render skeletons. */
  loading: boolean;
  /** Whether row selection is available at all (the `selectable` prop). */
  selectable: boolean;
  /** `true` when the selection column (checkboxes) is visible. */
  selectMode: boolean;
  setSelectMode: (next: boolean, event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Stashes the native event that triggered a table-state change (sort/page/
   * filter) so the corresponding `on*Change` callback, invoked later from
   * inside a TanStack Table state updater, can still forward it as its last
   * argument per `event-handlers.md`.
   */
  notePendingEvent: (event: SyntheticEvent) => void;
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
