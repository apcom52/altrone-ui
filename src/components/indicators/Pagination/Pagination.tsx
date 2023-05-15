import './pagination.scss';
import React, { useCallback } from 'react';
import { Button, ButtonVariant } from '../../button';
import { Icon } from '../../icons';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  useNavigateToPagePopup?: boolean;
}

export const Pagination = ({
  page = 1,
  totalPages = 1,
  onChange,
  useNavigateToPagePopup = true
}: PaginationProps) => {
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
      <button disabled={!useNavigateToPagePopup} className="alt-pagination__state">
        {page} / {totalPages}
      </button>
      <Button variant={ButtonVariant.transparent} disabled={isNextDisabled} onClick={next} isIcon>
        <Icon i="arrow_forward_ios" />
      </Button>
    </div>
  );
};
