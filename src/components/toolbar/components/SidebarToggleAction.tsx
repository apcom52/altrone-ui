import { memo, type MouseEvent } from 'react';
import { Action } from './Action.tsx';
import { ToolbarSidebarToggleActionProps } from '../Toolbar.types.ts';
import { useLocalization } from 'components/application';
import { useScreenContext } from 'components/screen/Screen.context.ts';
import { Dropdown } from 'components/dropdown';
import { useToolbarContext } from '../Toolbar.context.ts';

function useSidebarToggle(
  collapsedProp: boolean | undefined,
  onClick: ((event: MouseEvent<HTMLButtonElement>) => void) | undefined,
) {
  const t = useLocalization();
  const { icons } = useToolbarContext();
  const { sidebar } = useScreenContext();

  const isControlled = collapsedProp !== undefined;
  const collapsed = isControlled ? collapsedProp : (sidebar?.collapsed ?? false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!isControlled) sidebar?.toggle();
    onClick?.(event);
  };

  return {
    label: collapsed ? t('toolbar.expandSidebar') : t('toolbar.collapseSidebar'),
    icon: collapsed ? icons.sidebarExpand : icons.sidebarCollapse,
    handleClick,
  };
}

export const SidebarToggleAction = memo(
  ({
    collapsed: collapsedProp,
    showLabel = false,
    onClick,
    ...restProps
  }: ToolbarSidebarToggleActionProps) => {
    const { label, icon, handleClick } = useSidebarToggle(
      collapsedProp,
      onClick,
    );

    return (
      <Action
        {...restProps}
        onClick={handleClick}
        label={label}
        icon={icon}
        showLabel={showLabel}
      />
    );
  },
);

/** `SidebarToggleAction`'s representation inside the toolbar's overflow menu. */
export const SidebarToggleMenuAction = ({
  collapsed,
  danger,
  disabled,
  onClick,
}: ToolbarSidebarToggleActionProps) => {
  const { label, icon, handleClick } = useSidebarToggle(collapsed, onClick);

  return (
    <Dropdown.Action
      label={label}
      icon={icon}
      danger={danger}
      disabled={disabled}
      onClick={handleClick}
    />
  );
};
