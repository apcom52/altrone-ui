import { memo } from 'react';
import { DataGridFieldProps } from '../DataGrid.types';
import { Skeleton } from 'components/skeleton';
import { ColorPicker } from 'components/colorPicker';

export const ColorField = memo<DataGridFieldProps>((props) => {
  if (props.type !== 'color') {
    return null;
  }

  const { value, mode, onChange, colorPresets, allowPalette } = props;

  if (mode === 'loading') {
    return <Skeleton width="100%" height="32px" radius="16px" />;
  }

  return (
    <ColorPicker
      value={String(value)}
      readOnly={mode !== 'edit'}
      onChange={(value) => onChange(value)}
      colorPresets={colorPresets}
      allowPalette={allowPalette}
    />
  );
});
