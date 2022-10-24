import {memo} from "react";
import {useDataTableContext} from "./DataTable";

const DataTableHeader = () => {
  const { data, columns } = useDataTableContext()

  return <thead>
    <tr className='alt-data-table__row'>
      {columns.map((column, columnIndex) => (
        <th
          key={columnIndex}
          className='alt-data-table__cell alt-data-table__cell--header'
        >
          {column.label || column.accessor.toString()}
        </th>
      ))}
    </tr>
  </thead>
}

export default memo(DataTableHeader)