import { render, screen } from '@testing-library/react';
import { Button, Popover } from 'components';

describe('Button', () => {
  test('need to render only icon when no label was passed', () => {
    render(
      <Popover content="Popover content" openedByDefault data-testid="popover">
        <Button label="Test" data-testid="button" />
      </Popover>,
    );

    const element = screen.getByTestId('element');
    expect(element.children).toHaveLength(1);
  });
});
