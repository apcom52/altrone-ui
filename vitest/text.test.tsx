import { createRef } from 'react';
import { expect, test, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from '../src';

describe('Text', () => {
  test('renders a span and applies className, style and native attributes', () => {
    render(
      <Text
        className="customClassName"
        style={{ color: 'rgb(0, 0, 255)' }}
        id="text-id"
        data-testid="text"
      >
        content
      </Text>,
    );

    const element = screen.getByTestId('text');
    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveClass('customClassName');
    expect(element).toHaveStyle('color: rgb(0, 0, 255)');
    expect(element.id).toBe('text-id');
  });

  test('picks the tag from block, list, item and href props', () => {
    render(
      <>
        <Text block data-testid="block">
          block
        </Text>
        <Text list="numeric" data-testid="numeric">
          <Text item data-testid="item">
            item
          </Text>
        </Text>
        <Text list="marked" data-testid="marked">
          marked
        </Text>
        <Text href="/page" data-testid="link">
          link
        </Text>
      </>,
    );

    expect(screen.getByTestId('block').tagName).toBe('P');
    expect(screen.getByTestId('numeric').tagName).toBe('OL');
    expect(screen.getByTestId('item').tagName).toBe('LI');
    expect(screen.getByTestId('marked').tagName).toBe('UL');
    expect(screen.getByTestId('link').tagName).toBe('A');
  });

  test('external link opens in a new tab and overrides target and rel', () => {
    render(
      <Text href="https://example.com" external target="_self" rel="author">
        link
      </Text>,
    );

    const link = screen.getByText('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('internal link keeps the passed target and rel', () => {
    render(
      <Text href="/page" target="_self" rel="author">
        link
      </Text>,
    );

    const link = screen.getByText('link');
    expect(link).toHaveAttribute('target', '_self');
    expect(link).toHaveAttribute('rel', 'author');
  });

  test('lineClamp sets the css variable, including zero', () => {
    render(
      <Text lineClamp={0} data-testid="text">
        content
      </Text>,
    );

    expect(
      screen.getByTestId('text').style.getPropertyValue('--_text-line-clamp'),
    ).toBe('0');
  });

  test('modifier props add classes and do not leak onto the DOM node', () => {
    render(
      <Text
        code
        kbd
        highlighted
        italic
        underline
        deleted
        truncate
        nowrap
        size={3}
        weight="bold"
        align="center"
        color="danger"
        data-testid="text"
      >
        content
      </Text>,
    );

    const element = screen.getByTestId('text');
    expect(element.classList.length).toBeGreaterThan(12);
    ['code', 'kbd', 'highlighted', 'truncate', 'nowrap', 'weight'].forEach(
      (attribute) => expect(element).not.toHaveAttribute(attribute),
    );
  });

  test('forwards ref to the root element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Text ref={ref}>content</Text>);

    expect(ref.current).toBe(screen.getByText('content'));
  });

  test('asChild merges className, style and ref onto the child', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Text
        asChild
        ref={ref}
        className="customClassName"
        style={{ color: 'rgb(0, 0, 255)' }}
      >
        <h2 className="childClassName">content</h2>
      </Text>,
    );

    const element = screen.getByText('content');
    expect(element.tagName).toBe('H2');
    expect(element).toHaveClass('customClassName', 'childClassName');
    expect(element).toHaveStyle('color: rgb(0, 0, 255)');
    expect(ref.current).toBe(element);
  });

  test('asChild without an element child renders nothing', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<Text asChild>{'plain' as never}</Text>);

    expect(container).toBeEmptyDOMElement();
    warn.mockRestore();
  });
});
