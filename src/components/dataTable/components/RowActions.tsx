import { memo, useMemo } from 'react';
import { DataTableRowActionsProps } from '../DataTable.types';
import { Flex } from 'components/flex';
import { Dropdown } from 'components/dropdown';
import { Button } from 'components/button';
import { useLocalization } from 'components/application/useLocalization.tsx';
import { Ellipsis } from 'lucide-react';
import clsx from 'clsx';

export const RowActions = memo<DataTableRowActionsProps>(
  ({ children, className, style, ...restProps }) => {
    const t = useLocalization();

    const cls = clsx(className);
    const styles = { ...style };

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
            icon={<Ellipsis />}
          />
        </Dropdown>
      );
    }, [collapsedActions]);

    return (
      <Flex gap="s" className={cls} justify="end" style={styles} {...restProps}>
        {...visibleActions}
        {collapsedActionsDropdown}
      </Flex>
    );
  },
);
