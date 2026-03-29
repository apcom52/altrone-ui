import React, { ReactElement } from 'react';
import { TextInputProps } from '../textInput/TextInput.types.ts';

type AutocompleteSuggestionsContext = {
  value: string;
};

export type AutocompleteSuggestionsFunc<T = string> = (
  context: AutocompleteSuggestionsContext,
) => Promise<T[]> | T[];

export type AutocompleteRenderSuggestionContext<T = string> = {
  inputValue: string;
  suggestion: T;
  onSelect: (value: string, event: React.MouseEvent<HTMLElement>) => void;
};

export interface AutocompleteInputProps<T = string> extends TextInputProps {
  getSuggestions: AutocompleteSuggestionsFunc<T>;
  getSuggestionValue?: (suggestion: T) => string;
  renderSuggestion?: (
    context: AutocompleteRenderSuggestionContext<T>,
  ) => ReactElement;
  onSelect?: (
    suggestion: T,
    inputValue: string,
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  onError?: (error: unknown) => void;
  showControls?: boolean;
  minChars?: number;
  cacheResults?: boolean;
}
