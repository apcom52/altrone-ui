import { memo, useMemo } from 'react';
import { StrictReactElements } from '../../../utils';
import { DataTableRowActionProps } from '../DataTable.types';
import { Flex } from 'components/flex';
import { Dropdown } from 'components/dropdown';
import { Button } from 'components/button';
import { useLocalization } from 'components/application/useLocalization.tsx';
import { useDataTableContext } from '../DataTable.context.tsx';

export interface RowActionsCellProps {
  children: StrictReactElements<DataTableRowActionProps>;
}

/** Renders the trailing actions column: visible `RowAction`s inline, and any
    `collapsed` ones folded into an overflow menu. */
export const RowActionsCell = memo<RowActionsCellProps>(({ children }) => {
  const t = useLocalization();
  const { icons } = useDataTableContext();

  const [collapsedActions, visibleActions] = useMemo(() => {
    if (!children) return [[], []];

    const childrenArray = Array.isArray(children) ? children : [children];

    if (childrenArray.length < 2) return [[], childrenArray];

    const collapsed = childrenArray
      .filter((child) => child && child.props && child?.props.collapsed)
      .map((child, childIndex) => {
        if (!child) return null;

        const { collapsed, icon, additionalIcon, danger, ...restProps } =
          child.props;

        return (
          <Dropdown.Action
            key={childIndex}
            icon={icon || additionalIcon}
            danger={danger}
            {...restProps}
          />
        );
      })
      .filter(Boolean);

    const visible = childrenArray.filter(
      (child) => child && !child?.props.collapsed,
    );

    return [collapsed, visible];
  }, [children]);

  const collapsedActionsDropdown = useMemo(() => {
    if (collapsedActions.length === 0) return null;

    return (
      <Dropdown content={<Dropdown.Menu>{collapsedActions}</Dropdown.Menu>}>
        <Button
          label={t('dataTable.moreActions')}
          showLabel={false}
          icon={icons.rowActions}
        />
      </Dropdown>
    );
  }, [collapsedActions, icons]);

  return (
    <Flex gap="s" justify="end">
      {...visibleActions}
      {collapsedActionsDropdown}
    </Flex>
  );
});
