import { TextInputProps } from '../textInput/TextInput.types.ts';

type AutocompleteSuggestionsContext = {
  value: string;
};
export type AutocompleteSuggestionsFunc = (
  context: AutocompleteSuggestionsContext,
) => Promise<string[]> | string[];

export interface AutocompleteInputProps extends TextInputProps {
  getSuggestions: AutocompleteSuggestionsFunc;
}
