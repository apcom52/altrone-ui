import { TextInputProps } from '../textInput/TextInput.types.ts';
import { ReactElement } from 'react';

type AutocompleteSuggestionsContext = {
  value: string;
};
export type AutocompleteSuggestionsFunc = (
  context: AutocompleteSuggestionsContext,
) => Promise<string[]> | string[];

export interface AutocompleteInputProps extends TextInputProps {
  getSuggestions: AutocompleteSuggestionsFunc;
  SuggestionComponent?: ReactElement<AutocompleteSuggestionsContext>;
}
