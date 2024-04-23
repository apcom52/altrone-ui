import { TextInputProps } from '../textInput/TextInput.types.ts';

export interface SearchProps extends Omit<TextInputProps, 'type'> {
  showControl?: boolean;
}
