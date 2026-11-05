import { createRef, type ReactElement } from 'react';
import { expect, test, describe, vitest } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Avatar, Button, Dropdown, type PopoverRef } from '../src/components';

describe('Dropdown', () => {
  test('forwards ref to the root DOM element of Action/Checkbox/RadioItem/ChildMenu', () => {
    const actionRef = createRef<HTMLButtonElement>();
    const checkboxRef = createRef<HTMLButtonElement>();
    const radioItemRef = createRef<HTMLButtonElement>();
    const childMenuRef = createRef<HTMLElement>();

    render(
      <Dropdown
        content={
          <Dropdown.Menu>
            <Dropdown.Action ref={actionRef} label="Action" />
            <Dropdown.Checkbox
              ref={checkboxRef}
              checked={false}
              onChange={vitest.fn()}
              label="Checkbox"
            />
            <Dropdown.RadioList value="" onChange={vitest.fn()}>
              <Dropdown.RadioItem ref={radioItemRef} value="" label="Radio" />
            </Dropdown.RadioList>
            <Dropdown.ChildMenu ref={childMenuRef} label="Child">
              <Dropdown.Action label="Nested" />
            </Dropdown.ChildMenu>
          </Dropdown.Menu>
        }
        defaultOpen
      >
        <Button label="Test" />
      </Dropdown>,
    );

    expect(actionRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(checkboxRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(radioItemRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(childMenuRef.current).toBeInstanceOf(HTMLElement);
  });

  test('a consumer onClick runs alongside the Checkbox/RadioItem toggle, preventDefault opts out', () => {
    const onCheckboxChange = vitest.fn();
    const onRadioChange = vitest.fn();
    const track = vitest.fn();

    render(
      <Dropdown
        content={
          <Dropdown.Menu>
            <Dropdown.Checkbox
              checked={false}
              onChange={onCheckboxChange}
              onClick={track}
              label="Tracked"
            />
            <Dropdown.Checkbox
              checked={false}
              onChange={onCheckboxChange}
              onClick={(event) => event.preventDefault()}
              label="Prevented"
            />
            <Dropdown.RadioList value="a" onChange={onRadioChange}>
              <Dropdown.RadioItem value="b" label="Radio" onClick={track} />
            </Dropdown.RadioList>
          </Dropdown.Menu>
        }
        defaultOpen
      >
        <Button label="Test" />
      </Dropdown>,
    );

    fireEvent.click(screen.getByRole('checkbox', { name: 'Tracked' }));
    expect(track).toHaveBeenCalledTimes(1);
    expect(onCheckboxChange).toHaveBeenCalledWith(true, expect.anything());

    fireEvent.click(screen.getByRole('checkbox', { name: 'Prevented' }));
    expect(onCheckboxChange).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('radio', { name: 'Radio' }));
    expect(track).toHaveBeenCalledTimes(2);
    expect(onRadioChange).toHaveBeenCalledWith('b', expect.anything());
  });

  test('arrow navigation marks Checkbox and RadioItem as active', () => {
    render(
      <Dropdown
        content={
          <Dropdown.Menu>
            <Dropdown.Checkbox
              checked={false}
              onChange={vitest.fn()}
              label="Checkbox"
            />
            <Dropdown.RadioList value="" onChange={vitest.fn()}>
              <Dropdown.RadioItem value="a" label="Radio" />
            </Dropdown.RadioList>
          </Dropdown.Menu>
        }
        defaultOpen
      >
        <Button label="Test" />
      </Dropdown>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Checkbox' });
    const radio = screen.getByRole('radio', { name: 'Radio' });

    fireEvent.keyDown(checkbox, { key: 'ArrowDown' });
    const activeAfterFirst = [checkbox, radio].filter(
      (item) => item.getAttribute('data-active') === 'true',
    );
    expect(activeAfterFirst).toHaveLength(1);

    fireEvent.keyDown(activeAfterFirst[0], { key: 'ArrowDown' });
    expect(
      [checkbox, radio].find(
        (item) => item.getAttribute('data-active') === 'true',
      ),
    ).not.toBe(activeAfterFirst[0]);
  });

  test('check that render menu correctly', () => {
    render(
      <Dropdown
        content={
          <Dropdown.Menu data-testid="menu">
            <Dropdown.Action label="Action" data-testid="action" />
          </Dropdown.Menu>
        }
        defaultOpen
        data-testid="dropdown"
      >
        <Button label="Test" data-testid="button" />
      </Dropdown>,
    );

    expect(screen.getByTestId('menu')).toBeInTheDocument();
    expect(screen.getByTestId('action')).toBeInTheDocument();
  });

  test('check that className and style props works', () => {
    render(
      <Dropdown
        className="cls"
        style={{ color: 'rgb(0, 0, 255) ' }}
        content={
          <Dropdown.Menu
            data-testid="menu"
            className="cls"
            style={{ color: 'rgb(0, 0, 255) ' }}
          >
            <Dropdown.Action
              label="Action"
              data-testid="action"
              className="cls"
              style={{ color: 'rgb(0, 0, 255) ' }}
            />
            <Dropdown.Checkbox
              checked={false}
              onChange={vitest.fn()}
              label="Action"
              data-testid="checkbox"
              className="cls"
              style={{ color: 'rgb(0, 0, 255) ' }}
            />
            <Dropdown.RadioList
              value=""
              onChange={vitest.fn()}
              data-testid="radiolist"
              className="cls"
              style={{ color: 'rgb(0, 0, 255) ' }}
            >
              <Dropdown.RadioItem
                value=""
                label="Label"
                data-testid="radioitem"
                className="cls"
                style={{ color: 'rgb(0, 0, 255) ' }}
              />
            </Dropdown.RadioList>
            <Dropdown.ChildMenu
              label="Action"
              data-testid="childmenu"
              className="cls"
              style={{ color: 'rgb(0, 0, 255) ' }}
            >
              <div>content</div>
            </Dropdown.ChildMenu>
          </Dropdown.Menu>
        }
        defaultOpen
        data-testid="dropdown"
      >
        <Button label="Test" data-testid="button" />
      </Dropdown>,
    );

    expect(screen.getByTestId('dropdown')).toHaveClass('cls');
    expect(screen.getByTestId('dropdown')).toHaveStyle('color: rgb(0, 0, 255)');

    expect(screen.getByTestId('menu')).toHaveClass('cls');
    expect(screen.getByTestId('menu')).toHaveStyle('color: rgb(0, 0, 255)');

    expect(screen.getByTestId('action')).toHaveClass('cls');
    expect(screen.getByTestId('action')).toHaveStyle('color: rgb(0, 0, 255)');

    expect(screen.getByTestId('checkbox')).toHaveClass('cls');
    expect(screen.getByTestId('checkbox')).toHaveStyle('color: rgb(0, 0, 255)');

    expect(screen.getByTestId('radiolist')).toHaveClass('cls');
    expect(screen.getByTestId('radiolist')).toHaveStyle(
      'color: rgb(0, 0, 255)',
    );

    expect(screen.getByTestId('radioitem')).toHaveClass('cls');
    expect(screen.getByTestId('radioitem')).toHaveStyle(
      'color: rgb(0, 0, 255)',
    );

    expect(screen.getByTestId('childmenu')).toHaveClass('cls');
    expect(screen.getByTestId('childmenu')).toHaveStyle(
      'color: rgb(0, 0, 255)',
    );
  });
});

const renderAction = (action: ReactElement) => {
  const controlRef = createRef<PopoverRef>();
  const result = render(
    <Dropdown
      defaultOpen
      controlRef={controlRef}
      content={<Dropdown.Menu>{action}</Dropdown.Menu>}
    >
      <Button label="Actions" />
    </Dropdown>,
  );
  return { ...result, controlRef };
};

describe('Dropdown.Action keyboard activation', () => {
  test.each([
    { name: 'default button', child: undefined },
    { name: 'asChild button', child: <button /> },
    { name: 'asChild link', child: <a href="#target" /> },
  ])('$name leaves Enter activation to the browser', ({ child }) => {
    const onClick = vitest.fn((event) => event.preventDefault());
    renderAction(
      <Dropdown.Action label="Run" asChild={Boolean(child)} onClick={onClick}>
        {child}
      </Dropdown.Action>,
    );
    const action = screen.getByRole('button', { name: 'Run' });
    expect(fireEvent.keyDown(action, { key: 'Enter' })).toBe(true);
    expect(onClick).not.toHaveBeenCalled();
    fireEvent.click(action);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test.each(['Enter', ' '])(
    'asChild non-native control synthesizes one click for %s',
    (key) => {
      const onClick = vitest.fn();
      renderAction(
        <Dropdown.Action label="Run" asChild onClick={onClick}>
          <div />
        </Dropdown.Action>,
      );
      const action = screen.getByRole('button', { name: 'Run' });
      expect(fireEvent.keyDown(action, { key })).toBe(false);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick.mock.calls[0][0].nativeEvent).toBeInstanceOf(MouseEvent);
    },
  );

  test('Space activates an asChild link without leaving the page or closing a cancelled action', () => {
    const onClick = vitest.fn((event) => event.preventDefault());
    const { controlRef } = renderAction(
      <Dropdown.Action label="Run" asChild onClick={onClick}>
        <a href="#target" />
      </Dropdown.Action>,
    );
    const action = screen.getByRole('button', { name: 'Run' });
    expect(fireEvent.keyDown(action, { key: ' ' })).toBe(false);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(controlRef.current?.open).toBe(true);
    expect(window.location.hash).not.toBe('#target');
  });

  test('consumer keydown cancellation prevents a custom control click', () => {
    const onClick = vitest.fn();
    renderAction(
      <Dropdown.Action
        label="Run"
        asChild
        onClick={onClick}
        onKeyDown={(event) => event.preventDefault()}
      >
        <div />
      </Dropdown.Action>,
    );
    fireEvent.keyDown(screen.getByRole('button', { name: 'Run' }), {
      key: 'Enter',
    });
    expect(onClick).not.toHaveBeenCalled();
  });

  test('a disabled custom control does not synthesize keyboard clicks', () => {
    const onClick = vitest.fn();
    renderAction(
      <Dropdown.Action label="Run" asChild disabled onClick={onClick}>
        <div />
      </Dropdown.Action>,
    );
    const action = screen.getByRole('button', { name: 'Run' });
    fireEvent.keyDown(action, { key: 'Enter' });
    fireEvent.keyDown(action, { key: ' ' });
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('Dropdown opening focus', () => {
  test.each(['keyboard', 'pointer'])(
    'first ArrowDown moves to the next item after %s opening',
    async (mode) => {
      render(
        <Dropdown
          content={
            <Dropdown.Menu>
              <Dropdown.Action label="First" />
              <Dropdown.Action label="Second" />
            </Dropdown.Menu>
          }
        >
          <button type="button">Open focus menu</button>
        </Dropdown>,
      );
      const trigger = screen.getByRole('button', { name: 'Open focus menu' });
      trigger.focus();
      if (mode === 'keyboard') fireEvent.keyDown(trigger, { key: 'Enter' });
      else {
        fireEvent.pointerDown(trigger, { pointerType: 'mouse' });
        fireEvent.mouseDown(trigger, { detail: 1 });
      }
      fireEvent.click(trigger, { detail: mode === 'keyboard' ? 0 : 1 });
      const first = await screen.findByRole('button', { name: 'First' });
      await waitFor(() => expect(first).toHaveFocus());
      fireEvent.keyDown(first, { key: 'ArrowDown' });
      await waitFor(() =>
        expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus(),
      );
      fireEvent.keyDown(screen.getByRole('button', { name: 'Second' }), {
        key: 'Escape',
      });
      await waitFor(() => expect(trigger).toHaveFocus());
      await waitFor(() =>
        expect(
          screen.queryByRole('button', { name: 'First' }),
        ).not.toBeInTheDocument(),
      );
      fireEvent.keyDown(trigger, { key: 'Enter' });
      fireEvent.click(trigger, { detail: 0 });
      await waitFor(() =>
        expect(screen.getByRole('button', { name: 'First' })).toHaveFocus(),
      );
    },
  );
});

test('virtual dropdown navigation keeps DOM focus on the input', async () => {
  render(
    <Dropdown
      virtualNavigationFocus
      focusTrap={false}
      content={
        <Dropdown.Menu>
          <Dropdown.Action label="Virtual first" />
          <Dropdown.Action label="Virtual second" />
        </Dropdown.Menu>
      }
    >
      <input aria-label="Search focus menu" />
    </Dropdown>,
  );
  const input = screen.getByRole('textbox', { name: 'Search focus menu' });
  input.focus();
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  await waitFor(() =>
    expect(
      screen.getByRole('button', { name: 'Virtual first' }),
    ).toHaveAttribute('data-active', 'true'),
  );
  expect(input).toHaveFocus();
});

test('Enter on an avatar trigger focuses a custom div action and the first ArrowDown leaves it', async () => {
  render(
    <Dropdown
      content={
        <Dropdown.Menu>
          <Dropdown.Action label="Account" asChild>
            <div />
          </Dropdown.Action>
          <Dropdown.Action label="Profile settings" />
        </Dropdown.Menu>
      }
    >
      <Avatar firstName="Alex" lastName="Petrov" />
    </Dropdown>,
  );
  const trigger = screen.getByRole('img', { name: 'Alex Petrov' });
  trigger.focus();
  fireEvent.keyDown(trigger, { key: 'Enter' });
  const account = await screen.findByRole('button', { name: 'Account' });
  await waitFor(() => expect(account).toHaveFocus());
  fireEvent.keyDown(account, { key: 'ArrowDown' });
  const profile = screen.getByRole('button', { name: 'Profile settings' });
  await waitFor(() => expect(profile).toHaveFocus());
  fireEvent.keyDown(profile, { key: 'Escape' });
  await waitFor(() => expect(trigger).toHaveFocus());
});

test('asChild actions preserve explicit tabIndex on the child and the action', () => {
  render(
    <Dropdown
      defaultOpen
      content={
        <Dropdown.Menu>
          <Dropdown.Action label="Child tabIndex" asChild>
            <div tabIndex={-1} />
          </Dropdown.Action>
          <Dropdown.Action label="Action tabIndex" asChild tabIndex={0}>
            <div tabIndex={-1} />
          </Dropdown.Action>
        </Dropdown.Menu>
      }
    >
      <button type="button">Open</button>
    </Dropdown>,
  );
  expect(
    screen.getByRole('button', { name: 'Child tabIndex' }),
  ).toHaveAttribute('tabindex', '-1');
  expect(
    screen.getByRole('button', { name: 'Action tabIndex' }),
  ).toHaveAttribute('tabindex', '0');
});
