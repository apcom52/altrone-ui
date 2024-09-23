import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { AltroneApplication, Text } from '../src';

describe('Text', () => {
  test('Text has to have article tag and apply custom css class and id', () => {
    render(
      <Text className="customClassName" data-testid="text">
        content
      </Text>,
    );

    expect(screen.getByText('content')).toBeInTheDocument();
    expect(screen.getByTestId('text')).toHaveClass('customClassName');
    expect(screen.getByTestId('text').tagName).toBe('ARTICLE');
  });

  test('Text.Section has to have article tag and apply custom css class and id', () => {
    render(
      <Text.Section className="customClassName" data-testid="section">
        content
      </Text.Section>,
    );

    expect(screen.getByText('content')).toBeInTheDocument();
    expect(screen.getByTestId('section')).toHaveClass('customClassName');
    expect(screen.getByTestId('section').tagName).toBe('SECTION');
  });

  test('ScreenName has to have h1 tag and apply custom css class and id', () => {
    render(
      <Text.ScreenName className="customClassName" id="text-id">
        ScreenName heading
      </Text.ScreenName>,
    );

    const element = screen.getByText('ScreenName heading');
    expect(element.tagName).toBe('H1');
    expect(element.className).toContain('customClassName');
    expect(element.id).toBe('text-id');
  });

  test('ScreenName has to have h1 tag and apply custom css class and id', () => {
    render(
      <Text.ScreenName className="customClassName" id="text-id">
        ScreenName heading
      </Text.ScreenName>,
    );

    const element = screen.getByText('ScreenName heading');
    expect(element.tagName).toBe('H1');
    expect(element.className).toContain('customClassName');
    expect(element.id).toBe('text-id');
  });

  test('Heading has to have h2 and h4 tags and apply custom css class and id', () => {
    render(
      <>
        <Text.Heading level={2} className="customClassName">
          Second Level Heading
        </Text.Heading>
        <Text.Heading level={4} id="text-id">
          Forth Level Heading
        </Text.Heading>
      </>,
    );

    const element1 = screen.getByText('Second Level Heading');
    expect(element1.tagName).toBe('H2');
    expect(element1.className).toContain('customClassName');

    const element2 = screen.getByText('Forth Level Heading');
    expect(element2.tagName).toBe('H4');
    expect(element2.id).toContain('text-id');
  });

  test('Paragraph has to have suitable tag and apply classes', () => {
    render(
      <>
        <Text.Paragraph className="customClassName" id="paragraph">
          Content
        </Text.Paragraph>
      </>,
    );

    const element1 = screen.getByText('Content');
    expect(element1.tagName).toBe('P');
    expect(element1.className).toContain('customClassName');
    expect(element1.id).toBe('paragraph');
  });

  test('Inline has to have suitable tag and apply classes', () => {
    render(
      <>
        <Text.Inline bold className="customClassName" id="bold">
          Bold content
        </Text.Inline>
        <Text.Inline italic>Italic content</Text.Inline>
        <Text.Inline underline>Underlined content</Text.Inline>
        <Text.Inline deleted>Deleted content</Text.Inline>
        <Text.Inline highlighted>Highlighted content</Text.Inline>
      </>,
    );

    const element1 = screen.getByText('Bold content');
    expect(element1.tagName).toBe('STRONG');
    expect(element1.className).toContain('customClassName');
    expect(element1.id).toBe('bold');

    const element2 = screen.getByText('Italic content');
    expect(element2.tagName).toBe('EM');

    const element3 = screen.getByText('Underlined content');
    expect(element3.tagName).toBe('U');

    const element4 = screen.getByText('Deleted content');
    expect(element4.tagName).toBe('DEL');

    const element5 = screen.getByText('Highlighted content');
    expect(element5.tagName).toBe('MARK');
  });

  test('Code has to have suitable tag and apply classes', () => {
    render(
      <>
        <Text.Code className="customClassName" id="code">
          Content
        </Text.Code>
      </>,
    );

    const element1 = screen.getByText('Content');
    expect(element1.tagName).toBe('CODE');
    expect(element1.className).toContain('customClassName');
    expect(element1.id).toBe('code');
  });

  test('Keyboard has to have suitable tag and apply classes', () => {
    render(
      <>
        <Text.Keyboard className="customClassName" id="keyboard">
          Content
        </Text.Keyboard>
      </>,
    );

    const element1 = screen.getByText('Content');
    expect(element1.tagName).toBe('KBD');
    expect(element1.className).toContain('customClassName');
    expect(element1.id).toBe('keyboard');
  });

  test('List and ListItem have to have suitable tag and apply classes', () => {
    render(
      <>
        <Text.List
          type="numeric"
          className="customClassName"
          id="list"
          data-testid="list-1"
        >
          <Text.ListItem
            className="item-classname"
            id="item-id"
            data-testid="item-1"
          >
            Item 1
          </Text.ListItem>
          <Text.ListItem>Item 2</Text.ListItem>
        </Text.List>
        <Text.List type="marked" data-testid="list-2">
          <Text.ListItem>Item 3</Text.ListItem>
          <Text.ListItem>Item 4</Text.ListItem>
        </Text.List>
      </>,
    );

    const element1 = screen.getByTestId('list-1');
    expect(element1.tagName).toBe('OL');
    expect(element1.className).toContain('customClassName');
    expect(element1.id).toBe('list');

    const element2 = screen.getByTestId('item-1');
    expect(element2.tagName).toBe('LI');
    expect(element2.className).toContain('item-classname');
    expect(element2.id).toBe('item-id');

    const element3 = screen.getByTestId('list-2');
    expect(element3.tagName).toBe('UL');
  });

  test('check that Text configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          text: {
            section: { className: 'cls', style: { color: 'blue' } },
            screenName: { className: 'cls', style: { color: 'blue' } },
            heading: { className: 'cls', style: { color: 'blue' } },
            paragraph: { className: 'cls', style: { color: 'blue' } },
            inline: { className: 'cls', style: { color: 'blue' } },
            list: { className: 'cls', style: { color: 'blue' } },
            listItem: { className: 'cls', style: { color: 'blue' } },
            link: { className: 'cls', style: { color: 'blue' } },
            code: { className: 'cls', style: { color: 'blue' } },
            keyboard: { className: 'cls', style: { color: 'blue' } },
          },
        }}
      >
        <Text data-testid="wrapper">
          <Text.ScreenName data-testid="screenName">content</Text.ScreenName>
          <Text.Section data-testid="section">content</Text.Section>
          <Text.Heading data-testid="heading">content</Text.Heading>
          <Text.Paragraph data-testid="paragraph">content</Text.Paragraph>
          <Text.Inline data-testid="inline">content</Text.Inline>
          <Text.List data-testid="list">content</Text.List>
          <Text.ListItem data-testid="listItem">content</Text.ListItem>
          <Text.Link data-testid="link">content</Text.Link>
          <Text.Code data-testid="code">content</Text.Code>
          <Text.Keyboard data-testid="keyboard">content</Text.Keyboard>
        </Text>
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
});
