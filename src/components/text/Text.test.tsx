import { render, screen } from '@testing-library/react';
import { Text } from './Text.tsx';
import { TextListType } from './Text.types.ts';

describe('Text', () => {
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
          type={TextListType.ordered}
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
        <Text.List type={TextListType.unordered} data-testid="list-2">
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
});
