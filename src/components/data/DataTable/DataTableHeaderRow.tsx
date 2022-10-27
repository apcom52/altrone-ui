import {memo} from "react";
import {useDataTableContext} from "./DataTable";
import {Icon} from "../../icons";

const DataTableHeaderRow = () => {
  const { data, columns, sortBy, sortType } = useDataTableContext()

  return <thead>
  <tr className='alt-data-table__row'>
    {columns.map((column, columnIndex) => (
      <th
        key={columnIndex}
        className='alt-data-table__cell alt-data-table__cell--header'
        style={{ width: column.width || 'unset' }}
      >
        {column.label || column.accessor.toString()}
        {sortBy === column.accessor && <div className='alt-data-table__sort-indicator'><Icon i={sortType === 'desc' ? 'arrow_drop_down' : 'arrow_drop_up'} /></div>}
      </th>
    ))}
  </tr>
  </thead>
}

export default memo(DataTableHeaderRow)