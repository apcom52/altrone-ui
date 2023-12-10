import React from 'react';
import { MotionProps } from 'framer-motion';

export enum DraggablePosition {
  local = 'local',
  screen = 'screen'
}

export interface DraggableProps {
  renderElement: (props: MotionProps) => JSX.Element;
  width?: number | string;
  height?: number | string;
  position?: DraggablePosition;
  className?: string;
}
