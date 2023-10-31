import { useContext } from 'react';
import { Sort } from '../types';
import { DataTableColumn } from '../components';
import {
  DataTableAppliedFilter,
  DataTableFilter
} from '../components/data/DataTable/DataTableFilter.types';

export interface DataTableContextType<T extends object> {
  data: T[];
  initialData: T[];
  columns: DataTableColumn<T>[];
  page: number;
  setPage: (page: number) => void;
  limit: number;
  searchBy?: keyof T;
  search: string;
  setSearch: (search: string) => void;
  sortKeys: (keyof T)[];
  sortBy?: keyof T;
  setSortBy: (sortBy: keyof T | undefined) => void;
  sortType: Sort;
  setSortType: (sortType: Sort) => void;
  filters: DataTableFilter<T>[];
  appliedFilters: DataTableAppliedFilter<T>[];
  setAppliedFilters: (filters: DataTableAppliedFilter<T>[]) => void;
  mobileColumns: (keyof T)[];
  selectableMode: boolean;
  setSelectableMode: (selectableMode: boolean) => void;
  selectedRows: number[];
  selectRow: (rowIndex: number) => void;
}

export const DEFAULT_DATA_TABLE_CONTEXT: DataTableContextType<object> = {
  data: [],
  initialData: [],
  columns: [],
  page: 1,
  setPage: () => null,
  limit: 20,
  searchBy: undefined,
  search: '',
  setSearch: () => null,
  sortKeys: [],
  sortBy: undefined,
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

export const useDataTableContext = () => useContext(DataTableContext);
