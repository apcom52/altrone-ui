import { InputIslandType, TextInput, TextInputProps } from '../TextInput';
import { useLocalization } from '../../../hooks';
import React from 'react';
import { Icon } from '../../icons';
import './file-picker.scss';
import clsx from 'clsx';
import { Surface } from '../../../types';
import { Button } from '../../button';
import {
  ArchiveFileIcon,
  AudioFileIcon,
  CodeFileIcon,
  DefaultIcon,
  DocumentFileIcon,
  ImageFileIcon,
  PresentationFileIcon,
  TableFileIcon,
  VideoFileIcon
} from './FilePickerIcons';

export enum FilePickerVariant {
  default = 'default',
  block = 'block'
}

type FilePickerType = File | File[] | undefined;
type FileExtensions =
  | 'text'
  | 'image'
  | 'audio'
  | 'video'
  | 'table'
  | 'presentation'
  | 'code'
  | 'archive';

interface FilePickerProps {
  value: FilePickerType;
  onChange: (value: FilePickerType) => void;
  variant?: FilePickerVariant;
  surface?: Surface;
  multiple?: boolean;
  maxFileSize?: number;
  extensions?: FileExtensions | string;
  className?: string;
}

const FILE_EXTENTIONS: Record<FileExtensions | string, { icon: () => JSX.Element; label: string }> =
  {
    text: {
      icon: DocumentFileIcon,
      label: 'Выберите документ'
    },
    image: {
      icon: ImageFileIcon,
      label: 'Выберите изображение'
    },
    audio: {
      icon: AudioFileIcon,
      label: 'Выберите музыку'
    },
    video: {
      icon: VideoFileIcon,
      label: 'Выберите видео'
    },
    table: {
      icon: TableFileIcon,
      label: 'Выберите таблицу'
    },
    presentation: {
      icon: PresentationFileIcon,
      label: 'Выберите презентацию'
    },
    code: {
      icon: CodeFileIcon,
      label: 'Выберите исходный код'
    },
    archive: {
      icon: ArchiveFileIcon,
      label: 'Выберите архив'
    }
  };

export const FilePicker = ({
  value,
  onChange,
  className,
  extensions,
  ...props
}: FilePickerProps) => {
  const t = useLocalization();

  const icon = FILE_EXTENTIONS[String(extensions)]?.icon || DefaultIcon;
  const label = FILE_EXTENTIONS[String(extensions)]?.label || 'Выберите файл';

  return <Button leftIcon={icon()}>{label}</Button>;
};
