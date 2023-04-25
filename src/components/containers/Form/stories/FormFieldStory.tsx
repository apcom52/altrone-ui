import { StoryObj } from '@storybook/react';
import { Form, FormField, FormGroup } from '../index';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { useState } from 'react';
import { TextInput } from '../../../form';

export const FormFieldStory: StoryObj<typeof FormField> = {
  name: 'Form Field',
  render: ({ ...args }) => {
    const [login, setLogin] = useState('');

    return (
      <Form>
        <FormGroup>
          <FormField {...args}>
            <TextInput placeholder="Username" value={login} onChange={setLogin} />
          </FormField>
        </FormGroup>
      </Form>
    );
  },
  decorators: [StorybookDecorator]
};
