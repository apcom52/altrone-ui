import { Button } from 'components/button';
import { ActionIslandProps } from '../TextInput.types.ts';
import { useIslandSize } from '../TextInput.context.ts';

/**
 * A `Button` locked to the in-field `plate` chip. Everything else — press/focus
 * feedback, icon-only circle + auto tooltip, `state`, `badge`, `disabled` — is
 * `Button`'s own behaviour, not reimplemented here.
 */
export const ActionIsland = ({
  ref,
  placement,
  size,
  ...restProps
}: ActionIslandProps) => {
  const islandSize = useIslandSize();

  return (
    <Button
      {...restProps}
      ref={ref}
      variant="default"
      size={size ?? islandSize}
      data-placement={placement}
    />
  );
};
