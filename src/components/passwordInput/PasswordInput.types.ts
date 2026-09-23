import { ReactElement } from 'react';
import { TextInputProps } from '../textInput/TextInput.types.ts';

export interface PasswordInputProps extends Omit<TextInputProps, 'type'> {
  showControls?: boolean;
  /** Icon for the "show password" toggle state. Defaults to an eye. */
  showIcon?: ReactElement;
  /** Icon for the "hide password" toggle state. Defaults to a crossed-out eye. */
  hideIcon?: ReactElement;
}
