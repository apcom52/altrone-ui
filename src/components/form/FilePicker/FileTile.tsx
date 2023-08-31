import './file-tile.scss';
import { FileItem, FileUploadStatus } from './FilePicker.types';
import { Icon } from '../../icons';
import { FileIcon } from './FileIcon';
import { FILE_EXTENTIONS } from './FilePicker.constants';
import { ReactNode, useMemo } from 'react';
import { Progress } from '../../indicators';
import { Role, Size } from '../../../types';
import clsx from 'clsx';

interface FileTileProps {
  file: FileItem;
  onDelete: () => void;
  errorMessage?: string;
  progress: number;
  status: FileUploadStatus;
}

export const FileTile = ({ file, errorMessage, progress, status }: FileTileProps) => {
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

  return (
    <div
      className={clsx('alt-file-tile', {
        'alt-file-tile--error': status === 'failed'
      })}
      title={errorMessage ? `${errorMessage} ${file.filename}` : file.filename}>
      <div className="alt-file-tile__icon">{fileIcon as ReactNode}</div>
      <div className="alt-file-tile__title">{errorMessage || file.filename}</div>
      <button className="alt-file-tile__action alt-file-tile__close">
        <Icon i="close" />
      </button>
      {status === 'failed' && (
        <button className="alt-file-tile__action alt-file-tile__repeat">
          <Icon i="refresh" />
        </button>
      )}
      {status !== undefined && (
        <div className="alt-file-tile__progress">
          <Progress value={progress} size={Size.small} role={statusRole} />
        </div>
      )}
    </div>
  );
};
