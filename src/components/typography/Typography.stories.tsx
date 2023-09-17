import { Blockquote, Heading, Message, Paragraph } from './index';
import { Elevation, Role } from '../../types';
import { Icon } from './Icon';
import { BasicTemplate } from '../BasicTemplate';

export const HeadingExample = BasicTemplate.bind({});
HeadingExample.args = {
  Component: Heading,
  level: 1,
  children: 'Heading',
  dark: false
};

export const ParagraphExample = BasicTemplate.bind({});
ParagraphExample.args = {
  Component: Paragraph,
  children: 'Paragraph',
  dark: false
};

export const BlockquoteExample = BasicTemplate.bind({});
BlockquoteExample.args = {
  Component: Blockquote,
  author: '',
  children: 'Blockquote is here',
  dark: false
};

export const MessageExample = BasicTemplate.bind({});
MessageExample.args = {
  Component: Message,
  title: 'Very important message',
  children: (
    <>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium architecto
        atque autem debitis enim facilis fugit ipsam iure iusto laudantium magnam necessitatibus,
        nostrum perspiciatis possimus quisquam quod sint, vel?
      </Paragraph>
    </>
  ),
  IconComponent: <Icon i="warning" />,
  dark: false,
  elevation: Elevation.floating
};
MessageExample.argTypes = {
  role: {
    control: 'select',
    options: [Role.default, Role.primary, Role.success, Role.danger]
  }
};

export const IconExample = BasicTemplate.bind({});
IconExample.args = {
  Component: Icon,
  i: 'face',
  size: 32,
  dark: false,
  style: 'outlined'
};

export default {
  component: HeadingExample,
  title: 'Typography'
};
