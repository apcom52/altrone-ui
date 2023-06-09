import './navigation-list-item.scss';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NavigationItemProps } from './NavigationList';
import { Icon } from '../../icons';
import clsx from 'clsx';
import { ContextMenuType, Elevation } from '../../../types';
import { FloatingBox } from '../../containers';
import { ContextMenu } from '../ContextMenu';

const NavigationListItem = ({
  label,
  value,
  icon,
  submenu = [],
  selectedValue,
  onClick,
  selected = false,
  indicator,
  compact = false,
  elevation = Elevation.floating
}: NavigationItemProps) => {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const contextMenu = useMemo(() => {
    const result: ContextMenuType = [];

    for (const subitem of submenu) {
      const _submenu = [];
      const subitemSubmenu = subitem.submenu || [];

      for (const subsubitem of subitemSubmenu) {
        _submenu.push({
          title: subsubitem.label,
          selected: subitem.value === selectedValue,
          onClick: () => onClick(subitem.value)
        });
      }

      result.push({
        title: subitem.label,
        icon: subitem.icon,
        selected: subitem.value === selectedValue,
        ...(_submenu.length > 0
          ? { children: _submenu }
          : { onClick: () => onClick(subitem.value) })
      });
    }

    return result;
  }, [submenu]);

  useEffect(() => {
    setIsContextMenuVisible(false);
  }, [compact]);

  const onContextMenuClose = useCallback(() => {
    setIsContextMenuVisible(false);
  }, []);

  const onItemClick = () => {
    onClick(value);

    if (compact && submenu?.length) {
      setIsContextMenuVisible(true);
    }
  };

  return (
    <button
      className={clsx('alt-navigation-list-item', {
        'alt-navigation-list-item--selected': selected && submenu.length === 0,
        'alt-navigation-list-item--expanded': selected && submenu.length,
        'alt-navigation-list-item--compact': compact,
        [`alt-navigation-list-item--elevation-${elevation}`]:
          selected && elevation !== Elevation.floating
      })}
      ref={buttonRef}
      onClick={onItemClick}
      title={label}>
      {icon && <div className="alt-navigation-list-item__icon">{icon}</div>}
      <div className="alt-navigation-list-item__label">{label}</div>
      {indicator && (
        <div
          className={clsx('alt-navigation-list-item__indicator', {
            'alt-navigation-list-item__indicator--position-corner': indicator.position === 'corner'
          })}>
          {indicator.value}
        </div>
      )}
      {!compact && submenu.length > 0 && (
        <div className="alt-navigation-list-item__arrowIcon">
          <Icon i="arrow_forward_ios" />
        </div>
      )}
      {compact && (
        <div className="alt-navigation-list-item__compact-hint">
          {icon && <div className="alt-navigation-list-item__icon">{icon}</div>}
          <div className="alt-navigation-list-item__label">{label}</div>
          {indicator && (
            <div
              className={clsx('alt-navigation-list-item__indicator', {
                'alt-navigation-list-item__indicator--position-corner':
                  indicator.position === 'corner'
              })}>
              {indicator.value}
            </div>
          )}
          {!compact && submenu.length > 0 && (
            <div className="alt-navigation-list-item__arrowIcon">
              <Icon i="arrow_forward_ios" />
            </div>
          )}
        </div>
      )}
      {isContextMenuVisible && (
        <FloatingBox
          targetElement={buttonRef.current}
          onClose={onContextMenuClose}
          placement="right">
          <ContextMenu menu={contextMenu} onClose={onContextMenuClose} />
        </FloatingBox>
      )}
    </button>
  );
};

export default memo(NavigationListItem);
