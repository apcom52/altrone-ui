import React from 'react';
import { Size } from "types";

export interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'amber' | 'blue' | 'brown' | 'indigo' | 'pink' | 'purple' | 'red' | 'teal';
  variant?: 'solid' | 'soft' | 'outline';
  rounding?: 'rounded' | 'pill';
  size?: Size;
}