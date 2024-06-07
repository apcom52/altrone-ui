import { memo, useEffect, useState } from 'react';
import { Icon } from '../icon';
import s from './pagination.module.scss';
import clsx from 'clsx';
import { Popover } from '../popover';
import { Flex } from '../flex';
import { NumberInput } from '../numberInput';
import { Button } from '../button';
import { PaginationProps } from './Pagination.types.ts';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';

export const Pagination = memo<PaginationProps>(
  ({ currentPage, totalPages, setPage, className, style, ...restProps }) => {
    const { pagination: paginationConfig = {} } = useConfiguration();

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
      const vp = Number(virtualPage || 1);

      setPage(vp >= 1 && vp <= totalPages ? vp : 1);
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
          title="Navigate to page"
          placement="top"
          showCloseButton
          content={({ closePopup }) => (
            <Flex gap="medium" align="end" style={{ maxWidth: '150px' }}>
              <NumberInput
                value={virtualPage}
                onChange={setVirtualPage}
                min={1}
                max={totalPages}
              />
              <Button
                role="primary"
                label="Navigate"
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
              {currentPage} of {totalPages}
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
