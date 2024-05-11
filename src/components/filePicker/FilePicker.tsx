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
import { FileItem, FilePickerProps } from './FilePicker.types.ts';
import s from './filePicker.module.scss';
import { File } from './inner/File.tsx';
import { FilePickerContextType } from './FilePicker.types.ts';
import { Flex } from '../flex';
import { Align, Direction, Gap } from '../../types';
import { Icon } from '../icon';
import { v4 as uuid } from 'uuid';
import { deleteFileRequest } from './FilePicker.utils.ts';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import clsx from 'clsx';

const FilePickerContext = createContext<FilePickerContextType>({
  autoUpload: true,
  url: '',
  method: '',
  name: '',
  autoUploadFn: async () => new Promise<void>((_) => {}),
  removeFileFn: async () => new Promise<void>((_) => {}),
});

export const useFilePickerContext = () => useContext(FilePickerContext);

export const FilePicker = memo<FilePickerProps>(
  ({
    accept,
    defaultValue = [],
    multiple = false,
    url,
    autoUpload = true,
    method,
    name,
    autoUploadFn,
    removeFileFn,
    placeholder,
    className,
    style,
  }) => {
    const { filePicker: filePickerConfig = {} } = useConfiguration();

    const [fileList, setFileList] = useState<FileItem[]>(() => {
      if (defaultValue) {
        return defaultValue.map((item) => ({
          ...item,
          id: uuid(),
        }));
      }

      return [];
    });

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const chooseFiles = () => {
      fileInputRef.current?.click();
    };

    const filePickerContext = useMemo<FilePickerContextType>(() => {
      return {
        autoUpload,
        url,
        name,
        method,
        autoUploadFn,
        removeFileFn,
      };
    }, [autoUpload, autoUploadFn, removeFileFn, method, url, name]);

    const onChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files || [];

      if (selectedFiles.length === 0) {
        return;
      }

      for (const file of selectedFiles) {
        if (multiple) {
          setFileList((old) => [
            ...old,
            {
              id: uuid(),
              file,
            },
          ]);
        } else {
          setFileList((old) => {
            if (old.length && autoUpload) {
              const deleteContext = {
                url: String(url),
                name: String(url),
                pickerItem: old[0],
              };

              if (removeFileFn) {
                void removeFileFn(deleteContext);
              } else {
                void deleteFileRequest(deleteContext);
              }
            }

            return [
              {
                id: uuid(),
                file,
              },
            ];
          });
        }
      }
    };

    const deleteFile = useCallback((item: FileItem) => {
      setFileList((old) => old.filter((file) => file.id !== item.id));
    }, []);

    const cls = clsx(s.FilePicker, className, filePickerConfig.className);
    const styles = {
      ...filePickerConfig.style,
      ...style,
    };

    return (
      <FilePickerContext.Provider value={filePickerContext}>
        <Flex
          direction={Direction.horizontal}
          gap={Gap.medium}
          align={Align.center}
          wrap
          className={cls}
          style={styles}
        >
          <input
            type="file"
            name={name}
            accept={accept}
            ref={fileInputRef}
            className={s.Input}
            multiple={multiple}
            onChange={onChangeFileInput}
          />
          {fileList.length === 0 ? (
            <div className={s.EmptyLabel}>No files chosen</div>
          ) : null}
          {fileList.map?.((item) => {
            return (
              <File
                key={`${item.id}`}
                file={item.file}
                pickerItem={item}
                onDeleteClick={deleteFile}
              />
            );
          })}
          <Button
            leftIcon={<Icon i="file_upload" />}
            label={placeholder || 'Choose file'}
            onClick={chooseFiles}
          />
        </Flex>
      </FilePickerContext.Provider>
    );
  },
);
