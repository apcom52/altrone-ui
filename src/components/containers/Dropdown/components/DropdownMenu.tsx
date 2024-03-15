import { Composite } from '@floating-ui/react';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './menu.scss';
import { DropdownMenuProps, DropdownMenuRef } from '../Dropdown.types';
import clsx from 'clsx';
import { DropdownRadioList } from './DropdownRadioList';
import { getSafeArray } from '../../../../utils/safeArray';
import { DropdownDivider } from './DropdownDivider';

export const DropdownMenu = forwardRef<DropdownMenuRef, DropdownMenuProps>(
  ({ children, className, defaultFocusItemIndex = undefined, onChangeFocusItemIndex }, ref) => {
    const childrenArray = getSafeArray(children);

    const flatChildren = childrenArray
      .filter((item) => item?.type !== DropdownDivider)
      .map((item) => {
        if (item?.type === DropdownRadioList) {
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
      return defaultFocusItemIndex === undefined
        ? flatChildren.findIndex((item) => !item.props.disabled)
        : defaultFocusItemIndex;
    });

    const menuNode = useRef<HTMLElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        selectedIndex: activeIndex,
        menuNode: menuNode.current
      }),
      [activeIndex, menuNode.current]
    );

    useEffect(() => {
      onChangeFocusItemIndex?.(activeIndex);
    }, [activeIndex]);

    return (
      <Composite
        activeIndex={activeIndex}
        onNavigate={setActiveIndex}
        orientation="vertical"
        disabledIndices={disabledIndexes}
        ref={menuNode}
        className={clsx('alt-dropdown-menu', className)}>
        {children}
      </Composite>
    );
  }
);
