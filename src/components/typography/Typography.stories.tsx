import { Blockquote, Heading, Paragraph } from './index';
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

export default {
  component: HeadingExample,
  title: 'Typography'
};
