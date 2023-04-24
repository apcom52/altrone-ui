import './file-tile.scss';
import { getFileSize } from './FilePicker.utils';
import { FilePickerFileIcon } from './FilePicker';
import { Icon } from '../../icons';
import { Button, ButtonVariant } from '../../button';

interface FileTileProps {
  file: File;
  icon: FilePickerFileIcon;
  onDelete: () => void;
}

export const FileTile = ({ file, icon, onDelete }: FileTileProps) => {
  return (
    <div className="alt-file-tile">
      <div className="alt-file-tile__icon">{icon(0)}</div>
      <div className="alt-file-tile__content">
        <div className="alt-file-tile__fileName">{file.name}</div>
        <div className="alt-file-tile__fileSize">{getFileSize(file.size)}</div>
      </div>
      <Button
        variant={ButtonVariant.transparent}
        isIcon
        className="alt-file-tile__remove"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}>
        <Icon i="close" />
      </Button>
    </div>
  );
};
