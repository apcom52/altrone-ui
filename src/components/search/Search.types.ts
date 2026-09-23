import { ReactElement } from 'react';
import { AutocompleteInputProps } from '../autocompleteInput/AutocompleteInput.types.ts';

export interface SearchProps<T = string>
  extends Omit<AutocompleteInputProps<T>, 'type' | 'getSuggestions'> {
  getSuggestions?: AutocompleteInputProps<T>['getSuggestions'];
  showControls?: boolean;
  /** Overrides the search glyph. Defaults to `Application.icons.search`. */
  searchIcon?: ReactElement;
  /** Overrides the clear-input icon. Defaults to `Application.icons.clear`. */
  clearIcon?: ReactElement;
}
