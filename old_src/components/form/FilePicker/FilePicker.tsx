import {
  ChangeEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { DefaultIcon } from './FilePickerIcons';
import { v4 as uuid } from 'uuid';
import './file-picker.scss';
import clsx from 'clsx';
import { Popover } from '../../containers';
import { FileZone } from './FileZone';
import { FILE_EXTENTIONS, FilePickerVariant } from './FilePicker.constants';
import { FilePickerProps, FilePickerRef, InnerFileItem } from './FilePicker.types';
import { FilePickerContext } from './FilePickerContext';
import { getFileSrcFromResponse } from './FilePicker.utils';
import { Surface } from '../../../types';
import { useLocalization } from '../../../hooks';

/**
 * This component is used to upload files to server
 * @constructor
 */
export const FilePicker = forwardRef<FilePickerRef, FilePickerProps>(
  (
    {
      defaultValue = [],
      variant = FilePickerVariant.default,
      className,
      url,
      method = 'GET',
      name,
      extensions,
      maxFiles = 1,
      surface = Surface.glass,
      onSuccess,
      placeholder,
      getFileNameFunc = getFileSrcFromResponse,
      maxFileSize = undefined
    },
    ref
  ) => {
    const t = useLocalization();

    const [files, setFiles] = useState<InnerFileItem[]>(() => {
      return defaultValue.map((fileItem) => ({
        ...fileItem,
        filepath: String(fileItem.src)
      }));
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const icon = FILE_EXTENTIONS[String(extensions)]?.smallIcon || DefaultIcon;

    const acceptFiles =
      extensions &&
      ['text', 'image', 'audio', 'video', 'table', 'presentation', 'code', 'archive'].indexOf(
        extensions
      ) > -1
        ? FILE_EXTENTIONS[extensions].accept.join(',')
        : extensions;

    const uploadFiles = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const filePickerContext = useMemo(() => {
      return {
        url,
        method,
        name,
        onSuccessUpload: onSuccess,
        getFileNameFunc: getFileNameFunc,
        maxFileSize
      };
    }, [url, method, name, onSuccess, maxFileSize]);

    const onChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files || [];

      if (selectedFiles.length === 0) {
        return;
      }

      for (const file of selectedFiles) {
        const fileReaderItem = new FileReader();
        fileReaderItem.readAsDataURL(file);

        fileReaderItem.onload = () => {
          const newId = uuid();

          setFiles((old) => [
            ...old,
            {
              id: newId,
              filename: file.name,
              src: fileReaderItem.result,
              file
            }
          ]);
        };
      }
    };

    const onDeleteFile = useCallback((_: string, fileIndex: number) => {
      setFiles((old) => old.filter((_, itemIndex) => itemIndex !== fileIndex));
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        files: files,
        fileInputElement: fileInputRef.current
      }),
      [files, fileInputRef.current]
    );

    return (
      <FilePickerContext.Provider value={filePickerContext}>
        <div
          className={clsx('alt-file-picker', className, {
            'alt-file-picker--variant-block': variant === FilePickerVariant.block
          })}>
          <input
            type="file"
            ref={fileInputRef}
            className="alt-file-picker__input"
            tabIndex={-1}
            accept={acceptFiles}
            onChange={onChangeFileInput}
            multiple={maxFiles > 1}
          />
          {variant === FilePickerVariant.default && (
            <Popover
              placement="bottom"
              content={
                <FileZone
                  files={files}
                  onUploadClick={uploadFiles}
                  onDeleteClick={onDeleteFile}
                  disableUploading={files.length >= maxFiles}
                />
              }
              surface={surface}>
              <button type="button" className="alt-button alt-file-picker-button">
                <span className="alt-file-picker-button__icon">
                  {icon(String(extensions), files?.length || 0, files?.[0])}
                </span>
                {files.length === 1 ? (
                  <div className="alt-file-picker-file">
                    <div className="alt-file-picker-file__name">{files?.[0]?.filename}</div>
                  </div>
                ) : Array.isArray(files) && files.length ? (
                  <div className="alt-file-picker-file">
                    <div className="alt-file-picker-file">
                      {t('form.filePicker.selectedFiles', {
                        plural: true,
                        value: files?.length,
                        vars: { count: files?.length }
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="alt-file-picker-button__label">
                    {placeholder || t('form.filePicker.placeholder')}
                  </div>
                )}
              </button>
            </Popover>
          )}
          {variant === FilePickerVariant.block && (
            <FileZone
              files={files}
              onUploadClick={uploadFiles}
              onDeleteClick={onDeleteFile}
              disableUploading={files.length >= maxFiles}
            />
          )}
        </div>
      </FilePickerContext.Provider>
    );
  }
);

FilePicker.displayName = 'FilePicker';
