import { memo, useMemo } from 'react';
import { DataTableRowActionsProps } from '../DataTable.types';
import { Flex } from 'components/flex';
import { Dropdown } from 'components/dropdown';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { useLocalization } from 'components/application/useLocalization.tsx';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';

export const RowActions = memo<DataTableRowActionsProps>(
  ({ children, className, style, ...restProps }) => {
    const t = useLocalization();

    const { dataTable: { rowActions: rowActionsConfig = {} } = {} } =
      useConfiguration();

    const cls = clsx(rowActionsConfig.className, className);
    const styles = { ...rowActionsConfig.style, ...style };

    const [collapsedActions, visibleActions] = useMemo(() => {
      if (!children) return [[], []];

      const childrenArray = Array.isArray(children) ? children : [children];

      if (childrenArray.length < 2) return [[], childrenArray];

      const collapsed = childrenArray
        .filter((child) => child && child?.props.collapsed)
        .map((child, childIndex) => {
          if (!child) return null;

          const { collapsed, leftIcon, rightIcon, severity, ...restProps } =
            child.props;

          const isDanger = severity === 'danger';

          return (
            <Dropdown.Action
              key={childIndex}
              icon={leftIcon || rightIcon}
              danger={isDanger}
              {...restProps}
            />
          );
        });

      const visible = childrenArray.filter((child) => !child?.props.collapsed);

      return [collapsed, visible];
    }, [children]);

    const collapsedActionsDropdown = useMemo(() => {
      if (collapsedActions.length === 0) return null;

      return (
        <Dropdown content={<Dropdown.Menu>{collapsedActions}</Dropdown.Menu>}>
          <Button
            label={t('dataTable.moreActions')}
            showLabel={false}
            leftIcon={<Icon i="more_horiz" />}
          />
        </Dropdown>
      );
    }, [collapsedActions]);

    return (
      <Flex gap="s" className={cls} style={styles} {...restProps}>
        {...visibleActions}
        {collapsedActionsDropdown}
      </Flex>
    );
  },
);
