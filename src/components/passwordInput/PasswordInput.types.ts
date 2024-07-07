import { TextInputProps } from '../textInput/TextInput.types.ts';

export interface PasswordInputProps extends Omit<TextInputProps, 'type'> {
  showControls?: boolean;
}
