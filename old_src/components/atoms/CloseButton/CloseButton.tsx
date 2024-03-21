import { CloseButtonType } from './CloseButton.types';
import { Icon } from '../../typography';
import { forwardRef } from 'react';
import clsx from 'clsx';
import './close-button.scss';

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonType>((props, ref) => {
  const { onClick, className } = props;

  return (
    <button
      ref={ref}
      type="button"
      className={clsx('alt-close-button', className)}
      onClick={onClick}>
      <Icon i="close" />
    </button>
  );
});
