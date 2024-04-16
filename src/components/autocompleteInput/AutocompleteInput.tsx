import { forwardRef, useRef, useState } from 'react';
import { AutocompleteInputProps } from './AutocompleteInput.types.ts';
import { TextInput } from '../textInput';
import { getSafeArray } from '../../utils';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import clsx from 'clsx';
import { useDebouncedEffect } from '../../utils/hooks/useDebouncedEffect.ts';
import { Dropdown } from '../dropdown';
import { Scrollable } from '../scrollable';
import { PopoverRef } from '../popover';

export const AutocompleteInput = forwardRef<
  HTMLInputElement,
  AutocompleteInputProps
>(({ children, className, style, getSuggestions, ...restProps }, ref) => {
  const { passwordInput: passwordInputConfig = {} } = useConfiguration();

  const dropdownRef = useRef<PopoverRef | null>(null);
  const suggestionWasSelected = useRef(false);

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const safeChildren = getSafeArray(children);

  const cls = clsx(passwordInputConfig.className, className);
  const styles = {
    ...passwordInputConfig.style,
    ...style,
  };

  const selectSuggestion = (value: string) => {
    restProps.onChange(value);
    suggestionWasSelected.current = true;
  };

  useDebouncedEffect(
    async () => {
      if (restProps.value.trim().length === 0) {
        return;
      }

      const _suggestions = await getSuggestions({ value: restProps.value });
      if (_suggestions.length && !suggestionWasSelected.current) {
        dropdownRef.current?.openPopup();
      }

      suggestionWasSelected.current = false;

      setSuggestions(_suggestions);
    },
    [restProps.value, getSuggestions],
    300,
    true,
  );

  const suggestionElements = suggestions.map((suggestion, suggestionIndex) => {
    return (
      <Dropdown.Action
        key={suggestion + suggestionIndex}
        label={suggestion}
        onClick={() => selectSuggestion(suggestion)}
      />
    );
  });

  const onKeyDown = (e) => {
    if (
      dropdownRef.current?.opened &&
      typeof dropdownRef.current?.activeIndex === 'number' &&
      dropdownRef.current?.activeIndex > -1 &&
      e.key === 'Enter'
    ) {
      console.log('>> index', dropdownRef.current?.activeIndex);
      selectSuggestion(suggestions[dropdownRef.current?.activeIndex]);
      e.preventDefault();
    }
  };

  return (
    <Dropdown
      ref={dropdownRef}
      focusTrapTargets={['reference', 'content']}
      virtualNavigationFocus
      listNavigation
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
        ref={ref}
        onKeyDown={onKeyDown}
        {...restProps}
      >
        {...safeChildren}
      </TextInput>
    </Dropdown>
  );
});
