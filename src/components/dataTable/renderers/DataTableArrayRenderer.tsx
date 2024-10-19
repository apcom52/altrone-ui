import { DataTableCellProps } from '../DataTableCell.tsx';
import { ArrayUtils } from '../../../utils';
import { get } from 'lodash-es';

export const DataTableArrayRenderer = <T extends object>({
  value,
  columnOptions,
}: DataTableCellProps<T>) => {
  const delimiter = columnOptions?.arrayDelimiter ?? ', ';
  let array = ArrayUtils.getSafeArray(value);

  if (columnOptions?.arrayAccessor) {
    array = array.map((item) => get(item, String(columnOptions.arrayAccessor)));
  }

  return <div>{array.join(delimiter)}</div>;
};
