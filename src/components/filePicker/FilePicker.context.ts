import { createContext, useContext } from 'react';
import { FilePickerContextType } from './FilePicker.types.ts';

export const FilePickerContext = createContext<FilePickerContextType>({
  autoUpload: true,
  url: '',
  method: '',
  name: '',
  autoUploadFn: async () => new Promise<void>((_) => {}),
  removeFileFn: async () => new Promise<void>((_) => {}),
});

export const useFilePickerContext = () => useContext(FilePickerContext);
