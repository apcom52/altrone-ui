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
  const defaultHref = String(value);
  const defaultText = String(value);

  const href =
    columnConfig.type === 'link'
      ? columnConfig.options?.hrefTransformer?.(value, item)
      : defaultHref;
  const text =
    columnConfig.type === 'link'
      ? columnConfig.options?.textTransformer?.(value, item)
      : defaultText;

  return (
    <Text
      size={4}
      weight="medium"
      className={s.Link}
      href={href ? String(href) : undefined}
    >
      {String(text)}
    </Text>
  );
};
