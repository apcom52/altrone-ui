import { DataTable } from './index';
import { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../flex';
import { Gap } from 'types';
import { Text, TextHeadingRoles } from '../text';
import { COUNTRIES } from '../scrollable/Scrollable.constants.ts';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Dropdown } from '../dropdown';
import { Icon } from '../icon';
import { Popover } from '../popover';

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
          limit={20}
          selectable
          columns={[
            { accessor: 'flag', label: 'Flag', width: '80px' },
            { accessor: 'country', label: 'Country Name' },
            { accessor: 'capital', label: 'Capital' },
          ]}
        >
          <DataTable.Action label="Test" onClick={() => alert('Test !')} />
          <Dropdown
            content={
              <Dropdown.Menu>
                <Dropdown.Action
                  icon={<Icon i="play_arrow" />}
                  label="Test A"
                />
                <Dropdown.Action
                  icon={<Icon i="play_arrow" />}
                  label="Test B"
                />
              </Dropdown.Menu>
            }
          >
            <DataTable.Action label="Test Dropdown" />
          </Dropdown>
          <Popover
            title="Custom popover"
            content={<Text.Paragraph>Content is here</Text.Paragraph>}
          >
            <DataTable.Action
              leftIcon={<Icon i="sports_esports" />}
              label="Test Popover"
            />
          </Popover>
        </DataTable>
      </Flex>
    );
  },
};

export default meta;
