import './navigation-list-sub-item.scss';
import { memo } from 'react';
import { Icon } from '../../icons';
import clsx from 'clsx';
import { NavigationSubItemProps } from './NavigationList';

const NavigationListSubItem = ({
  label,
  value,
  icon,
  submenu = [],
  onClick,
  indicator,
  selected = false
}: NavigationSubItemProps) => {
  return (
    <button
      className={clsx('alt-navigation-list-sub-item', {
        'alt-navigation-list-sub-item--selected': selected && submenu.length === 0,
        'alt-navigation-list-sub-item--expanded': selected && submenu.length
      })}
      onClick={() => onClick(value)}
      data-testid={
        selected && submenu.length === 0 ? 'alt-test-navigationList-subItem' : undefined
      }>
      {icon && <div className="alt-navigation-list-sub-item__icon">{icon}</div>}
      <div className="alt-navigation-list-sub-item__label">{label}</div>
      {indicator && (
        <div
          className={clsx('alt-navigation-list-sub-item__indicator', {
            'alt-navigation-list-sub-item__indicator--position-corner':
              indicator.position === 'corner'
          })}>
          {indicator.value}
        </div>
      )}
      {submenu.length > 0 && (
        <div className="alt-navigation-list-sub-item__arrowIcon">
          <Icon i="arrow_forward_ios" />
        </div>
      )}
    </button>
  );
};

export default memo(NavigationListSubItem);
