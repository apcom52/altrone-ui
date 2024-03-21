import { forwardRef, useImperativeHandle, useRef } from 'react';
import { IconIslandProps, IslandRef, TextIslandProps } from '../TextInput.types';
import './icon-island.scss';
import clsx from 'clsx';

export const IconIsland = forwardRef<IslandRef, IconIslandProps>((props, ref) => {
  const { icon, className } = props;

  const islandRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      container: islandRef.current,
      placement: props.placement
    }),
    [props.placement]
  );

  return (
    <div className={clsx('alt-icon-island', className)} ref={islandRef}>
      {icon}
    </div>
  );
});
IconIsland.displayName = 'TextInputIconIsland';
