import { StoryObj } from '@storybook/react';
import { Form, FormField, FormGroup } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';
import { PasswordInput, TextInput } from '../../../form';

export const DefaultFormStory: StoryObj<typeof Form> = {
  name: 'Default Form',
  render: ({ ...args }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return (
      <Form {...args}>
        <FormGroup>
          <FormField label="Your username">
            <TextInput placeholder="Username" value={login} onChange={setLogin} />
          </FormField>
          <FormField label="Your password">
            <PasswordInput placeholder="Password" value={password} onChange={setPassword} />
          </FormField>
        </FormGroup>
      </Form>
    );
  },
  decorators: [StorybookDecorator]
};
