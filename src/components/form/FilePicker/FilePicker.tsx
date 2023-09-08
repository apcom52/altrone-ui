import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { DefaultIcon } from './FilePickerIcons';
import { v4 as uuid } from 'uuid';
import './file-picker.scss';
import clsx from 'clsx';
import { FloatingBox } from '../../containers';
import { FileZone } from './FileZone';
import { FILE_EXTENTIONS, FilePickerVariant } from './FilePicker.constants';
import { FilePickerProps, InnerFileItem } from './FilePicker.types';
import { FilePickerContext } from './FilePickerContext';
import { getFileSrcFromResponse } from './FilePicker.utils';
import { Surface } from '../../../types';

/**
 * This component is used to upload files to server
 * @constructor
 */
export const FilePicker = ({
  defaultValue = [],
  variant = FilePickerVariant.default,
  className,
  url,
  method,
  name,
  extensions,
  maxFiles = 1,
  surface = Surface.glass,
  onSuccess,
  placeholder = 'Выберите файл',
  getFileNameFunc = getFileSrcFromResponse
}: FilePickerProps) => {
  const [files, setFiles] = useState<InnerFileItem[]>(() => {
    return defaultValue.map((fileItem) => ({
      ...fileItem,
      filepath: String(fileItem.src)
    }));
  });

  const [fileZoneVisible, setFileZoneVisible] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileButtonRef = useRef<HTMLButtonElement>(null);

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
      getFileNameFunc: getFileNameFunc
    };
  }, [url, method, name, onSuccess]);

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
          <button
            ref={fileButtonRef}
            className="alt-button alt-file-picker-button"
            onClick={() => setFileZoneVisible(true)}>
            <span className="alt-file-picker-button__icon">
              {icon(String(extensions), files?.length || 0, files?.[0])}
            </span>
            {files.length === 1 ? (
              <div className="alt-file-picker-file">
                <div className="alt-file-picker-file__name">{files?.[0]?.filename}</div>
              </div>
            ) : Array.isArray(files) && files.length ? (
              <div className="alt-file-picker-file">
                <div className="alt-file-picker-file">Выбрано {files?.length} файлов</div>
              </div>
            ) : (
              <div className="alt-file-picker-button__label">{placeholder}</div>
            )}
          </button>
        )}
        {fileZoneVisible && variant === FilePickerVariant.default && fileButtonRef.current && (
          <FloatingBox
            placement="bottom"
            surface={surface}
            targetElement={fileButtonRef.current}
            onClose={() => setFileZoneVisible(false)}
            preventClose={(e: MouseEvent) =>
              (e.target as HTMLElement).getAttribute('type') === 'file'
            }
            useRootContainer
            useParentWidth>
            <FileZone
              files={files}
              onUploadClick={uploadFiles}
              onDeleteClick={onDeleteFile}
              disableUploading={files.length >= maxFiles}
            />
          </FloatingBox>
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
};
