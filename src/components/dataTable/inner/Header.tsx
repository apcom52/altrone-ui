import { Children, isValidElement, ReactNode } from 'react';
import { SquareCheckBig, Square } from 'lucide-react';
import { Toolbar } from 'components/toolbar';
import { Tooltip } from 'components/tooltip/Tooltip.tsx';
import { useDataTableContext } from '../DataTable.context';
import { DataTableHeaderProps } from '../DataTable.types';
import { useLocalization } from '../../application';
import { Filtering } from './Filtering.tsx';

interface PartitionedActions {
  leading: ReactNode[];
  center: ReactNode[];
  trailing: ReactNode[];
}

/**
 * Splits `actions` into toolbar regions: content wrapped in `Toolbar.Center`
 * / `Toolbar.Trailing` goes to that region, everything else (including
 * `Toolbar.Leading`-wrapped content) joins the system leading controls.
 */
const partitionActions = (children: ReactNode): PartitionedActions => {
  const result: PartitionedActions = { leading: [], center: [], trailing: [] };

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === Toolbar.Center) {
      result.center.push((child.props as { children?: ReactNode }).children);
    } else if (isValidElement(child) && child.type === Toolbar.Trailing) {
      result.trailing.push((child.props as { children?: ReactNode }).children);
    } else if (isValidElement(child) && child.type === Toolbar.Leading) {
      result.leading.push((child.props as { children?: ReactNode }).children);
    } else {
      result.leading.push(child);
    }
  });

  return result;
};

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

  const { leading, center, trailing } = partitionActions(resolvedActions);

  return (
    <Toolbar variant="grouped" style={{ '--toolbar-inset': '8px' }}>
      <Toolbar.Leading>
        {selectable ? (
          <Toolbar.Group>
            <Tooltip content={t('dataTable.selectableMode')}>
              <Toolbar.Action
                icon={selectMode ? <Square /> : <SquareCheckBig />}
                label={t('dataTable.selectableMode')}
                showLabel={false}
                onClick={() => setSelectMode(!selectMode)}
                selected={selectMode}
                disabled={loading}
              />
            </Tooltip>
          </Toolbar.Group>
        ) : null}
        <Toolbar.Group>
          <Filtering />
        </Toolbar.Group>
        {leading}
      </Toolbar.Leading>
      {center.length > 0 ? <Toolbar.Center>{center}</Toolbar.Center> : null}
      {trailing.length > 0 ? (
        <Toolbar.Trailing>{trailing}</Toolbar.Trailing>
      ) : null}
    </Toolbar>
  );
};
