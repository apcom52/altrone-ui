import { Icon } from '../../icons';
import './file-zone.scss';
import { FileTile } from './FileTile';
import { FileItem } from './FilePicker.types';

interface FileZoneProps {
  files: FileItem[];
}

export const FileZone = ({ files = [] }: FileZoneProps) => {
  return (
    <div className="alt-file-zone">
      {files.length ? (
        <div className="alt-file-zone__files">
          {files.map((file, fileIndex) => (
            <FileTile
              key={fileIndex}
              file={file}
              errorMessage={fileIndex === 1 ? 'Возникла ошибка при загрузке документа' : undefined}
              onDelete={() => null}
            />
          ))}
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
