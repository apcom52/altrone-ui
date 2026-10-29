import { createContext, createElement, useContext } from 'react';
import { CircleAlert, RotateCw, Trash2 } from 'lucide-react';
import { FilePickerContextType } from './FilePicker.types.ts';

export const FilePickerContext = createContext<FilePickerContextType>({
  autoUpload: true,
  url: '',
  method: '',
  name: '',
  size: 'm',
  autoUploadFn: async () => new Promise<void>((_) => {}),
  removeFileFn: async () => new Promise<void>((_) => {}),
  errorIcon: createElement(CircleAlert),
  retryIcon: createElement(RotateCw),
  deleteIcon: createElement(Trash2),
});

export const useFilePickerContext = () => useContext(FilePickerContext);
