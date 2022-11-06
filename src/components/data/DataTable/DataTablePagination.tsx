import {memo} from "react";
import {Button} from "../../button";
import {Icon} from "../../icons";
import {useDataTableContext} from "../../../contexts";

const DataTablePagination = () => {
  const { data, page, setPage, limit } = useDataTableContext()

  const totalPages = Math.ceil(data.length / limit)

  return <div className='alt-data-table-pagination' data-testid='alt-test-datatable-pagination'>
    <Button
      disabled={page <= 1}
      onClick={() => setPage(page - 1)}
    >
      <Icon i='arrow_back_ios' />
    </Button>
    <div className='alt-data-table-pagination__progress'>
      <span
        className='alt-data-table-pagination__currentPage'
        data-testid='alt-test-datatable-currentPage'
      >{page}</span> / {totalPages}
    </div>
    <Button
      disabled={page >= totalPages}
      onClick={() => setPage(page + 1)}
    >
      <Icon i='arrow_forward_ios' />
    </Button>
  </div>
}

export default memo(DataTablePagination)