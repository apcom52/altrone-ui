import { memo, useMemo } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { useDataTableCore } from '../DataTable.context';
import { DataTableProps } from '../DataTable.types';
import { ArrayUtils } from 'utils';
import s from './header.module.scss';
import { Filtering } from './Filtering.tsx';
import { useLocalization } from '../../application';
import { SquareCheckBig, Square } from 'lucide-react';
import { Tooltip } from 'components/tooltip/Tooltip.tsx';

interface DataTableHeaderProps<T extends object> {
  children: DataTableProps<T>['children'];
  selectable: boolean;
}

export const DataTableHeader = () => {
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

      {/* {childrenActions} */}
      {/* {columnsWithFilters.length > 0 ? <Filtering /> : null} */}
    </div>
  );

  return <div className={s.Header}>{actionsContainer}</div>;
};
