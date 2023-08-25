import { ChangeEventHandler, useCallback, useRef, useState } from 'react';
import { DefaultIcon } from './FilePickerIcons';
import { getFileSize } from './FilePicker.utils';
import './file-picker.scss';
import clsx from 'clsx';
import { FloatingBox } from '../../containers';
import { FileZone } from './FileZone';
import { Loading } from '../../indicators';
import { FILE_EXTENTIONS, FilePickerVariant } from './FilePicker.constants';
import { FilePickerProps } from './FilePicker.types';

export const FilePicker = ({
  value,
  uploadFileFunc,
  removeFileFunc,
  variant = FilePickerVariant.default,
  className,
  extensions,
  multiple = false,
  surface,
  placeholder
}: FilePickerProps) => {
  const [isFileZoneVisible, setIsFileZoneVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadedFilesRef = useRef<File[]>([]);

  const icon = FILE_EXTENTIONS[String(extensions)]?.icon || DefaultIcon;
  const label = placeholder || FILE_EXTENTIONS[String(extensions)]?.label || 'Выберите файл';

  const onFileUploadClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const onFileChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      if (multiple) {
        setIsFileZoneVisible(true);
        onChange(Array.from(e.target.files || []));
      } else {
        onChange(e.target.files?.[0] || undefined);
      }

      if (useAutoUpload) {
        for (const file of e.target.files || []) {
          if (!uploadedFilesRef.current.find((item) => item === file)) {
            autoUploadFunc({
              file,
              url: uploadUrl,
              onError: (e) => console.log('> onError', file.name, e),
              onProgress: (loaded) => console.log('> onProgress', file.name, loaded),
              onDone: (e) => console.log('> onDone', file.name)
            });
          }
        }
      }
    },
    [multiple, onChange]
  );

  const fileName = value && !Array.isArray(value) && value.name;
  const fileSize = value && !Array.isArray(value) && getFileSize(value.size);

  const acceptFiles =
    extensions &&
    ['text', 'image', 'audio', 'video', 'table', 'presentation', 'code', 'archive'].indexOf(
      extensions
    ) > -1
      ? FILE_EXTENTIONS[extensions].accept.join(',')
      : extensions;

  return (
    <div className={clsx('alt-file-picker', className)}>
      {variant === FilePickerVariant.default && (
        <button
          ref={buttonRef}
          className="alt-button alt-file-picker-button"
          onClick={multiple ? () => setIsFileZoneVisible(!isFileZoneVisible) : onFileUploadClick}>
          <span className="alt-file-picker-button__icon">{icon(value?.length || 0)}</span>
          {!Array.isArray(value) && value ? (
            <div className="alt-file-picker-file">
              <div className="alt-file-picker-file__name">{fileName}</div>
              <div className="alt-file-picker-file__size">{fileSize}</div>
            </div>
          ) : Array.isArray(value) && value ? (
            <div className="alt-file-picker-file">Выбрано {value.length} файлов</div>
          ) : (
            <div className="alt-file-picker-button__label">{label}</div>
          )}
          {isLoading && (
            <div className="alt-file-picker-button__loading">
              <Loading />
            </div>
          )}
        </button>
      )}
      {variant === FilePickerVariant.block && (
        <FileZone
          files={Array.isArray(value) ? value : value ? [value] : []}
          icon={icon}
          onClick={onFileUploadClick}
          onChange={onChange}
          onDelete={deleteFileFunc}
        />
      )}
      <input
        type="file"
        name={name}
        ref={fileInputRef}
        className="alt-file-picker__input"
        tabIndex={-1}
        onChange={onFileChange}
        accept={acceptFiles}
        multiple={multiple}
      />
      {variant === FilePickerVariant.default && isFileZoneVisible && (
        <FloatingBox
          targetElement={buttonRef.current}
          onClose={() => setIsFileZoneVisible(false)}
          useRootContainer
          useParentWidth
          minWidth={300}
          surface={surface}>
          <FileZone
            files={Array.isArray(value) ? value : []}
            icon={icon}
            onClick={onFileUploadClick}
            onChange={onChange}
          />
        </FloatingBox>
      )}
    </div>
  );
};
