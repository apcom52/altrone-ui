import { TextInputProps } from '../textInput/TextInput.types.ts';
import { ReactElement } from 'react';

type AutocompleteSuggestionsContext = {
  value: string;
};
export type AutocompleteSuggestionsFunc = (
  context: AutocompleteSuggestionsContext,
) => Promise<string[]> | string[];

export type AutocompleteCustomComponent = ReactElement & {
  inputValue: string;
  label: string;
  onClick: () => void;
};

export interface AutocompleteInputProps extends TextInputProps {
  getSuggestions: AutocompleteSuggestionsFunc;
  SuggestionComponent?: AutocompleteCustomComponent;
}
