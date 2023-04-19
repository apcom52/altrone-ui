import { useLocalization } from '../../../hooks';
import React, { ChangeEventHandler, useCallback, useRef, useState } from 'react';
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
import clsx from 'clsx';
import { FloatingBox } from '../../containers';
import { FileZone } from './FileZone';

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

const FILE_EXTENTIONS: Record<
  FileExtensions | string,
  { icon: () => JSX.Element; accept: string[]; label: string }
> = {
  text: {
    icon: DocumentFileIcon,
    accept: ['.doc', '.docx', '.pdf', '.txt'],
    label: 'Выберите документ'
  },
  image: {
    icon: ImageFileIcon,
    accept: ['.jpg', '.jpeg', '.gif', '.png', '.svg', '.tiff', '.tif'],
    label: 'Выберите изображение'
  },
  audio: {
    icon: AudioFileIcon,
    accept: ['.mp3', '.wav', '.aac', '.m4a'],
    label: 'Выберите музыку'
  },
  video: {
    icon: VideoFileIcon,
    accept: ['.mp4', '.avi', '.mov'],
    label: 'Выберите видео'
  },
  table: {
    icon: TableFileIcon,
    accept: ['.xls', '.xlsx', '.ods'],
    label: 'Выберите таблицу'
  },
  presentation: {
    icon: PresentationFileIcon,
    accept: ['.ppt', '.pptx', '.odp', '.key'],
    label: 'Выберите презентацию'
  },
  code: {
    icon: CodeFileIcon,
    accept: [
      '.c',
      '.class',
      '.cpp',
      '.cs',
      '.h',
      '.java',
      '.php',
      '.py',
      '.sh',
      '.swift',
      '.vb',
      '.js',
      '.css',
      '.html'
    ],
    label: 'Выберите исходный код'
  },
  archive: {
    icon: ArchiveFileIcon,
    accept: ['.zip', '.rar', '.7z', '.tar.gz'],
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
  const [isFileZoneVisible, setIsFileZoneVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
      if (multiple) {
        onChange(Array.from(e.target.files || []));
      } else {
        onChange(e.target.files?.[0] || undefined);
      }
    },
    [multiple, onChange]
  );

  const fileName = value && !Array.isArray(value) && value.name;
  const fileSize = value && !Array.isArray(value) && getFileSize(value.size);

  const acceptFiles =
    extensions &&
    ['text', 'image', 'audio', 'video', 'table', 'presentation', 'code', 'archive'].indexOf(
      extensions
    ) > -1
      ? FILE_EXTENTIONS[extensions].accept.join(',')
      : extensions;

  console.log(value);

  return (
    <div className={clsx('alt-file-picker', className)}>
      <button
        ref={buttonRef}
        className="alt-button alt-file-picker-button"
        onClick={multiple ? () => setIsFileZoneVisible(!isFileZoneVisible) : onFileUploadClick}>
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
        name={name}
        ref={fileInputRef}
        className="alt-file-picker__input"
        tabIndex={-1}
        onChange={onFileChange}
        accept={acceptFiles}
        multiple={multiple}
      />
      {isFileZoneVisible && (
        <FloatingBox
          targetElement={buttonRef.current}
          onClose={() => setIsFileZoneVisible(false)}
          useRootContainer
          useParentWidth
          minWidth={300}>
          <FileZone onClick={onFileUploadClick} />
        </FloatingBox>
      )}
    </div>
  );
};
