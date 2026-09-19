import React from 'react';
import { Size } from 'types';

export interface LabelProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement>;
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'amber' | 'blue' | 'brown' | 'indigo' | 'pink' | 'purple' | 'red' | 'teal';
  variant?: 'solid' | 'soft' | 'outline';
  shape?: 'rounded' | 'pill';
  size?: Size;
}