import './navigation-list-sub-sub-item.scss';
import { memo } from 'react';
import { NavigationSubSubItemProps } from './NavigationList';
import clsx from 'clsx';

const NavigationListSubSubItem = ({
  label,
  value,
  onClick,
  selected = false,
  indicator
}: NavigationSubSubItemProps) => {
  return (
    <button
      className={clsx('alt-navigation-list-sub-sub-item', {
        'alt-navigation-list-sub-sub-item--selected': selected
      })}
      onClick={() => onClick(value)}>
      {label}
      {indicator && (
        <div className="alt-navigation-list-sub-sub-item__indicator">({indicator.value})</div>
      )}
    </button>
  );
};

export default memo(NavigationListSubSubItem);
