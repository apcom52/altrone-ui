import './pagination.scss';
import React, { useCallback, useRef, useState } from 'react';
import { Button, ButtonVariant } from '../../button';
import { Icon } from '../../icons';
import { FloatingBox, Form, FormField } from '../../containers';
import { NumberInput } from '../../form';
import { Role } from '../../../types';

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
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

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

  const closeNavigation = useCallback(() => {
    setIsNavigationVisible(false);
  }, []);

  return (
    <div className="alt-pagination">
      <Button variant={ButtonVariant.transparent} disabled={isPrevDisabled} onClick={prev} isIcon>
        <Icon i="arrow_back_ios_new" />
      </Button>
      <button
        disabled={!useNavigateToPagePopup}
        onClick={() => setIsNavigationVisible(true)}
        className="alt-pagination__state"
        ref={navigationButtonRef}>
        {page} / {totalPages}
      </button>
      <Button variant={ButtonVariant.transparent} disabled={isNextDisabled} onClick={next} isIcon>
        <Icon i="arrow_forward_ios" />
      </Button>
      {isNavigationVisible && (
        <FloatingBox
          targetElement={navigationButtonRef.current}
          onClose={closeNavigation}
          useRootContainer>
          <Form>
            <FormField label="Перейти к странице">
              <NumberInput value={page} min={1} max={totalPages} onChange={onChange} />
            </FormField>
            <Button role={Role.primary} fluid onClick={closeNavigation}>
              Перейти
            </Button>
          </Form>
        </FloatingBox>
      )}
    </div>
  );
};
