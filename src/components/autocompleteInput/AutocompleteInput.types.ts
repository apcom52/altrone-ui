import { TextInputProps } from '../textInput/TextInput.types.ts';

type AutocompleteSuggestionsContext = {
  value: string;
};
export type AutocompleteSuggestionsFunc = (
  context: AutocompleteSuggestionsContext,
) => Promise<string[]> | string[];

export type AutocompleteRenderSuggestionContext = {
  inputValue: string;
  label: string;
  onClick: () => void;
};

export interface AutocompleteInputProps extends TextInputProps {
  getSuggestions: AutocompleteSuggestionsFunc;
  renderSuggestion?: (
    context: AutocompleteRenderSuggestionContext,
  ) => React.JSX.Element;
  showControls?: boolean;
}
