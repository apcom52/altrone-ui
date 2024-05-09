import {
  ChangeEvent,
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button } from '../button';
import { FilePickerProps } from './FilePicker.types.ts';
import s from './filePicker.module.scss';
import { File } from './inner/File.tsx';
import { v4 as uuid } from 'uuid';
import { InnerFileItem, FilePickerContextType } from './FilePicker.types.ts';
import { Flex } from '../flex';
import { Align, Direction, Gap } from '../../types';
import { getFileSrcFromResponse } from '../../../old_src/components/form/FilePicker/FilePicker.utils.ts';
import { Icon } from '../icon';

const FilePickerContext = createContext<FilePickerContextType>({
  url: '',
  method: '',
  name: '',
  onSuccessUpload: () => null,
  onDeleteFile: () => null,
  getFileNameFunc: getFileSrcFromResponse,
  maxFileSize: undefined,
});

export const useFilePickerContext = () => useContext(FilePickerContext);

export const FilePicker = memo<FilePickerProps>(
  ({
    defaultValue,
    url,
    method,
    name,
    onSuccessUpload,
    getFileNameFunc,
    maxFileSize,
    multiple = false,
    maxFiles = 1,
    ...restProps
  }) => {
    const [files, setFiles] = useState<InnerFileItem[]>(() => {
      const defaultFiles = Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue];

      return defaultFiles
        .filter((item) => !!item)
        .map((item) => ({ ...item, id: uuid() }));
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadFiles = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const onDeleteFile = useCallback((_: string, fileIndex: number) => {
      setFiles((old) => old.filter((_, itemIndex) => itemIndex !== fileIndex));
    }, []);

    const filePickerContext = useMemo(() => {
      return {
        url,
        method,
        name,
        onSuccessUpload,
        onDeleteFile,
        getFileNameFunc,
        maxFileSize,
      };
    }, [
      url,
      method,
      name,
      onSuccessUpload,
      getFileNameFunc,
      maxFileSize,
      onDeleteFile,
    ]);

    const onChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files || [];

      if (selectedFiles.length === 0) {
        return;
      }

      for (const file of selectedFiles) {
        const newId = uuid();

        setFiles((old) => [
          ...old,
          {
            id: newId,
            filename: file.name,
            file,
          },
        ]);
      }
    };

    return (
      <FilePickerContext.Provider value={filePickerContext}>
        <Flex
          direction={Direction.horizontal}
          gap={Gap.medium}
          align={Align.center}
          wrap
          className={s.FilePicker}
        >
          <input
            className={s.Input}
            type="file"
            ref={fileInputRef}
            tabIndex={-1}
            {...restProps}
            onChange={onChangeFileInput}
            multiple={maxFiles > 1}
          />
          {files.length === 0 ? (
            <div className={s.EmptyLabel}>No files choosen</div>
          ) : null}
          {files.map((file, fileIndex) => (
            <File key={fileIndex} file={file} />
          ))}
          <Button
            leftIcon={<Icon i="file_upload" />}
            label="Choose file"
            onClick={uploadFiles}
          />
        </Flex>
      </FilePickerContext.Provider>
    );
  },
);
