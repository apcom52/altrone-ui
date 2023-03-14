import { memo, useCallback, useEffect, useRef, useState } from 'react';
import './tabs-list.scss';
import clsx from 'clsx';
import { useResizeObserver } from '../../../hooks';
import { Icon } from '../../icons';
import { Indicator, Align } from '../../../types';

export enum TabListVariant {
  default = 'default',
  border = 'border',
  solid = 'solid'
}

type TabValue = number | string;

interface TabListProps {
  selected: TabValue;
  tabs: {
    label: string;
    value: TabValue;
    disabled?: boolean;
    href?: string;
    indicator?: Indicator;
  }[];
  onChange: (value: TabValue) => void;
  variant?: TabListVariant;
  fluid?: boolean;
  showCloseButtons?: boolean;
  showAddTabButton?: boolean;
  onCloseTab?: (value: TabValue) => void;
  onAddTab?: () => void;
  align?: Align;
}

const TabList = ({
  selected,
  tabs = [],
  variant = TabListVariant.default,
  fluid = false,
  showCloseButtons = true,
  showAddTabButton = true,
  onChange,
  onCloseTab,
  onAddTab,
  align = Align.center
}: TabListProps) => {
  const tabListRef = useRef<HTMLDivElement>(null);
  const selectedTabRef = useRef<HTMLButtonElement>(null);
  const [activeBackgroundStyles, setActiveBackgroundStyles] = useState({});

  const setBackgroundPosition = useCallback(() => {
    if (selectedTabRef.current && variant !== TabListVariant.solid) {
      const offset = variant === TabListVariant.border ? 20 : 0;

      setActiveBackgroundStyles({
        left: selectedTabRef.current.offsetLeft + offset,
        width: selectedTabRef.current.offsetWidth - offset * 2
      });
    } else {
      setActiveBackgroundStyles({});
    }
  }, [variant]);

  const tabsListObserver = useResizeObserver(tabListRef);

  useEffect(() => {
    setBackgroundPosition();
  }, [selected, setBackgroundPosition, tabsListObserver, align]);

  const onCloseClick = (e: React.MouseEvent, value: TabValue) => {
    if (variant === TabListVariant.solid && onCloseTab) {
      e.stopPropagation();
      onCloseTab(value);
      const firstValidValue = tabs.find((tab) => tab.value !== value && !tab.disabled);

      if (firstValidValue) {
        onChange(firstValidValue.value);
      }
    }
  };

  const Component = variant === TabListVariant.solid ? 'div' : 'button';

  return (
    <div
      className={clsx('alt-tab-list', {
        'alt-tab-list--fluid': fluid,
        'alt-tab-list--variant-border': variant === TabListVariant.border,
        'alt-tab-list--variant-solid': variant === TabListVariant.solid,
        'alt-tab-list--align-start': align === Align.start,
        'alt-tab-list--align-end': align === Align.end
      })}
      ref={tabListRef}
      data-testid="alt-test-tab-list">
      {variant !== TabListVariant.solid && (
        <div className="alt-tab-list__active-background" style={activeBackgroundStyles} />
      )}
      {tabs.map((tab, tabIndex) => {
        const isSelected = tab.value === selected;
        return (
          <Component
            key={tabIndex}
            className={clsx('alt-tab', {
              'alt-tab--selected': isSelected
            })}
            ref={isSelected ? selectedTabRef : null}
            onClick={() => onChange(tab.value)}
            data-testid="alt-test-tab"
            disabled={tab.disabled}
            type="button">
            {tab.label}
            {tab.indicator && (
              <div
                className={clsx('alt-tab__indicator', {
                  'alt-tab__indicator--position-corner': tab.indicator.position === 'corner'
                })}>
                {tab.indicator.value}
              </div>
            )}
            {variant === TabListVariant.solid && showCloseButtons && onCloseTab && (
              <button
                className="alt-tab__close"
                type="button"
                onClick={(e) => onCloseClick(e, tab.value)}
                data-testid="alt-test-tab-close">
                <Icon i="close" />
              </button>
            )}
          </Component>
        );
      })}
      {variant === TabListVariant.solid && showAddTabButton && onAddTab && (
        <button
          className="alt-tab-list__add"
          onClick={onAddTab}
          data-testid="alt-test-tab-list-add"
          type="button">
          <Icon i="add" />
        </button>
      )}
    </div>
  );
};

export default memo(TabList);
