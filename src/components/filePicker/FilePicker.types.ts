import { AnyObject } from '../../utils';

export type FileItem = AnyObject &
  Partial<{
    id: string;
    filename: string;
    file: File;
  }>;

export type FileStatus = 'selected' | 'loading' | 'loaded' | 'failed';

export interface FilePickerContextType {
  autoUpload?: boolean;
  url?: string;
  method?: HTMLFormElement['method'];
  name?: string;
  autoUploadFn?: (context: FilePickerUploadContext) => Promise<void>;
  removeFileFn?: (context: FilePickerRemoveContext) => Promise<void>;
}

export interface FileProps {
  file?: File;
  pickerItem: FileItem;
  onDeleteClick: (pickerItem: FileItem) => void;
}

export interface FilePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange'
  > {
  defaultValue?: FileItem[];
  autoUpload?: boolean;
  url?: string;
  method?: HTMLFormElement['method'];
  name?: string;
  multiple?: boolean;
  autoUploadFn?: (context: FilePickerUploadContext) => Promise<void>;
  removeFileFn?: (context: FilePickerRemoveContext) => Promise<void>;
}

export type FilePickerUploadContext = {
  url: string;
  method: HTMLFormElement['method'];
  name: string;
  file: File;
  pickerItem: FileItem;
  startUploading: () => void;
  complete: () => void;
  setProgress: (uploadedBytes: number) => void;
  fail: (errorMessage?: string) => void;
};

export type FilePickerRemoveContext = {
  url: string;
  name: string;
  pickerItem: FileItem;
  file?: File;
};
