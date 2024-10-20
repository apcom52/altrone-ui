import { memo, useEffect, useState } from 'react';
import { Icon } from '../icon';
import s from './pagination.module.scss';
import clsx from 'clsx';
import { Popover } from '../popover';
import { Flex } from '../flex';
import { NumberInput } from '../numberInput';
import { Button } from '../button';
import { PaginationProps } from './Pagination.types.ts';
import { useConfiguration } from 'components/configuration';
import { useLocalization } from '../application/useLocalization.tsx';

export const Pagination = memo<PaginationProps>(
  ({ currentPage, totalPages, setPage, className, style, ...restProps }) => {
    const { pagination: paginationConfig = {} } = useConfiguration();
    const t = useLocalization();

    const [virtualPage, setVirtualPage] = useState<number | undefined>(
      currentPage,
    );

    useEffect(() => {
      setVirtualPage(currentPage);
    }, [currentPage]);

    const cls = clsx(s.Pagination, className, paginationConfig.className);

    const styles = {
      ...paginationConfig.style,
      ...style,
    };

    const onNextPageClick = () => {
      if (currentPage < totalPages) {
        setPage(currentPage + 1);
      }
    };

    const onPrevPageClick = () => {
      if (currentPage > 1) {
        setPage(currentPage - 1);
      }
    };

    const navigateToPage = () => {
      let vp = Number(virtualPage || 1);

      if (vp < 1) {
        vp = 1;
      } else if (vp > totalPages) {
        vp = totalPages;
      }

      setVirtualPage(vp);
      setPage(vp);
    };

    return (
      <div
        role="navigation"
        aria-label="Pagination Navigation"
        className={cls}
        style={styles}
        {...restProps}
      >
        <button
          type="button"
          className={s.NavButton}
          onClick={onPrevPageClick}
          disabled={currentPage <= 1}
        >
          <Icon i="arrow_back_ios_new" />
        </button>
        <Popover
          enabled={totalPages > 1}
          title={t('pagination.title')}
          placement="top"
          showCloseButton
          content={({ closePopup }) => (
            <Flex direction="vertical" gap="m" align="end">
              <NumberInput
                value={virtualPage}
                min={undefined}
                onChange={setVirtualPage}
                aria-label={t('pagination.title')}
              />
              <Button
                severity="primary"
                label={t('pagination.action')}
                onClick={() => {
                  navigateToPage();
                  closePopup();
                }}
              />
            </Flex>
          )}
          trigger="click"
        >
          {({ opened }) => (
            <button
              type="button"
              disabled={totalPages <= 1}
              className={clsx(s.CurrentPage, {
                [s.Opened]: opened,
              })}
            >
              {t('pagination.progress', {
                vars: {
                  current: currentPage,
                  total: totalPages,
                },
              })}
            </button>
          )}
        </Popover>
        <button
          type="button"
          className={s.NavButton}
          onClick={onNextPageClick}
          disabled={currentPage >= totalPages}
        >
          <Icon i="arrow_forward_ios" />
        </button>
      </div>
    );
  },
);
