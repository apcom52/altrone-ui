import { StoryObj } from '@storybook/react';
import { Form, FormField, FormGroup, FormGroupVariant } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';
import { PasswordInput, TextInput } from '../../../form';

export const LinearFormStory: StoryObj<typeof Form> = {
  name: 'Linear Form',
  render: ({ ...args }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return (
      <Form {...args}>
        <FormGroup variant={FormGroupVariant.linear}>
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
