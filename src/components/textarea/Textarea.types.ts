import React from 'react';
import { TextInputProps } from '../textInput/TextInput.types.ts';

export interface TextareaProps extends Omit<TextInputProps, 'type' | 'ref'> {
  ref?: React.Ref<HTMLTextAreaElement>;
}
