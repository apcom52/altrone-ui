import { AutocompleteInputProps } from '../autocompleteInput/AutocompleteInput.types.ts';

export interface SearchProps extends Omit<AutocompleteInputProps, 'type'> {
  showControls?: boolean;
}
