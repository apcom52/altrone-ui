import { createContext, useContext } from 'react';
import { Sort } from '../types';
import { DataTableColumn } from '../components';
import { DataTableFilter } from '../components/data/DataTable/DataTable.types';

export interface DataTableAppliedFilter<T> extends Record<string, unknown> {
  accessor: keyof T;
  value: any;
}

export interface DataTableContextType<T> {
  data: T[];
  initialData: T[];
  columns: DataTableColumn<T>[];
  page: number;
  setPage: (page: number) => void;
  limit: number;
  searchBy: string;
  search: string;
  setSearch: (search: string) => void;
  sortKeys: string[];
  sortBy: string | null;
  setSortBy: (sortBy: string | null) => void;
  sortType: Sort;
  setSortType: (sortType: Sort) => void;
  filters: DataTableFilter<T>[];
  appliedFilters: DataTableAppliedFilter<T>[];
  setAppliedFilters: (filters: DataTableAppliedFilter<T>[]) => void;
  mobileColumns: string[];
  selectableMode: boolean;
  setSelectableMode: (selectableMode: boolean) => void;
  selectedRows: number[];
  selectRow: (rowIndex: number) => void;
}

const DEFAULT_DATA_TABLE_CONTEXT: DataTableContextType<object> = {
  data: [],
  initialData: [],
  columns: [],
  page: 1,
  setPage: () => null,
  limit: 20,
  searchBy: '',
  search: '',
  setSearch: () => null,
  sortKeys: [],
  sortBy: null,
  sortType: Sort.asc,
  setSortBy: () => null,
  setSortType: () => null,
  filters: [],
  appliedFilters: [],
  setAppliedFilters: () => null,
  mobileColumns: [],
  selectableMode: false,
  setSelectableMode: () => null,
  selectedRows: [],
  selectRow: () => null
};

export const DataTableContext = createContext<DataTableContextType<object>>(
  DEFAULT_DATA_TABLE_CONTEXT
);
export const useDataTableContext = () => useContext(DataTableContext);
