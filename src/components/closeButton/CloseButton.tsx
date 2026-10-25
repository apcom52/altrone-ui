/* Import the hook by file, not the `application` barrel — the barrel pulls in
   the whole provider tree (…→ Notifications → CloseButton), so a barrel import
   here would close a module cycle. */
import { useLocalization } from 'components/application/useLocalization.tsx';
import { useIcons } from 'components/application/useIcons.tsx';
import { Button } from 'components/button';
import type { CloseButtonProps } from './CloseButton.types';

/**
 * A ready-made icon button for dismissing panels, modals, toasts and cards.
 *
 * A `Button` defaulting to the shared `dismiss` icon role (an X, overridable
 * via `icon` or `Application`'s `icons`) with
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
  icon,
  ...restProps
}: CloseButtonProps) => {
  const t = useLocalization();
  const icons = useIcons();

  return (
    <Button
      ref={ref}
      {...restProps}
      label={label ?? t('closeButton.ariaLabel')}
      icon={icon ?? icons.dismiss}
      showLabel={false}
      tooltip=""
    />
  );
};
