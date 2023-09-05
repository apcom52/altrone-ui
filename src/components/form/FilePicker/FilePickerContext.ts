import { createContext, useContext } from 'react';
import { getFileSrcFromResponse } from './FilePicker.utils';

interface FilePickerContext {
  url: string;
  method: string;
  name: string;
  onSuccessUpload: (response: unknown) => void;
  getFileNameFunc: (response: string) => string;
}

export const FilePickerContext = createContext<FilePickerContext>({
  url: '',
  method: '',
  name: '',
  onSuccessUpload: () => null,
  getFileNameFunc: getFileSrcFromResponse
});

export const useFilePickerContext = () => useContext(FilePickerContext);
