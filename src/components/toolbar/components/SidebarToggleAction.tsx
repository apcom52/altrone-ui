import { memo, type MouseEvent } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Action } from './Action.tsx';
import { ToolbarSidebarToggleActionProps } from '../Toolbar.types.ts';
import { useLocalization } from 'components/application';
import { useScreenContext } from 'components/screen/Screen.context.ts';

export const SidebarToggleAction = memo(
  ({
    collapsed: collapsedProp,
    showLabel = false,
    onClick,
    ...restProps
  }: ToolbarSidebarToggleActionProps) => {
    const t = useLocalization();
    const { sidebar } = useScreenContext();

    const isControlled = collapsedProp !== undefined;
    const collapsed = isControlled ? collapsedProp : (sidebar?.collapsed ?? false);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (!isControlled) sidebar?.toggle();
      onClick?.(event);
    };

    return (
      <Action
        {...restProps}
        onClick={handleClick}
        label={collapsed ? t('toolbar.expandSidebar') : t('toolbar.collapseSidebar')}
        icon={collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        showLabel={showLabel}
      />
    );
  },
);
