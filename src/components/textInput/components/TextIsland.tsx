import clsx from 'clsx';
import s from './text.module.scss';
import { TextIslandProps } from '../TextInput.types.ts';

export const TextIsland = ({
  ref,
  label,
  className,
  placement,
  ...props
}: TextIslandProps) => {
  return (
    <div
      ref={ref}
      data-placement={placement}
      className={clsx(s.TextIsland, className)}
      {...props}
    >
      {label}
    </div>
  );
};
