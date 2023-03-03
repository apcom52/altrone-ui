import { createContext, useContext } from 'react';
import { Sort } from '../types';
import { DataTableColumn } from '../components/data/DataTable';

export interface DataTableFilter {
  accessor: string;
  type: 'select' | 'checkboxList';
  label?: string;
  defaultValue?: unknown;
}

export interface DataTableAppliedFilter {
  accessor: string;
  value: any | any[];
}

export interface DataTableContextType {
  data: any[];
  initialData: any[];
  columns: DataTableColumn[];
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
  filters: DataTableFilter[];
  appliedFilters: DataTableAppliedFilter[];
  setAppliedFilters: (filters: DataTableAppliedFilter[]) => void;
  mobileColumns: string[];
  selectableMode: boolean;
  setSelectableMode: (selectableMode: boolean) => void;
}

const DEFAULT_DATA_TABLE_CONTEXT: DataTableContextType = {
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
  setSelectableMode: () => null
};

export const DataTableContext = createContext<DataTableContextType>(DEFAULT_DATA_TABLE_CONTEXT);
export const useDataTableContext = () => useContext(DataTableContext);
