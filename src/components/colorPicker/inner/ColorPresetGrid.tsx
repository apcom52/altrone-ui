import { Flex } from 'components/flex/Flex.tsx';
import { useRef, useState, type KeyboardEvent } from 'react';
import {
  ColorPickerPresetProps,
  ColorPreset as ColorPresetType,
} from '../ColorPicker.types';
import { ColorPreset } from './ColorPreset';

interface ColorPresetGridProps {
  colorPresets: ColorPresetType[];
  value?: string;
  onChange: ColorPickerPresetProps['onChange'];
  label: string;
}

export const ColorPresetGrid = ({
  colorPresets,
  value,
  onChange,
  label,
}: ColorPresetGridProps) => {
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedIndex = colorPresets.findIndex(
    (preset) => preset.value.toLowerCase() === value?.toLowerCase(),
  );
  const [activeIndex, setActiveIndex] = useState(Math.max(selectedIndex, 0));
  const tabbableIndex = Math.min(activeIndex, colorPresets.length - 1);

  /** The grid wraps with the popover width, so rows are read from the layout rather than a fixed column count. */
  const getIndexInNextRow = (from: number, direction: 1 | -1) => {
    const origin = itemsRef.current[from];
    if (!origin) return from;

    let target = from;
    let bestDistance = Infinity;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      const rowOffset = (item.offsetTop - origin.offsetTop) * direction;
      if (rowOffset <= 0) return;

      const distance =
        rowOffset * 1000 + Math.abs(item.offsetLeft - origin.offsetLeft);
      if (distance < bestDistance) {
        bestDistance = distance;
        target = index;
      }
    });

    return target;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = itemsRef.current.indexOf(event.target as HTMLButtonElement);
    if (index === -1) return;

    const lastIndex = colorPresets.length - 1;
    const nextIndex = {
      ArrowLeft: Math.max(index - 1, 0),
      ArrowRight: Math.min(index + 1, lastIndex),
      ArrowUp: getIndexInNextRow(index, -1),
      ArrowDown: getIndexInNextRow(index, 1),
      Home: 0,
      End: lastIndex,
    }[event.key];

    if (nextIndex === undefined) return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    itemsRef.current[nextIndex]?.focus();
  };

  return (
    <Flex
      orientation="horizontal"
      gap="m"
      wrap
      role="group"
      aria-label={label}
      onKeyDown={handleKeyDown}
    >
      {colorPresets.map((preset, index) => (
        <ColorPreset
          key={`${index}-${preset.name}`}
          ref={(element) => {
            itemsRef.current[index] = element;
          }}
          tabIndex={index === tabbableIndex ? 0 : -1}
          onFocus={() => setActiveIndex(index)}
          onChange={onChange}
          selected={preset.value.toLowerCase() === value?.toLowerCase()}
          {...preset}
        />
      ))}
    </Flex>
  );
};
