import { Meta, StoryObj } from '@storybook/react';
import { Button, Flex, Icon, Text } from 'components';
import { StorybookDecorator } from 'global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import {
  Camera,
  Send,
  Images,
  ChevronDown,
  AArrowDown,
  AArrowUp,
  Phone,
  MessageCircle,
  Delete,
  Check,
  X,
  Heart,
  LoaderPinwheel,
  Wifi,
  Bluetooth,
} from 'lucide-react';
// import { fn } from '@storybook/test';
import { ButtonProps } from './Button.types.ts';
import { Role, Size } from '../../types';
import { useState } from 'react';

const story: Meta<typeof Button> = {
  title: 'Components/Form/Button',
  component: Button,
  decorators: [StorybookDecorator],
  // args: {
  //   onClick: fn(),
  //   onMouseEnter: fn(),
  //   onMouseLeave: fn(),
  //   onFocus: fn(),
  //   onBlur: fn(),
  // },
  argTypes: {},
};

const renderButtonsWithRole = (
  type: ButtonProps['variant'],
  args: ButtonProps
) => {
  const [loading, setLoading] = useState(false);
  const [successed, setSuccessed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);

  return (
    <Flex gap="m" align="start" wrap>
      <Button
        {...args}
        variant={type}
        label="Reset"
        data-testid={`button-${type}`}
      />
      <Button
        {...args}
        variant={type}
        label="Cancel"
        data-testid={`button-${type}`}
        badge="NEW"
      />
      <Button {...args} variant={type} label="Submit" icon={<Send />} />
      <Button {...args} variant={type} label="Take a photo" icon={<Camera />} />
      <Button
        {...args}
        variant={type}
        label="Choose from gallery"
        icon={<Images />}
        badge="2"
      />
      <Button
        {...args}
        variant={type}
        label="More options"
        additionalIcon={<ChevronDown />}
      />
      <Button
        {...args}
        variant={type}
        icon={<Phone />}
        disabled
        label="Call to..."
      />
      <Button
        {...args}
        variant={type}
        disabled
        icon={<MessageCircle />}
        label="Chat with support"
        badge="Not working"
      />
      <Button
        {...args}
        variant={type}
        label="Sort ascending"
        showLabel={false}
        icon={<AArrowUp />}
      />
      <Button
        {...args}
        variant={type}
        label="Sort descending"
        showLabel={false}
        icon={<AArrowDown />}
      />
      <Button
        {...args}
        variant={type}
        label="Close"
        showLabel={false}
        icon={<X />}
      />
      <Button
        {...args}
        variant={type}
        label="Done"
        showLabel={false}
        icon={<Check />}
      />
      <Button
        {...args}
        variant={type}
        label="Delete"
        showLabel={false}
        icon={<Delete />}
        danger
      />
      <Button
        {...args}
        variant={type}
        label="Delete"
        icon={<Delete />}
        danger
      />
      <Button {...args} variant={type} label="Reject" danger />
      <Button {...args} variant={type} disabled label="Pay later" danger />
      <Button {...args} variant={type} label="Pay later" badge="+20%" danger />
      <Button
        {...args}
        variant={type}
        label="Like"
        badge="25k"
        icon={<Heart />}
        additionalIcon={<Heart />}
      />
      <Button
        {...args}
        variant={type}
        label="Click to show loading"
        badge="Loading"
        icon={<LoaderPinwheel />}
        state={loading ? 'loading' : 'idle'}
        onClick={() => setLoading(!loading)}
      />
      <Button
        {...args}
        variant={type}
        label="Click to finish"
        icon={<Check />}
        state={successed ? 'successed' : 'idle'}
        onClick={() => setSuccessed(!successed)}
      />
      <Button
        {...args}
        variant={type}
        label="Approve"
        state={failed ? 'failed' : 'idle'}
        onClick={() => setFailed(!failed)}
      />
      <Button
        {...args}
        variant={type}
        icon={<Wifi />}
        label="Home"
        selected={selected1}
        onClick={() => setSelected1(!selected1)}
      />
      <Button
        {...args}
        variant={type}
        icon={<Bluetooth />}
        label="Bluetooth"
        showLabel={false}
        selected={selected2}
        onClick={() => setSelected2(!selected2)}
      />
    </Flex>
  );
};

const renderButtonsWithSize = (size: Size) => {
  return (
    <Flex gap="m" align="start">
      <Button size={size} variant="default" label="Like" icon={<Heart />} />
      <Button size={size} variant="default" label="Like" />
      <Button
        size={size}
        variant="default"
        label="Like"
        icon={<Heart />}
        showLabel={false}
      />
      <Button size={size} variant="submit" label="Like" icon={<Heart />} />
      <Button size={size} variant="text" label="Like" icon={<Heart />} />
      <Button size={size} label="Like" icon={<Heart />} />
      <Button
        size={size}
        variant="default"
        label="Like"
        icon={<Heart />}
        badge="48"
      />
    </Flex>
  );
};

export const ButtonStory: StoryObj<typeof Button> = {
  name: 'Using Buttons',
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
        dark: allModes['dark desktop'],
      },
    },
  },
  render: ({ ...args }) => (
    <Flex direction="vertical" gap="l">
      <Text block size={5} weight="bold">
        Default buttons
      </Text>
      {renderButtonsWithRole('default', args)}
      <Text block size={5} weight="bold">
        Submit buttons
      </Text>
      {renderButtonsWithRole('submit', args)}
      <Text block size={5} weight="bold">
        Text buttons
      </Text>
      {renderButtonsWithRole('text', args)}
    </Flex>
  ),
};

export const ButtonSizeStory: StoryObj<typeof Button> = {
  name: 'Different sizes of buttons',
  parameters: {
    chromatic: {
      modes: {
        light: allModes['light desktop'],
      },
    },
  },
  render: () => (
    <Flex direction="vertical" gap="l">
      <Text block size={5} weight="bold">
        Mini buttons
      </Text>
      {renderButtonsWithSize('mini')}
      <Text block size={5} weight="bold">
        Small buttons
      </Text>
      {renderButtonsWithSize('s')}
      <Text block size={5} weight="bold">
        Medium buttons
      </Text>
      {renderButtonsWithSize('m')}
      <Text block size={5} weight="bold">
        Large buttons
      </Text>
      {renderButtonsWithSize('l')}
      <Text block size={5} weight="bold">
        XL buttons
      </Text>
      {renderButtonsWithSize('xl')}
    </Flex>
  ),
};

export default story;
