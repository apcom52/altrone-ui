import { SquareCheckBig, Square } from 'lucide-react';
import { Button } from 'components/button';
import { Tooltip } from 'components/tooltip/Tooltip.tsx';
import { useDataTableContext } from '../DataTable.context';
import { DataTableHeaderProps } from '../DataTable.types';
import { useLocalization } from '../../application';
import { Filtering } from './Filtering.tsx';
import s from './header.module.scss';

export const DataTableHeader = <T extends object>({
  actions,
}: DataTableHeaderProps<T>) => {
  const t = useLocalization();
  const { table, loading, selectable, selectMode, setSelectMode } =
    useDataTableContext<T>();

  const selectedItems = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  const resolvedActions =
    typeof actions === 'function'
      ? actions({ selectableMode: selectMode, selectedItems })
      : actions;

  return (
    <div className={s.Header}>
      <div className={s.Actions}>
        {selectable ? (
          <Tooltip content={t('dataTable.selectableMode')}>
            <Button
              icon={selectMode ? <Square /> : <SquareCheckBig />}
              label={t('dataTable.selectableMode')}
              showLabel={false}
              onClick={() => setSelectMode(!selectMode)}
              selected={selectMode}
              disabled={loading}
            />
          </Tooltip>
        ) : null}
        {resolvedActions}
        <Filtering />
      </div>
    </div>
  );
};
