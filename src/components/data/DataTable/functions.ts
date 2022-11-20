import {Sort} from "../../../types";
import {DataTableColumn} from "./DataTable";

export interface DataTableSearchFunc {
  item: unknown,
  field: string
  query: string
}

export const defaultSearchFunc = ({ item, field, query }: DataTableSearchFunc) => {
  return item[field].toString().toLowerCase().startsWith(query.toLowerCase())
}

export interface DataTableSortFunc {
  itemA: unknown,
  itemB: unknown,
  field: string
  direction: Sort
}

export const defaultSortFunc = ({ itemA, itemB, field, direction }: DataTableSortFunc) => {
  if (direction === Sort.asc) {
    return itemA[field] > itemB[field] ? 1 : -1
  } else {
    return itemA[field] < itemB[field] ? 1 : -1
  }
}

export interface DataTableFilterFunc {
  item: unknown
  field: string
  value: any
}

export const defaultSelectFilter = ({ item, field, value }: DataTableFilterFunc) => {
  return item[field] === value
}

export const defaultCheckboxesFilter = ({ item, field, value = [] }: DataTableFilterFunc) => {
  return value.indexOf(item[field]) > -1
}

export const filterVisibleColumns = (columns: DataTableColumn[], mobileColumns: string[], isMobile: boolean) => {
  if (!isMobile) {
    return columns
  }

  return columns.filter(column => mobileColumns.indexOf(column.accessor) > -1)
}