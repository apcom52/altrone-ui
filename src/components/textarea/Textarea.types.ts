import { TextInputProps } from '../textInput/TextInput.types.ts';

export interface TextareaProps
  extends Omit<TextInputProps, 'type' | 'children'> {}
