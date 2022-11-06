import {memo, ReactNode, useMemo, useState} from "react";
import DataTableHeader from "./DataTableHeader";
import './data-table.scss';
import DataTableBody from "./DataTableBody";
import DataTableHeaderRow from "./DataTableHeaderRow";
import DataTableFooter from "./DataTableFooter";
import {DataTableAppliedFilter, DataTableContext, DataTableFilter} from "../../../contexts";
import {Sort} from "../../../types";
import {
  DataTableSearchFunc,
  DataTableSortFunc,
  defaultCheckboxesFilter,
  defaultSearchFunc,
  defaultSelectFilter,
  defaultSortFunc
} from "./functions";

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
  searchBy?: string
  sortKeys?: string[]
  sortFunc?: (params: DataTableSortFunc) => number
  searchFunc?: (params: DataTableSearchFunc) => unknown[]
  filters?: DataTableFilter[]
}

const DataTable = ({
  data = [],
  columns = [],
  limit = 20,
  searchBy,
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
    if (searchBy && searchFunc && search.trim()) {
      result = result.filter(item => searchFunc({ item, field: searchBy, query: search.trim() }))
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
  }, [data, search, searchFunc, searchBy, sortBy, sortType, appliedFilters, filters])

  const isHeaderVisible = sortKeys.length || filters.length || searchBy

  return <DataTableContext.Provider value={{
    data: filteredData,
    initialData: data,
    columns,
    page,
    setPage,
    limit,
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
    setAppliedFilters
  }}>
    <div className='alt-data-table-wrapper' data-testid='alt-test-datatable'>
      { isHeaderVisible && <DataTableHeader /> }
      {data.length && <table className='alt-data-table'>
        <DataTableHeaderRow />
        <DataTableBody />
      </table>}
      <DataTableFooter />
    </div>
  </DataTableContext.Provider>
}

export default memo(DataTable)