import { useBoolean } from 'utils';
import { useCallback, useMemo, useState } from 'react';
import { Option, SelectProps } from './Select.types.ts';

const EMPTY_ARRAY: Option[] = [];

export const useSelect = <Value = unknown>(props: SelectProps<Value>) => {
  const {
    multiple,
    options = EMPTY_ARRAY,
    value,
    onChange,
    searchable,
  } = props;

  const {
    value: searchMode,
    enable: focusSelect,
    disable: blurSelect,
  } = useBoolean(false);
  const [userQuery, setUserQuery] = useState('');

  const selectedOptions = useMemo(() => {
    if (multiple && Array.isArray(value)) {
      return options.filter((item) => value?.includes(item.value));
    } else {
      return options.find((item) => item.value === value);
    }
  }, [value, options, multiple]);

  const valueString = Array.isArray(selectedOptions)
    ? selectedOptions.length
      ? selectedOptions.map((item) => item.label).join(', ')
      : ''
    : selectedOptions?.label;

  const selectValue = useCallback(
    (newValue: string) => {
      setUserQuery('');
      blurSelect();

      if (multiple && Array.isArray(value)) {
        const isSelected = value.includes(newValue);

        if (isSelected) {
          onChange(value.filter((item) => item !== newValue) as Value);
        } else {
          onChange([...value, newValue] as Value);
        }
      } else {
        onChange(newValue as Value);
      }
    },
    [onChange, value, multiple],
  );

  const filteredOptions = useMemo(() => {
    if (!searchable || !userQuery) {
      return options;
    }

    return options.filter((item) =>
      item.label.toLowerCase().startsWith(userQuery.toLowerCase()),
    );
  }, [options, userQuery, searchable]);

  const clearValue = useCallback(() => {
    if (multiple && Array.isArray(value)) {
      onChange([] as Value);
    } else {
      onChange(undefined);
    }
  }, [onChange, value]);

  return {
    searchMode,
    focusSelect,
    blurSelect,
    userQuery,
    setUserQuery,
    selectedOptions,
    valueString,
    selectValue,
    clearValue,
    filteredOptions,
  };
};
