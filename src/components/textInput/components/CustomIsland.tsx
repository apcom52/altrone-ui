import clsx from 'clsx';
import { CustomIslandProps } from '../TextInput.types.ts';
import s from './custom.module.scss';

export const CustomIsland = ({
  ref,
  children,
  className,
  placement,
  ...restProps
}: CustomIslandProps) => {
  return (
    <div
      ref={ref}
      data-placement={placement}
      className={clsx(s.CustomIsland, className)}
      {...restProps}
    >
      {children}
    </div>
  );
};
