import {
  ContextAction,
  ContextMenuType as ContextMenuType,
  ParentContextAction
} from '../../../types';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ContextMenuItem, ContextParentMenuItem } from './index';
import './context-menu.scss';
import { Icon } from '../../typography';
import { useLocalization } from '../../../hooks';
import clsx from 'clsx';

interface ContextMenuComponentProps {
  onClose: () => void;
  menu: ContextMenuType;
  fluid?: boolean;
  maxHeight?: number | string;
}

const ContextMenu = ({
  menu,
  fluid = false,
  onClose,
  maxHeight = 'unset'
}: ContextMenuComponentProps) => {
  const [selectedParentItem, setSelectedParentItem] = useState<ParentContextAction | null>(null);
  const t = useLocalization();

  const contextMenuRef = useRef<HTMLDivElement>(null);

  const onParentItemClick = useCallback((action: ParentContextAction | null) => {
    setSelectedParentItem(action);
  }, []);

  const onActionClick = (action: ContextAction) => {
    action.onClick?.();
    onClose?.();
  };

  useEffect(() => {
    if (!contextMenuRef.current) {
      return;
    }

    const selectedIndex = menu.findIndex((menuItem) => menuItem.selected);
    const currentScroll = (selectedIndex - 4) * 32;
    contextMenuRef.current.scrollTop = currentScroll < 0 ? 0 : currentScroll;
  }, [menu]);

  return (
    <div
      className={clsx('alt-context-menu-list', {
        'alt-context-menu-list--fluid': fluid
      })}
      style={{ maxHeight }}
      ref={contextMenuRef}
      data-testid="alt-test-contextMenu">
      {selectedParentItem && [
        <ContextMenuItem
          key={-1}
          icon={<Icon i="arrow_back_ios" />}
          title={t('common.back')}
          onClick={() => setSelectedParentItem(null)}
          selected
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

export default memo(ContextMenu) as typeof ContextMenu;
