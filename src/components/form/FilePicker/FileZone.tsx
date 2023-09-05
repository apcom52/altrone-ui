import { Icon } from '../../icons';
import './file-zone.scss';
import { FileTile } from './FileTile';
import { InnerFileItem } from './FilePicker.types';
import { UploadNew } from './UploadNew';

interface FileZoneProps {
  files: InnerFileItem[];
  onUploadClick: () => void;
  onDeleteClick: (filePath: string, fileIndex: number) => void;
}

export const FileZone = ({ files = [], onUploadClick, onDeleteClick }: FileZoneProps) => {
  return (
    <div className="alt-file-zone">
      {files.length ? (
        <div className="alt-file-zone__files">
          {files.map((file, fileIndex) => (
            <FileTile
              key={String(file.src)}
              fileIndex={fileIndex}
              file={file}
              onDelete={onDeleteClick}
            />
          ))}
          <UploadNew onClick={onUploadClick} />
        </div>
      ) : null}
      {files.length === 0 && (
        <div>
          <div className="alt-file-zone__icon">
            <Icon i="upload" />
          </div>
          <div className="alt-file-zone__label">Нажмите, чтобы выбрать файл для загрузки</div>
        </div>
      )}
    </div>
  );
};
