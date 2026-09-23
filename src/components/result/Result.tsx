import type { ReactNode } from 'react';
import clsx from 'clsx';
import { SearchX } from 'lucide-react';
import { useLocalization } from 'components/application/useLocalization.tsx';
import { useIcons } from 'components/application/useIcons.tsx';
import { Text } from 'components/text/Text.tsx';
import type { ResultProps, ResultStatus } from './Result.types';
import s from './result.module.scss';

const TITLE_SIZE = { mini: 2, s: 3, m: 4, l: 5, xl: 6 } as const;
const DESCRIPTION_SIZE = { mini: 1, s: 2, m: 3, l: 4, xl: 5 } as const;

const STATUS_CLASS: Record<ResultStatus, string | undefined> = {
  empty: undefined,
  info: s.StatusInfo,
  success: s.StatusSuccess,
  warning: s.StatusWarning,
  error: s.StatusError,
};

/**
 * A centered feedback block — an icon in a tinted media chip, a heading, an
 * optional muted line and an optional row of actions. `status` covers the
 * common cases (empty data, info, success, warning, error); pass `icon` to
 * override the glyph. An `error` renders `role="alert"`, everything else
 * `role="status"`.
 */
export const Result = ({
  ref,
  status = 'empty',
  icon,
  title,
  actions,
  size = 'm',
  children,
  className,
  style,
  ...restProps
}: ResultProps) => {
  const t = useLocalization();
  const icons = useIcons();
  const statusIcon: Record<ResultStatus, ReactNode> = {
    empty: <SearchX />,
    info: icons.info,
    success: icons.success,
    warning: icons.warning,
    error: icons.danger,
  };

  const hasTitle = title !== undefined;
  /* A lone `children` line acts as the heading. */
  const fallbackTitle =
    children ?? (status === 'empty' ? t('result.empty') : undefined);
  const titleNode = hasTitle ? title : fallbackTitle;
  const descriptionNode = hasTitle ? children : undefined;

  const cls = clsx(
    s.Result,
    STATUS_CLASS[status],
    {
      [s.Mini]: size === 'mini',
      [s.Small]: size === 's',
      [s.Large]: size === 'l',
      [s.XLarge]: size === 'xl',
    },
    className,
  );

  const resolvedActions =
    typeof actions === 'function' ? actions(undefined) : actions;

  return (
    <div
      ref={ref}
      className={cls}
      role={status === 'error' ? 'alert' : 'status'}
      style={style}
      {...restProps}
    >
      <div className={s.Media} aria-hidden="true">
        {icon ?? statusIcon[status]}
      </div>
      {titleNode != null || descriptionNode != null ? (
        <div className={s.Content}>
          {titleNode != null ? (
            <Text
              className={s.Title}
              size={TITLE_SIZE[size]}
              weight="medium"
              block
            >
              {titleNode}
            </Text>
          ) : null}
          {descriptionNode != null ? (
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
      ) : null}
      {resolvedActions ? (
        <div className={s.Actions}>{resolvedActions}</div>
      ) : null}
    </div>
  );
};
