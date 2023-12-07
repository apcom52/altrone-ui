import { Surface } from '../../../types';
import { FilePickerVariant } from './FilePicker.constants';

export interface FileItem {
  filename: string;
  src?: string | ArrayBuffer | null;
}

export type FileUploadStatus = undefined | 'loading' | 'loaded' | 'failed';

export interface InnerFileItem extends FileItem {
  filepath?: string;
  file?: File;
}

export type FileExtensions =
  | 'text'
  | 'image'
  | 'audio'
  | 'video'
  | 'table'
  | 'presentation'
  | 'code'
  | 'archive';

export type FilePickerFileIcon = (
  extension: string,
  count: number,
  file: FileItem
) => React.ReactNode;

export type FileExtensionType = {
  smallIcon: FilePickerFileIcon;
  largeIcon: FilePickerFileIcon;
  accept: string[];
  label: string;
};

export interface FilePickerProps {
  url: string;
  name: string;
  method: HTMLFormElement['method'];
  onSuccess: (response: unknown) => void;
  onDelete: (response: unknown) => void;
  defaultValue?: Pick<FileItem, 'filename' | 'src'>[];
  variant?: FilePickerVariant;
  extensions?: FileExtensions | string;
  surface?: Surface;
  className?: string;
  placeholder?: string;
  maxFiles?: number;
  getFileNameFunc?: (response: string) => string;
  maxFileSize?: number;
}

export interface FilePickerRef {
  files: InnerFileItem[];
  fileInputElement: HTMLInputElement | null;
}
