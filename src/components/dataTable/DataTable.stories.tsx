import { DataTable } from './index';
import { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../flex';
import { Gap } from 'types';
import { Text, TextHeadingRoles } from '../text';
import { COUNTRIES } from '../scrollable/Scrollable.constants.ts';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';

const meta: Meta<typeof DataTable<any>> = {
  component: DataTable,
  title: 'Components/Display/DataTable',
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
};

export const TextInputStory: StoryObj<typeof Flex> = {
  name: 'Using DataTable',
  render: () => {
    return (
      <Flex gap={Gap.large}>
        <Text.Heading role={TextHeadingRoles.inner}>
          Basic DataTable
        </Text.Heading>
        <DataTable
          data={COUNTRIES}
          columns={[
            { accessor: 'flag', label: 'Flag', width: '80px' },
            { accessor: 'country', label: 'Country Name' },
            { accessor: 'capital', label: 'Capital' },
          ]}
        />
      </Flex>
    );
  },
};

export default meta;
