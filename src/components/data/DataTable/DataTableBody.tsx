import {memo, useEffect, useMemo, useState} from "react";
import {useDataTableContext} from "../../../contexts";
import DataTableCell from "./DataTableCell";
import {filterVisibleColumns} from "./functions";
import {useWindowSize} from "../../../hooks";
import {Icon} from "../../icons";
import {Modal} from "../../containers";

const DataTableBody = () => {
  const { data, columns, page, limit, mobileColumns } = useDataTableContext()
  const { ltePhoneL } = useWindowSize()

  const [selectedRowIndex, setSelectedRowIndex] = useState(-1)

  const start = (page - 1) * limit
  const end = page * limit

  const visibleColumns = useMemo(() => {
    return filterVisibleColumns(columns, mobileColumns, ltePhoneL)
  }, [columns, ltePhoneL, mobileColumns])

  useEffect(() => {
    setSelectedRowIndex(-1)
  }, [data])

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

          let content;

          if (column.Component) {
            const CellComponent = column.Component as keyof JSX.IntrinsicElements
            content = <CellComponent {...props} />
          } else {
            content = <DataTableCell {...props} />
          }

          return <td key={columnIndex} className='alt-data-table__cell'>{content}</td>
        })}
        {ltePhoneL && <td className='alt-data-table__cell alt-data-table__cell--show-more' tabIndex={0} onClick={() => setSelectedRowIndex(rowIndex)}>
          <Icon i='arrow_forward_ios' />
        </td>}
      </tr>
    ))}
    {selectedRowIndex > -1 && ltePhoneL && <Modal
      onClose={() => setSelectedRowIndex(-1)}
      title='Detailed information'
    >
      <div className='alt-data-table-mobile-grid'>
        {columns.map((column, columnIndex) => {
          const CustomComponent = column.Component as keyof JSX.IntrinsicElements

          return <div key={columnIndex} className="alt-data-table-mobile-cell">
            <div className='alt-data-table-mobile-cell__label'>{column.label || column.accessor}</div>
            <div className='alt-data-table-mobile-cell__value'>{column.Component ?
              <CustomComponent {...column} value={data[selectedRowIndex][column.accessor]} /> : data[selectedRowIndex][column.accessor].toString()}</div>
          </div>
        })}
      </div>
    </Modal>}
  </tbody>
}

export default memo(DataTableBody)