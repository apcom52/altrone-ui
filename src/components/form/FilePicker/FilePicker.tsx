import { ChangeEventHandler, useCallback, useRef, useState } from 'react';
import { Surface } from '../../../types';
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
import {
  defaultFileDeleteFunc,
  defaultFileUploadFunc,
  FileDeleteFuncArgs,
  FileUploadFuncArgs,
  getFileSize
} from './FilePicker.utils';
import './file-picker.scss';
import clsx from 'clsx';
import { FloatingBox } from '../../containers';
import { FileZone } from './FileZone';
import { Loading } from '../../indicators';

export enum FilePickerVariant {
  default = 'default',
  block = 'block'
}

export type FilePickerFileIcon = (count: number) => JSX.Element;

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
  useAutoUpload?: boolean;
  uploadUrl?: string;
  autoUploadFunc?: (props: FileUploadFuncArgs) => void;
  deleteFileFunc?: (props: FileDeleteFuncArgs) => void;
}

const FILE_EXTENTIONS: Record<
  FileExtensions | string,
  { icon: FilePickerFileIcon; accept: string[]; label: string }
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
  variant = FilePickerVariant.default,
  value,
  onChange,
  className,
  extensions,
  name,
  multiple = false,
  surface,
  placeholder,
  useAutoUpload = false,
  uploadUrl = '',
  autoUploadFunc = defaultFileUploadFunc,
  deleteFileFunc = defaultFileDeleteFunc
}: FilePickerProps) => {
  const [isFileZoneVisible, setIsFileZoneVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadedFilesRef = useRef<File[]>([]);

  const icon = FILE_EXTENTIONS[String(extensions)]?.icon || DefaultIcon;
  const label = placeholder || FILE_EXTENTIONS[String(extensions)]?.label || 'Выберите файл';

  const onFileUploadClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const onFileChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (multiple) {
        setIsFileZoneVisible(true);
        onChange(Array.from(e.target.files || []));
      } else {
        onChange(e.target.files?.[0] || undefined);
      }

      if (useAutoUpload) {
        for (const file of e.target.files || []) {
          if (!uploadedFilesRef.current.find((item) => item === file)) {
            autoUploadFunc({
              file,
              url: uploadUrl,
              onError: (e) => console.log('> onError', file.name, e),
              onProgress: (loaded) => console.log('> onProgress', file.name, loaded),
              onDone: (e) => console.log('> onDone', file.name)
            });
          }
        }
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

  return (
    <div className={clsx('alt-file-picker', className)}>
      {variant === FilePickerVariant.default && (
        <button
          ref={buttonRef}
          className="alt-button alt-file-picker-button"
          onClick={multiple ? () => setIsFileZoneVisible(!isFileZoneVisible) : onFileUploadClick}>
          <span className="alt-file-picker-button__icon">{icon(value?.length || 0)}</span>
          {!Array.isArray(value) && value ? (
            <div className="alt-file-picker-file">
              <div className="alt-file-picker-file__name">{fileName}</div>
              <div className="alt-file-picker-file__size">{fileSize}</div>
            </div>
          ) : Array.isArray(value) && value ? (
            <div className="alt-file-picker-file">Выбрано {value.length} файлов</div>
          ) : (
            <div className="alt-file-picker-button__label">{label}</div>
          )}
          {isLoading && (
            <div className="alt-file-picker-button__loading">
              <Loading />
            </div>
          )}
        </button>
      )}
      {variant === FilePickerVariant.block && (
        <FileZone
          files={Array.isArray(value) ? value : value ? [value] : []}
          icon={icon}
          onClick={onFileUploadClick}
          onChange={onChange}
          onDelete={deleteFileFunc}
        />
      )}
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
      {variant === FilePickerVariant.default && isFileZoneVisible && (
        <FloatingBox
          targetElement={buttonRef.current}
          onClose={() => setIsFileZoneVisible(false)}
          useRootContainer
          useParentWidth
          minWidth={300}
          surface={surface}>
          <FileZone
            files={Array.isArray(value) ? value : []}
            icon={icon}
            onClick={onFileUploadClick}
            onChange={onChange}
          />
        </FloatingBox>
      )}
    </div>
  );
};
