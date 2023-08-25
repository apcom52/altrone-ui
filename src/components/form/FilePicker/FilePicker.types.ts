import { Surface } from '../../../types';
import { FilePickerVariant } from './FilePicker.constants';

export type FileItem = {
  id: string;
  filename: string;
  size?: number;
  status?: 'loading' | 'loaded' | 'failed';
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

export type FilePickerFileIcon = (count: number) => JSX.Element;

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
