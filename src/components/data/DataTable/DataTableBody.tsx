import {memo, useMemo} from "react";
import {useDataTableContext} from "../../../contexts";
import DataTableCell from "./DataTableCell";
import {filterVisibleColumns} from "./functions";
import {useWindowSize} from "../../../hooks";
import {Icon} from "../../icons";

const DataTableBody = () => {
  const { data, columns, page, limit, mobileColumns } = useDataTableContext()
  const { ltePhoneL } = useWindowSize()

  const start = (page - 1) * limit
  const end = page * limit

  const visibleColumns = useMemo(() => {
    return filterVisibleColumns(columns, mobileColumns, ltePhoneL)
  }, [columns, ltePhoneL, mobileColumns])

  return <tbody>
    {data.slice(start, end).map((row, rowIndex) => (
      <tr key={rowIndex} data-testid='alt-test-datatable-row'>
        {visibleColumns.map((column, columnIndex) => {
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
        {ltePhoneL && <td className='alt-data-table__cell alt-data-table__cell--show-more'>
          <Icon i='arrow_forward_ios' />
        </td>}
      </tr>
    ))}
  </tbody>
}

export default memo(DataTableBody)