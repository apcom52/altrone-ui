import { forwardRef, KeyboardEventHandler, useRef, useState } from 'react';
import { AutocompleteInputProps } from './AutocompleteInput.types.ts';
import { ArrayUtils, useDebouncedEffect } from 'utils';
import { useConfiguration } from 'components/configuration';
import { TextInput } from 'components/textInput';
import clsx from 'clsx';
import { Dropdown } from 'components/dropdown';
import { Scrollable } from 'components/scrollable';
import { PopoverRef } from 'components/popover';

export const AutocompleteInput = forwardRef<PopoverRef, AutocompleteInputProps>(
  (
    {
      children,
      className,
      style,
      getSuggestions,
      renderSuggestion,
      showControls = true,
      ...restProps
    },
    ref,
  ) => {
    const { autocompleteInput: autocompleteInputConfig = {} } =
      useConfiguration();

    const isControlsVisible =
      autocompleteInputConfig.showControls ?? showControls;

    const dropdownRef = useRef<PopoverRef | null>(null);
    const suggestionWasSelected = useRef(false);

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(false);

    const safeChildren = ArrayUtils.getSafeArray(children);

    const cls = clsx(autocompleteInputConfig.className, className);
    const styles = {
      ...autocompleteInputConfig.style,
      ...style,
    };

    const isLoadingIslandVisible = isControlsVisible && isDataLoading;

    const selectSuggestion = (value: string) => {
      setIsDataLoading(false);
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set;
      nativeInputValueSetter?.call(dropdownRef.current?.childrenNode, value);

      const event = new Event('change', { bubbles: true });
      dropdownRef.current?.childrenNode?.dispatchEvent(event);
      suggestionWasSelected.current = true;
    };

    useDebouncedEffect(
      async () => {
        if (restProps.value?.trim().length === 0) {
          return;
        }

        if (suggestionWasSelected.current) {
          suggestionWasSelected.current = false;
          return;
        }

        try {
          setIsDataLoading(true);
          const _suggestions = await getSuggestions({
            value: restProps.value || '',
          });
          setIsDataLoading(false);

          if (_suggestions.length && !suggestionWasSelected.current) {
            dropdownRef.current?.openPopup();
          }

          suggestionWasSelected.current = false;

          setSuggestions(_suggestions);
        } catch (err) {
          console.error(err);
        }
      },
      [restProps.value, getSuggestions],
      300,
      true,
    );

    const suggestionElements = suggestions.map(
      (suggestion, suggestionIndex) => {
        const itemProps = {
          key: suggestion + suggestionIndex,
          label: suggestion,
          onClick: () => selectSuggestion(suggestion),
        };

        if (renderSuggestion) {
          return renderSuggestion({
            inputValue: restProps.value || '',
            label: suggestion,
            onClick: () => selectSuggestion(suggestion),
          });
        }

        return <Dropdown.Action {...itemProps} />;
      },
    );

    const onKeyDown: KeyboardEventHandler = (e) => {
      if (
        dropdownRef.current?.opened &&
        typeof dropdownRef.current?.activeIndex === 'number' &&
        dropdownRef.current?.activeIndex > -1 &&
        e.key === 'Enter'
      ) {
        selectSuggestion(suggestions[dropdownRef.current?.activeIndex]);
        e.preventDefault();
      }
    };

    const needToShowDropdown =
      !suggestionWasSelected.current &&
      suggestionElements.length > 0 &&
      restProps.value &&
      restProps.value.trim().length > 0;

    return (
      <Dropdown
        ref={(_ref) => {
          dropdownRef.current = _ref;
          if (typeof ref === 'function') {
            ref(_ref);
          } else if (ref) {
            ref.current = _ref;
          }
        }}
        focusTrapTargets={needToShowDropdown ? ['reference', 'content'] : []}
        virtualNavigationFocus
        listNavigation
        style={{ display: needToShowDropdown ? 'flex' : 'none' }}
        defaultListNavigationIndex={-1}
        content={
          <Scrollable maxHeight="200px">
            <Dropdown.Menu>{suggestionElements}</Dropdown.Menu>
          </Scrollable>
        }
        trigger={['click', 'focus']}
        parentWidth
      >
        <TextInput
          className={cls}
          style={styles}
          onKeyDown={onKeyDown}
          {...restProps}
        >
          {isLoadingIslandVisible ? (
            <TextInput.LoadingIsland placement="right" />
          ) : null}
          {...safeChildren}
        </TextInput>
      </Dropdown>
    );
  },
);
