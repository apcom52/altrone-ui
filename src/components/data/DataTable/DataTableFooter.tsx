import {memo} from "react";
import './data-table-footer.scss';
import DataTablePagination from "./DataTablePagination";

const DataTableFooter = () => {
  return <div className='alt-data-table-footer'>
    <div className='alt-data-table-footer__status'>Showing 20 rows</div>
    <div className='alt-data-table-footer__pagination'>
      <DataTablePagination />
    </div>
  </div>
}

export default memo(DataTableFooter)