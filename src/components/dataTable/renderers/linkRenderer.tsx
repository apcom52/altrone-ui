import { CellRenderer } from '../DataTable.types';
import s from './styles.module.scss';
import { Text } from '../../text';
import { Skeleton } from 'components/skeleton';

export const LinkRenderer = <T extends object>({
  value,
  item,
  columnConfig,
  table,
}: CellRenderer<T>) => {
  const mode = table.options.meta?.mode;

  if (mode === 'loading') {
    return (
      <div className={s.Link}>
        <Skeleton width="100%" height="20px" radius="10px" />
      </div>
    );
  }
  const raw = value == null ? '' : String(value);
  const options =
    columnConfig.type === 'link' ? columnConfig.options : undefined;

  const href = options?.hrefTransformer?.(value, item) ?? raw;
  const text = options?.textTransformer?.(value, item) ?? raw;

  return href ? (
    <Text size={4} weight="medium" className={s.Link} href={String(href)}>
      {String(text)}
    </Text>
  ) : (
    <Text size={4} weight="medium" className={s.Link}>
      {String(text)}
    </Text>
  );
};
