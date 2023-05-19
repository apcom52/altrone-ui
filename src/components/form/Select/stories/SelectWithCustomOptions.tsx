import { Select, SelectOptionProps } from '../index';
import { useEffect, useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { StoryObj } from '@storybook/react';
import { Option } from '../../../../types';
import clsx from 'clsx';

const DATA: Option<string>[] = [
  {
    label: 'The United Kingdom',
    value: '🇬🇧',
    parent: 'nato'
  },
  {
    label: 'The United States of America',
    value: '🇺🇸',
    parent: 'nato'
  },
  {
    label: 'Spain',
    value: '🇪🇸',
    parent: 'eu',
    disabled: true
  },
  {
    label: 'France',
    parent: 'eu',
    value: '🇫🇷'
  },
  {
    label: 'Turkey',
    parent: 'nato',
    value: '🇹🇷'
  },
  {
    label: 'Russia',
    value: '🇷🇺'
  },
  {
    label: 'Japan',
    parent: 'nato',
    value: '🇯🇵'
  },
  {
    label: 'China',
    value: '🇨🇳'
  },
  {
    label: 'Brazil',
    value: '🇧🇷'
  },
  {
    label: 'Germany',
    parent: 'eu',
    value: '🇩🇪'
  }
];

const CustomSelectItem = <T extends unknown>({
  label,
  value,
  onSelect,
  inSelectHeader,
  selected
}: SelectOptionProps<T>) => {
  const ComponentName = inSelectHeader ? 'div' : 'button';

  return (
    <ComponentName
      className={clsx('alt-select-option', {
        'alt-select-option--selected': selected
      })}
      onClick={() => onSelect(value)}>
      <div className="alt-select-option__label">
        {String(value)} {label}
      </div>
    </ComponentName>
  );
};

export const SelectWithCustomOptions: StoryObj<typeof Select<string>> = {
  name: 'Default Select',
  render: ({ ...args }) => {
    const [value, setValue] = useState<string>(args.value);

    useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    return (
      <StorybookPlayground>
        <Select<string>
          {...args}
          value={value}
          onChange={setValue}
          options={DATA}
          ItemComponent={CustomSelectItem}
        />
      </StorybookPlayground>
    );
  }
};
