import { memo } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { useLocalization } from '../application';
import { Button } from 'components/button';
import { CloseButtonProps } from './CloseButton.types';

export const CloseButton = memo(
  ({ className, style, label: _, ...props }: CloseButtonProps) => {
    const t = useLocalization();

    const cls = clsx(className);

    const styles = {
      ...style,
    };

    return (
      <Button
        className={cls}
        style={styles}
        label={t('closeButton.ariaLabel')}
        tooltip=""
        showLabel={false}
        icon={<X />}
        {...props}
      />
    );
  },
);
