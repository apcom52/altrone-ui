import { ReactNode } from "react";
import './data-table.scss';
import { DataTableFilter } from "../../../contexts";
import { DataTableSearchFunc, DataTableSortFunc } from "./functions";
export interface DataTableColumn {
    accessor: string;
    label?: string;
    width?: number | string;
    Component?: ReactNode;
}
interface DataTableProps<T = any> {
    data: T[];
    columns: DataTableColumn[];
    limit?: number;
    searchBy?: string;
    sortKeys?: string[];
    sortFunc?: (params: DataTableSortFunc) => number;
    searchFunc?: (params: DataTableSearchFunc) => unknown[];
    filters?: DataTableFilter[];
    mobileColumns?: string[];
    className?: string;
}
declare const _default: import("react").MemoExoticComponent<({ data, columns, limit, searchBy, searchFunc, sortKeys, filters, mobileColumns, className }: DataTableProps<any>) => JSX.Element>;
export default _default;
