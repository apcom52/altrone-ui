import { DataTableProps, Sort, DataTableColumn } from './DataTable.types';
import {
  defaultCheckboxesFilter,
  defaultCheckboxFilter,
  defaultDateFilter,
  defaultDateRangeFilter,
  defaultSearchFunc,
  defaultSelectFilter,
  defaultSortFunc,
} from './functions';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import once from 'lodash/once';
import {
  DataTableAppliedFilter,
  DataTableFilter,
} from './DataTableFilter.types';

interface DataTableContextType<T extends object> {
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

const createDataTableContext = once(<T extends object>() =>
  createContext<DataTableContextType<T>>({
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
    sortType: 'asc',
    setSortBy: () => null,
    setSortType: () => null,
    filters: [],
    appliedFilters: [],
    setAppliedFilters: () => null,
    mobileColumns: [],
    selectableMode: false,
    setSelectableMode: () => null,
    selectedRows: [],
    selectRow: () => null,
  }),
);

export const useDataTableContext = <T extends object>() =>
  useContext(createDataTableContext<T>());

export const DataTableContextProvider = <T extends object>(
  props: DataTableProps<T> & React.PropsWithChildren,
) => {
  const {
    data = [],
    columns = [],
    limit = 20,
    searchBy,
    searchFunc = defaultSearchFunc,
    sortFunc = defaultSortFunc,
    sortKeys = [],
    filters = [],
    mobileColumns = columns.length ? [columns[0].accessor] : [],
    selectable = false,
    children,
  } = props;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof T | undefined>(undefined);
  const [sortType, setSortType] = useState<Sort>('asc');
  const [appliedFilters, setAppliedFilters] = useState<
    DataTableAppliedFilter<T>[]
  >([]);
  const [selectableMode, setSelectableMode] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const filteredColumns = useMemo(() => {
    return columns.filter((column) =>
      typeof column.visible === 'boolean' ? column.visible : true,
    );
  }, [columns]);

  const filteredData = useMemo(() => {
    let result = [...data];
    if (searchBy && searchFunc && search.trim()) {
      result = result.filter((item) =>
        searchFunc({ item, field: searchBy, query: search.trim() }),
      );
    }

    if (sortBy) {
      result.sort((itemA, itemB) =>
        sortFunc({ itemA, itemB, field: sortBy, direction: sortType }),
      );
    }

    if (appliedFilters) {
      for (const filter of appliedFilters) {
        const filterConfig = filters.find(
          (_filter) => _filter.accessor === filter.accessor,
        );

        if (!filterConfig) {
          continue;
        }

        switch (filterConfig.type) {
          case 'select':
            result = result.filter((item) =>
              defaultSelectFilter({
                item,
                field: filterConfig.accessor,
                value: filter.value,
              }),
            );
            break;
          case 'checkboxList':
            result = result.filter((item) =>
              defaultCheckboxesFilter({
                item,
                field: filterConfig.accessor,
                value: filter.value,
              }),
            );
            break;
          case 'checkbox':
            result = result.filter((item) =>
              defaultCheckboxFilter({
                item,
                field: filterConfig.accessor,
                value: filter.value,
              }),
            );
            break;
          case 'date':
            result = result.filter((item) =>
              filterConfig.useRange
                ? defaultDateRangeFilter({
                    item,
                    field: filterConfig.accessor,
                    value: filter.value,
                    picker: filterConfig.picker,
                  })
                : defaultDateFilter({
                    item,
                    field: filterConfig.accessor,
                    value: filter.value,
                    picker: filterConfig.picker,
                  }),
            );
            break;
        }
      }
    }

    return result;
  }, [
    data,
    search,
    searchFunc,
    searchBy,
    sortBy,
    sortType,
    appliedFilters,
    filters,
  ]);

  const selectRow = useCallback((rowIndex: number) => {
    setSelectedRows((selected) => {
      if (selected.indexOf(rowIndex) > -1) {
        return selected.filter((s) => s !== rowIndex);
      } else {
        return [...selected, rowIndex];
      }
    });
  }, []);

  useEffect(() => {
    if (!selectable) {
      setSelectableMode(false);
    }
  }, [selectable]);

  useEffect(() => {
    if (!selectableMode) {
      setSelectedRows([]);
    }
  }, [selectableMode]);

  const contextData = useMemo<DataTableContextType<T>>(
    () => ({
      data: filteredData,
      initialData: data,
      columns: filteredColumns,
      page,
      setPage,
      limit: limit > 0 ? limit : 1,
      searchBy,
      search,
      setSearch,
      sortKeys,
      sortBy,
      setSortBy,
      sortType,
      setSortType,
      filters,
      appliedFilters,
      setAppliedFilters,
      mobileColumns,
      selectableMode,
      setSelectableMode,
      selectedRows,
      selectRow,
    }),
    [
      data,
      filteredData,
      filteredColumns,
      page,
      limit,
      searchBy,
      search,
      sortKeys,
      sortBy,
      sortType,
      filters,
      appliedFilters,
      mobileColumns,
      selectableMode,
      selectedRows,
    ],
  );

  const DataTableContext = createDataTableContext<T>();

  return (
    <DataTableContext.Provider value={contextData}>
      {children}
    </DataTableContext.Provider>
  );
};
