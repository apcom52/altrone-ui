import { Icon } from '../../icons';
import './file-zone.scss';
import { FileTile } from './FileTile';
import { FilePickerFileIcon } from './FilePicker';

interface FileZoneProps {
  icon: FilePickerFileIcon;
  files: File[];
  onClick: () => void;
  onChange: (files: File[]) => void;
}

export const FileZone = ({ files = [], icon, onClick, onChange }: FileZoneProps) => {
  const onDeleteClick = (fileIndex: number) => {
    onChange(files.filter((_, index) => index !== fileIndex));
  };

  return (
    <div className="alt-file-zone" onClick={onClick}>
      {files.length ? (
        <div className="alt-file-zone__files">
          {files.map((file, fileIndex) => (
            <FileTile
              key={fileIndex}
              file={file}
              icon={icon}
              onDelete={() => {
                onDeleteClick(fileIndex);
              }}
            />
          ))}
        </div>
      ) : null}
      <div className="alt-file-zone__icon">
        <Icon i="upload" />
      </div>
      <div className="alt-file-zone__label">
        Нажмите, чтобы выбрать или перетащите файлы в область загрузки
      </div>
    </div>
  );
};
