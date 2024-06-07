import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Modal } from './Modal.tsx';
import { Text, TextHeadingRoles } from '../text';
import { useBoolean } from 'utils';
import { Button } from '../button';
import { Tooltip } from '../tooltip';
import { useState } from 'react';

const story: Meta<typeof Modal> = {
  title: 'Components/Containers/Modal',
  component: Modal,
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
  name: 'Using Modal',
  render: () => {
    const [size, setSize] = useState(Size.medium);
    const { value: opened, enable: open, disable: hide } = useBoolean(false);

    return (
      <Flex gap="medium" align="start">
        <Text.Heading role={TextHeadingRoles.inner}>PasswordInput</Text.Heading>
        <Flex direction="horizontal" gap="medium">
          <Button
            label="Open modal"
            onClick={() => {
              setSize('medium');
              open();
            }}
          />
          <Button
            label="Open small modal"
            onClick={() => {
              setSize('small');
              open();
            }}
          />
          <Button
            label="Open large modal"
            onClick={() => {
              setSize('large');
              open();
            }}
          />
        </Flex>
        {opened && (
          <Modal
            title="Modal title"
            onClose={hide}
            leftActions={[<Tooltip content="This is tooltip" />]}
            actions={[<Button role="primary" label="OK" />]}
            size={size}
          >
            <Flex gap="xlarge">
              <Text.Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci at corporis cum eius eveniet exercitationem, ipsa ipsum
                magnam maiores molestias, non odit praesentium suscipit?
                Aspernatur dolor fuga incidunt iure quisquam.
              </Text.Paragraph>
              <Text.Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci at corporis cum eius eveniet exercitationem, ipsa ipsum
                magnam maiores molestias, non odit praesentium suscipit?
                Aspernatur dolor fuga incidunt iure quisquam.
              </Text.Paragraph>
              <Text.Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci at corporis cum eius eveniet exercitationem, ipsa ipsum
                magnam maiores molestias, non odit praesentium suscipit?
                Aspernatur dolor fuga incidunt iure quisquam.
              </Text.Paragraph>
              <Text.Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci at corporis cum eius eveniet exercitationem, ipsa ipsum
                magnam maiores molestias, non odit praesentium suscipit?
                Aspernatur dolor fuga incidunt iure quisquam.
              </Text.Paragraph>
              <Text.Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci at corporis cum eius eveniet exercitationem, ipsa ipsum
                magnam maiores molestias, non odit praesentium suscipit?
                Aspernatur dolor fuga incidunt iure quisquam.
              </Text.Paragraph>
              <Text.Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci at corporis cum eius eveniet exercitationem, ipsa ipsum
                magnam maiores molestias, non odit praesentium suscipit?
                Aspernatur dolor fuga incidunt iure quisquam.
              </Text.Paragraph>
              <Text.Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci at corporis cum eius eveniet exercitationem, ipsa ipsum
                magnam maiores molestias, non odit praesentium suscipit?
                Aspernatur dolor fuga incidunt iure quisquam.
              </Text.Paragraph>
              <Text.Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci at corporis cum eius eveniet exercitationem, ipsa ipsum
                magnam maiores molestias, non odit praesentium suscipit?
                Aspernatur dolor fuga incidunt iure quisquam.
              </Text.Paragraph>
            </Flex>
          </Modal>
        )}
      </Flex>
    );
  },
};

export default story;
