import { ChangeEvent, ChangeEventHandler, useRef, useState } from 'react';
import { DefaultIcon } from './FilePickerIcons';
import { v4 as uuid } from 'uuid';
import './file-picker.scss';
import clsx from 'clsx';
import { FloatingBox } from '../../containers';
import { FileZone } from './FileZone';
import { FILE_EXTENTIONS, FilePickerVariant } from './FilePicker.constants';
import { FileItem, FilePickerProps, UploadedFile } from './FilePicker.types';
import { FileTile } from './FileTile';

type InnerFileItem = FileItem & { id: string };

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
  placeholder = 'Выберите файл'
}: FilePickerProps) => {
  const [files, setFiles] = useState<InnerFileItem[]>(() => {
    return defaultValue.map((fileItem) => ({
      ...fileItem,
      id: uuid()
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

  const onChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files || [];

    if (selectedFiles.length === 0) {
      return;
    }

    const fileRequests = new XMLHttpRequest();
    fileRequests.open(method, url);

    for (const file of selectedFiles) {
      const newFilesIds: string[] = [];
      const fileReaderItem = new FileReader();
      fileReaderItem.readAsDataURL(file);

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
      };
    }

    fileRequests.send();
  };

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
              {typeof files[0].progress === 'number' && (
                <div className="alt-file-picker-file__size">{files?.[0]?.progress} %</div>
              )}
            </div>
          ) : Array.isArray(files) && files.length ? (
            <div className="alt-file-picker-file">Выбрано {files?.length} файлов</div>
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
          <FileZone files={files} onUploadClick={uploadFiles} />
        </FloatingBox>
      )}
    </div>
  );

  // const [isFileZoneVisible, setIsFileZoneVisible] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const buttonRef = useRef<HTMLButtonElement>(null);
  //
  // const fileInputRef = useRef<HTMLInputElement>(null);
  // const uploadedFilesRef = useRef<File[]>([]);
  //
  // const icon = FILE_EXTENTIONS[String(extensions)]?.icon || DefaultIcon;
  // const label = placeholder || FILE_EXTENTIONS[String(extensions)]?.label || 'Выберите файл';
  //
  // const onFileUploadClick = useCallback(() => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // }, []);
  //
  // const onFileChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
  //   (e) => {
  //     if (multiple) {
  //       setIsFileZoneVisible(true);
  //       onChange(Array.from(e.target.files || []));
  //     } else {
  //       onChange(e.target.files?.[0] || undefined);
  //     }
  //
  //     // if (useAutoUpload) {
  //     //   for (const file of e.target.files || []) {
  //     //     if (!uploadedFilesRef.current.find((item) => item === file)) {
  //     //       autoUploadFunc({
  //     //         file,
  //     //         url: uploadUrl,
  //     //         onError: (e) => console.log('> onError', file.name, e),
  //     //         onProgress: (loaded) => console.log('> onProgress', file.name, loaded),
  //     //         onDone: (e) => console.log('> onDone', file.name)
  //     //       });
  //     //     }
  //     //   }
  //     // }
  //   },
  //   [multiple]
  // );
  //
  // const fileName = value && !Array.isArray(value) && value.name;
  // const fileSize = value && !Array.isArray(value) && getFileSize(value.size);
  //
  // const acceptFiles =
  //   extensions &&
  //   ['text', 'image', 'audio', 'video', 'table', 'presentation', 'code', 'archive'].indexOf(
  //     extensions
  //   ) > -1
  //     ? FILE_EXTENTIONS[extensions].accept.join(',')
  //     : extensions;
  //
  // return (
  //   <div className={clsx('alt-file-picker', className)}>
  //     {variant === FilePickerVariant.default && (
  //       <button
  //         ref={buttonRef}
  //         className="alt-button alt-file-picker-button"
  //         onClick={multiple ? () => setIsFileZoneVisible(!isFileZoneVisible) : onFileUploadClick}>
  //         <span className="alt-file-picker-button__icon">{icon(value?.length || 0)}</span>
  //         {!Array.isArray(value) && value ? (
  //           <div className="alt-file-picker-file">
  //             <div className="alt-file-picker-file__name">{fileName}</div>
  //             <div className="alt-file-picker-file__size">{fileSize}</div>
  //           </div>
  //         ) : Array.isArray(value) && value ? (
  //           <div className="alt-file-picker-file">Выбрано {value.length} файлов</div>
  //         ) : (
  //           <div className="alt-file-picker-button__label">{label}</div>
  //         )}
  //         {isLoading && (
  //           <div className="alt-file-picker-button__loading">
  //             <Loading />
  //           </div>
  //         )}
  //       </button>
  //     )}
  //     {variant === FilePickerVariant.block && (
  //       <FileZone
  //         files={Array.isArray(value) ? value : value ? [value] : []}
  //         icon={icon}
  //         onClick={onFileUploadClick}
  //         onChange={onChange}
  //       />
  //     )}
  //     <input
  //       type="file"
  //       name={name}
  //       ref={fileInputRef}
  //       className="alt-file-picker__input"
  //       tabIndex={-1}
  //       onChange={onFileChange}
  //       accept={acceptFiles}
  //       multiple={multiple}
  //     />
  //     {variant === FilePickerVariant.default && isFileZoneVisible && (
  //       <FloatingBox
  //         targetElement={buttonRef.current}
  //         onClose={() => setIsFileZoneVisible(false)}
  //         useRootContainer
  //         useParentWidth
  //         minWidth={300}
  //         surface={surface}>
  //         <FileZone
  //           files={Array.isArray(value) ? value : []}
  //           icon={icon}
  //           onClick={onFileUploadClick}
  //           onChange={onChange}
  //         />
  //       </FloatingBox>
  //     )}
  //   </div>
  // );
};
