import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { DefaultIcon } from './FilePickerIcons';
import { v4 as uuid } from 'uuid';
import './file-picker.scss';
import clsx from 'clsx';
import { FloatingBox } from '../../containers';
import { FileZone } from './FileZone';
import { FILE_EXTENTIONS, FilePickerVariant } from './FilePicker.constants';
import { FilePickerProps, FileUploadStatus, InnerFileItem } from './FilePicker.types';

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
      id: uuid()
    }));
  });

  const [progress, setProgress] = useState(100);
  const [status, setStatus] = useState<FileUploadStatus>(undefined);
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

  const onChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files || [];
    setActiveFileIds([]);

    if (selectedFiles.length === 0) {
      return;
    }

    const fileRequests = new XMLHttpRequest();

    const formData = new FormData();

    const promises = [];
    const newFilesIds: string[] = [];

    for (const file of selectedFiles) {
      const fileReaderItem = new FileReader();
      fileReaderItem.readAsDataURL(file);
      formData.append(name, file);

      promises.push(
        new Promise((resolve, reject) => {
          fileReaderItem.onload = (e) => {
            const newId = uuid();
            newFilesIds.push(newId);

            setFiles((old) => [
              ...old,
              {
                id: newId,
                filename: file.name,
                size: file.size,
                src: fileReaderItem.result,
                status: 'loading'
              }
            ]);

            resolve(e);
          };

          fileReaderItem.onerror = (e) => {
            reject(e);
          };
        })
      );
    }

    setStatus('loading');
    setProgress(0);

    await Promise.all(promises);

    setActiveFileIds(newFilesIds);

    fileRequests.open(method, url);

    fileRequests.upload.addEventListener('progress', (e) => {
      const progress = Math.round((e.loaded / e.total) * 100);
      setProgress(progress);
    });

    fileRequests.onerror = () => {
      setProgress(100);
      setStatus('failed');
    };

    fileRequests.onload = () => {
      setProgress(100);
      setStatus('loaded');
    };

    fileRequests.send(formData);
  };

  useEffect(() => {
    if (status === 'loaded') {
      setTimeout(() => {
        if (status === 'loaded') {
          setStatus(undefined);
          setActiveFileIds([]);
        }
      }, 1500);
    }
  }, [status]);

  console.log('>', activeFileIds);

  return (
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
              {status !== undefined && (
                <div className="alt-file-picker-file__size">{progress} %</div>
              )}
            </div>
          ) : Array.isArray(files) && files.length ? (
            <div className="alt-file-picker-file">
              <div className="alt-file-picker-file">Выбрано {files?.length} файлов</div>
              {status !== undefined && (
                <div className="alt-file-picker-file__size">{progress} %</div>
              )}
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
          <FileZone
            files={files}
            onUploadClick={uploadFiles}
            activeFileIds={activeFileIds}
            status={status}
            progress={progress}
          />
        </FloatingBox>
      )}
    </div>
  );
};
