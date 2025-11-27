import { memo, useEffect, useState } from 'react';
import s from './pagination.module.scss';
import clsx from 'clsx';
import { Popover } from '../popover';
import { Flex } from '../flex';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { NumberInput } from '../numberInput';
import { Button } from '../button';
import { PaginationProps } from './Pagination.types.ts';
import { useConfiguration } from 'components/configuration';
import { useLocalization } from '../application';

export const Pagination = memo<PaginationProps>(
  ({ currentPage, totalPages, setPage, className, style, ...restProps }) => {
    const { pagination: paginationConfig = {} } = useConfiguration();
    const t = useLocalization();

    const [virtualPage, setVirtualPage] = useState<number | undefined>(
      currentPage
    );

    useEffect(() => {
      setVirtualPage(currentPage);
    }, [currentPage]);

    useEffect(() => {
      // Если currentPage или totalPages меняются, нужно проверить валидность currentPage
      if (
        typeof currentPage === 'number' &&
        typeof totalPages === 'number' &&
        (currentPage < 1 || currentPage > totalPages)
      ) {
        setPage(1);
      }
    }, [currentPage, totalPages, setPage]);

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
        <Button
          size="s"
          onClick={onPrevPageClick}
          disabled={currentPage <= 1}
          icon={<ArrowLeft />}
          label={'Previous page'}
          showLabel={false}
        />
        <Popover
          title={t('pagination.title')}
          placement="bottom"
          showCloseButton
          overlap
          content={({ closePopup }) => (
            <Flex direction="vertical" gap="m" align="center">
              <NumberInput
                value={virtualPage}
                min={1}
                onChange={setVirtualPage}
                aria-label={t('pagination.title')}
              />
              <Button
                variant="submit"
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
        <Button
          size="s"
          onClick={onNextPageClick}
          disabled={currentPage >= totalPages}
          icon={<ArrowRight />}
          label={'Next page'}
          showLabel={false}
        />
      </div>
    );
  }
);
