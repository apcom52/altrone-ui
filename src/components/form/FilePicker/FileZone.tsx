import { Icon } from '../../icons';
import './file-zone.scss';
import { FileTile } from './FileTile';
import { FilePickerFileIcon } from './FilePicker.types';
import { FileDeleteFuncArgs } from './FilePicker.utils';

interface FileZoneProps {
  icon: FilePickerFileIcon;
  files: File[];
  onClick: () => void;
  uploadUrl?: string;
  onChange: (files: File[]) => void;
  onDelete?: (props: FileDeleteFuncArgs) => void;
}

export const FileZone = ({
  files = [],
  icon,
  uploadUrl,
  onClick,
  onChange,
  onDelete
}: FileZoneProps) => {
  const onDeleteClick = (fileIndex: number) => {
    if (uploadUrl) {
      onDelete?.({ filename: files[fileIndex].name, url: uploadUrl });
    }
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
