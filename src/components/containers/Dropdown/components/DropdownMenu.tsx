import { Composite } from '@floating-ui/react';
import { useState } from 'react';
import { cloneNode } from '../../../../utils';
import './menu.scss';
import { DropdownMenuProps } from '../Dropdown.types';
import clsx from 'clsx';

export const DropdownMenu = ({ children, className }: DropdownMenuProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const childrenArray = Array.isArray(children) ? children : [children];

  const disabledIndexes = childrenArray
    .map((item, itemIndex) => (item?.props.disabled ? itemIndex : -1))
    .filter((i) => i >= 0);

  return (
    <Composite
      activeIndex={activeIndex}
      onNavigate={setActiveIndex}
      orientation="vertical"
      disabledIndices={disabledIndexes}
      className={clsx('alt-dropdown-menu', className)}>
      {childrenArray.map((item, itemIndex) =>
        cloneNode(item, {
          key: itemIndex,
          focused: activeIndex === itemIndex
        })
      )}
    </Composite>
  );
};
