import { memo } from 'react';
import { ToolbarActionProps } from '../Toolbar.types.ts';
import { Button } from 'components/button/Button.tsx';
import { useToolbarContext } from '../Toolbar.context.ts';

export const Action = memo((props: ToolbarActionProps) => {
  const { size } = useToolbarContext();

  return <Button size={size} {...props} variant="text" />;
});
