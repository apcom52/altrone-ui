import { render, screen } from '@testing-library/react';
import {
  AltroneApplication,
  Message,
  Icon,
  Text,
  Flex,
  List,
} from 'components';

describe('Configation', () => {
  test('check that Flex configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{ flex: { className: 'cls', style: { color: 'blue' } } }}
      >
        <Flex data-testid="element">content</Flex>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });

  test('check that Icon configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{ icon: { className: 'cls', style: { color: 'blue' } } }}
      >
        <Icon i="check" data-testid="element" />
      </AltroneApplication>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });

  test('check that Message configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{ message: { className: 'cls', style: { color: 'blue' } } }}
      >
        <Message data-testid="element">content</Message>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });

  test('check that Text configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          textScreenName: { className: 'cls', style: { color: 'blue' } },
          textHeading: { className: 'cls', style: { color: 'blue' } },
          textParagraph: { className: 'cls', style: { color: 'blue' } },
          textInline: { className: 'cls', style: { color: 'blue' } },
          textList: { className: 'cls', style: { color: 'blue' } },
          textListItem: { className: 'cls', style: { color: 'blue' } },
          textLink: { className: 'cls', style: { color: 'blue' } },
          textCode: { className: 'cls', style: { color: 'blue' } },
          textKeyboard: { className: 'cls', style: { color: 'blue' } },
        }}
      >
        <Text.ScreenName data-testid="screenName">content</Text.ScreenName>
        <Text.Heading data-testid="heading">content</Text.Heading>
        <Text.Paragraph data-testid="paragraph">content</Text.Paragraph>
        <Text.Inline data-testid="inline">content</Text.Inline>
        <Text.List data-testid="list">content</Text.List>
        <Text.ListItem data-testid="listItem">content</Text.ListItem>
        <Text.Link data-testid="link">content</Text.Link>
        <Text.Code data-testid="code">content</Text.Code>
        <Text.Keyboard data-testid="keyboard">content</Text.Keyboard>
      </AltroneApplication>,
    );

    const screenName = screen.getByTestId('screenName');
    expect(screenName).toHaveClass('cls');
    expect(screenName).toHaveStyle('color: blue');

    const heading = screen.getByTestId('heading');
    expect(heading).toHaveClass('cls');
    expect(heading).toHaveStyle('color: blue');

    const paragraph = screen.getByTestId('paragraph');
    expect(paragraph).toHaveClass('cls');
    expect(paragraph).toHaveStyle('color: blue');

    const inline = screen.getByTestId('inline');
    expect(inline).toHaveClass('cls');
    expect(inline).toHaveStyle('color: blue');

    const list = screen.getByTestId('list');
    expect(list).toHaveClass('cls');
    expect(list).toHaveStyle('color: blue');

    const listItem = screen.getByTestId('listItem');
    expect(listItem).toHaveClass('cls');
    expect(listItem).toHaveStyle('color: blue');

    const link = screen.getByTestId('link');
    expect(link).toHaveClass('cls');
    expect(link).toHaveStyle('color: blue');

    const code = screen.getByTestId('code');
    expect(code).toHaveClass('cls');
    expect(code).toHaveStyle('color: blue');

    const keyboard = screen.getByTestId('keyboard');
    expect(keyboard).toHaveClass('cls');
    expect(keyboard).toHaveStyle('color: blue');
  });

  test('check that List configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{ list: { className: 'cls', style: { color: 'blue' } } }}
      >
        <List data={[]} renderItem={() => <div />} data-testid="element" />
      </AltroneApplication>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
