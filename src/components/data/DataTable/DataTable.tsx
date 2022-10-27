import {createContext, memo, useContext, useState} from "react";
import DataTableHeader from "./DataTableHeader";
import './data-table.scss';
import DataTableBody from "./DataTableBody";
import DataTableHeaderRow from "./DataTableHeaderRow";
import DataTableFooter from "./DataTableFooter";

interface DataTableContextType {
  data: any[]
  columns: {
    accessor: string
    label?: string
  }[]
  page: number
  setPage: (page: number) => void
  limit: number
}

const DEFAULT_DATA_TABLE_CONTEXT: DataTableContextType = {
  data: [],
  columns: [],
  page: 1,
  setPage: 1,
  limit: 20
}

interface DataTableProps<T = any> {
  data: T[]
  columns: {
    accessor: keyof T
    label?: string
  }[]
  limit?: number
}

const DataTableContext = createContext<DataTableContextType>(DEFAULT_DATA_TABLE_CONTEXT)
export const useDataTableContext = () => useContext(DataTableContext)

const DataTable = ({ data = [], columns = [], limit = 20 }: DataTableProps) => {
  const [page, setPage] = useState(1)

  return <DataTableContext.Provider value={{ data, columns, page, setPage, limit }}>
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