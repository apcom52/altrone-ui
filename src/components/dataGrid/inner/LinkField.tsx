import { memo } from 'react';
import { DataGridFieldProps } from '../DataGrid.types';
import { Skeleton } from 'components/skeleton';
import { Text } from 'components/text';
import s from './field.module.scss';

export const LinkField = memo<DataGridFieldProps>((props) => {
  if (props.type !== 'link') {
    return null;
  }

  const { value, mode, linkTransformer, linkText } = props;

  if (mode === 'loading') {
    return <Skeleton width="40%" height="32px" radius="16px" />;
  }

  const linkHrefValue =
    (typeof linkTransformer === 'function'
      ? linkTransformer(value)
      : linkTransformer) || String(value);

  const linkTextValue =
    (typeof linkText === 'function' ? linkText(value) : linkText) ||
    String(value);

  return (
    <div className={s.InputText}>
      <Text href={linkHrefValue}>{linkTextValue}</Text>
    </div>
  );
});
