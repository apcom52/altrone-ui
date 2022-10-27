import {memo} from "react";
import {useDataTableContext} from "./DataTable";

const DataTableBody = () => {
  const { data, columns, page, limit } = useDataTableContext()

  const start = (page - 1) * limit
  const end = page * limit

  console.log(start, end);

  return <tbody>
    {data.slice(start, end).map((row, rowIndex) => (
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