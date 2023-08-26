import { Surface } from '../../../types';
import { FilePickerVariant } from './FilePicker.constants';

export type FileItem = {
  id: string;
  filename: string;
  size?: number;
  status?: 'loading' | 'loaded' | 'failed';
  progress?: number;
  fileSrc?: string;
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
  value: FileItem[];
  uploadFileFunc: ((file: FileItem) => void) | ((files: FileItem[]) => void);
  removeFileFunc: (fileId: string) => void;
  variant?: FilePickerVariant;
  multiple?: boolean;
  extensions?: FileExtensions | string;
  surface?: Surface;
  className?: string;
  placeholder?: string;
}
