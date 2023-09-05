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

export const FilePicker = ({
  defaultValue = [],
  variant = FilePickerVariant.default,
  className,
  url,
  method,
  name,
  extensions,
  maxFiles = 10,
  surface,
  onSuccess,
  placeholder = 'Выберите файл'
}: FilePickerProps) => {
  const [files, setFiles] = useState<InnerFileItem[]>(() => {
    return defaultValue.map((fileItem) => ({
      ...fileItem,
      filepath: fileItem.src,
      id: uuid()
    }));
  });

  console.log('> files', files);

  const [activeFileIds, setActiveFileIds] = useState<string[]>([]);

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
      onSuccessUpload: onSuccess
    };
  }, [url, method, name, onSuccess]);

  const onChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files || [];
    setActiveFileIds([]);

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

  const onDeleteFile = useCallback(
    async (filePath: string) => {
      console.log('delete', filePath);

      const response = await fetch(url, {
        method: 'delete',
        body: JSON.stringify({
          [name]: filePath
        })
      });

      try {
        return await response.json();
      } catch {
        return await response.text();
      }
    },
    [url, name]
  );

  return (
    <FilePickerContext.Provider value={filePickerContext}>
      <div className={clsx('alt-file-picker', className)}>
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
        {fileZoneVisible && fileButtonRef.current && (
          <FloatingBox
            placement="bottom"
            targetElement={fileButtonRef.current}
            onClose={() => setFileZoneVisible(false)}
            preventClose={(e: MouseEvent) =>
              (e.target as HTMLElement).getAttribute('type') === 'file'
            }
            useRootContainer
            useParentWidth>
            <FileZone files={files} onUploadClick={uploadFiles} onDeleteClick={onDeleteFile} />
          </FloatingBox>
        )}
      </div>
    </FilePickerContext.Provider>
  );
};
