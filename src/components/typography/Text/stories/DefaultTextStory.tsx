import { StoryObj } from '@storybook/react';
import { Text } from '../Text';
import { StorybookDecorator } from '../../../../storybook/StorybookPlayground';
import { Size } from '../../../../types';
import { TextBlock } from '../../TextBlock';

export const DefaultTextStory: StoryObj<typeof Text> = {
  name: 'Default Text',
  storyName: 'Default Text',
  render: ({ ...args }) => {
    return (
      <>
        <TextBlock role="heading" size={Size.large}>
          Enhancing Document Visuals: Exploring Text Decorations in Microsoft Word
        </TextBlock>
        <TextBlock>
          Text decorations in <Text link="https://microsoft.com">Microsoft Word</Text> (
          <Text role="keyboard">⌘+Shift+W</Text>) encompass a <Text color="secondary">variety</Text>{' '}
          of formatting options that enhance the <Text color="success">visual appeal</Text> and
          readability of documents. These decorations include features such as{' '}
          <Text bold>bold</Text>, <Text italic>italics</Text>, <Text underline>underline</Text>,{' '}
          <Text deleted>strikethrough</Text>, and subscript/superscript. Bold{' '}
          <Text color="warning">formatting adds emphasis to</Text> specific words or phrases,{' '}
          <Text bold italic underline>
            making them stand out
          </Text>{' '}
          within the text. Italics are commonly used for emphasis, to denote titles of works, or to
          indicate foreign words. Underlining serves to <Text highlighted>highlight text</Text> and
          is often utilized for headings or hyperlinks. Strikethrough is useful{' '}
          <Text highlighted color="danger" ellipsis>
            for indicating deleted or incorrect information
          </Text>
          , while <Text color="disabled">subscript and superscript</Text> are employed for writing
          chemical formulas, mathematical equations, or footnotes. Together, these{' '}
          <Text role="label">text decorations</Text> offer{' '}
          <Text color="danger">versatility and clarity</Text> in conveying meaning and structure
          within <Text role="code">Word</Text> documents.
        </TextBlock>
      </>
    );
  },
  decorators: [StorybookDecorator]
};
