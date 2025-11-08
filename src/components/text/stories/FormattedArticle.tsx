import { Button, Flex, Text, TextInput } from 'components';

export const FormattedArticle = () => {
  return (
    <Flex direction="vertical" gap="l">
      <Text size={8} weight="bold" block>
        Exploring the Power of Markup Language: Enhancing Textual Content
      </Text>
      <Text block>
        In the realm of digital communication and content creation, the markup
        language stands as a cornerstone, offering a versatile toolkit for
        emphasizing, structuring, and enriching textual content. From basic
        formatting to advanced styling, markup language provides a plethora of
        options to elevate the presentation and readability of information. In
        this article, we delve into the diverse functionalities of markup
        language, exploring its various elements and their applications.
      </Text>
      <Text size={6} weight="bold" block>
        Understanding Basic Formatting
      </Text>
      <Text block>
        At its core, markup language enables the modification of text through
        simple syntax. Let's begin by examining some fundamental formatting
        options:
      </Text>
      <Text list="numeric">
        <Text item>
          <Text italic>Italic</Text>: Used to emphasize or{' '}
          <Text highlighted>highlight specific words or phrases</Text>, the
          italic style adds a subtle slant to the text, drawing the reader's
          attention without overpowering the surrounding content.
        </Text>
        <Text item>
          <Text weight="bold">Bold</Text>: For a more pronounced emphasis, the
          bold style is employed. It enhances the visibility and importance of
          selected text elements, making them stand out within the document.
        </Text>
        <Text item>
          <Text underline>Underline</Text>: Underlining text is a classic method
          of indicating importance or providing emphasis. It serves as a visual
          cue, directing the reader's focus to the underlined portion.
        </Text>
        <Text item>
          <Text deleted>Deleted Text</Text>: Sometimes, it's necessary to
          strikethrough certain text to denote its removal or revision. This
          helps to maintain clarity and transparency, especially in
          collaborative writing environments.
        </Text>
      </Text>
      <Text size={6} weight="bold" block>
        Advanced Styling Techniques
      </Text>
      <Text block>
        Markup language also offers advanced styling options to cater to diverse
        content needs:
      </Text>
      <Text list="numeric">
        <Text item>
          <Text weight="bold">Links</Text>: Hyperlinks are integral components
          of digital content, facilitating navigation and cross-referencing. By
          embedding links within text, users can seamlessly navigate between
          related resources or external sources. For example,{' '}
          <Text href="https://openai.com/" target="_blank">
            OpenAI
          </Text>{' '}
          is a leading organization in artificial intelligence research.
        </Text>
        <TextInput />
        <Button size="l" label="Button for testing" />
        <Text item>
          <Text weight="bold">Code Elements</Text>: When incorporating code
          snippets or programming instructions, markup language provides
          specific elements to distinguish code blocks from regular text. This
          ensures proper formatting and readability for developers and technical
          audiences <Text code>npm i react</Text>.
        </Text>
        <Text item>
          <Text weight="bold">Keyboard Shortcuts</Text>: In tutorials or
          instructional materials, keyboard shortcuts play a crucial role in
          guiding users through specific actions or commands. By presenting
          shortcuts in a standardized format, markup language enhances
          comprehension and usability. For instance, pressing{' '}
          <Text kbd>Ctrl + C</Text> copies selected text, while
          <Text kbd>Ctrl + V</Text> pastes it.
        </Text>
      </Text>
      <Text size={6} weight="bold" block>
        Conclusion
      </Text>
      <Text block>
        In essence, markup language serves as a versatile tool for enhancing
        textual content across various digital platforms. By mastering its
        diverse elements and functionalities, content creators can effectively
        communicate ideas, engage audiences, and streamline information
        dissemination. Whether it's basic formatting, advanced styling, or
        specialized annotations, the power of markup language lies in its
        ability to transform ordinary text into dynamic and visually compelling
        content.
      </Text>
      <Text block>
        Through continual exploration and experimentation, individuals can
        unlock the full potential of markup language, harnessing its
        capabilities to craft impactful narratives and deliver immersive user
        experiences in the digital landscape.
      </Text>
      <Button size="l" label="Test button" />
    </Flex>
  );
};
