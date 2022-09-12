import { Heading, Paragraph, Blockquote } from './index'

const Template = ({component, ...args}) => {
  const Component = component
  return <Component {...args} />
}

export const HeadingExample = Template.bind({})
HeadingExample.args = {
  component: Heading,
  level: 1,
  children: 'Heading'
}

export const ParagraphExample = Template.bind({})
ParagraphExample.args = {
  component: Paragraph,
  children: 'Paragraph'
}

export const BlockquoteExample = Template.bind({})
BlockquoteExample.args = {
  component: Blockquote,
  children: 'Blockquote is here'
}

export default {
  component: HeadingExample,
  title: 'Typography'
}