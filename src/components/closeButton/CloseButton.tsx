import { memo } from 'react';
import { Icon } from 'components/icon';
import s from './closeButton.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';

export const CloseButton = memo(
  ({
    className,
    style,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { closeButton: closeButtonConfig = {} } = useConfiguration();

    const cls = clsx(s.CloseButton, className, closeButtonConfig.className);

    const styles = {
      ...closeButtonConfig.style,
      ...style,
    };

    return (
      <button type="button" className={cls} style={styles} {...props}>
        <Icon i="close" />
      </button>
    );
  },
);
