import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextInput } from './index';
import { InputIslandType } from './TextInput';
import { Icon } from '../../icons';
import { Size } from '../../../types';

const onChange = () => null;
const textIsland = {
  type: InputIslandType.text,
  content: 'the end'
};

const SUGGESTIONS = ['Mike', 'Daniel', 'Dmitry', 'Joseph'];

class ResizeObserver {
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
}

describe('Form.TextInput', () => {
  beforeEach(() => {
    window.ResizeObserver = ResizeObserver;
  });

  test('should render correctly', () => {
    render(<TextInput value="test" onChange={() => null} />);
    const inputElement: HTMLInputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe('test');
  });

  test('should hint text works correctly', () => {
    render(<TextInput value="test" onChange={() => null} hintText="hint" />);
    const hintElement = screen.getByText('hint');
    expect(hintElement).toBeInTheDocument();
    expect(hintElement.textContent).toBe('hint');
  });

  test('should errorText works correctly', () => {
    render(<TextInput value="test" onChange={() => null} errorText="error" />);
    const textInputElement = screen.getByTestId('text-input');
    const errorElement = screen.getByText('error');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement.textContent).toBe('error');
  });

  test('should required works correctly', () => {
    render(<TextInput value="test" onChange={() => null} required />);
    const textInputElement = screen.getByTestId('text-input');
    const asteriskElement = screen.getByText('*');
    expect(textInputElement).toHaveClass('alt-text-input--required');
    expect(asteriskElement).toBeInTheDocument();
  });

  test('should disabled works correctly', () => {
    render(<TextInput value="test" onChange={() => null} disabled />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('disabled', '');
  });

  test('should text-islands works correctly', async () => {
    act(() => {
      render(
        <TextInput value="test" onChange={onChange} prefix="beginning" rightIsland={textIsland} />
      );
    });
    const leftIsland = await screen.findByText('beginning');
    const rightIsland = await screen.findByText('the end');
    expect(leftIsland).toBeInTheDocument();
    expect(rightIsland).toBeInTheDocument();
    expect(leftIsland).toHaveClass('alt-text-input__text-island');
    expect(rightIsland).toHaveClass('alt-text-input__text-island');
    expect(leftIsland.parentElement).toHaveClass('alt-text-input__left-island');
    expect(rightIsland.parentElement).toHaveClass('alt-text-input__right-island');
  });

  test('should icon-islands works correctly', async () => {
    act(() => {
      render(
        <TextInput
          value="test"
          onChange={onChange}
          leftIsland={{
            type: InputIslandType.icon,
            content: <Icon i="face" />
          }}
          rightIcon={<Icon i="delete" />}
        />
      );
    });
    const leftIsland = await screen.findByText('face');
    const rightIsland = await screen.findByText('delete');
    expect(leftIsland).toBeInTheDocument();
    expect(rightIsland).toBeInTheDocument();
    expect(leftIsland.parentElement).toHaveClass('alt-text-input__icon-island');
    expect(rightIsland.parentElement).toHaveClass('alt-text-input__icon-island');
    expect(leftIsland.parentElement?.parentElement).toHaveClass('alt-text-input__left-island');
    expect(rightIsland.parentElement?.parentElement).toHaveClass('alt-text-input__right-island');
  });

  test('should actions-islands works correctly', async () => {
    const firstAction = jest.fn();

    act(() => {
      render(
        <TextInput
          value="test"
          onChange={onChange}
          leftIsland={{
            type: InputIslandType.actions,
            content: [
              {
                title: 'delete',
                icon: <Icon i="delete" />,
                onClick: firstAction
              }
            ]
          }}
          rightIsland={{
            type: InputIslandType.actions,
            content: [
              {
                title: 'up',
                icon: <Icon i="up" />,
                onClick: () => null
              },
              {
                title: 'down',
                icon: <Icon i="down" />,
                onClick: () => null,
                disabled: true
              }
            ]
          }}
        />
      );
    });
    const deleteAction = await screen.findByTitle('delete');
    const upAction = await screen.findByTitle('up');
    const downAction = await screen.findByTitle('down');
    expect(deleteAction).toBeInTheDocument();
    expect(upAction).toBeInTheDocument();
    expect(downAction).toBeInTheDocument();

    expect(deleteAction).toHaveClass('alt-text-input__action-button');
    expect(upAction).toHaveClass('alt-text-input__action-button');
    expect(downAction).toHaveClass('alt-text-input__action-button');

    expect(deleteAction.parentElement?.parentElement).toHaveClass('alt-text-input__left-island');
    expect(upAction.parentElement?.parentElement).toHaveClass('alt-text-input__right-island');
    expect(downAction.parentElement?.parentElement).toHaveClass('alt-text-input__right-island');

    expect(downAction).toHaveAttribute('disabled', '');

    fireEvent.click(deleteAction);
    expect(firstAction).toBeCalledTimes(1);
  });

  test('should component-islands works correctly', async () => {
    const onClick = jest.fn();

    render(
      <TextInput
        value="test"
        onChange={onChange}
        leftIsland={{
          type: InputIslandType.components,
          content: <button onClick={onClick}>first action</button>
        }}
        rightIsland={{
          type: InputIslandType.components,
          content: <div>1/10</div>
        }}
      />
    );

    const firstComponent = await screen.findByText('first action');
    const secondComponent = await screen.findByText('1/10');

    fireEvent.click(firstComponent);

    expect(firstComponent).toBeInTheDocument();
    expect(secondComponent).toBeInTheDocument();

    expect(onClick).toBeCalledTimes(1);

    expect(firstComponent.parentElement?.parentElement).toHaveClass('alt-text-input__left-island');
    expect(secondComponent.parentElement?.parentElement).toHaveClass(
      'alt-text-input__right-island'
    );
  });

  test('should use correct classNames for different sizes', async () => {
    const { container, rerender } = render(
      <TextInput value="" onChange={() => null} size={Size.small} />
    );
    expect(container.firstChild).toHaveClass('alt-basic-input--size-small');

    await waitFor(() => rerender(<TextInput value="" onChange={() => null} size={Size.large} />));
    expect(container.firstChild).toHaveClass('alt-basic-input--size-large');
  });

  test('should suggestions works correctly', async () => {
    let value = '';
    const onChange = (val: string) => {
      value = val;
    };

    const { rerender } = render(
      <TextInput value={value} onChange={onChange} suggestions={SUGGESTIONS} />
    );

    const textInput = screen.getByRole('textbox');
    textInput.focus();
    await waitFor(() => fireEvent.input(textInput, { target: { value: 'D' } }));
    rerender(<TextInput value={value} onChange={onChange} suggestions={SUGGESTIONS} />);

    const dmitrySuggestion = await screen.findByText('Dmitry');
    const danielSuggestion = await screen.findByText('Daniel');

    expect(dmitrySuggestion).toBeInTheDocument();
    expect(danielSuggestion).toBeInTheDocument();

    await waitFor(() => fireEvent.click(danielSuggestion));

    expect(value).toBe('Daniel');

    rerender(<TextInput value={value} onChange={onChange} suggestions={SUGGESTIONS} />);

    const dmitry2Suggestion = screen.queryByText('Dmitry');

    expect(dmitry2Suggestion).not.toBeInTheDocument();
  });

  test('should live suggestions works correctly', async () => {
    let value = '';
    const onChange = (val: string) => {
      value = val;
    };

    const { rerender } = render(
      <TextInput value={value} onChange={onChange} suggestions={SUGGESTIONS} useLiveSuggestions />
    );

    const textInput = screen.getByRole('textbox');
    textInput.focus();
    await waitFor(() => fireEvent.input(textInput, { target: { value: 'D' } }));
    rerender(
      <TextInput value={value} onChange={onChange} suggestions={SUGGESTIONS} useLiveSuggestions />
    );

    const liveSuggestion = screen.getByTestId('alt-test-textInput-liveSuggestion');

    expect(liveSuggestion).toBeInTheDocument();
    expect(liveSuggestion).toHaveTextContent('aniel');
  });
});
