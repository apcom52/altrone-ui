import { memo } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import { useLocalization } from '../application';
import { Button } from 'components/button';

export const CloseButton = memo(
  ({
    className,
    style,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { closeButton: closeButtonConfig = {} } = useConfiguration();

    const t = useLocalization();

    const cls = clsx(className, closeButtonConfig.className);

    const styles = {
      ...closeButtonConfig.style,
      ...style,
    };

    return (
      <Button
        variant="action"
        className={cls}
        style={styles}
        aria-label={t('closeButton.ariaLabel')}
        title={t('closeButton.ariaLabel')}
        label={t('closeButton.ariaLabel')}
        showLabel={false}
        icon={<X />}
        {...props}
      />
    );
  }
);
