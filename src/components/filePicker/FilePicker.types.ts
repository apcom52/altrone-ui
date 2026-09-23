import { ReactElement } from 'react';
import { AnyObject } from '../../utils';
import { Size } from '../../types';

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
  size: Size;
  disabled?: boolean;
  autoUploadFn?: (context: FilePickerUploadContext) => Promise<void>;
  removeFileFn?: (context: FilePickerRemoveContext) => Promise<void>;
  /** Resolved icon for a failed file (already merged with the shared `icons.error` default). */
  errorIcon: ReactElement;
  /** Icon for the retry button on a failed file. */
  retryIcon: ReactElement;
  /** Icon for the delete button on a file. */
  deleteIcon: ReactElement;
}

export interface FileProps {
  file?: File;
  pickerItem: InternalFileItem;
  onDeleteClick: (
    pickerItem: InternalFileItem,
    event: React.MouseEvent,
  ) => void;
}

export interface FilePickerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  ref?: React.Ref<HTMLDivElement>;
  defaultValue?: FileItem[];
  value?: FileItem[];
  onChange?: (
    fileList: FileItem[],
    event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent,
  ) => void;
  autoUpload?: boolean;
  url?: string;
  method?: HTMLFormElement['method'];
  name?: string;
  multiple?: boolean;
  accept?: string;
  placeholder?: string;
  size?: Size;
  disabled?: boolean;
  autoUploadFn?: (context: FilePickerUploadContext) => Promise<void>;
  removeFileFn?: (context: FilePickerRemoveContext) => Promise<void>;
  /** Icon for the upload prompt button. Defaults to an upload glyph. */
  uploadIcon?: ReactElement;
  /** Icon shown on a failed file. Defaults to the shared `icons.error`. */
  errorIcon?: ReactElement;
  /** Icon for the retry button on a failed file. Defaults to a rotate glyph. */
  retryIcon?: ReactElement;
  /** Icon for the delete button on a file. Defaults to a trash glyph. */
  deleteIcon?: ReactElement;
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
