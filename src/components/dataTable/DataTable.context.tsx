import {
  DataTableProps,
  Sort,
  DataTableColumn,
  Filter,
} from './DataTable.types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import once from 'lodash/once';
import { DOMUtils } from '../../utils';
import { useDataTableFilters } from './useDataTableFilters.ts';

interface DataTableContextType<T extends object> {
  data: T[];
  initialData: T[];
  columns: DataTableColumn<T>[];
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  searchBy?: keyof T;
  search: string;
  setSearch: (search: string) => void;
  sortBy?: keyof T;
  sortType: Sort;
  setSortBy: (accessor?: keyof T) => void;
  setSortType: (sortType: Sort) => void;
  filters: Filter[];
  setFilters: (filters: Filter[]) => void;
  selectableMode: boolean;
  setSelectableMode: (selectableMode: boolean) => void;
  selectedRows: number[];
  setSelectedRows: (rowIndexes: number[]) => void;
  selectRow: (rowIndex: number) => void;
}

const createDataTableContext = once(<T extends object>() =>
  createContext<DataTableContextType<T>>({
    data: [],
    initialData: [],
    columns: [],
    page: 1,
    setPage: () => null,
    rowsPerPage: 20,
    searchBy: undefined,
    search: '',
    setSearch: () => null,
    sortBy: undefined,
    sortType: 'asc',
    setSortBy: () => null,
    setSortType: () => null,
    filters: [],
    setFilters: () => null,
    selectableMode: false,
    setSelectableMode: () => null,
    selectedRows: [],
    setSelectedRows: () => null,
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
    rowsPerPage = 20,
    selectable = false,
    children,
  } = props;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof T | undefined>(undefined);
  const [sortType, setSortType] = useState<Sort>('asc');
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectableMode, setSelectableMode] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const filteredColumns = useMemo(() => {
    return columns.filter((column) =>
      typeof column.visible === 'boolean' ? column.visible : true,
    );
  }, [columns]);

  const filteredData = useDataTableFilters(
    data,
    filters,
    sortBy ? String(sortBy) : undefined,
    sortType,
  );

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
      rowsPerPage: rowsPerPage > 0 ? rowsPerPage : 1,
      search,
      setSearch,
      sortBy,
      setSortBy,
      sortType,
      setSortType,
      filters,
      setFilters,
      selectableMode,
      setSelectableMode,
      selectedRows,
      setSelectedRows,
      selectRow,
    }),
    [
      data,
      filteredData,
      filteredColumns,
      page,
      rowsPerPage,
      search,
      sortBy,
      sortType,
      filters,
      selectableMode,
      setSelectedRows,
      selectedRows,
    ],
  );

  const DataTableContext = createDataTableContext<T>();

  const columnTemplate = useMemo(() => {
    const columns = props.columns.map((column) => column.width || '1fr');

    if (selectableMode) {
      columns.unshift('40px');
    }

    return columns.join(' ');
  }, [props.columns, selectableMode]);

  return (
    <DataTableContext.Provider value={contextData}>
      {DOMUtils.cloneNode(children, {
        style: {
          '--columnTemplate': columnTemplate,
        },
      })}
    </DataTableContext.Provider>
  );
};
