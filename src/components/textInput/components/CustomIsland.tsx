import { forwardRef, useImperativeHandle, useRef } from 'react';
import clsx from 'clsx';

export const CustomIsland = forwardRef((props, ref) => {
  const { children, className } = props;

  const islandRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      container: islandRef.current,
      placement: props.placement,
    }),
    [props.placement],
  );

  return (
    <div className={clsx('alt-custom-island', className)} ref={islandRef}>
      {children}
    </div>
  );
});
CustomIsland.displayName = 'TextInputCustomIsland';
