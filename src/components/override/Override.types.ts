import type { HTMLAttributes, ReactNode, Ref } from 'react';
import type { Localization } from 'locales';
import type { Accent, IconSet, Language } from '../application';

export interface OverrideProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  /** Theme of this subtree. Inherits the surrounding `Application`/`Override` when omitted. */
  theme?: 'light' | 'dark';
  /** Accent color of this subtree. Inherits when omitted. */
  accent?: Accent;
  /** Language of this subtree. Inherits when omitted. */
  language?: Language;
  /** Labels merged over the inherited dictionary. */
  customLabels?: Partial<Localization>;
  /** Icon roles merged over the inherited ones — see `IconSet`. */
  icons?: Partial<IconSet>;
  children?: ReactNode;
}
