import { Fragment, memo, useEffect, useMemo } from 'react';
import './navigation-list.scss';
import NavigationListItem from './NavigationListItem';
import NavigationListSubItem from './NavigationListSubItem';
import NavigationListSubSubItem from './NavigationListSubSubItem';
import clsx from 'clsx';
import { Indicator } from '../../../types';

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
}

interface BaseNavigationItemInterface {
  selected: boolean;
  onClick: (value: unknown) => void;
  onExpand?: (value: unknown) => void;
}

export interface NavigationItemProps extends BaseNavigationItemInterface, NavigationItem {}
export interface NavigationSubItemProps extends BaseNavigationItemInterface, SubNavigationItem {}
export interface NavigationSubSubItemProps
  extends Omit<BaseNavigationItemInterface, 'onExpand'>,
    SubSubNavigationItem {}

interface NavigationListProps {
  list: NavigationItem[];
  selected: unknown;
  onChange: (selectedValue: unknown) => void;
  title?: string;
  className?: string;
  NavigationItemComponent?: JSX.Element;
  NavigationSubItemComponent?: JSX.Element;
  NavigationSubSubItemComponent?: JSX.Element;
}

const NavigationList = ({
  list = [],
  selected,
  onChange,
  title,
  className,
  NavigationItemComponent,
  NavigationSubItemComponent,
  NavigationSubSubItemComponent
}: NavigationListProps) => {
  const [selectedItem, selectedSubItem, selectedSubSubItem] = useMemo(() => {
    for (const item of list) {
      if (item.value === selected) {
        return [item.value, null, null];
      }

      if (item?.submenu?.length) {
        for (const subitem of item.submenu) {
          if (subitem.value === selected) {
            return [item.value, subitem.value, null];
          }

          if (subitem?.submenu?.length) {
            for (const subsubitem of subitem.submenu) {
              if (subsubitem.value === selected) {
                return [item.value, subitem.value, subsubitem.value];
              }
            }
          }
        }
      }
    }

    return [null, null, null];
  }, [selected, list]);

  useEffect(() => {
    if (!selectedItem || selectedSubSubItem || !list.length) {
      return;
    }

    if (selectedItem && !selectedSubItem) {
      const firstLevelItem = list.find((item) => item.value === selectedItem);

      if (firstLevelItem && firstLevelItem.submenu?.length) {
        onChange(firstLevelItem.submenu?.[0].value);
        return;
      }
    }

    if (selectedItem && selectedSubItem && !selectedSubSubItem) {
      const firstLevelItem = list.find((item) => item.value === selectedItem);

      if (!firstLevelItem) {
        return;
      }
      const secondLevelItem = firstLevelItem.submenu?.find(
        (item) => item.value === selectedSubItem
      );
      if (secondLevelItem && secondLevelItem.submenu?.length) {
        onChange(secondLevelItem.submenu?.[0].value);
        return;
      }
    }
  }, [list, selectedItem, selectedSubItem, selectedSubSubItem, onChange]);

  return (
    <div className={clsx('alt-navigation-list', className)}>
      {title && <div className="alt-navigation-list__title">{title}</div>}
      <nav className="alt-navigation-list__navigation">
        {list.map((item, itemIndex) => {
          const itemProps: NavigationItemProps = {
            selected: item.value === selectedItem,
            onClick: () => onChange(item.value),
            ...item
          };

          return (
            <Fragment key={itemIndex}>
              {NavigationItemComponent ? (
                <NavigationItemComponent {...itemProps} />
              ) : (
                <NavigationListItem {...itemProps} />
              )}
              {selectedItem === item.value && item.submenu?.length > 0 && (
                <div className="alt-navigation-list__navigation">
                  {item.submenu?.map((subitem, subitemIndex) => {
                    const subItemProps: NavigationSubItemProps = {
                      selected: subitem.value === selectedSubItem,
                      onClick: () => onChange(subitem.value),
                      ...subitem
                    };

                    return (
                      <Fragment key={subitemIndex}>
                        {NavigationSubItemComponent ? (
                          <NavigationSubItemComponent {...subItemProps} />
                        ) : (
                          <NavigationListSubItem {...subItemProps} />
                        )}

                        {selectedSubItem === subitem.value && subitem.submenu?.length > 0 && (
                          <div className="alt-navigation-list__navigation">
                            {subitem.submenu?.map((subsubitem, subsubitemIndex) => {
                              const subsubItemProps: NavigationSubSubItemProps = {
                                selected: subsubitem.value === selectedSubSubItem,
                                onClick: () => onChange(subsubitem.value),
                                ...subsubitem
                              };

                              return (
                                <Fragment key={subsubitemIndex}>
                                  {NavigationSubItemComponent ? (
                                    <NavigationSubSubItemComponent {...subsubItemProps} />
                                  ) : (
                                    <NavigationListSubSubItem {...subsubItemProps} />
                                  )}
                                </Fragment>
                              );
                            })}
                          </div>
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              )}
            </Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default memo(NavigationList);
