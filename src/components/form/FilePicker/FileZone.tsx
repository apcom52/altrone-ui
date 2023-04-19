import React from 'react';
import { Icon } from '../../icons';
import './file-zone.scss';

interface FileZoneProps {
  onClick: () => void;
}

export const FileZone = ({ onClick }: FileZoneProps) => {
  return (
    <div className="alt-file-zone" onClick={onClick}>
      <div className="alt-file-zone__icon">
        <Icon i="upload" />
      </div>
      <div className="alt-file-zone__label">
        Нажмите, чтобы выбрать или перетащите файлы в область загрузки
      </div>
    </div>
  );
};
