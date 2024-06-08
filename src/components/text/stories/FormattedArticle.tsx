import { Flex, Text } from 'components';
import { TextHeadingRoles, TextListType } from '../Text.types.ts';

export const FormattedArticle = () => {
  return (
    <Flex gap="xl">
      <Text.Heading>
        Exploring the Power of Markup Language: Enhancing Textual Content
      </Text.Heading>
      <Text.Paragraph>
        In the realm of digital communication and content creation, the markup
        language stands as a cornerstone, offering a versatile toolkit for
        emphasizing, structuring, and enriching textual content. From basic
        formatting to advanced styling, markup language provides a plethora of
        options to elevate the presentation and readability of information. In
        this article, we delve into the diverse functionalities of markup
        language, exploring its various elements and their applications.
      </Text.Paragraph>
      <Text.Heading role={TextHeadingRoles.subheading}>
        Understanding Basic Formatting
      </Text.Heading>
      <Text.Paragraph>
        At its core, markup language enables the modification of text through
        simple syntax. Let's begin by examining some fundamental formatting
        options:
      </Text.Paragraph>
      <Text.List type={TextListType.ordered}>
        <Text.ListItem>
          <Text.Inline italic>Italic</Text.Inline>: Used to emphasize or{' '}
          <Text.Inline highlighted>
            highlight specific words or phrases
          </Text.Inline>
          , the italic style adds a subtle slant to the text, drawing the
          reader's attention without overpowering the surrounding content.
        </Text.ListItem>
        <Text.ListItem>
          <Text.Inline bold>Bold</Text.Inline>: For a more pronounced emphasis,
          the bold style is employed. It enhances the visibility and importance
          of selected text elements, making them stand out within the document.
        </Text.ListItem>
        <Text.ListItem>
          <Text.Inline underline>Underline</Text.Inline>: Underlining text is a
          classic method of indicating importance or providing emphasis. It
          serves as a visual cue, directing the reader's focus to the underlined
          portion.
        </Text.ListItem>
        <Text.ListItem>
          <Text.Inline deleted>Deleted Text</Text.Inline>: Sometimes, it's
          necessary to strikethrough certain text to denote its removal or
          revision. This helps to maintain clarity and transparency, especially
          in collaborative writing environments.
        </Text.ListItem>
      </Text.List>
      <Text.Heading role={TextHeadingRoles.subheading}>
        Advanced Styling Techniques
      </Text.Heading>
      <Text.Paragraph>
        Markup language also offers advanced styling options to cater to diverse
        content needs:
      </Text.Paragraph>
      <Text.List type={TextListType.ordered}>
        <Text.ListItem>
          <Text.Inline bold>Links</Text.Inline>: Hyperlinks are integral
          components of digital content, facilitating navigation and
          cross-referencing. By embedding links within text, users can
          seamlessly navigate between related resources or external sources. For
          example,{' '}
          <Text.Link href="https://openai.com/" target="_blank">
            OpenAI
          </Text.Link>{' '}
          is a leading organization in artificial intelligence research.
        </Text.ListItem>
        <Text.ListItem>
          <Text.Inline bold>Code Elements</Text.Inline>: When incorporating code
          snippets or programming instructions, markup language provides
          specific elements to distinguish code blocks from regular text. This
          ensures proper formatting and readability for developers and technical
          audiences. <Text.Code>npm i react</Text.Code>
        </Text.ListItem>
        <Text.ListItem>
          <Text.Inline bold>Keyboard Shortcuts</Text.Inline>: In tutorials or
          instructional materials, keyboard shortcuts play a crucial role in
          guiding users through specific actions or commands. By presenting
          shortcuts in a standardized format, markup language enhances
          comprehension and usability. For instance, pressing{' '}
          <Text.Keyboard>Ctrl + C</Text.Keyboard> copies selected text, while
          <Text.Keyboard>Ctrl + V</Text.Keyboard> pastes it.
        </Text.ListItem>
      </Text.List>
      <Text.Heading role={TextHeadingRoles.subheading}>Conclusion</Text.Heading>
      <Text.Paragraph>
        In essence, markup language serves as a versatile tool for enhancing
        textual content across various digital platforms. By mastering its
        diverse elements and functionalities, content creators can effectively
        communicate ideas, engage audiences, and streamline information
        dissemination. Whether it's basic formatting, advanced styling, or
        specialized annotations, the power of markup language lies in its
        ability to transform ordinary text into dynamic and visually compelling
        content.
      </Text.Paragraph>
      <Text.Paragraph>
        Through continual exploration and experimentation, individuals can
        unlock the full potential of markup language, harnessing its
        capabilities to craft impactful narratives and deliver immersive user
        experiences in the digital landscape.
      </Text.Paragraph>
    </Flex>
  );
};
