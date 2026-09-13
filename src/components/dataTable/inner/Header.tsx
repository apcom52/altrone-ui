import { ReactNode } from 'react';
import { SquareCheckBig, Square } from 'lucide-react';
import { Button } from 'components/button';
import { Tooltip } from 'components/tooltip/Tooltip.tsx';
import { useDataTableContext } from '../DataTable.context';
import { DataTableRenderContext } from '../DataTable.types';
import { AnyObject } from '../../../utils';
import { useLocalization } from '../../application';
import { Filtering } from './Filtering.tsx';
import s from './header.module.scss';

interface DataTableHeaderProps {
  children?:
    | ReactNode
    | ((context: DataTableRenderContext<AnyObject>) => ReactNode);
}

export const DataTableHeader = ({ children }: DataTableHeaderProps) => {
  const t = useLocalization();
  const { table, loading, selectable, selectMode, setSelectMode } =
    useDataTableContext();

  const selectedItems = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  const childrenActions: ReactNode =
    typeof children === 'function'
      ? children({ selectableMode: selectMode, selectedItems })
      : children;

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
        {childrenActions}
        <Filtering />
      </div>
    </div>
  );
};
