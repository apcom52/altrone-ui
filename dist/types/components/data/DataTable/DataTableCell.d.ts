/// <reference types="react" />
export interface DataTableCellProps {
  item: unknown;
  accessor: string;
  value: unknown;
  rowIndex: number;
  columnIndex: number;
}
declare const _default: import('react').MemoExoticComponent<
  ({ value }: DataTableCellProps) => JSX.Element
>;
export default _default;
