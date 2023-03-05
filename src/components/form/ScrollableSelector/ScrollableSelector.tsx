import { memo, useEffect, useRef } from 'react';
import { Align, Option } from '../../../types';
import clsx from 'clsx';
import './scrollable-selector.scss';
import { ScrollableSelectorOption } from './ScrollableSelectorOption';

interface ScrollableSelectorProps<T> {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
  width?: number | string;
  align?: Align;
  className?: string;
  ScrollableSelectorOptionComponent?: React.FC<ScrollableSelectorOptionProps<T>>;
}

export interface ScrollableSelectorOptionProps<T> {
  option: Option<T>;
  value: T;
  checked: boolean;
  onChange: (value: T) => void;
  disabled?: boolean;
}

const ScrollableSelector = <T extends unknown>({
  value,
  options = [],
  width = '100%',
  disabled = false,
  align = Align.center,
  onChange,
  className,
  ScrollableSelectorOptionComponent = ScrollableSelectorOption
}: ScrollableSelectorProps<T>) => {
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const valueIndex = options.findIndex((option) => option.value === value);

    selectorRef.current?.scrollTo({
      top: 34 * valueIndex,
      behavior: 'smooth'
    });
  }, [value]);

  return (
    <div
      ref={selectorRef}
      className={clsx('alt-scrollable-selector', className, {
        'alt-scrollable-selector--align-start': align === Align.start,
        'alt-scrollable-selector--align-end': align === Align.end
      })}
      style={{ width }}
      data-testid="alt-test-scrollable-selector">
      {options.map((option, optionIndex) => (
        <ScrollableSelectorOptionComponent
          key={optionIndex}
          option={option}
          value={option.value}
          disabled={disabled || option.disabled}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
        />
      ))}
    </div>
  );
};

export default memo(ScrollableSelector) as typeof ScrollableSelector;
