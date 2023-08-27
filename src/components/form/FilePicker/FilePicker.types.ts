import { Surface } from '../../../types';
import { FilePickerVariant } from './FilePicker.constants';

export type UploadedFile = {
  file: File;
  id: string;
};

export type FileItem = {
  filename: string;
  size?: number;
  status?: 'loading' | 'loaded' | 'failed';
  progress?: number;
  src?: string;
};

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
  onSuccess: () => void;
  defaultValue?: Pick<FileItem, 'filename' | 'src'>[];
  variant?: FilePickerVariant;
  extensions?: FileExtensions | string;
  surface?: Surface;
  className?: string;
  placeholder?: string;
  maxFiles?: number;
}
