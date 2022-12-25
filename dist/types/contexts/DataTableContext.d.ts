/// <reference types="react" />
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
}
export declare const DataTableContext: import('react').Context<DataTableContextType>;
export declare const useDataTableContext: () => DataTableContextType;
