import React from 'react';

export interface SpoilerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  ref?: React.Ref<HTMLDivElement>;
  title: string;
  openedByDefault?: boolean;
  onToggle?: (opened: boolean, event: React.MouseEvent<HTMLDivElement>) => void;
}
