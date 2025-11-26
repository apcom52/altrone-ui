import { useDataTableCore } from './DataTable.context';

export function useDataTableColumnsTemplate(selectableMode: boolean) {
  const tableCore = useDataTableCore();

  const columns = tableCore.getVisibleLeafColumns();

  let columnTemplate = columns.map((col) => `${col.getSize()}px`).join(' ');

  if (selectableMode) {
    columnTemplate = '32px ' + columnTemplate;
  }

  return columnTemplate;
}
