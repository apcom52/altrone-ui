import { Sort } from "../../../types";
import { DataTableColumn } from "./DataTable";
export interface DataTableSearchFunc {
    item: unknown;
    field: string;
    query: string;
}
export declare const defaultSearchFunc: ({ item, field, query, }: DataTableSearchFunc) => any;
export interface DataTableSortFunc {
    itemA: object;
    itemB: object;
    field: string;
    direction: Sort;
}
export declare const defaultSortFunc: ({ itemA, itemB, field, direction, }: DataTableSortFunc) => 1 | -1;
export interface DataTableFilterFunc {
    item: unknown;
    field: string;
    value: any;
}
export declare const defaultSelectFilter: ({ item, field, value, }: DataTableFilterFunc) => boolean;
export declare const defaultCheckboxesFilter: ({ item, field, value, }: DataTableFilterFunc) => boolean;
export declare const filterVisibleColumns: (columns: DataTableColumn[], mobileColumns: string[], isMobile?: boolean) => DataTableColumn[];
