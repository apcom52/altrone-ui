import { Button } from 'components/button';
import { ActionIslandProps } from '../TextInput.types.ts';
import { useIslandSize, useTextInputDisabled } from '../TextInput.context.ts';

/**
 * A `Button` locked to the in-field `plate` chip. Everything else — press/focus
 * feedback, icon-only circle + auto tooltip, `state`, `badge`, `disabled` — is
 * `Button`'s own behaviour, not reimplemented here. A disabled field disables
 * its actions too.
 */
export const ActionIsland = ({
  ref,
  placement,
  size,
  disabled,
  ...restProps
}: ActionIslandProps) => {
  const islandSize = useIslandSize();
  const fieldDisabled = useTextInputDisabled();

  return (
    <Button
      {...restProps}
      ref={ref}
      variant="default"
      size={size ?? islandSize}
      disabled={disabled || fieldDisabled}
      data-placement={placement}
    />
  );
};
