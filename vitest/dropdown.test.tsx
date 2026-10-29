import { createRef } from 'react';
import { expect, test, describe, vitest } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button, Dropdown } from '../src/components';

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
