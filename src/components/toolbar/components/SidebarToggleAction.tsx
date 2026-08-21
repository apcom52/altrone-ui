import { memo } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Action } from './Action.tsx';
import { ToolbarSidebarToggleActionProps } from '../Toolbar.types.ts';
import { useLocalization } from 'components/application';

export const SidebarToggleAction = memo(
  ({
    collapsed,
    showLabel = false,
    ...restProps
  }: ToolbarSidebarToggleActionProps) => {
    const t = useLocalization();

    return (
      <Action
        {...restProps}
        label={collapsed ? t('toolbar.expandSidebar') : t('toolbar.collapseSidebar')}
        icon={collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        showLabel={showLabel}
      />
    );
  },
);
