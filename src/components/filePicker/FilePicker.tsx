import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button } from '../button';
import {
  FileItem,
  FilePickerContextType,
  FilePickerProps,
  InternalFileItem,
} from './FilePicker.types.ts';
import s from './filePicker.module.scss';
import { File } from './inner';
import { Flex } from 'components/flex';
import { deleteFileRequest } from './FilePicker.utils.ts';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';
import { FilePickerContext } from './FilePicker.context.ts';
import { useLocalization } from '../application/useLocalization.tsx';
import { GlobalUtils } from 'utils';
import { Upload } from 'lucide-react';

export const FilePicker = memo<FilePickerProps>(
  ({
    ref,
    accept,
    defaultValue = [],
    value,
    onChange,
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
    ...restProps
  }) => {
    const t = useLocalization();
    const { filePicker: filePickerConfig = {} } = useConfiguration();

    const [internalFileList, setInternalFileList] = useState<
      InternalFileItem[]
    >(() =>
      defaultValue.map((item) => ({
        ...item,
        id: item.id ?? GlobalUtils.uuid(),
      })),
    );

    const isControlled = value !== undefined;

    const fileList = useMemo<InternalFileItem[]>(() => {
      if (isControlled) {
        return (value as FileItem[]).map((item) => ({
          ...item,
          id: item.id ?? GlobalUtils.uuid(),
        })) as InternalFileItem[];
      }
      return internalFileList;
    }, [isControlled, value, internalFileList]);

    // Tracks the current resolved list so callbacks don't need fileList in their deps
    const fileListRef = useRef<InternalFileItem[]>(fileList);
    useEffect(() => {
      fileListRef.current = fileList;
    }, [fileList]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const chooseFiles = useCallback(() => {
      fileInputRef.current?.click();
    }, []);

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

    const onChangeFileInput = useCallback(
      async (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length === 0) return;

        if (multiple) {
          const newItems: InternalFileItem[] = selectedFiles.map((file) => ({
            id: GlobalUtils.uuid(),
            file,
          }));
          const newList = [...fileListRef.current, ...newItems];
          if (!isControlled) setInternalFileList(newList);
          onChange?.(newList, e);
        } else {
          // Async side effect runs before state update, outside of any setState call
          const currentList = fileListRef.current;
          if (currentList.length && autoUpload) {
            const deleteCtx = {
              url: String(url),
              name: String(name),
              pickerItem: currentList[0],
            };
            if (removeFileFn) {
              await removeFileFn(deleteCtx);
            } else {
              await deleteFileRequest(deleteCtx);
            }
          }
          const newList: InternalFileItem[] = [
            { id: GlobalUtils.uuid(), file: selectedFiles[0] },
          ];
          if (!isControlled) setInternalFileList(newList);
          onChange?.(newList, e);
        }
      },
      [multiple, autoUpload, url, name, removeFileFn, onChange, isControlled],
    );

    const deleteFile = useCallback(
      (item: InternalFileItem, event: React.MouseEvent) => {
        const newList = fileListRef.current.filter((f) => f.id !== item.id);
        if (!isControlled) setInternalFileList(newList);
        onChange?.(newList, event);
      },
      [isControlled, onChange],
    );

    const cls = clsx(s.FilePicker, className, filePickerConfig.className);
    const styles = {
      ...filePickerConfig.style,
      ...style,
    };

    return (
      <FilePickerContext.Provider value={filePickerContext}>
        <Flex
          direction="horizontal"
          gap="m"
          align="center"
          wrap
          {...restProps}
          ref={ref}
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
            <div className={s.EmptyLabel}>{t('filePicker.noFiles')}</div>
          ) : null}
          {fileList.map((item) => (
            <File
              key={item.id}
              file={item.file}
              pickerItem={item}
              onDeleteClick={deleteFile}
            />
          ))}
          <Button
            icon={<Upload />}
            label={placeholder || t('filePicker.placeholder')}
            onClick={chooseFiles}
          />
        </Flex>
      </FilePickerContext.Provider>
    );
  },
);
