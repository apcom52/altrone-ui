import {memo} from "react";
import {useDataTableContext} from "./DataTable";

const DataTableBody = () => {
  const { data, columns } = useDataTableContext()

  return <tbody>
    {data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {columns.map((column, columnIndex) => (
          <td
            key={columnIndex}
            className='alt-data-table__cell'
          >
            {row[column.accessor].toString()}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
}

export default memo(DataTableBody)