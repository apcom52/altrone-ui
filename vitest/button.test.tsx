import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Check, ArrowRight } from 'lucide-react';
import { Application, Button } from '../src';

describe('Button', () => {
  test('renders the label and the icon', () => {
    render(
      <Application>
        <Button icon={<Check data-testid="icon" />} label="Button label" />
      </Application>,
    );

    expect(screen.getByText('Button label')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  test('renders the additional icon next to the main one', () => {
    render(
      <Application>
        <Button
          icon={<Check data-testid="icon" />}
          additionalIcon={<ArrowRight data-testid="additional" />}
          label="Button label"
        />
      </Application>,
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('additional')).toBeInTheDocument();
  });

  test('does not render the label text when showLabel is false', () => {
    render(
      <Application>
        <Button
          icon={<Check />}
          label="Hidden label"
          showLabel={false}
          data-testid="element"
        />
      </Application>,
    );

    expect(screen.getByTestId('element')).not.toHaveTextContent('Hidden label');
  });

  test('calls onClick', () => {
    const onClickHandler = vi.fn();

    render(
      <Application>
        <Button label="Click" data-testid="element" onClick={onClickHandler} />
      </Application>,
    );

    fireEvent.click(screen.getByTestId('element'));
    expect(onClickHandler).toBeCalledTimes(1);
  });

  test('applies custom className and style', () => {
    render(
      <Button
        label="Label"
        data-testid="button"
        className="cls"
        style={{ color: 'rgb(0, 0, 255)' }}
      />,
    );
    expect(screen.getByTestId('button')).toHaveClass('cls');
    expect(screen.getByTestId('button')).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
