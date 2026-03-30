import { AnyObject } from '../../utils';

export type FileItem = AnyObject &
  Partial<{
    id: string;
    filename: string;
    file: File;
  }>;

// Internal type used within FilePicker state — id is always present after normalization
export type InternalFileItem = Omit<FileItem, 'id'> & { id: string };

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
  pickerItem: InternalFileItem;
  onDeleteClick: (pickerItem: InternalFileItem, event: React.MouseEvent) => void;
}

export interface FilePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  ref?: React.Ref<HTMLDivElement>;
  defaultValue?: FileItem[];
  value?: FileItem[];
  onChange?: (
    fileList: FileItem[],
    event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent
  ) => void;
  autoUpload?: boolean;
  url?: string;
  method?: HTMLFormElement['method'];
  name?: string;
  multiple?: boolean;
  accept?: string;
  placeholder?: string;
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
