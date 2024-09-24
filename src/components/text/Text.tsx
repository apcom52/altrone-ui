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
import { useConfiguration } from '../configuration';
import clsx from 'clsx';

const TextComponent = memo<TextProps>(
  ({ children, gap = 'l', className, style, ...restProps }) => {
    const { text: textConfig = {} } = useConfiguration();

    const cls = clsx(className, textConfig.className);
    const styles = {
      ...textConfig.style,
      ...style,
    };

    return (
      <Flex
        tagName="article"
        direction="vertical"
        gap={gap}
        className={cls}
        style={styles}
        {...restProps}
      >
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
