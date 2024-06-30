import { Meta, StoryObj } from '@storybook/react';
import { StorybookDecorator } from '../../global/storybook';
import { allModes } from '../../../.storybook/modes.ts';
import { Flex } from '../flex';
import { Modal } from './Modal.tsx';
import { Text } from '../text';
import { Button } from '../button';
import { Tooltip } from '../tooltip';

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
    return (
      <Flex direction="vertical" gap="m" align="start">
        <Text.Heading role="inner">Modals</Text.Heading>
        <Flex direction="horizontal" gap="m">
          <Modal
            title="Modal title"
            content={
              <Flex direction="vertical" gap="xl">
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
              </Flex>
            }
            leftActions={[<Tooltip content="This is tooltip" />]}
            actions={[<Button role="primary" label="OK" />]}
          >
            <Button label="Open modal" />
          </Modal>
          <Modal
            title="Modal title"
            content={
              <Flex direction="vertical" gap="xl">
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
              </Flex>
            }
            leftActions={[<Tooltip content="This is tooltip" />]}
            actions={[<Button role="primary" label="OK" />]}
            size="s"
          >
            <Button label="Small modal" />
          </Modal>
          <Modal
            title="Modal title"
            content={
              <Flex direction="vertical" gap="xl">
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
                <Text.Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Adipisci at corporis cum eius eveniet exercitationem, ipsa
                  ipsum magnam maiores molestias, non odit praesentium suscipit?
                  Aspernatur dolor fuga incidunt iure quisquam.
                </Text.Paragraph>
              </Flex>
            }
            leftActions={[<Tooltip content="This is tooltip" />]}
            actions={[<Button role="primary" label="OK" />]}
            size="l"
          >
            <Button label="Large modal" />
          </Modal>
        </Flex>
      </Flex>
    );
  },
};

export default story;
