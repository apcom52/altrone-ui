import { memo } from 'react';
import s from './empty.module.scss';
import clsx from 'clsx';
import { EmptyProps } from './Empty.types';
import { useLocalization } from 'components/application';
import { Text } from 'components/text/Text.tsx';
import { SearchX } from 'lucide-react';

const TITLE_SIZE = { mini: 2, s: 3, m: 4, l: 5, xl: 6 } as const;
const DESCRIPTION_SIZE = { mini: 1, s: 2, m: 3, l: 4, xl: 5 } as const;

export const Empty = memo<EmptyProps>(
  ({
    ref,
    icon,
    title,
    description,
    actions,
    size = 'm',
    children,
    className,
    style,
    ...restProps
  }) => {
    const t = useLocalization();

    const body = description ?? children;
    const hasTitle = title !== undefined;
    /* Back-compat: a lone `children`/`description` line acts as the heading. */
    const titleNode = hasTitle ? title : (body ?? t('empty.noData'));
    const descriptionNode = hasTitle ? body : undefined;

    const cls = clsx(
      s.Empty,
      {
        [s.Mini]: size === 'mini',
        [s.Small]: size === 's',
        [s.Large]: size === 'l',
        [s.XLarge]: size === 'xl',
      },
      className,
    );

    return (
      <div ref={ref} className={cls} role="status" style={style} {...restProps}>
        <div className={s.Media} aria-hidden="true">
          {icon ?? <SearchX />}
        </div>
        <div className={s.Content}>
          <Text className={s.Title} size={TITLE_SIZE[size]} weight="medium" block>
            {titleNode}
          </Text>
          {descriptionNode ? (
            <Text
              className={s.Description}
              size={DESCRIPTION_SIZE[size]}
              color="muted"
              block
            >
              {descriptionNode}
            </Text>
          ) : null}
        </div>
        {actions ? <div className={s.Actions}>{actions}</div> : null}
      </div>
    );
  },
);
