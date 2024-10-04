import { memo } from 'react';
import { Icon } from 'components/icon';
import s from './closeButton.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import { useLocalization } from '../application';

export const CloseButton = memo(
  ({
    className,
    style,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { closeButton: closeButtonConfig = {} } = useConfiguration();

    const t = useLocalization();

    const cls = clsx(s.CloseButton, className, closeButtonConfig.className);

    const styles = {
      ...closeButtonConfig.style,
      ...style,
    };

    return (
      <button
        type="button"
        className={cls}
        style={styles}
        aria-label={t('closeButton.ariaLabel')}
        {...props}
      >
        <Icon i="close" />
      </button>
    );
  },
);
