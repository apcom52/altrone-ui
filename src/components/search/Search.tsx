import { forwardRef, useRef } from 'react';
import { SearchProps } from './Search.types.ts';
import { TextInput } from '../textInput';
import { Icon } from '../icon';
import { getSafeArray } from 'utils';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';
import s from './search.module.scss';
import { triggerNativeEvent } from '../../utils/events.ts';
import { AutocompleteInput } from '../autocompleteInput';
import { PopoverRef } from '../popover';

export const Search = forwardRef<PopoverRef, SearchProps>(
  (
    {
      showControl,
      children,
      className,
      style,
      placeholder = 'Search',
      ...restProps
    },
    ref,
  ) => {
    const textInputRef = useRef<PopoverRef | null>(null);

    const { search: searchConfig = {} } = useConfiguration();

    const haveValue = restProps.value;

    const needToShowControl =
      (typeof showControl === 'boolean'
        ? showControl
        : searchConfig.showControl || true) && haveValue;

    const safeChildren = getSafeArray(children);

    const cls = clsx(
      s.Search,
      {
        [s.Empty]: !haveValue,
      },
      searchConfig.className,
      className,
    );
    const styles = {
      ...searchConfig.style,
      ...style,
    };

    const placeholderCls = clsx(s.Placeholder, {
      [s.DisabledPlaceholder]: restProps.disabled,
    });

    const onClearClick = () => {
      if (textInputRef.current) {
        triggerNativeEvent({
          element: textInputRef.current?.childrenNode as HTMLElement,
          value: '',
          eventType: 'change',
          senderObject: window.HTMLInputElement.prototype,
          propertyName: 'value',
        });
      }
    };

    return (
      <AutocompleteInput
        className={cls}
        style={styles}
        {...restProps}
        type="search"
        ref={(_ref) => {
          textInputRef.current = _ref;
          if (typeof ref === 'function') {
            ref(_ref);
          } else if (ref) {
            ref.current = _ref;
          }
        }}
      >
        {haveValue ? safeChildren : null}
        {needToShowControl ? (
          <TextInput.ActionIsland
            placement="right"
            label="Clear"
            showLabel={false}
            disabled={restProps.disabled}
            onClick={onClearClick}
            icon={<Icon i="backspace" />}
          />
        ) : null}
        {haveValue && (
          <TextInput.IconIsland icon={<Icon i="search" />} placement="left" />
        )}
        {!haveValue ? (
          <div className={placeholderCls}>
            <div className={s.PlaceholderIcon}>
              <Icon i="search" />
            </div>
            Search
          </div>
        ) : null}
      </AutocompleteInput>
    );
  },
);
