import {
  ScreenName,
  Heading,
  Paragraph,
  Inline,
  Link,
  Code,
  Keyboard,
  List,
  ListItem,
  Section,
} from './components';
import { memo } from 'react';
import { Flex } from 'components/flex';
import { TextProps } from './Text.types.ts';

const TextComponent = memo<TextProps>(
  ({ children, gap = 'l', ...restProps }) => {
    return (
      <Flex tagName="article" direction="vertical" gap={gap} {...restProps}>
        {children}
      </Flex>
    );
  },
);

const TextNamespace = Object.assign(TextComponent, {
  ScreenName: ScreenName,
  Heading: Heading,
  Paragraph: Paragraph,
  Inline: Inline,
  Link: Link,
  Code: Code,
  Keyboard: Keyboard,
  List: List,
  ListItem: ListItem,
  Section: Section,
});

export { TextNamespace as Text };
