import type { ButtonHTMLAttributes, Ref } from 'react';
import type { ButtonProps } from 'components/button/Button.types';

export interface CloseButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  ref?: Ref<HTMLButtonElement>;
  /** Control tier, forwarded to the underlying `Button`. Defaults to `'m'`. */
  size?: ButtonProps['size'];
  /** Render onto a custom child element instead of a `<button>`. */
  asChild?: boolean;
  /**
   * Overrides the accessible name. Defaults to the localized
   * `closeButton.ariaLabel` string.
   */
  label?: string;
}
