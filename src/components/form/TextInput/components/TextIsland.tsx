import { forwardRef, useImperativeHandle, useRef } from 'react';
import { IslandRef, TextIslandProps } from '../TextInput.types';
import './text-island.scss';
import clsx from 'clsx';
import { useResizeObserver } from '../../../../hooks';

export const TextIsland = forwardRef<IslandRef, TextIslandProps>((props, ref) => {
  const { label, className } = props;

  const islandRef = useRef<HTMLDivElement | null>(null);

  const size = useResizeObserver<HTMLDivElement>(islandRef);

  useImperativeHandle(
    ref,
    () => ({
      container: islandRef.current,
      width: size.width,
      placement: props.placement
    }),
    [size, props.placement]
  );

  return (
    <div className={clsx('alt-text-island', className)} ref={islandRef}>
      {label}
    </div>
  );
});
TextIsland.displayName = 'TextInputTextIsland';
