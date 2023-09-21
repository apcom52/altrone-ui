import { memo, useMemo } from 'react';
import { Icon } from '../../typography';
import { useDataTableContext } from '../../../contexts';
import { useWindowSize } from '../../../hooks';
import { filterVisibleColumns } from './functions';

const DataTableHeaderRow = () => {
  const { columns, sortBy, sortType, mobileColumns, selectableMode } = useDataTableContext();
  const { ltePhoneL } = useWindowSize();

  const visibleColumns = useMemo(() => {
    return filterVisibleColumns(columns, mobileColumns, ltePhoneL);
  }, [columns, ltePhoneL, mobileColumns]);

  return (
    <tr className="alt-data-table__row" data-testid="alt-test-datatable-thead">
      {selectableMode && <th className="alt-data-table__cell alt-data-table__cell--header" />}
      {visibleColumns.map((column, columnIndex) => (
        <th
          key={columnIndex}
          className="alt-data-table__cell alt-data-table__cell--header"
          style={{ width: column.width || 'unset' }}
          colSpan={columnIndex === visibleColumns.length - 1 ? 2 : undefined}>
          {column.label || column.accessor.toString()}
          {sortBy === column.accessor && (
            <div className="alt-data-table__sort-indicator">
              <Icon i={sortType === 'desc' ? 'arrow_drop_down' : 'arrow_drop_up'} />
            </div>
          )}
        </th>
      ))}
    </tr>
  );
};

export default memo(DataTableHeaderRow);
