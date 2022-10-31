import {memo} from "react";
import './data-table-footer.scss';
import DataTablePagination from "./DataTablePagination";
import {useDataTableContext} from "./DataTable";

const DataTableFooter = () => {
  const { data, initialData } = useDataTableContext()

  return <div className='alt-data-table-footer'>
    <div className='alt-data-table-footer__status'>Showing {data.length} {data.length === 1 ? 'line' : 'lines'} {data.length !== initialData.length && `(Total: ${initialData.length})`}</div>
    <div className='alt-data-table-footer__pagination'>
      <DataTablePagination />
    </div>
  </div>
}

export default memo(DataTableFooter)