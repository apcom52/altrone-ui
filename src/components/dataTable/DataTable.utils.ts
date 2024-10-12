import { FilterType } from './DataTable.types.ts';

export const getCellType = (dataInstance: object, accessor: string) => {
  const cellValue =
    dataInstance[accessor as keyof typeof dataInstance] || undefined;

  if (typeof cellValue === 'string') {
    return FilterType.string;
  } else if (typeof cellValue === 'number') {
    return FilterType.number;
  } else if (typeof cellValue === 'object') {
    if (Array.isArray(cellValue)) {
      return FilterType.array;
    }
  } else if (typeof cellValue === 'boolean') {
    return FilterType.boolean;
  }

  return null;
};
