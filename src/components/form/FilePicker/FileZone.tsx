import { Icon } from '../../icons';
import './file-zone.scss';
import { FileTile } from './FileTile';
import { InnerFileItem } from './FilePicker.types';
import { UploadNew } from './UploadNew';

interface FileZoneProps {
  files: InnerFileItem[];
  onUploadClick: () => void;
  onDeleteClick: (filePath: string, fileIndex: number) => void;
  disableUploading: boolean;
}

export const FileZone = ({
  files = [],
  onUploadClick,
  onDeleteClick,
  disableUploading
}: FileZoneProps) => {
  return (
    <div className="alt-file-zone">
      <div className="alt-file-zone__files">
        {files.map((file, fileIndex) => (
          <FileTile
            key={String(file.src)}
            fileIndex={fileIndex}
            file={file}
            onDelete={onDeleteClick}
          />
        ))}
        <UploadNew onClick={onUploadClick} disabled={disableUploading} />
      </div>
    </div>
  );
};
