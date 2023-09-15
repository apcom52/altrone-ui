import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Spoiler } from './index';

describe('Containers.Spoiler', () => {
  test('should render correctly (content is visible)', () => {
    render(<Spoiler label="Header text">content</Spoiler>);

    expect(screen.getByText('Header text')).toBeInTheDocument();
    expect(screen.queryByText('content')).toBeInTheDocument();
  });

  test('content is not visible by default', () => {
    render(
      <Spoiler label="Header text" openedByDefault={false}>
        content
      </Spoiler>
    );

    expect(screen.getByText('Header text')).toBeInTheDocument();
    expect(screen.queryByText('content')).not.toBeInTheDocument();
  });

  test('when user clicks on the header it should toggle the content', () => {
    const { rerender } = render(
      <Spoiler label="Header text" openedByDefault={false}>
        content
      </Spoiler>
    );

    expect(screen.queryByText('content')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Header text'));

    rerender(
      <Spoiler label="Header text" openedByDefault={false}>
        content
      </Spoiler>
    );

    expect(screen.getByText('Header text')).toBeInTheDocument();
    expect(screen.queryByText('content')).toBeInTheDocument();
  });
});
