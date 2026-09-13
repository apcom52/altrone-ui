import { useDataTableContext } from './DataTable.context.tsx';

/** Builds the `grid-template-columns` string shared by the header row and body rows. */
export function useDataTableColumnsTemplate(
  selectMode: boolean,
  rowActions: boolean,
) {
  const { table } = useDataTableContext();

  const columns = table.getVisibleLeafColumns();

  let columnTemplate = columns.map((col) => `${col.getSize()}px`).join(' ');

  if (selectMode) {
    columnTemplate = '32px ' + columnTemplate;
  }

  if (rowActions) {
    columnTemplate += ' 150px';
  }

  return columnTemplate;
}
