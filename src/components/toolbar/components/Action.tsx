import { Tooltip } from 'components/tooltip/Tooltip.tsx';
import { ToolbarActionProps } from '../Toolbar.types.ts';
import { Button } from 'components/button/Button.tsx';

export const Action = (props: ToolbarActionProps) => {
  const { showLabel = true, ref } = props;

  if (!showLabel) {
    return (
      <Tooltip content={props.label}>
        <Button {...props} variant="text" />
      </Tooltip>
    );
  }

  return <Button {...props} variant="text" />;
};
