import { Sort } from './DataTable.types.ts';
import { DataTableColumn } from './DataTable.types';
import dayjs from 'dayjs';

export interface DataTableSearchFunc<T extends object> {
  item: T;
  field: keyof T;
  query: string;
}

export const defaultSearchFunc = <T extends object>({
  item,
  field,
  query,
}: DataTableSearchFunc<T>) => {
  return Boolean(
    item[field]?.toString().toLowerCase().startsWith(query.toLowerCase()),
  );
};

export interface DataTableSortFunc<T extends object> {
  itemA: T;
  itemB: T;
  field: keyof T;
  direction: Sort;
}

export const defaultSortFunc = <T extends object>({
  itemA,
  itemB,
  field,
  direction,
}: DataTableSortFunc<T>) => {
  if (direction === 'asc') {
    return itemA[field] > itemB[field] ? 1 : -1;
  } else {
    return itemA[field] < itemB[field] ? 1 : -1;
  }
};

export interface DataTableFilterFunc<T extends object, ValueType = unknown>
  extends Record<string, unknown> {
  item: T;
  field: keyof T;
  value: ValueType;
}

export const defaultSelectFilter = <T extends object>({
  item,
  field,
  value,
}: DataTableFilterFunc<T>) => {
  return item[field] === value;
};

export const defaultCheckboxesFilter = <T extends object>({
  item,
  field,
  value = [],
}: DataTableFilterFunc<T>) => {
  return Array.isArray(value) ? value.indexOf(item[field]) > -1 : false;
};

export const defaultCheckboxFilter = <T extends object>({
  item,
  field,
  value = false,
}: DataTableFilterFunc<T>) => {
  if (typeof value === 'boolean' && value) {
    return Boolean(item[field]);
  } else {
    return true;
  }
};

export const defaultDateFilter = <T extends object>({
  item,
  field,
  value,
  picker = 'day',
}: DataTableFilterFunc<T>) => {
  if (item[field] && value) {
    const itemDate = dayjs(String(item[field]));
    const filterDate = dayjs(value as Date);

    return itemDate.isSame(filterDate, picker as dayjs.OpUnitType);
  }

  return false;
};

export const defaultDateRangeFilter = <T extends object>({
  item,
  field,
  value,
  picker = 'day',
}: DataTableFilterFunc<T, [Date, Date]>) => {
  if (item[field] && value.length === 2) {
    const itemDate = dayjs(String(item[field]));
    const filterDateStart = dayjs(value[0] as Date);
    const filterDateEnd = dayjs(value[1] as Date);

    return (
      itemDate.isSameOrAfter(filterDateStart, picker as dayjs.OpUnitType) &&
      itemDate.isSameOrBefore(filterDateEnd, picker as dayjs.OpUnitType)
    );
  }

  return false;
};

export const filterVisibleColumns = <T extends object>(
  columns: DataTableColumn<T>[],
  mobileColumns: (keyof T)[],
  isMobile = false,
) => {
  if (!isMobile) {
    return columns;
  }

  return columns.filter(
    (column) => mobileColumns.indexOf(column.accessor) > -1,
  );
};
