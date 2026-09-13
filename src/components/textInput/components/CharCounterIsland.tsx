import clsx from 'clsx';
import s from './charCounter.module.scss';
import { CharCounterIslandProps } from '../TextInput.types.ts';
import { useTextInputValueSize } from '../TextInput.context.ts';

export const CharCounterIsland = ({
  ref,
  className,
  placement,
  ...props
}: CharCounterIslandProps) => {
  const { valueLength, maxLength } = useTextInputValueSize();

  const counter =
    typeof maxLength === 'number' ? `${valueLength}/${maxLength}` : valueLength;

  return (
    <div
      ref={ref}
      data-placement={placement}
      className={clsx(s.CharCounterIsland, className, {
        [s.InvalidChars]:
          typeof maxLength === 'number' && valueLength > maxLength,
      })}
      {...props}
    >
      {counter}
    </div>
  );
};
