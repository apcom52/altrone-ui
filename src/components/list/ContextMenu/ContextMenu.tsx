import { ParentContextAction } from '../../../types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ContextMenuAction, ContextParentMenuItem } from './index';
import './context-menu.scss';
import { Icon } from '../../typography';
import { useLocalization } from '../../../hooks';
import clsx from 'clsx';
import { ContextMenuComponentProps } from './ContextMenu.types';
import { ContextClickAction } from '../../../types/ContextAction';
import { ContextMenuCheckboxAction } from './ContextMenuCheckboxAction';
import { ContextMenuRadioListAction } from './ContextMenuRadioListAction';

/**
 * This component is used to show context menus
 * @param menu
 * @param fluid
 * @param onClose
 * @param maxHeight
 * @constructor
 */
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

  const onActionClick = useCallback(
    (action: ContextClickAction) => {
      action.onClick();
      onClose();
    },
    [onClose]
  );

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
        <ContextMenuAction
          key={-1}
          icon={<Icon i="arrow_back_ios" />}
          title={t('common.back')}
          onClick={() => setSelectedParentItem(null)}
          selected
        />,
        ...selectedParentItem.children.map((item, itemIndex) => (
          <ContextMenuAction key={itemIndex} {...item} onClick={() => onActionClick(item)} />
        ))
      ]}
      {!selectedParentItem &&
        menu.map((item, itemIndex) => {
          if ('children' in item) {
            return (
              <ContextParentMenuItem
                key={itemIndex}
                onClick={onParentItemClick}
                onClose={onClose}
                {...item}
              />
            );
          } else if (item.type === 'checkbox') {
            return <ContextMenuCheckboxAction key={itemIndex} {...item} />;
          } else if (item.type === 'radioList') {
            return <ContextMenuRadioListAction key={itemIndex} {...item} />;
          } else {
            return (
              <ContextMenuAction
                key={itemIndex}
                {...item}
                onClick={onActionClick.bind(null, item)}
              />
            );
          }
        })}
    </div>
  );
};

export default ContextMenu;
