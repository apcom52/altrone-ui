import './file-tile.scss';
import { getFileSize } from './FilePicker.utils';
import { FilePickerFileIcon } from './FilePicker';

interface FileTileProps {
  file: File;
  icon: FilePickerFileIcon;
}

export const FileTile = ({ file, icon }: FileTileProps) => {
  return (
    <div className="alt-file-tile">
      <div className="alt-file-tile__icon">{icon(0)}</div>
      <div className="alt-file-tile__content">
        <div className="alt-file-tile__fileName">{file.name}</div>
        <div className="alt-file-tile__fileSize">{getFileSize(file.size)}</div>
      </div>
    </div>
  );
};
