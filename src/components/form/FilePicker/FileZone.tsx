import { Icon } from '../../icons';
import './file-zone.scss';
import { FileTile } from './FileTile';
import { FileItem, FileUploadStatus, InnerFileItem } from './FilePicker.types';
import { UploadNew } from './UploadNew';

interface FileZoneProps {
  files: InnerFileItem[];
  activeFileIds: string[];
  status: FileUploadStatus;
  progress: number;
  onUploadClick: () => void;
}

export const FileZone = ({
  files = [],
  onUploadClick,
  activeFileIds = [],
  status,
  progress
}: FileZoneProps) => {
  return (
    <div className="alt-file-zone">
      {files.length ? (
        <div className="alt-file-zone__files">
          {files.map((file, fileIndex) => (
            <FileTile
              key={fileIndex}
              file={file}
              errorMessage={
                status === 'failed' ? 'Возникла ошибка при загрузке документа' : undefined
              }
              onDelete={() => null}
              status={activeFileIds.indexOf(file.id) > -1 ? status : undefined}
              progress={progress}
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
