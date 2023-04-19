import { useLocalization } from '../../../hooks';
import React, { ChangeEventHandler, useCallback, useRef } from 'react';
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
import './file-picker.scss';

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
  placeholder?: string;
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
  placeholder,
  ...props
}: FilePickerProps) => {
  const t = useLocalization();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const icon = FILE_EXTENTIONS[String(extensions)]?.icon || DefaultIcon;
  const label =
    placeholder ||
    FILE_EXTENTIONS[String(extensions)]?.label ||
    'Выберите файл lorem Выберите файл lorem Выберите файл lorem Выберите файл lorem Выберите файл lorem';

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
  const fileName = value && !Array.isArray(value) && value.name;
  const fileSize = value && !Array.isArray(value) && getFileSize(value.size);

  return (
    <div className="alt-file-picker">
      <button className="alt-button alt-file-picker-button" onClick={onFileUploadClick}>
        {icon()}
        {value ? (
          <div className="alt-file-picker-file">
            <div className="alt-file-picker-file__name">{fileName}</div>
            <div className="alt-file-picker-file__size">{fileSize}</div>
          </div>
        ) : (
          <div className="alt-file-picker-button__label">{label}</div>
        )}
      </button>
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
