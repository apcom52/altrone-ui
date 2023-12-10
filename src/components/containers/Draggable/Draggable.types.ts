import React from 'react';

export enum DraggablePosition {
  local = 'local',
  screen = 'screen'
}

export interface DraggableProps extends React.PropsWithChildren {
  width?: number | string;
  height?: number | string;
  position?: DraggablePosition;
  className?: string;
}
