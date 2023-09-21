import { memo } from 'react';
import { useDataTableContext } from '../../../contexts';
import { Pagination } from '../../indicators/Pagination';

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
