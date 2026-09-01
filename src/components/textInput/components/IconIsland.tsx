import clsx from 'clsx';
import s from './icon.module.scss';
import { IconIslandProps } from '../TextInput.types.ts';

export const IconIsland = ({
  ref,
  icon,
  className,
  placement,
  ...props
}: IconIslandProps) => {
  return (
    <div
      ref={ref}
      data-placement={placement}
      className={clsx(s.IconIsland, className)}
      {...props}
    >
      {icon}
    </div>
  );
};
