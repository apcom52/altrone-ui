import { TextInputProps } from '../textInput/TextInput.types.ts';

export type FileItem = {
  filename: string;
  src?: string | ArrayBuffer | Array<string> | null;
};

export type FileUploadStatus = undefined | 'loading' | 'loaded' | 'failed';

export interface InnerFileItem extends FileItem {
  id?: string;
  filepath?: string;
  file?: File;
}

export interface FileTileProps {
  file: InnerFileItem;
  fileId: string;
}

export interface FilePickerContextType {
  url: string;
  method: string;
  name: string;
  onSuccessUpload: (response: unknown) => void;
  getFileNameFunc: (response: string) => string;
  onDeleteFile: () => void;
  maxFileSize?: number;
}

export interface FilePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue'> {
  url: string;
  name: string;
  method: HTMLFormElement['method'];
  onSuccessUpload: (response: unknown) => void;
  onDeleteFile: (response: unknown) => void;
  defaultValue?: Pick<FileItem, 'filename' | 'src'>[];
  maxFiles?: number;
  getFileNameFunc?: (response: string) => string;
  maxFileSize?: number;
}
