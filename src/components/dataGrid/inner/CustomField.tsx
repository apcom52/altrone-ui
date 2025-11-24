import { memo } from 'react';
import { DataGridFieldProps } from '../DataGrid.types';
import { Skeleton } from 'components/skeleton';
import s from './field.module.scss';

export const CustomField = memo<DataGridFieldProps>((props) => {
  if (props.type !== 'custom') {
    return null;
  }

  const { value, mode, renderReadMode, renderLoadingMode, renderEditMode } =
    props;

  if (mode === 'loading') {
    return renderLoadingMode ? (
      renderLoadingMode(value)
    ) : (
      <Skeleton width="100%" height="32px" radius="16px" />
    );
  }

  if (mode === 'read') {
    return renderReadMode ? (
      renderReadMode(value)
    ) : (
      <div className={s.InputText}>{String(value)}</div>
    );
  }

  return renderEditMode ? renderEditMode(value) : null;
});
