import {
  KeyboardEventHandler,
  MouseEvent,
  KeyboardEvent,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AutocompleteInputProps } from './AutocompleteInput.types.ts';
import {
  ArrayUtils,
  mergeRefs,
  useDebouncedEffect,
  useShowControls,
} from 'utils';
import { useLocalization } from 'components/application';
import { TextInput } from 'components/textInput';
import { Empty } from 'components/empty';
import { Tooltip } from 'components/tooltip';
import clsx from 'clsx';
import { Dropdown } from 'components/dropdown';
import { Scrollable } from 'components/scrollable';
import { AutocompleteSuggestion } from './components';
import { PopoverRef } from 'components/popover';
import { CircleAlert } from 'lucide-react';
import s from './autocompleteInput.module.scss';

export const AutocompleteInput = <T = string,>({
  ref,
  inputRef,
  children,
  className,
  style,
  getSuggestions,
  getSuggestionValue = (item: T) => String(item),
  renderSuggestion,
  onSelect,
  onError,
  showControls,
  minChars = 1,
  cacheResults = false,
  ...restProps
}: AutocompleteInputProps<T>) => {
  const t = useLocalization();

  const isControlsVisible = useShowControls({
    propValue: showControls,
  });

  const dropdownRef = useRef<PopoverRef | null>(null);
  const fieldRef = useRef<HTMLInputElement | null>(null);
  const composedInputRef = useMemo(
    () => mergeRefs(fieldRef, inputRef),
    [inputRef],
  );
  const suggestionWasSelected = useRef(false);
  const getSuggestionsRef = useRef(getSuggestions);
  getSuggestionsRef.current = getSuggestions;
  const cacheRef = useRef<Map<string, T[]>>(new Map());

  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const safeChildren = ArrayUtils.getSafeArray(children);

  const cls = clsx(className);
  const styles = {
    ...style,
  };

  const isLoadingIslandVisible = isControlsVisible && isDataLoading;

  const selectSuggestion = (
    suggestion: T,
    inputValue: string,
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
    if (typeof window === 'undefined') return;

    const fieldNode = fieldRef.current;
    if (!fieldNode) return;

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value',
    )?.set;
    nativeInputValueSetter?.call(fieldNode, inputValue);

    const changeEvent = new Event('change', { bubbles: true });
    fieldNode.dispatchEvent(changeEvent);
    suggestionWasSelected.current = true;
    onSelect?.(suggestion, inputValue, event);
  };

  useDebouncedEffect(
    async () => {
      const currentValue = restProps.value ?? '';

      if (currentValue.trim().length < minChars) {
        return;
      }

      if (suggestionWasSelected.current) {
        suggestionWasSelected.current = false;
        return;
      }

      if (cacheResults && cacheRef.current.has(currentValue)) {
        const cached = cacheRef.current.get(currentValue)!;
        setSuggestions(cached);
        setIsEmpty(cached.length === 0);
        if (cached.length > 0) {
          dropdownRef.current?.openPopup();
        }
        return;
      }

      try {
        setIsDataLoading(true);
        setError(null);
        setIsEmpty(false);

        const _suggestions = await getSuggestionsRef.current({
          value: currentValue,
        });

        if (cacheResults) {
          cacheRef.current.set(currentValue, _suggestions);
        }

        setIsEmpty(_suggestions.length === 0);

        if (_suggestions.length && !suggestionWasSelected.current) {
          dropdownRef.current?.openPopup();
        }

        setSuggestions(_suggestions);
      } catch (err) {
        setError(err);
        onError?.(err);
        console.error(err);
      } finally {
        setIsDataLoading(false);
      }
    },
    [restProps.value, minChars, cacheResults],
    300,
    true,
  );

  const suggestionElements = suggestions.map((suggestion, suggestionIndex) => {
    const key = String(suggestion) + suggestionIndex;
    const value = getSuggestionValue(suggestion);

    return (
      <AutocompleteSuggestion
        key={key}
        onSelect={(e) => selectSuggestion(suggestion, value, e)}
      >
        {renderSuggestion
          ? renderSuggestion({ inputValue: restProps.value || '', suggestion })
          : value}
      </AutocompleteSuggestion>
    );
  });

  const onKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') {
      dropdownRef.current?.closePopup();
      return;
    }

    if (
      dropdownRef.current?.opened &&
      typeof dropdownRef.current?.activeIndex === 'number' &&
      dropdownRef.current?.activeIndex > -1 &&
      e.key === 'Enter'
    ) {
      const suggestion = suggestions[dropdownRef.current.activeIndex];
      selectSuggestion(suggestion, getSuggestionValue(suggestion), e);
      e.preventDefault();
    }
  };

  const needToShowDropdown =
    !suggestionWasSelected.current &&
    (suggestionElements.length > 0 || isEmpty) &&
    Boolean(restProps.value) &&
    (restProps.value ?? '').trim().length >= minChars;

  return (
    <Dropdown
      ref={dropdownRef}
      virtualNavigationFocus
      listNavigation
      focusTrap={false}
      style={{ display: needToShowDropdown ? 'flex' : 'none' }}
      defaultListNavigationIndex={-1}
      content={
        <Scrollable maxHeight="200px">
          {isEmpty ? (
            <Empty transparent />
          ) : (
            <Dropdown.Menu>{suggestionElements}</Dropdown.Menu>
          )}
        </Scrollable>
      }
      trigger={['click', 'focus']}
      parentWidth
    >
      <TextInput
        ref={ref}
        inputRef={composedInputRef}
        className={cls}
        style={styles}
        onKeyDown={onKeyDown}
        {...restProps}
      >
        {isLoadingIslandVisible ? (
          <TextInput.LoadingIsland placement="end" />
        ) : null}
        {error !== null ? (
          <TextInput.CustomIsland placement="end">
            <Tooltip content={t('autocompleteInput.loadError')}>
              <span className={s.ErrorIcon}>
                <CircleAlert />
              </span>
            </Tooltip>
          </TextInput.CustomIsland>
        ) : null}
        {...safeChildren}
      </TextInput>
    </Dropdown>
  );
};
