import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Text } from '../text';
import { Toolbar } from './Toolbar.tsx';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Grid3X3,
  Share,
  Tags,
  Ellipsis,
  Paperclip,
  Camera,
  MousePointer2,
  Pointer,
  DiamondPlus,
  CaseSensitive,
  PencilLine,
  Images,
  MessageCircle,
} from 'lucide-react';
import { Dropdown } from 'components/dropdown/index.ts';

const story: Meta<typeof Toolbar> = {
  title: 'Components/Containers/Toolbar',
  component: Toolbar,
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

export const ToolbarStory: StoryObj<typeof Toolbar> = {
  name: 'Using Toolbar',
  render: () => {
    return (
      <Flex direction="vertical" gap="l">
        <Text.Heading role="inner">Basic Toolbar</Text.Heading>
        <Toolbar>
          <Toolbar.Leading>
            <Toolbar.Group>
              <Toolbar.Action
                icon={<ChevronLeft />}
                label="Back"
                showLabel={false}
              />
              <Toolbar.Action
                icon={<ChevronRight />}
                label="Forward"
                showLabel={false}
              />
            </Toolbar.Group>
          </Toolbar.Leading>
          <Toolbar.Center>
            <Toolbar.Group>
              <Toolbar.Action
                icon={<Paperclip />}
                label="Attach a file"
                showLabel={false}
              />
              <Toolbar.Action
                icon={<Camera />}
                label="Take a photo"
                showLabel={false}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Toolbar.Action label="Send a message" />
            </Toolbar.Group>
          </Toolbar.Center>
          <Toolbar.Trailing>
            <Toolbar.Group>
              <Toolbar.Action label="Edit" />
            </Toolbar.Group>
            <Toolbar.Group>
              <Toolbar.Action
                icon={<Grid3X3 />}
                label="View"
                showLabel={false}
              />
              <Toolbar.Action
                icon={<Share />}
                label="Share"
                showLabel={false}
              />
              <Toolbar.Action
                icon={<Tags />}
                label="Tags"
                showLabel={false}
                badge="Beta"
              />
              <Toolbar.Action
                icon={<Ellipsis />}
                label="More"
                showLabel={false}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Toolbar.Action
                icon={<Search />}
                label="Search"
                showLabel={false}
              />
            </Toolbar.Group>
          </Toolbar.Trailing>
        </Toolbar>
      </Flex>
    );
  },
};

export const VerticalToolbarStory: StoryObj<typeof Toolbar> = {
  name: 'Using Vertical Toolbar',
  render: () => {
    return (
      <Flex gap="l">
        <Toolbar
          direction="vertical"
          style={{
            height: 'calc(100% - 40px)',
            position: 'fixed',
            top: 20,
            left: 20,
          }}
        >
          <Toolbar.Leading>
            <Toolbar.Group>
              <Toolbar.Action
                icon={<MessageCircle />}
                label="Comments"
                showLabel={false}
              />
            </Toolbar.Group>
          </Toolbar.Leading>
          <Toolbar.Center>
            <Toolbar.Group>
              <Toolbar.Action
                icon={<MousePointer2 />}
                label="Cursor"
                showLabel={false}
              />
              <Toolbar.Action
                icon={<Pointer />}
                label="Hand"
                showLabel={false}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Dropdown
                overlap
                content={
                  <Dropdown.Menu>
                    <Dropdown.Action label="Widget 1" />
                    <Dropdown.Action label="Widget 2" />
                    <Dropdown.Action label="Widget 3" />
                  </Dropdown.Menu>
                }
              >
                <Toolbar.Action
                  icon={<DiamondPlus />}
                  label="Open widgets"
                  showLabel={false}
                />
              </Dropdown>
              <Toolbar.Action
                icon={<CaseSensitive />}
                label="Text"
                showLabel={false}
              />
              <Toolbar.Action
                icon={<Images />}
                label="Image"
                showLabel={false}
              />
              <Toolbar.Action
                icon={<PencilLine />}
                label="Draw"
                showLabel={false}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Toolbar.Action
                icon={<MessageCircle />}
                label="Comments"
                showLabel={false}
              />
            </Toolbar.Group>
          </Toolbar.Center>
        </Toolbar>
      </Flex>
    );
  },
};

export default story;
