import React from 'react';
import { Size } from 'types';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  firstName: string;
  lastName?: string;
  size?: Size;
  backgroundColor?: string;
  textColor?: string;
  imageSrc?: string;
}
