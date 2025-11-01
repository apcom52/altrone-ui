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
  Send,
} from 'lucide-react';
import { Dropdown } from 'components/dropdown/index.ts';
import { useState } from 'react';
import { Button } from 'components/button/Button.tsx';

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
    const [placement, setPlacement] = useState<
      'top' | 'bottom' | 'left' | 'right'
    >('top');
    const [fixed, setFixed] = useState(false);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [buttonSelected, setButtonSelected] = useState(false);

    const vertical = placement === 'left' || placement === 'right';

    return (
      <Flex
        direction="vertical"
        gap="l"
        style={{
          position: 'relative',
          marginTop: -8,
          marginLeft: -24,
          marginRight: -24,
          width: 'calc(100% + 48px)',
          height: '100vh',
        }}
      >
        <div style={{ padding: 200 }}>
          <Flex gap="s">
            <Button
              label={`Placement: ${placement.toUpperCase()}`}
              onClick={() =>
                setPlacement(
                  placement === 'top'
                    ? 'bottom'
                    : placement === 'bottom'
                    ? 'left'
                    : placement === 'left'
                    ? 'right'
                    : 'top'
                )
              }
            />
            <Button
              label="Fixed"
              selected={fixed}
              onClick={() => setFixed(!fixed)}
            />
            <Button
              label="Show Backdrop"
              selected={showBackdrop}
              onClick={() => setShowBackdrop(!showBackdrop)}
            />
          </Flex>
        </div>

        <Toolbar
          placement={placement}
          fixed={fixed}
          showBackdrop={showBackdrop}
        >
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
                kbd="⌘+I"
                showLabel={false}
                selected={buttonSelected}
                onClick={() => setButtonSelected(!buttonSelected)}
              />
              <Toolbar.Action
                kbd="⌘+P"
                icon={<Camera />}
                label="Take a photo"
                showLabel={false}
              />
            </Toolbar.Group>
            <Toolbar.Group>
              <Toolbar.Action
                label="Send a message"
                showLabel={!vertical}
                icon={vertical ? <Send /> : undefined}
              />
            </Toolbar.Group>
          </Toolbar.Center>
          <Toolbar.Trailing>
            <Toolbar.Group>
              <Toolbar.Action
                label="Edit"
                showLabel={!vertical}
                icon={vertical ? <PencilLine /> : undefined}
              />
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
                badge={vertical ? undefined : 'Beta'}
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
