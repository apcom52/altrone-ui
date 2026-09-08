import React from 'react';
import { Size } from 'types';

export interface EmptyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  ref?: React.Ref<HTMLDivElement>;
  /** Icon shown in the media chip. Default: a "no results" icon. */
  icon?: React.ReactNode;
  /** Short heading. Default: the localized "No data". */
  title?: React.ReactNode;
  /** Supporting line under the title. `children` is used when this is omitted. */
  description?: React.ReactNode;
  /** Action buttons row, rendered below the text. */
  actions?: React.ReactNode;
  /** Density (`mini`/`s`/`m`/`l`/`xl`). Default: `'m'`. */
  size?: Size;
  children?: React.ReactNode;
}
