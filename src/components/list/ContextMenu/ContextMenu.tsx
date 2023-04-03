import {
  ContextAction,
  ContextMenuType as ContextMenuType,
  ParentContextAction
} from '../../../types';
import { memo, useCallback, useState } from 'react';
import { ContextMenuItem, ContextParentMenuItem } from './index';
import './context-menu.scss';
import { Icon } from '../../icons';
import { useLocalization } from '../../../hooks';
import clsx from 'clsx';

interface ContextMenuComponentProps {
  onClose: () => void;
  menu: ContextMenuType;
  fluid?: boolean;
}

const ContextMenu = ({ menu, fluid = false, onClose }: ContextMenuComponentProps) => {
  const [selectedParentItem, setSelectedParentItem] = useState<ParentContextAction | null>(null);
  const t = useLocalization();

  const onParentItemClick = useCallback((action: ParentContextAction | null) => {
    setSelectedParentItem(action);
  }, []);

  const onActionClick = (action: ContextAction) => {
    action.onClick?.();
    onClose?.();
  };

  return (
    <div
      className={clsx('alt-context-menu-list', {
        'alt-context-menu-list--fluid': fluid
      })}
      data-testid="alt-test-contextMenu">
      {selectedParentItem && [
        <ContextMenuItem
          key={-1}
          icon={<Icon i="arrow_back_ios" />}
          title={t('common.back')}
          onClick={() => setSelectedParentItem(null)}
        />,
        ...selectedParentItem.children.map((item, itemIndex) => (
          <ContextMenuItem key={itemIndex} {...item} onClick={() => onActionClick(item)} />
        ))
      ]}

      {!selectedParentItem &&
        menu.map((item, itemIndex) =>
          'onClick' in item ? (
            <ContextMenuItem key={itemIndex} {...item} onClick={() => onActionClick(item)} />
          ) : (
            <ContextParentMenuItem
              key={itemIndex}
              onClick={onParentItemClick}
              onClose={onClose}
              {...item}
            />
          )
        )}
    </div>
  );
};

export default memo(ContextMenu);
