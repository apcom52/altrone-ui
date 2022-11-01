import {memo} from "react";
import './data-table-footer.scss';
import DataTablePagination from "./DataTablePagination";
import {useDataTableContext} from "../../../contexts";

const DataTableFooter = () => {
  const { data, initialData, limit } = useDataTableContext()

  return <div className='alt-data-table-footer'>
    <div className='alt-data-table-footer__status' data-testid='alt-test-datatable-status'>Showing {data.length} {data.length === 1 ? 'line' : 'lines'} {data.length !== initialData.length && `(Total: ${initialData.length})`}</div>
    {initialData.length > limit && <div className='alt-data-table-footer__pagination'>
      <DataTablePagination />
    </div>}
  </div>
}

export default memo(DataTableFooter)