import { Meta, StoryObj } from '@storybook/react';
import {
  AltroneApplication,
  Checkbox,
  Flex,
  NavigationList,
  Screen,
  Toolbar,
} from 'components';
import { allModes } from '../../../.storybook/modes.ts';
import { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  BookText,
  ChartPie,
  Cog,
  Ellipsis,
  Frame,
  Joystick,
  Map,
  PanelRightClose,
  Search,
} from 'lucide-react';

const story: Meta<typeof Range> = {
  title: 'Components/Containers/Screen',
  component: Screen,
  decorators: [],
  args: {},
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
      },
    },
  },
};

export const ScreenStory: StoryObj<typeof Range> = {
  name: 'Using Screen',
  render: () => {
    const [sidebar, setSidebar] = useState(true);
    const [header, setHeader] = useState(true);

    const sidebarContent = (
      <NavigationList>
        <NavigationList.Header>Gorgeous header</NavigationList.Header>
        <NavigationList.Group title="Platform">
          <NavigationList.Link icon={<Joystick />} label="Playground" />
          <NavigationList.Link icon={<BookOpen />} label="Models" />
          <NavigationList.Link icon={<BookText />} label="Documentation" />
          <NavigationList.Link icon={<Cog />} label="Settings" />
        </NavigationList.Group>
        <NavigationList.Group title="Projects">
          <NavigationList.Link icon={<Frame />} label="Design Engineering" />
          <NavigationList.Link icon={<ChartPie />} label="Sales & Marketing" />
          <NavigationList.Link icon={<Map />} label="Travel" />
          <NavigationList.Link icon={<Ellipsis />} label="More" />
        </NavigationList.Group>
        <NavigationList.Footer>About app</NavigationList.Footer>
      </NavigationList>
    );

    const headerContent = (
      <Toolbar>
        <Toolbar.Leading>
          <Toolbar.Group>
            <Toolbar.Action
              icon={<ArrowLeft />}
              label="Back"
              showLabel={false}
            />
          </Toolbar.Group>
          <Toolbar.Group>
            <Toolbar.Action
              icon={<PanelRightClose />}
              label="Collapse sidebar"
              showLabel={false}
            />
          </Toolbar.Group>
          <Toolbar.Title label="Application Title" />
        </Toolbar.Leading>
        <Toolbar.Trailing>
          <Toolbar.Group>
            <Toolbar.Action
              icon={<Search />}
              label="Search"
              showLabel={false}
            />
          </Toolbar.Group>
        </Toolbar.Trailing>
      </Toolbar>
    );

    return (
      <AltroneApplication
        accent="blue"
        sidebar={sidebar ? sidebarContent : undefined}
        header={header ? headerContent : undefined}
      >
        <Flex direction="vertical" gap="xl">
          Content of the application
          <Flex gap="m">
            <Checkbox checked={sidebar} onChange={setSidebar}>
              Show sidebar
            </Checkbox>
            <Checkbox checked={header} onChange={setHeader}>
              Show header
            </Checkbox>
          </Flex>
          {[...Array(50)].map((_, i) => (
            <div key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          ))}
        </Flex>
      </AltroneApplication>
    );
  },
};

export default story;
