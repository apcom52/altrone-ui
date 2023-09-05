import { createContext, useContext } from 'react';

interface FilePickerContext {
  url: string;
  method: string;
  name: string;
  onSuccessUpload: (response: unknown) => void;
}

export const FilePickerContext = createContext<FilePickerContext>({
  url: '',
  method: '',
  name: '',
  onSuccessUpload: () => null
});

export const useFilePickerContext = () => useContext(FilePickerContext);
