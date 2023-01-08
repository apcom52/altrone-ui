import './navigation-list-item.scss';
import { memo } from 'react';
import { NavigationItemProps } from './NavigationList';
import { Icon } from '../../icons';
import clsx from 'clsx';

const NavigationListItem = ({
  label,
  value,
  icon,
  submenu = [],
  onClick,
  selected = false,
  indicator
}: NavigationItemProps) => {
  return (
    <button
      className={clsx('alt-navigation-list-item', {
        'alt-navigation-list-item--selected': selected && submenu.length === 0,
        'alt-navigation-list-item--expanded': selected && submenu.length
      })}
      onClick={() => onClick(value)}
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
      {submenu.length > 0 && (
        <div className="alt-navigation-list-item__arrowIcon">
          <Icon i="arrow_forward_ios" />
        </div>
      )}
    </button>
  );
};

export default memo(NavigationListItem);
