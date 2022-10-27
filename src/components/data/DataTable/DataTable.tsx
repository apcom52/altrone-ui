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
  searchFunc?: (item: unknown, field: string, query: string) => unknown[]
}

const DataTableContext = createContext<DataTableContextType>(DEFAULT_DATA_TABLE_CONTEXT)
export const useDataTableContext = () => useContext(DataTableContext)

const defaultSearchFunc = (item, field, query) => {
  return item[field].toString().toLowerCase().startsWith(query.toLowerCase())
}

const DataTable = ({
  data = [],
  columns = [],
  limit = 20,
  showSearch = true,
  searchBy = 'name',
  searchFunc = defaultSearchFunc,
  sortKeys = []
}: DataTableProps) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState(null)
  const [sortType, setSortType] = useState<SortType>('asc')

  const filteredData = useMemo(() => {
    let result = [...data]
    if (showSearch && searchFunc && search.trim()) {
      result = result.filter(item => searchFunc(item, searchBy, search.trim()))
    }

    return result
  }, [data, search, showSearch, searchFunc, searchBy])

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
    setSortType
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