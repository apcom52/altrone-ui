import { Sort } from '../../../types';
import { DataTableColumn } from './DataTable';

export interface DataTableSearchFunc<T> {
  item: T;
  field: keyof T;
  query: string;
}

export const defaultSearchFunc = <T>({ item, field, query }: DataTableSearchFunc<T>) => {
  return Boolean(item[field]?.toString().toLowerCase().startsWith(query.toLowerCase()));
};

export interface DataTableSortFunc<T> {
  itemA: T;
  itemB: T;
  field: keyof T;
  direction: Sort;
}

export const defaultSortFunc = <T>({ itemA, itemB, field, direction }: DataTableSortFunc<T>) => {
  if (direction === Sort.asc) {
    return itemA[field] > itemB[field] ? 1 : -1;
  } else {
    return itemA[field] < itemB[field] ? 1 : -1;
  }
};

export interface DataTableFilterFunc<T> {
  item: T;
  field: keyof T;
  value: unknown;
}

export const defaultSelectFilter = <T>({ item, field, value }: DataTableFilterFunc<T>) => {
  return item[field] === value;
};

export const defaultCheckboxesFilter = <T>({ item, field, value = [] }: DataTableFilterFunc<T>) => {
  return Array.isArray(value) ? value.indexOf(item[field]) > -1 : false;
};

export const defaultCheckboxFilter = <T>({
  item,
  field,
  value = false
}: DataTableFilterFunc<T>) => {
  if (typeof value === 'boolean' && value) {
    return Boolean(item[field]);
  } else {
    return true;
  }
};

export const filterVisibleColumns = <T>(
  columns: DataTableColumn<T>[],
  mobileColumns: (keyof T)[],
  isMobile = false
) => {
  if (!isMobile) {
    return columns;
  }

  return columns.filter((column) => mobileColumns.indexOf(column.accessor) > -1);
};
