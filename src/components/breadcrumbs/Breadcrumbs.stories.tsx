import { Meta, StoryObj } from '@storybook/react';
import { Dropdown, Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { Breadcrumbs } from './Breadcrumbs.tsx';
import { Ellipsis, Home } from 'lucide-react';

const story: Meta<typeof Breadcrumbs> = {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  decorators: [StorybookDecorator],
  args: {},
  argTypes: {},
};

export const BottomNavigationStory: StoryObj<typeof Breadcrumbs> = {
  name: 'Using Breadcrumbs',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text size={5} weight="bold" block>
          Standard Breadcrumbs
        </Text>
        <Breadcrumbs data-testid="breadcrumbs">
          <Breadcrumbs.Item href="#" icon={<Home />} label="Home" />
          <Breadcrumbs.Item href="#" label="Altrone" />
          <Breadcrumbs.Item label="Altrone Next" current />
        </Breadcrumbs>
        <Text size={5} weight="bold" block>
          Using breadcrumbs with dropbown
        </Text>
        <Breadcrumbs data-testid="breadcrumbs">
          <Breadcrumbs.Item href="#" icon={<Home />} label="Home" />
          <Dropdown content={
            <Dropdown.Menu>
              <Dropdown.Action label="Altrone" />
              <Dropdown.Action label="Altrone Next" />
            </Dropdown.Menu>}
          >
            <Breadcrumbs.Item icon={<Ellipsis />} />
          </Dropdown>
          <Breadcrumbs.Item label="Altrone Next" current />
        </Breadcrumbs>
        <Text size={5} weight="bold" block>
          Breadcrumbs with custom renderers
        </Text>
        <Breadcrumbs data-testid="breadcrumbs">
          <Breadcrumbs.Item href="#" icon={<Home />} label="Home" asChild>
            <button />
          </Breadcrumbs.Item>
          <Breadcrumbs.Item href="#" label="Altrone" asChild>
            <strong />
          </Breadcrumbs.Item>
          <Breadcrumbs.Item label="Altrone Next" current />
        </Breadcrumbs>
      </Flex >
    );
  },
};

export default story;
