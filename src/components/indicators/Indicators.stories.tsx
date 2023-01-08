import { Role, Size } from '../../types';
import { Progress } from './Progress';
import { ProgressVariant } from './Progress/Progress';
import { BasicTemplate } from '../BasicTemplate.stories';

export const ProgressExample = BasicTemplate.bind({});
ProgressExample.args = {
  Component: Progress,
  value: 30,
  max: 100,
  dark: false
};
ProgressExample.argTypes = {
  variant: {
    control: 'select',
    options: [ProgressVariant.default, ProgressVariant.segmented]
  },
  size: {
    control: 'select',
    options: [Size.small, Size.medium, Size.large]
  },
  role: {
    control: 'select',
    options: [Role.default, Role.primary, Role.success, Role.danger]
  }
};

export default {
  component: ProgressExample,
  title: 'Indicators'
};
