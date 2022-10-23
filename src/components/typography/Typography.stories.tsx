import {Blockquote, Heading, Message, Paragraph} from './index'
import {withAltrone} from "../../hocs";
import {Theme} from "../../types";
import {MessageRole, MessageStyle} from "./Message/Message";

const Template = ({component, dark, ...args}) => {
  return withAltrone(component, {
    theme: dark ? Theme.dark : Theme.light
  })(args)
}

export const HeadingExample = Template.bind({})
HeadingExample.args = {
  component: Heading,
  level: 1,
  children: 'Heading',
  dark: false
}

export const ParagraphExample = Template.bind({})
ParagraphExample.args = {
  component: Paragraph,
  children: 'Paragraph',
  dark: false
}

export const BlockquoteExample = Template.bind({})
BlockquoteExample.args = {
  component: Blockquote,
  author: '',
  children: 'Blockquote is here',
  dark: false
}

export const MessageExample = Template.bind({})
MessageExample.args = {
  component: Message,
  title: 'Very important message',
  children: <>
     <Paragraph>
       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium architecto atque autem
       debitis enim facilis fugit ipsam iure iusto laudantium magnam necessitatibus, nostrum perspiciatis possimus
       quisquam quod sint, vel?
     </Paragraph>
  </>,
  dark: false
}
MessageExample.argTypes = {
  style: {
    control: 'select',
    options: [MessageStyle.default, MessageStyle.primary, MessageStyle.success, MessageStyle.danger]
  },
  role: {
    control: 'select',
    options: [MessageRole.attention, MessageRole.danger, MessageRole.completed, MessageRole.help, MessageRole.failed, MessageRole.warning]
  },
}

export default {
  component: HeadingExample,
  title: 'Typography'
}