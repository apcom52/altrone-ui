import { Tooltip } from 'components/tooltip/Tooltip.tsx';
import { ToolbarActionProps } from '../Toolbar.types.ts';
import { Button } from 'components/button/Button.tsx';
import { useToolbarPlacement } from '../Toolbar.context.ts';
import { useMemo } from 'react';

export const Action = (props: ToolbarActionProps) => {
  const { showLabel = true, kbd, ref } = props;
  const placement = useToolbarPlacement();

  const toolbarPlacement = useMemo(() => {
    if (placement.startsWith('top')) {
      return 'bottom';
    } else if (placement.startsWith('left')) {
      return 'right';
    } else if (placement.startsWith('right')) {
      return 'left';
    }

    return 'top';
  }, [placement]);

  if (!showLabel) {
    return (
      <Tooltip content={props.label} placement={toolbarPlacement} kbd={kbd}>
        <Button {...props} variant="text" />
      </Tooltip>
    );
  }

  return <Button {...props} variant="text" />;
};
