import { Composite } from '@floating-ui/react';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { DropdownMenuProps, DropdownMenuRef } from '../Dropdown.types';
import clsx from 'clsx';
import {
  DropdownRadioList,
  DropdownCheckbox,
  DropdownRadioItem,
  DropdownAction,
  DropdownChildMenu,
} from './index.ts';
import { getSafeArray } from 'utils';
import s from './menu.module.scss';

const ALLOWED_CHILDCOMPONENTS = [
  DropdownRadioList,
  DropdownCheckbox,
  DropdownRadioItem,
  DropdownAction,
  DropdownChildMenu,
];

export const DropdownMenu = forwardRef<DropdownMenuRef, DropdownMenuProps>(
  (
    {
      children,
      className,
      defaultFocusItemIndex = 0,
      onChangeFocusItemIndex,
      ...props
    },
    ref,
  ) => {
    const childrenArray = getSafeArray(children);

    const flatChildren = childrenArray
      .filter(
        (item) =>
          item?.type &&
          typeof item?.type === 'object' &&
          ALLOWED_CHILDCOMPONENTS.includes(item.type),
      )
      .map((item) => {
        if (item?.type === DropdownRadioList) {
          return [item.props.children.filter((i: any) => Boolean(i))];
        }

        return item;
      })
      .flat(2);

    const disabledIndexes = flatChildren
      .map((item, itemIndex) => {
        return ALLOWED_CHILDCOMPONENTS.includes(item.type) &&
          item?.props?.disabled
          ? itemIndex
          : -1;
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
        menuNode: menuNode.current,
      }),
      [activeIndex, menuNode.current],
    );

    useEffect(() => {
      onChangeFocusItemIndex?.(activeIndex);
    }, [activeIndex]);

    const cls = clsx(s.Menu, className);

    return (
      <Composite
        role="listbox"
        activeIndex={activeIndex}
        onNavigate={setActiveIndex}
        orientation="vertical"
        disabledIndices={disabledIndexes}
        ref={menuNode}
        className={cls}
        {...props}
      >
        {children}
      </Composite>
    );
  },
);
