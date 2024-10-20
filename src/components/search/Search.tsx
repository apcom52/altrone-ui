import { forwardRef, useRef } from 'react';
import { SearchProps } from './Search.types.ts';
import { TextInput } from 'components/textInput';
import { Icon } from 'components/icon';
import { useConfiguration } from 'components/configuration';
import { useLocalization } from 'components/application';
import { AutocompleteInput } from 'components/autocompleteInput';
import { PopoverRef } from 'components/popover';
import { ArrayUtils, DOMUtils } from 'utils';
import clsx from 'clsx';
import s from './search.module.scss';

const GET_SUGGESTIONS_MOCK = () => [];

export const Search = forwardRef<PopoverRef, SearchProps>(
  (
    {
      showControls,
      children,
      className,
      style,
      placeholder,
      getSuggestions,
      ...restProps
    },
    ref,
  ) => {
    const t = useLocalization();

    const textInputRef = useRef<PopoverRef | null>(null);

    const { search: searchConfig = {} } = useConfiguration();

    const haveValue = restProps.value;

    const needToShowControl = Boolean(
      (showControls ?? searchConfig.showControls ?? true) && haveValue,
    );

    const safeChildren = ArrayUtils.getSafeArray(children);

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

    const placeholderText =
      typeof placeholder === 'string' ? placeholder : t('search.placeholder');

    const onClearClick = () => {
      if (textInputRef.current) {
        DOMUtils.triggerEvent({
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
        getSuggestions={getSuggestions || GET_SUGGESTIONS_MOCK}
        ref={(_ref) => {
          textInputRef.current = _ref;
          if (typeof ref === 'function') {
            ref(_ref);
          } else if (ref) {
            ref.current = _ref;
          }
        }}
        showControls={needToShowControl}
      >
        {haveValue && (
          <TextInput.IconIsland icon={<Icon i="search" />} placement="left" />
        )}
        {haveValue ? safeChildren : null}
        {needToShowControl ? (
          <TextInput.ActionIsland
            placement="right"
            label={t('common.clear')}
            showLabel={false}
            disabled={restProps.disabled}
            onClick={onClearClick}
            icon={<Icon i="backspace" />}
          />
        ) : null}
        {!haveValue ? (
          <div className={placeholderCls}>
            <div className={s.PlaceholderIcon}>
              <Icon i="search" />
            </div>
            <div className={s.PlaceholderText}>{placeholderText}</div>
          </div>
        ) : null}
      </AutocompleteInput>
    );
  },
);
