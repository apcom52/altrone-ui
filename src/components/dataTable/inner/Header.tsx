import { Button } from 'components/button';
import { useDataTableCore } from '../DataTable.context';
import { DataTableProps } from '../DataTable.types';
import s from './header.module.scss';
import { Filtering } from './Filtering.tsx';
import { useLocalization } from '../../application';
import { SquareCheckBig, Square } from 'lucide-react';
import { Tooltip } from 'components/tooltip/Tooltip.tsx';

interface DataTableHeaderProps {
  children: DataTableProps<any>['children'];
}

export const DataTableHeader = ({ children }: DataTableHeaderProps) => {
  const t = useLocalization();

  const tableCore = useDataTableCore();

  const selectableMode = tableCore.getState().selectableMode || false;

  const toggleSelectableMode = () => {
    tableCore.setState((old) => ({
      ...old,
      selectableMode: !selectableMode,
    }));

    tableCore.resetRowSelection();
  };

  const selectedItems = tableCore
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  const childrenActions =
    typeof children === 'function'
      ? children({ selectableMode, selectedItems })
      : children;

  const actionsContainer = (
    <div className={s.Actions}>
      <Tooltip content="Select all">
        <Button
          icon={selectableMode ? <Square /> : <SquareCheckBig />}
          label="Select all"
          showLabel={false}
          onClick={toggleSelectableMode}
          selected={selectableMode}
        />
      </Tooltip>

      {childrenActions}
      <Filtering />
    </div>
  );

  return <div className={s.Header}>{actionsContainer}</div>;
};
