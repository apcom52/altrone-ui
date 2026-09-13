import React from 'react';
import { Size } from 'types';

export type ResultStatus = 'empty' | 'info' | 'success' | 'warning' | 'error';

export interface ResultProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  ref?: React.Ref<HTMLDivElement>;
  /**
   * The kind of feedback. Drives the default icon and the media-chip tint.
   * Default: `'empty'` (a neutral "no data" state).
   */
  status?: ResultStatus;
  /** Custom icon in the media chip. Overrides the `status` default. */
  icon?: React.ReactNode;
  /**
   * Short heading. Falls back to `children` / `description`, then — for
   * `status="empty"` only — the localized "No data".
   */
  title?: React.ReactNode;
  /** Supporting line under the title. `children` is used when this is omitted. */
  description?: React.ReactNode;
  /** Action buttons row, rendered below the text. */
  actions?: React.ReactNode;
  /** Density (`mini`/`s`/`m`/`l`/`xl`). Default: `'m'`. */
  size?: Size;
  children?: React.ReactNode;
}
