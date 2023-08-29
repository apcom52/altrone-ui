import './file-tile.scss';
import { FileItem } from './FilePicker.types';
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
}

export const FileTile = ({ file, errorMessage }: FileTileProps) => {
  const fileIcon = useMemo(() => {
    let extension = file.filename.toLowerCase().split('.').at(-1) || '';

    if (extension) {
      extension = '.' + extension;
    }
    console.log('extension', extension);

    const predefinedIcon = Object.keys(FILE_EXTENTIONS).find(
      (extName) => FILE_EXTENTIONS[extName].accept.indexOf(extension) > -1
    );

    console.log('>', predefinedIcon);

    if (predefinedIcon) {
      return FILE_EXTENTIONS[predefinedIcon].largeIcon(extension, 1, file);
    }

    return <FileIcon>{'.' + extension}</FileIcon>;
  }, [file.filename]);

  return (
    <div
      className={clsx('alt-file-tile', {
        'alt-file-tile--error': !!errorMessage
      })}
      title={errorMessage ? `${errorMessage} ${file.filename}` : file.filename}>
      <div className="alt-file-tile__icon">{fileIcon as ReactNode}</div>
      <div className="alt-file-tile__title">{errorMessage || file.filename}</div>
      <button className="alt-file-tile__action alt-file-tile__close">
        <Icon i="close" />
      </button>
      {errorMessage && (
        <button className="alt-file-tile__action alt-file-tile__repeat">
          <Icon i="refresh" />
        </button>
      )}
      <div className="alt-file-tile__progress">
        <Progress value={40} size={Size.small} role={Role.primary} />
      </div>
    </div>
  );
};
