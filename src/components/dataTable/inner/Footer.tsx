import { useDataTableContext } from '../DataTable.context.tsx';
import { memo } from 'react';
import { Flex, Text, Tooltip, Pagination } from 'components';
import { Gap, Size } from 'types';
import s from './footer.module.scss';

export const Footer = memo(() => {
  const { limit, page, setPage, data, selectedRows, selectableMode } =
    useDataTableContext();

  const start = (page - 1) * limit;
  const end = page * limit;

  const visibleData = data.slice(start, end);

  const numberOfRows = limit > visibleData.length ? visibleData.length : limit;
  const selectedRowsNumber = selectableMode ? selectedRows.length : 0;
  const numberOfPages = Math.ceil(data.length / limit);

  let statusText = `${numberOfRows} rows are shown`;
  if (selectedRowsNumber) {
    statusText = `${selectedRowsNumber} rows are selected`;
  }

  return (
    <div className={s.Footer}>
      <div className={s.StatusBar}>
        <Tooltip
          content={
            <Flex gap={Gap.small}>
              <Text.Paragraph size={Size.small}>
                Total rows: <Text.Inline bold>{data.length}</Text.Inline>
              </Text.Paragraph>
              <Text.Paragraph size={Size.small}>
                Rows per page: <Text.Inline bold>{limit}</Text.Inline>
              </Text.Paragraph>
            </Flex>
          }
        >
          {statusText}
        </Tooltip>
      </div>
      <div>
        <Pagination
          currentPage={page}
          totalPages={numberOfPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
});
