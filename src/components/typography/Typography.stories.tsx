import { Heading, Paragraph, Blockquote } from './index'
import {withAltrone} from "../../hocs";
import {Theme} from "../../types";

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

export default {
  component: HeadingExample,
  title: 'Typography'
}