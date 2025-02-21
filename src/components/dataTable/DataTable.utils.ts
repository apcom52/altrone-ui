import { dayjs } from 'components/calendar/index.ts';
import { DataTableColumnType, FilterType } from './DataTable.types.ts';

export const getCellType = (
  dataInstance: object,
  accessor: string,
  filterType?: DataTableColumnType,
) => {
  const cellValue =
    dataInstance[accessor as keyof typeof dataInstance] || undefined;

  const isStringValue = typeof cellValue === 'string';
  const isNumberValue = typeof cellValue === 'number';
  const isBooleanValue = typeof cellValue === 'boolean';
  const isArrayValue =
    typeof cellValue === 'object' && Array.isArray(cellValue);
  const isDateValue = dayjs(cellValue).isValid();

  const hasNoManualFilters = !filterType;

  if ((hasNoManualFilters || ['text'].includes(filterType)) && isStringValue) {
    return FilterType.string;
  } else if (
    (hasNoManualFilters || ['number', 'currency'].includes(filterType)) &&
    isNumberValue
  ) {
    return FilterType.number;
  } else if (
    (hasNoManualFilters || ['boolean'].includes(filterType)) &&
    isBooleanValue
  ) {
    return FilterType.boolean;
  } else if (isDateValue && ['date', 'month', 'year'].includes(filterType)) {
    return FilterType.date;
  } else if (
    (hasNoManualFilters || ['array'].includes(filterType)) &&
    isArrayValue
  ) {
    return FilterType.array;
  }

  console.error(
    'Filter type does not match the cell type for column',
    accessor,
  );
  return null;
};
