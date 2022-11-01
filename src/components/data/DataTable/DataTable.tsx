import {memo, ReactNode, useMemo, useState} from "react";
import DataTableHeader from "./DataTableHeader";
import './data-table.scss';
import DataTableBody from "./DataTableBody";
import DataTableHeaderRow from "./DataTableHeaderRow";
import DataTableFooter from "./DataTableFooter";
import {DataTableAppliedFilter, DataTableContext, DataTableFilter} from "../../../contexts";
import {Sort} from "../../../types";
import {defaultCheckboxesFilter, defaultSearchFunc, defaultSelectFilter, defaultSortFunc} from "./functions";

export interface DataTableColumn {
  accessor: string
  label?: string
  width?: number | string
  Component?: ReactNode
}

interface DataTableProps<T = any> {
  data: T[]
  columns: DataTableColumn[]
  limit?: number
  showSearch?: boolean
  searchBy?: string
  sortKeys: string[]
  sortFunc: (optionA: unknown, optionB: unknown, field: string, direction: Sort) => number
  searchFunc?: (item: unknown, field: string, query: string) => unknown[]
  filters: DataTableFilter[]
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
  const [sortType, setSortType] = useState<Sort>(Sort.asc)
  const [appliedFilters, setAppliedFilters] = useState<DataTableAppliedFilter[]>([])

  const filteredData = useMemo(() => {
    let result = [...data]
    if (showSearch && searchFunc && search.trim()) {
      result = result.filter(item => searchFunc(item, searchBy, search.trim()))
    }

    if (sortBy) {
      result.sort((itemA, itemB) => defaultSortFunc({ itemA, itemB, field: sortBy, direction: sortType }))
    }

    if (appliedFilters) {
      for (const filter of appliedFilters) {
        const filterConfig = filters.find(_filter => _filter.accessor === filter.accessor)

        if (!filterConfig) {
          continue
        }

        switch (filterConfig.type) {
          case "select":
            result = result.filter(item => defaultSelectFilter({ item, field: filterConfig.accessor, value: filter.value }))
            break
          case 'checkboxList':
            result = result.filter(item => defaultCheckboxesFilter({ item, field: filterConfig.accessor, value: filter.value }))
            break
        }
      }
    }

    return result
  }, [data, search, showSearch, searchFunc, searchBy, sortBy, sortType, appliedFilters, filters])

  return <DataTableContext.Provider value={{
    data: filteredData,
    initialData: data,
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