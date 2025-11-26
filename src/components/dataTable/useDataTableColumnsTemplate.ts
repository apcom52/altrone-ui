import { useDataTableCore } from './DataTable.context';

export function useDataTableColumnsTemplate() {
  const tableCore = useDataTableCore();

  return tableCore
    .getVisibleLeafColumns()
    .map((col) => `${col.getSize()}px`)
    .join(' ');
}
