import { Composite } from '@floating-ui/react';
import { useState } from 'react';
import './menu.scss';
import { DropdownMenuProps } from '../Dropdown.types';
import clsx from 'clsx';
import { DropdownRadioList } from './DropdownRadioList';
import { getSafeArray } from '../../../../utils/safeArray';
import { DropdownDivider } from './DropdownDivider';

export function DropdownMenu({ children, className }: DropdownMenuProps) {
  const childrenArray = getSafeArray(children);

  const flatChildren = childrenArray
    .filter((item) => item.type !== DropdownDivider)
    .map((item) => {
      if (item.type === DropdownRadioList) {
        return [item.props.children.filter((i: any) => Boolean(i))];
      }

      return item;
    })
    .flat(2);

  const disabledIndexes = flatChildren
    .map((item, itemIndex) => {
      return item.type !== DropdownDivider && item?.props?.disabled ? itemIndex : -1;
    })
    .filter((i) => i >= 0);

  const [activeIndex, setActiveIndex] = useState(() => {
    return flatChildren.findIndex((item) => !item.props.disabled);
  });

  return (
    <Composite
      activeIndex={activeIndex}
      onNavigate={setActiveIndex}
      orientation="vertical"
      disabledIndices={disabledIndexes}
      className={clsx('alt-dropdown-menu', className)}>
      {children}
    </Composite>
  );
}
