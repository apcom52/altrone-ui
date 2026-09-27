import { X } from 'lucide-react';
/* Import the hook by file, not the `application` barrel — the barrel pulls in
   the whole provider tree (…→ Notifications → CloseButton), so a barrel import
   here would close a module cycle. */
import { useLocalization } from 'components/application/useLocalization.tsx';
import { Button } from 'components/button';
import type { CloseButtonProps } from './CloseButton.types';

/**
 * A ready-made icon button for dismissing panels, modals, toasts and cards.
 *
 * A `Button` defaulting to the `X` icon (overridable via `icon`) with
 * `showLabel={false}`, its auto-tooltip off (the glyph is self-evident), and
 * a localized accessible name pulled from `closeButton.ariaLabel`.
 * `showLabel`/`tooltip` are applied after the spread, so they can't be
 * overridden; everything else — `icon`, `size`, `onClick`, `disabled`,
 * `className`, `ref`, `asChild`, native button attributes — passes straight
 * through to `Button`.
 */
export const CloseButton = ({
  ref,
  label,
  icon = <X />,
  ...restProps
}: CloseButtonProps) => {
  const t = useLocalization();

  return (
    <Button
      ref={ref}
      {...restProps}
      label={label ?? t('closeButton.ariaLabel')}
      icon={icon}
      showLabel={false}
      tooltip=""
    />
  );
};
