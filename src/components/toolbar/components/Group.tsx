import { memo } from 'react';
import { ToolbarGroupProps } from '../Toolbar.types.ts';
import s from './group.module.scss';

export const Group = memo<ToolbarGroupProps>(({ children }) => {
  return <div className={s.Group}>{children}</div>;
});
