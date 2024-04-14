import { TextInputProps } from './TextInput.types.ts';
import { useDebouncedMemo } from 'utils';

const EMPTY_ARRAY: string[] = [];

export const useTextInputSuggestions = (props: TextInputProps) => {
  const suitableSuggestions = useDebouncedMemo(
    () => {
      const value = props.value.trim();
      if (!props.suggestions?.length || !value.length) {
        return EMPTY_ARRAY;
      }

      return props.suggestions.filter((item) => {
        item.trimStart().toLowerCase().startsWith(value.toLowerCase());
      });
    },
    [props.suggestions, props.value],
    300,
  );

  return {
    suitableSuggestions,
  };
};
