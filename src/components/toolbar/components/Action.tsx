import { memo } from 'react';
import { ToolbarActionProps } from '../Toolbar.types.ts';
import { Button } from 'components/button/Button.tsx';

export const Action = memo((props: ToolbarActionProps) => {
  const { showLabel = true } = props;

  if (!showLabel) {
    return <Button {...props} variant="text" />;
  }

  return <Button {...props} variant="text" />;
});
