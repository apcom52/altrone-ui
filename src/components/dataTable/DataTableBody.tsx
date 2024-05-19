import { useEffect, useMemo, useState } from 'react';
import DataTableCell, { DataTableCellProps } from './DataTableCell';
import { filterVisibleColumns } from './functions';
import { useWindowSize } from '../../../hooks';
import { Icon } from '../../typography';
import { Modal } from '../../containers';
import { Checkbox } from '../../form';
import clsx from 'clsx';
import { useDataTableContext } from './DataTable.context';

const DataTableBody = <T extends object>() => {
  const { data, columns, page, limit, mobileColumns, selectableMode, selectedRows, selectRow } =
    useDataTableContext<T>();
  const { ltePhoneL = false } = useWindowSize();

  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

  const start = (page - 1) * limit;
  const end = page * limit;

  const visibleColumns = useMemo(() => {
    return filterVisibleColumns(columns, mobileColumns, ltePhoneL);
  }, [columns, ltePhoneL, mobileColumns]);

  useEffect(() => {
    setSelectedRowIndex(-1);
  }, [data]);

  return (
    <tbody>
      {data.slice(start, end).map((row, rowIndex) => {
        const currentRowIndex = (page - 1) * limit + rowIndex;
        const isSelected = selectedRows.indexOf(currentRowIndex) > -1;

        return (
          <tr
            key={rowIndex}
            data-testid="alt-test-datatable-row"
            className={clsx('alt-data-table__row', {
              'alt-data-table__row--selected': isSelected
            })}>
            {selectableMode && (
              <td className="alt-data-table__cell alt-data-table__checkbox-column">
                <Checkbox checked={isSelected} onChange={() => selectRow(currentRowIndex)} />
              </td>
            )}
            {visibleColumns.map((column, columnIndex) => {
              const accessor = column.accessor as keyof T;

              const props = {
                accessor: accessor,
                item: row,
                value: row[accessor],
                rowIndex,
                columnIndex
              };

              let content;

              if (column.Component) {
                const CellComponent = column.Component;
                content = <CellComponent {...props} />;
              } else {
                content = <DataTableCell {...props} />;
              }

              return (
                <td key={columnIndex} className="alt-data-table__cell">
                  {content}
                </td>
              );
            })}
            {ltePhoneL && (
              <td className="alt-data-table__cell alt-data-table__cell--show-more">
                <button
                  type="button"
                  className="alt-data-table__showMore"
                  onClick={() => setSelectedRowIndex(rowIndex)}>
                  <Icon i="arrow_forward_ios" />
                </button>
              </td>
            )}
          </tr>
        );
      })}
      {selectedRowIndex > -1 && ltePhoneL && (
        <Modal onClose={() => setSelectedRowIndex(-1)} title="Detailed information">
          <div className="alt-data-table-mobile-grid">
            {columns.map((column, columnIndex) => {
              const CustomComponent = column.Component as React.FC<DataTableCellProps<T>>;

              const currentRow = data[selectedRowIndex];
              const accessor = column.accessor as keyof T;
              const currentValue = currentRow[accessor];

              return (
                <div key={columnIndex} className="alt-data-table-mobile-cell">
                  <div className="alt-data-table-mobile-cell__label">
                    {String(column.label || column.accessor)}
                  </div>
                  <div className="alt-data-table-mobile-cell__value">
                    {column.Component ? (
                      <CustomComponent
                        {...column}
                        item={currentRow}
                        rowIndex={selectedRowIndex}
                        columnIndex={columnIndex}
                        value={currentValue}
                      />
                    ) : (
                      String(currentValue)
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
      )}
    </tbody>
  );
};

export default DataTableBody;
