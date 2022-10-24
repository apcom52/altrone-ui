import {createContext, memo, useContext} from "react";
import DataTableHeader from "./DataTableHeader";
import './data-table.scss';
import DataTableBody from "./DataTableBody";

interface DataTableProps<T = any> {
  data: T[]
  columns: {
    accessor: keyof T
    label?: string
  }[]
}

const DataTableContext = createContext<DataTableProps>({ data: [], columns: [] })
export const useDataTableContext = () => useContext(DataTableContext)

const DataTable = ({ data = [], columns = [] }: DataTableProps) => {
  return <DataTableContext.Provider value={{ data, columns }}>
    <div className='alt-data-table-wrapper'>
      {data.length && <table className='alt-data-table'>
        <DataTableHeader />
        <DataTableBody />
      </table>}
    </div>
  </DataTableContext.Provider>
}

export default memo(DataTable)