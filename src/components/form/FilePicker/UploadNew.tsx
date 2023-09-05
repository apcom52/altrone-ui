import { FileIcon } from './FileIcon';

interface UploadNewProps {
  onClick: () => void;
  disabled: boolean;
}

export const UploadNew = ({ onClick, disabled }: UploadNewProps) => {
  return (
    <button className="alt-file-tile alt-file-tile--upload" onClick={onClick} disabled={disabled}>
      <div className="alt-file-tile__icon">
        <FileIcon icon="upload" />
      </div>
      <div className="alt-file-tile__title">Загрузить файл</div>
    </button>
  );
};
