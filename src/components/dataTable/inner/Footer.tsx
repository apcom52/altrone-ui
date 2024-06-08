import { useDataTableContext } from '../DataTable.context.tsx';
import { memo } from 'react';
import { Flex } from 'components/flex';
import { Text } from 'components/text';
import { Tooltip } from 'components/tooltip';
import { Pagination } from 'components/pagination';
import s from './footer.module.scss';

export const Footer = memo(() => {
  const {
    initialData,
    limit,
    page,
    setPage,
    data,
    selectedRows,
    selectableMode,
  } = useDataTableContext();

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
            <Flex gap="s">
              <Text.Paragraph size="s">
                Total rows: <Text.Inline bold>{initialData.length}</Text.Inline>
              </Text.Paragraph>
              <Text.Paragraph size="s">
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
