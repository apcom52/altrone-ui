import './file-tile.scss';
import { FileUploadStatus, InnerFileItem } from './FilePicker.types';
import { Icon } from '../../icons';
import { FileIcon } from './FileIcon';
import { FILE_EXTENTIONS } from './FilePicker.constants';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Progress } from '../../indicators';
import { Role, Size } from '../../../types';
import clsx from 'clsx';
import { useFilePickerContext } from './FilePickerContext';
import { useLocalization } from '../../../hooks';

interface FileTileProps {
  fileIndex: number;
  file: InnerFileItem;
  onDelete: (filePath: string, fileIndex: number) => void;
}

export const FileTile = ({ fileIndex, file, onDelete }: FileTileProps) => {
  const t = useLocalization();

  const { url, method, name, onSuccessUpload, getFileNameFunc } = useFilePickerContext();

  const [_file, setFile] = useState(file.file);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<FileUploadStatus>(undefined);
  const [filepath, setFilepath] = useState(file.filepath);

  const errorMessage = status === 'failed' ? t('form.filePicker.errorMessage') : '';

  const fileIcon = useMemo(() => {
    let extension = file.filename.toLowerCase().split('.').at(-1) || '';

    if (extension) {
      extension = '.' + extension;
    }

    const predefinedIcon = Object.keys(FILE_EXTENTIONS).find(
      (extName) => FILE_EXTENTIONS[extName].accept.indexOf(extension) > -1
    );

    if (predefinedIcon) {
      return FILE_EXTENTIONS[predefinedIcon].largeIcon(extension, 1, file);
    }

    return <FileIcon>{'.' + extension}</FileIcon>;
  }, [file.filename]);

  let statusRole = Role.primary;
  if (status === 'failed') {
    statusRole = Role.danger;
  } else if (status === 'loaded') {
    statusRole = Role.success;
  }

  const uploadFile = useCallback(
    (file: File) => {
      const request = new XMLHttpRequest();
      request.open(method, url);

      const formData = new FormData();
      formData.append(name, file);

      setStatus('loading');

      request.upload.addEventListener('progress', (e) => {
        const progress = Math.round((e.loaded / e.total) * 100);
        setProgress(progress);
      });

      request.onerror = () => {
        setProgress(100);
        setStatus('failed');
      };

      request.onload = (e: ProgressEvent<any>) => {
        setProgress(100);
        setFile(undefined);

        if (e.target?.status && e.target.status >= 200 && e.target.status < 300) {
          setStatus('loaded');
          onSuccessUpload(e.target.response);
          setFilepath(getFileNameFunc(e.target.response));

          setTimeout(() => {
            setProgress(0);
            setStatus(undefined);
          }, 1500);
        } else {
          setStatus('failed');
        }
      };

      request.send(formData);
    },
    [url, name, method, onSuccessUpload]
  );

  const deleteFile = useCallback(() => {
    onDelete(String(filepath), fileIndex);

    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        [name]: file.filepath
      })
    });
  }, [filepath, onDelete, fileIndex]);

  useEffect(() => {
    if (_file) {
      uploadFile(_file);
    }
  }, []);

  return (
    <div
      className={clsx('alt-file-tile', {
        'alt-file-tile--error': status === 'failed'
      })}
      title={errorMessage ? `${errorMessage} ${file.filename}` : file.filename}>
      <div className="alt-file-tile__icon">{fileIcon as ReactNode}</div>
      <div className="alt-file-tile__title" data-testid="alt-test-fileTile-title">
        {errorMessage || file.filename}
      </div>
      <button
        tabIndex={-1}
        className="alt-file-tile__action alt-file-tile__close"
        onClick={deleteFile}
        data-testid="alt-test-fileTile-delete"
        title={t('form.filePicker.deleteFile')}>
        <Icon i="close" />
      </button>
      {status === 'failed' && (
        <button
          className="alt-file-tile__action alt-file-tile__repeat"
          data-testid="alt-test-fileTile-reload"
          title={t('form.filePicker.reuploadFile')}
          onClick={file.file ? () => uploadFile(file.file as File) : undefined}>
          <Icon i="refresh" />
        </button>
      )}
      {status !== undefined && (
        <div className="alt-file-tile__progress" data-testid="alt-test-fileTile-progress">
          <Progress value={progress} size={Size.small} role={statusRole} />
        </div>
      )}
    </div>
  );
};
