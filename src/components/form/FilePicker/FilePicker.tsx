import { useLocalization } from '../../../hooks';
import React, { ChangeEventHandler, useCallback, useRef } from 'react';
import './file-picker.scss';
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
import { getFileSize } from './FilePicker.utils';

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
  name?: string;
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
  name,
  multiple = false,
  ...props
}: FilePickerProps) => {
  const t = useLocalization();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const icon = FILE_EXTENTIONS[String(extensions)]?.icon || DefaultIcon;
  const label = FILE_EXTENTIONS[String(extensions)]?.label || 'Выберите файл';

  const onFileUploadClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const onFileChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      console.log('on change', e.target.files?.[0]);
      if (multiple) {
        onChange(Array.from(e.target.files || []));
      } else {
        onChange(e.target.files?.[0] || undefined);
      }
    },
    [multiple, onChange]
  );

  const isFileSelected = Boolean(!Array.isArray(value) && value);

  return (
    <div className="alt-file-picker">
      <Button leftIcon={icon()} onClick={onFileUploadClick} className="alt-file-picker__button">
        {!Array.isArray(value) && value ? value?.name : label}
        {!Array.isArray(value) && value && ` (${getFileSize(value.size)})`}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="alt-file-picker__input"
        tabIndex={-1}
        onChange={onFileChange}
      />
    </div>
  );
};
