import {memo} from "react";
import {useDataTableContext} from "../../../contexts";
import DataTableCell from "./DataTableCell";

const DataTableBody = () => {
  const { data, columns, page, limit } = useDataTableContext()

  const start = (page - 1) * limit
  const end = page * limit

  return <tbody>
    {data.slice(start, end).map((row, rowIndex) => (
      <tr key={rowIndex} data-testid='alt-test-datatable-row'>
        {columns.map((column, columnIndex) => {
          const props = {

            accessor: column.accessor,
            item: row,
            value: row[column.accessor],
            rowIndex,
            columnIndex
          }

          let content = null

          if (column.Component) {
            const CellComponent = column.Component as keyof JSX.IntrinsicElements
            content = <CellComponent {...props} />
          } else {
            content = <DataTableCell {...props} />
          }

          return <td key={columnIndex} className='alt-data-table__cell'>{content}</td>
        })}
      </tr>
    ))}
  </tbody>
}

export default memo(DataTableBody)