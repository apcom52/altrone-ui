import React, { useState } from 'react';
import './navigation-list.scss';
import clsx from 'clsx';
import { ContextMenuType, Elevation, Indicator, Role, Size, Surface } from '../../../types';
import { NavigationListProps } from './NavigationList.types';
import { NavigationHeader } from './component';

export const NAVIGATION_LIST_SEPARATOR = '-';

interface SubSubNavigationItem {
  label: string;
  value: unknown;
  indicator?: Indicator;
}

interface SubNavigationItem {
  label: string;
  value: unknown;
  icon?: JSX.Element;
  submenu?: SubSubNavigationItem[];
  indicator?: Indicator;
}

interface NavigationItem {
  label: string;
  value: unknown;
  icon?: JSX.Element;
  submenu?: SubNavigationItem[];
  indicator?: Indicator;
  compact?: boolean;
}

interface BaseNavigationItemInterface {
  selected: boolean;
  selectedValue: unknown;
  onClick: (value: unknown) => void;
  elevation?: Elevation;
}

interface NavigationListAction {
  icon: JSX.Element;
  title?: string;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
  contextMenu?: ContextMenuType;
}

export interface NavigationItemProps extends BaseNavigationItemInterface, NavigationItem {}
export interface NavigationSubItemProps extends BaseNavigationItemInterface, SubNavigationItem {}
export interface NavigationSubSubItemProps
  extends Omit<BaseNavigationItemInterface, 'onExpand'>,
    SubSubNavigationItem {}

export type NavigationListMenu = (NavigationItem | '-')[];

/**
 * This component is used to make a navigation throughout your application
 * @param list
 * @param selected
 * @param onChange
 * @param className
 * @param surface
 * @param elevation
 * @param compact
 * @constructor
 */
const NavigationListComponent = <SelectedPage = unknown,>({
  children,
  selected,
  onChange,
  className,
  surface = Surface.glass,
  elevation = Elevation.raised,
  compact
}: NavigationListProps<SelectedPage>) => {
  const [compacted, setCompacted] = useState(compact === 'static');

  // const [selectedItem, selectedSubItem, selectedSubSubItem] = useMemo(() => {
  //   for (const item of list) {
  //     if (item === NAVIGATION_LIST_SEPARATOR) {
  //       continue;
  //     }
  //
  //     if (item.value === selected) {
  //       return [item.value, null, null];
  //     }
  //
  //     if (item?.submenu?.length) {
  //       for (const subitem of item.submenu) {
  //         if (subitem.value === selected) {
  //           return [item.value, subitem.value, null];
  //         }
  //
  //         if (subitem?.submenu?.length) {
  //           for (const subsubitem of subitem.submenu) {
  //             if (subsubitem.value === selected) {
  //               return [item.value, subitem.value, subsubitem.value];
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //
  //   return [null, null, null];
  // }, [selected, list]);

  // useEffect(() => {
  //   if (!selectedItem || selectedSubSubItem || !list.length) {
  //     return;
  //   }
  //
  //   if (selectedItem && !selectedSubItem) {
  //     const firstLevelItem = list.find(
  //       (item) => item !== NAVIGATION_LIST_SEPARATOR && item.value === selectedItem
  //     ) as NavigationItem | undefined;
  //
  //     if (firstLevelItem && firstLevelItem.submenu?.length) {
  //       onChange(firstLevelItem.submenu?.[0].value);
  //       return;
  //     }
  //   }
  //
  //   if (selectedItem && selectedSubItem && !selectedSubSubItem) {
  //     const firstLevelItem = list.find(
  //       (item) => item !== NAVIGATION_LIST_SEPARATOR && item.value === selectedItem
  //     ) as NavigationItem | undefined;
  //
  //     if (!firstLevelItem) {
  //       return;
  //     }
  //     const secondLevelItem = firstLevelItem.submenu?.find(
  //       (item) => item.value === selectedSubItem
  //     );
  //     if (secondLevelItem && secondLevelItem.submenu?.length) {
  //       onChange(secondLevelItem.submenu?.[0].value);
  //       return;
  //     }
  //   }
  // }, [list, selectedItem, selectedSubItem, selectedSubSubItem, onChange]);

  return (
    <div
      className={clsx('alt-navigation-list', className, {
        [`alt-navigation-list--surface-${surface}`]: surface !== Surface.glass,
        'alt-navigation-list--compact': compact === 'static' || compacted
      })}>
      {children}
    </div>
  );
};

const NavigationListNamespace = Object.assign(NavigationListComponent, {
  Header: NavigationHeader
});

export { NavigationListNamespace as NavigationList };
