import { FileContent } from 'use-file-picker/types';

export type FileItem = {
  filename: string;
  id?: string;
  filepath?: string;
  file?: File;
};

export type FileUploadStatus = undefined | 'loading' | 'loaded' | 'failed';

export interface FileTileProps {
  file: FileItem;
  fileId: string;
}

export interface FilePickerContextType {
  deleteFile: (file: File) => void;
}

export interface FileProps {
  file: File;
  errorMessage?: string;
}

export interface FilePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (files: File[]) => void;
}
