import './pagination.scss';
import React, { useCallback, useRef } from 'react';
import { Icon } from '../../typography';
import { Form, FormField, Popover } from '../../containers';
import { NumberInput, Button, ButtonVariant } from '../../form';
import { Role } from '../../../types';
import { useLocalization } from '../../../hooks';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  useNavigateToPagePopup?: boolean;
}

/**
 * This component indicates the current page of the list
 * @param page current page
 * @param totalPages total amount of pages
 * @param onChange callback fires when user changes the current page
 * @param useNavigateToPagePopup when this prop is activated pagination component has the ability to move to the specific page
 * @constructor
 */
export const Pagination = ({
  page = 1,
  totalPages = 1,
  onChange,
  useNavigateToPagePopup = true
}: PaginationProps) => {
  const t = useLocalization();

  const navigationButtonRef = useRef<HTMLButtonElement>(null);

  const isPrevDisabled = page === 1;
  const isNextDisabled = page === totalPages;

  const prev = useCallback(() => {
    if (page > 0) {
      onChange(page - 1);
    }
  }, [page, onChange]);

  const next = useCallback(() => {
    if (page < totalPages) {
      onChange(page + 1);
    }
  }, [page, totalPages, onChange]);

  return (
    <div className="alt-pagination">
      <Button variant={ButtonVariant.transparent} disabled={isPrevDisabled} onClick={prev} isIcon>
        <Icon i="arrow_back_ios_new" />
      </Button>
      <Popover
        placement="top"
        className="alt-pagination__navigation"
        content={({ closePopup }) => {
          return (
            <Form>
              <FormField label={t('indicators.pagination.moveToPage')}>
                <NumberInput value={page} min={1} max={totalPages} onChange={onChange} />
              </FormField>
              <Button role={Role.primary} fluid onClick={closePopup}>
                {t('indicators.pagination.apply')}
              </Button>
            </Form>
          );
        }}>
        <button
          disabled={!useNavigateToPagePopup}
          className="alt-pagination__state"
          type="button"
          ref={navigationButtonRef}>
          <span data-testid="alt-test-pagination-currentPage">{page}</span> / {totalPages}
        </button>
      </Popover>
      <Button variant={ButtonVariant.transparent} disabled={isNextDisabled} onClick={next} isIcon>
        <Icon i="arrow_forward_ios" />
      </Button>
    </div>
  );
};