import { Icon } from './index';
import { BasicTemplate } from '../BasicTemplate';

export const IconExample = BasicTemplate.bind({});
IconExample.args = {
  Component: Icon,
  i: 'face',
  size: 32,
  dark: false,
  style: 'outlined',
  padding: 0
};

IconExample.argTypes = {
  style: {
    control: 'select',
    options: ['outlined', 'rounded', 'sharp']
  }
};

export default {
  component: IconExample,
  title: 'Icons'
};
