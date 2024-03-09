import { Composite } from '@floating-ui/react';
import { PropsWithChildren, useState } from 'react';
import { cloneNode } from '../../../../utils';
import './menu.scss';
import { DropdownMenuProps } from '../Dropdown.types';

export const DropdownMenu = ({ children }: DropdownMenuProps) => {
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
      className="alt-dropdown-menu">
      {childrenArray.map((item, itemIndex) =>
        cloneNode(item, {
          key: itemIndex,
          focused: activeIndex === itemIndex
        })
      )}
    </Composite>
  );
};
