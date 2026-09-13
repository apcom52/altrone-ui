import { AutocompleteInputProps } from '../autocompleteInput/AutocompleteInput.types.ts';

export interface SearchProps<T = string>
  extends Omit<AutocompleteInputProps<T>, 'type' | 'getSuggestions'> {
  getSuggestions?: AutocompleteInputProps<T>['getSuggestions'];
  showControls?: boolean;
}
