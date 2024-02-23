import { memo, useRef, useState } from 'react';
import { ContextMenuType as ContextMenuType } from '../../../types';
import clsx from 'clsx';
import './toolbar-menu.scss';
import { FloatingBox } from '../index';
import { ContextMenu } from '../../list/ContextMenu';

export interface ToolbarMenuProps {
  menu: {
    label: string;
    submenu?: ContextMenuType;
  }[];
}

const ToolbarMenu = ({ menu = [] }: ToolbarMenuProps) => {
  const [currentMenuIndex, setCurrentMenuIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);

  const onMenuItemClick = (index = 0) => {
    setCurrentMenuIndex(index);
  };

  const onCloseSubmenu = () => {
    setCurrentMenuIndex(-1);
  };

  return (
    <div className="alt-toolbar-menu" ref={menuRef} data-testid="alt-test-toolbarMenu">
      {menu.map((item, itemIndex) => {
        return (
          <FloatingBox
            key={`${item.label}-${itemIndex}`}
            placement="bottom"
            content={<ContextMenu onClose={onCloseSubmenu} menu={item.submenu || []} />}>
            <button
              key={itemIndex}
              className={clsx('alt-toolbar-menu__item', {
                'alt-toolbar-menu__item--active': itemIndex === currentMenuIndex
              })}
              type="button"
              data-testid="alt-test-toolbarMenu-item">
              {item.label}
            </button>
          </FloatingBox>
        );
      })}
    </div>
  );
};

export default ToolbarMenu;
