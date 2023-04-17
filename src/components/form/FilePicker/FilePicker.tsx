import { InputIslandType, TextInput, TextInputProps } from '../TextInput';
import { useLocalization } from '../../../hooks';
import React from 'react';
import { Icon } from '../../icons';
import './file-picker.scss';
import clsx from 'clsx';
import { Surface } from '../../../types';

export enum FilePickerVariant {
  default = 'default',
  block = 'block'
}

type FilePickerType = File | File[] | undefined;

interface FilePickerProps {
  value: FilePickerType;
  onChange: (value: FilePickerType) => void;
  variant?: FilePickerVariant;
  surface?: Surface;
  multiple?: boolean;
  maxFileSize?: number;
  extensions?: string[];
  className?: string;
}

export const FilePicker = ({ value, onChange, className, ...props }: FilePickerProps) => {
  const t = useLocalization();

  return (
    <button>
      <Icon i="" />
      Выберите файл
    </button>
  );
};
