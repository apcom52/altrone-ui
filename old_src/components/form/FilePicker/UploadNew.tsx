import { FileIcon } from './FileIcon';
import { useLocalization } from '../../../hooks';

interface UploadNewProps {
  onClick: () => void;
  disabled: boolean;
}

export const UploadNew = ({ onClick, disabled }: UploadNewProps) => {
  const t = useLocalization();

  return (
    <button
      type="button"
      className="alt-file-tile alt-file-tile--upload"
      onClick={onClick}
      disabled={disabled}>
      <div className="alt-file-tile__icon">
        <FileIcon icon="upload" />
      </div>
      <div className="alt-file-tile__title">{t('form.filePicker.uploadNew')}</div>
    </button>
  );
};
