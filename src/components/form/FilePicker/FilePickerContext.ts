import { createContext, useContext } from 'react';
import { getFileSrcFromResponse } from './FilePicker.utils';

interface FilePickerContext {
  url: string;
  method: string;
  name: string;
  onSuccessUpload: (response: unknown) => void;
  getFileNameFunc: (response: string) => string;
  maxFileSize?: number;
}

export const FilePickerContext = createContext<FilePickerContext>({
  url: '',
  method: '',
  name: '',
  onSuccessUpload: () => null,
  getFileNameFunc: getFileSrcFromResponse,
  maxFileSize: undefined
});

export const useFilePickerContext = () => useContext(FilePickerContext);
