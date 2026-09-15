import { memo, useMemo, useState } from 'react';
import s from './pagination.module.scss';
import clsx from 'clsx';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PaginationProps } from './Pagination.types.ts';
import { useLocalization } from '../application';
import { Button } from 'components/button/index.ts';
import { Flex } from 'components/flex/Flex.tsx';

type PageItem = number | '...';

/**
 * Page-number window: always the first and last page, up to `siblings` pages
 * on each side of `current`, and an ellipsis wherever a gap is skipped.
 */
function buildPageItems(
  current: number,
  total: number,
  siblings: number,
): PageItem[] {
  if (total <= 1) return [1];

  const rangeStart = Math.max(1, current - siblings);
  const rangeEnd = Math.min(total, current + siblings);

  const items: PageItem[] = [];

  if (rangeStart > 1) {
    items.push(1);
    if (rangeStart > 2) items.push('...');
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    items.push(i);
  }

  if (rangeEnd < total) {
    if (rangeEnd < total - 1) items.push('...');
    items.push(total);
  }

  return items;
}

export const Pagination = memo<PaginationProps>(
  ({
    ref,
    currentPage,
    defaultPage = 1,
    totalPages,
    onChange,
    showEdgeButtons = true,
    siblings = 1,
    className,
    style,
    ...restProps
  }) => {
    const t = useLocalization();

    const isControlled = currentPage !== undefined;
    const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage);
    const page = isControlled ? currentPage : uncontrolledPage;

    const handleChange = (
      next: number,
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      if (!isControlled) setUncontrolledPage(next);
      onChange?.(next, event);
    };

    if (
      import.meta.env.DEV &&
      isControlled &&
      totalPages >= 1 &&
      (page < 1 || page > totalPages)
    ) {
      console.warn(
        `[Pagination] currentPage (${page}) is outside 1..${totalPages}. It's a controlled prop — clamp it in your onChange handler.`,
      );
    }

    const pageItems = useMemo(
      () => buildPageItems(page, totalPages, siblings),
      [page, totalPages, siblings],
    );

    const isFirst = page <= 1;
    const isLast = page >= totalPages;

    return (
      <Flex
        ref={ref}
        tagName="nav"
        gap="xs"
        align="center"
        aria-label={t('pagination.navigation')}
        className={clsx(s.Pagination, className)}
        style={style}
        {...restProps}
      >
        {showEdgeButtons && (
          <Button
            icon={<ChevronFirst />}
            disabled={isFirst}
            label={t('pagination.firstPage')}
            onClick={(e) => handleChange(1, e)}
            showLabel={false}
          />
        )}

        <Button
          icon={<ChevronLeft />}
          disabled={isFirst}
          label={t('pagination.previous')}
          onClick={(e) => handleChange(page - 1, e)}
          showLabel={false}
        />

        {pageItems.map((item, index) =>
          item === '...' ? (
            <span key={`ellipsis-${index}`} className={s.Ellipsis} aria-hidden>
              …
            </span>
          ) : (
            <Button
              key={item}
              label={String(item)}
              variant="text"
              selected={item === page}
              onClick={(e) => handleChange(item, e)}
              aria-label={t('pagination.page', { vars: { page: item } })}
              aria-current={item === page ? 'page' : undefined}
            />
          ),
        )}

        <Button
          icon={<ChevronRight />}
          disabled={isLast}
          label={t('pagination.next')}
          onClick={(e) => handleChange(page + 1, e)}
          showLabel={false}
        />

        {showEdgeButtons && (
          <Button
            icon={<ChevronLast />}
            disabled={isLast}
            label={t('pagination.lastPage')}
            onClick={(e) => handleChange(totalPages, e)}
            showLabel={false}
          />
        )}
      </Flex>
    );
  },
);
