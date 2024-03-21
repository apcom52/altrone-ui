import { StoryObj } from '@storybook/react';
import { Modal, ModalAction } from '../index';
import { StorybookBackgroundDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';
import { ButtonContainer } from '../../ButtonContainer';
import { Paragraph } from '../../../typography';
import { Form, FormField } from '../../Form';
import { TextInput, Button } from '../../../form';
import { Role } from '../../../../types';

export const MODAL_ACTIONS: ModalAction[] = [
  {
    label: 'Subscribe',
    role: Role.primary,
    onClick: () => alert('subscribed!')
  }
];

export const DefaultModalStory: StoryObj<typeof Modal> = {
  name: 'Default Form',
  render: ({ ...args }) => {
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState('');

    return (
      <ButtonContainer>
        <Button onClick={() => setVisible(true)}>Open Modal</Button>
        {visible && (
          <Modal {...args} onClose={() => setVisible(false)}>
            <Paragraph>Enter your email address to subscribe</Paragraph>
            <Form>
              <FormField label="Email address">
                <TextInput value={email} onChange={setEmail} placeholder="example@gmail.com" />
              </FormField>
            </Form>
            <Paragraph>Enter your email address to subscribe</Paragraph>
            <Form>
              <FormField label="Email address">
                <TextInput value={email} onChange={setEmail} placeholder="example@gmail.com" />
              </FormField>
            </Form>
            <Paragraph>Enter your email address to subscribe</Paragraph>
            <Form>
              <FormField label="Email address">
                <TextInput value={email} onChange={setEmail} placeholder="example@gmail.com" />
              </FormField>
            </Form>
            <Paragraph>Enter your email address to subscribe</Paragraph>
            <Form>
              <FormField label="Email address">
                <TextInput value={email} onChange={setEmail} placeholder="example@gmail.com" />
              </FormField>
            </Form>
            <Paragraph>Enter your email address to subscribe</Paragraph>
            <Form>
              <FormField label="Email address">
                <TextInput value={email} onChange={setEmail} placeholder="example@gmail.com" />
              </FormField>
            </Form>
            <Paragraph>Enter your email address to subscribe</Paragraph>
            <Form>
              <FormField label="Email address">
                <TextInput value={email} onChange={setEmail} placeholder="example@gmail.com" />
              </FormField>
            </Form>
            <Paragraph>Enter your email address to subscribe</Paragraph>
            <Form>
              <FormField label="Email address">
                <TextInput value={email} onChange={setEmail} placeholder="example@gmail.com" />
              </FormField>
            </Form>
            <Paragraph>Enter your email address to subscribe</Paragraph>
            <Form>
              <FormField label="Email address">
                <TextInput value={email} onChange={setEmail} placeholder="example@gmail.com" />
              </FormField>
            </Form>
            <Paragraph>Enter your email address to subscribe</Paragraph>
            <Form>
              <FormField label="Email address">
                <TextInput value={email} onChange={setEmail} placeholder="example@gmail.com" />
              </FormField>
            </Form>
            <Paragraph>Enter your email address to subscribe</Paragraph>
            <Form>
              <FormField label="Email address">
                <TextInput value={email} onChange={setEmail} placeholder="example@gmail.com" />
              </FormField>
            </Form>
            <Paragraph>Enter your email address to subscribe</Paragraph>
            <Form>
              <FormField label="Email address">
                <TextInput value={email} onChange={setEmail} placeholder="example@gmail.com" />
              </FormField>
            </Form>
            <Paragraph>Enter your email address to subscribe</Paragraph>
            <Form>
              <FormField label="Email address">
                <TextInput value={email} onChange={setEmail} placeholder="example@gmail.com" />
              </FormField>
            </Form>
          </Modal>
        )}
      </ButtonContainer>
    );
  },
  decorators: [StorybookBackgroundDecorator]
};
