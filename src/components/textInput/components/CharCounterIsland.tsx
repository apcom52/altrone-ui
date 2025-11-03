import clsx from 'clsx';
import s from './charCounter.module.scss';
import { CharCounterIslandProps } from '../TextInput.types.ts';
import { forwardRef } from 'react';
import { useTextInputValueSize } from '../TextInput.context.ts';

export const CharCounterIsland = forwardRef<
  HTMLDivElement,
  CharCounterIslandProps
>(({ className, style, ...props }, ref) => {
  const { valueLength, maxLength } = useTextInputValueSize();

  const counter =
    typeof maxLength === 'number' ? `${valueLength}/${maxLength}` : valueLength;

  const cls = clsx(s.CharCounterIsland, className, {
    [s.InvalidChars]: typeof maxLength === 'number' && valueLength > maxLength,
  });

  return (
    <div className={cls} ref={ref} {...props}>
      {counter}
    </div>
  );
});
