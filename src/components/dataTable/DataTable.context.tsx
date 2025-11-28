import { createContext, useContext } from 'react';
import { Table } from '@tanstack/react-table';

export const DataTableCoreContext = createContext<Table<any>>(
  null as unknown as Table<any>
);
export const useDataTableCore = () => useContext(DataTableCoreContext);
