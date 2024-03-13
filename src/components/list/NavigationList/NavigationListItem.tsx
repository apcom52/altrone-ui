import './navigation-list-item.scss';
import { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { NavigationItemProps } from './NavigationList';
import { Icon } from '../../typography';
import clsx from 'clsx';
import { ContextMenuType, Elevation, SafeReactElement } from '../../../types';
import { FloatingBox } from '../../containers';
import { ContextMenu } from '../ContextMenu';
import { Dropdown } from '../../containers/Dropdown';

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
  const buttonRef = useRef<HTMLButtonElement>(null);

  const id = useId();

  const contextMenu = useMemo(() => {
    const result: SafeReactElement = [];

    let index = 0;

    for (const subitem of submenu) {
      const _submenu = [];
      const subitemSubmenu = subitem.submenu || [];

      for (const subsubitem of subitemSubmenu) {
        _submenu.push(
          <Dropdown.Action
            key={`${id}-${index++}`}
            onClick={() => onClick(subitem.value)}
            label={subsubitem.label}
          />
        );
      }

      result.push(_submenu.length > 0 ?  : <Dropdown.Action label={subitem.label} />)

      result.push({
        title: subitem.label,
        icon: subitem.icon,
        selected: subitem.value === selectedValue,
        ...(_submenu.length > 0
          ? { children: _submenu }
          : { onClick: () => onClick(subitem.value) })
      });
    }

    return <Dropdown.Menu>{result}</Dropdown.Menu>;
  }, [submenu]);

  const onItemClick = () => {
    onClick(value);
  };

  return (
    <Dropdown content={}>
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
    </Dropdown>
  );
};

export default memo(NavigationListItem);
