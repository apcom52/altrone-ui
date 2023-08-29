import { FileIcon } from './FileIcon';

interface UploadNewProps {
  onClick: () => void;
}

export const UploadNew = ({ onClick }: UploadNewProps) => {
  return (
    <button className="alt-file-tile alt-file-tile--upload" onClick={onClick}>
      <div className="alt-file-tile__icon">
        <FileIcon icon="upload" />
      </div>
      <div className="alt-file-tile__title">Загрузить файл</div>
    </button>
  );
};
