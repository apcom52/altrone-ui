import Box from './Box'

export default {
  component: Box,
  title: 'Box'
}

const Template = args => <Box {...args} />

export const Default = Template.bind({})
Default.args = {
  tagName: 'div',
  children: 'Hello world',
  margin: 5,
}