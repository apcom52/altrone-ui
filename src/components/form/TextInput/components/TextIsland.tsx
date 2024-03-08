import { forwardRef, useImperativeHandle, useRef } from 'react';
import { IslandRef, TextIslandProps } from '../TextInput.types';
import './text-island.scss';
import clsx from 'clsx';

export const TextIsland = forwardRef<IslandRef, TextIslandProps>((props, ref) => {
  const { label, className } = props;

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
    <div className={clsx('alt-text-island', className)} ref={islandRef}>
      {label}
    </div>
  );
});
TextIsland.displayName = 'TextInputTextIsland';
