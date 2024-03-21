import { Select } from '../index';
import { useEffect, useState } from 'react';
import { StorybookPlayground } from '../../../../storybook/StorybookPlayground';
import { StoryObj } from '@storybook/react';
import { Option, OptionParent } from '../../../../types';

const DATA: Option<string>[] = [
  {
    label: 'The United Kingdom',
    value: 'uk',
    parent: 'nato'
  },
  {
    label: 'The United States of America',
    value: 'use',
    parent: 'nato'
  },
  {
    label: 'Spain',
    value: 'spain',
    parent: 'eu',
    disabled: true
  },
  {
    label: 'France',
    parent: 'eu',
    value: 'france'
  },
  {
    label: 'Turkey',
    parent: 'nato',
    value: 'turkey'
  },
  {
    label: 'Russia',
    value: 'russia'
  },
  {
    label: 'Japan',
    parent: 'nato',
    value: 'japan'
  },
  {
    label: 'China',
    value: 'china'
  },
  {
    label: 'Brazil',
    value: 'brazil'
  },
  {
    label: 'Germany',
    parent: 'eu',
    value: 'germany'
  }
];

const PARENTS: OptionParent[] = [
  {
    label: 'European Union',
    value: 'eu',
    disabled: true
  },
  {
    label: 'NATO',
    value: 'nato'
  }
];

export const SelectWithParents: StoryObj<typeof Select<string>> = {
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
          parents={PARENTS}
        />
      </StorybookPlayground>
    );
  }
};
