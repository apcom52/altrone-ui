import { memo } from 'react';
import { Pagination } from '../../indicators';
import { useDataTableContext } from './DataTable.context';

const DataTablePagination = () => {
  const { data, page, setPage, limit } = useDataTableContext();

  const totalPages = Math.ceil(data.length / limit);

  return (
    <div className="alt-data-table-pagination" data-testid="alt-test-datatable-pagination">
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
};

export default memo(DataTablePagination);
