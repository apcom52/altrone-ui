import {createContext, memo, useContext, useMemo, useState} from "react";
import DataTableHeader from "./DataTableHeader";
import './data-table.scss';
import DataTableBody from "./DataTableBody";
import DataTableHeaderRow from "./DataTableHeaderRow";
import DataTableFooter from "./DataTableFooter";

type SortType = 'asc' | 'desc'

interface DataTableContextType {
  data: any[]
  columns: {
    accessor: string
    label?: string
    width?: number | string
  }[]
  page: number
  setPage: (page: number) => void
  limit: number
  search: string
  setSearch: (search: string) => void
  sortKeys: string[]
  sortBy: string | null
  setSortBy: (sortBy: string | null) => void
  sortType: SortType
  setSortType: (sortType: SortType) => void
  filters: DataTableFilter[]
  appliedFilters: DataTableAppliedFilter[]
  setAppliedFilters: (filters: DataTableAppliedFilter[]) => void
}

interface DataTableFilter {
  accessor: string
  type: 'select' | 'checkboxList' | 'datepicker'
  label?: string
  defaultValue?: unknown
}

interface DataTableAppliedFilter {
  accessor: string
  value: unknown
}

const DEFAULT_DATA_TABLE_CONTEXT: DataTableContextType = {
  data: [],
  columns: [],
  page: 1,
  setPage: () => null,
  limit: 20,
  search: '',
  setSearch: () => null,
  sortKeys: [],
  sortBy: null,
  sortType: 'asc',
  setSortBy: () => null,
  setSortType: () => null,
  filters: [],
  appliedFilters: [],
  setAppliedFilters: () => null
}

interface DataTableProps<T = any> {
  data: T[]
  columns: {
    accessor: keyof T
    label?: string
    width?: number | string
  }[]
  limit?: number
  showSearch?: boolean
  searchBy?: string
  sortKeys: string[]
  sortFunc: (optionA: unknown, optionB: unknown, field: string, direction: SortType) => number
  searchFunc?: (item: unknown, field: string, query: string) => unknown[]
  filters: DataTableFilter[]
}

const DataTableContext = createContext<DataTableContextType>(DEFAULT_DATA_TABLE_CONTEXT)
export const useDataTableContext = () => useContext(DataTableContext)

const defaultSearchFunc = (item, field, query) => {
  return item[field].toString().toLowerCase().startsWith(query.toLowerCase())
}

const defaultSortFunc = (optionA, optionB, field, direction) => {
  if (direction === 'asc') {
    return optionA[field] > optionB[field] ? 1 : -1
  } else {
    return optionA[field] < optionB[field] ? 1 : -1
  }
}

const DataTable = ({
  data = [],
  columns = [],
  limit = 20,
  showSearch = true,
  searchBy = 'name',
  searchFunc = defaultSearchFunc,
  sortKeys = [],
  filters = []
}: DataTableProps) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState(null)
  const [sortType, setSortType] = useState<SortType>('asc')
  const [appliedFilters, setAppliedFilters] = useState<DataTableAppliedFilter[]>([])

  const filteredData = useMemo(() => {
    let result = [...data]
    if (showSearch && searchFunc && search.trim()) {
      result = result.filter(item => searchFunc(item, searchBy, search.trim()))
    }

    if (sortBy) {
      result.sort((optionA, optionB) => defaultSortFunc(optionA, optionB, sortBy, sortType))
    }

    return result
  }, [data, search, showSearch, searchFunc, searchBy, sortBy, sortType])

  return <DataTableContext.Provider value={{
    data: filteredData,
    columns,
    page,
    setPage,
    limit,
    search,
    setSearch,
    sortKeys,
    sortBy,
    setSortBy,
    sortType,
    setSortType,
    filters,
    appliedFilters,
    setAppliedFilters
  }}>
    <div className='alt-data-table-wrapper'>
      <DataTableHeader />
      {data.length && <table className='alt-data-table'>
        <DataTableHeaderRow />
        <DataTableBody />
      </table>}
      <DataTableFooter />
    </div>
  </DataTableContext.Provider>
}

export default memo(DataTable)