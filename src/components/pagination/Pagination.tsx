import { memo, useMemo } from 'react';
import s from './pagination.module.scss';
import clsx from 'clsx';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PaginationProps } from './Pagination.types.ts';
import { useConfiguration } from 'components/configuration';
import { useLocalization } from '../application';
import { Button } from 'components/button/index.ts';
import { Flex } from 'components/flex/Flex.tsx';

type PageItem = number | '...';

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
    totalPages,
    onChange,
    showEdgeButtons = true,
    siblings = 1,
    className,
    style,
    ...restProps
  }) => {
    const { pagination: paginationConfig = {} } = useConfiguration();
    const t = useLocalization();

    const pageItems = useMemo(
      () => buildPageItems(currentPage, totalPages, siblings),
      [currentPage, totalPages, siblings],
    );

    const cls = clsx(s.Pagination, className, paginationConfig.className);
    const styles = { ...paginationConfig.style, ...style };

    return (
      <Flex
        gap="xs"
        align="center"
        ref={ref}
        role="navigation"
        aria-label={t('pagination.navigation')}
        className={cls}
        style={{ width: 'fit-content', ...styles }}
        {...restProps}
      >
        {showEdgeButtons && (
          <Button
            icon={<ChevronFirst />}
            disabled={currentPage <= 1}
            label={t('pagination.firstPage')}
            onClick={(e) => onChange(1, e)}
            showLabel={false}
          />
        )}

        <Button
          icon={<ChevronLeft />}
          disabled={currentPage <= 1}
          label={t('pagination.previous')}
          onClick={(e) => onChange(currentPage - 1, e)}
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
              selected={item === currentPage}
              disabled={item === currentPage}
              onClick={(e) => onChange(item, e)}
              aria-label={t('pagination.page', { vars: { page: item } })}
              aria-current={item === currentPage ? 'page' : undefined}
            />
          ),
        )}

        <Button
          icon={<ChevronRight />}
          disabled={currentPage >= totalPages}
          label={t('pagination.next')}
          onClick={(e) => onChange(currentPage + 1, e)}
          showLabel={false}
        />

        {showEdgeButtons && (
          <Button
            icon={<ChevronLast />}
            disabled={currentPage >= totalPages}
            label={t('pagination.lastPage')}
            onClick={(e) => onChange(totalPages, e)}
            showLabel={false}
          />
        )}
      </Flex>
    );
  },
);
