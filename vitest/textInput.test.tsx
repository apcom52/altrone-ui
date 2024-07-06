import { render, screen } from '@testing-library/react';
import { AltroneApplication, Configuration, Icon, TextInput } from '../src';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('TextInput', () => {
  test('need to render different islands', () => {
    render(
      <AltroneApplication>
        <TextInput data-testid="input">
          <TextInput.TextIsland label="Text" data-testid="text-island" />
          <TextInput.IconIsland
            icon={<Icon i="face" />}
            data-testid="icon-island"
          />
          <TextInput.ActionIsland label="Text" data-testid="action-island" />
          <TextInput.CustomIsland data-testid="custom-island">
            children
          </TextInput.CustomIsland>
        </TextInput>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByTestId('text-island')).toBeInTheDocument();
    expect(screen.getByTestId('icon-island')).toBeInTheDocument();
    expect(screen.getByTestId('action-island')).toBeInTheDocument();
    expect(screen.getByTestId('custom-island')).toBeInTheDocument();
  });

  test('need to check wrapperClassName and wrapperStyle properties', () => {
    const { container } = render(
      <AltroneApplication>
        <TextInput
          wrapperClassName="wrapperCls"
          wrapperStyle={{ color: 'red ' }}
          data-testid="input"
        />
      </AltroneApplication>,
    );

    const wrapper = container.querySelector('[data-altrone-root] > div');
    expect(wrapper).toHaveClass('wrapperCls');
    expect(wrapper).toHaveStyle('color: red');
  });

  test('need to check that custom component works', () => {
    render(
      <AltroneApplication>
        <TextInput
          data-testid="input"
          Component={<div data-testid="custom-component" />}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('custom-component')).toBeInTheDocument();
  });

  test('check that custom className and styles works', () => {
    render(
      <AltroneApplication>
        <TextInput
          data-testid="input"
          className="cls"
          style={{ color: 'blue' }}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('input')).toHaveClass('cls');
    expect(screen.getByTestId('input')).toHaveStyle('color: blue');
  });

  test('check that configuration works', () => {
    render(
      <AltroneApplication>
        <Configuration
          textInput={{
            className: 'cls',
            style: { color: 'red' },
            textIsland: {
              className: 'text-island-cls',
              style: { color: 'green' },
            },
            iconIsland: {
              className: 'icon-island-cls',
              style: { color: 'blue' },
            },
            actionIsland: {
              className: 'action-island-cls',
              style: { color: 'yellow' },
            },
            customIsland: {
              className: 'custom-island-cls',
              style: { color: 'magenta' },
            },
          }}
        >
          <TextInput data-testid="input">
            <TextInput.TextIsland label="Text" data-testid="text-island" />
            <TextInput.IconIsland
              icon={<Icon i="face" />}
              data-testid="icon-island"
            />
            <TextInput.ActionIsland label="Text" data-testid="action-island" />
            <TextInput.CustomIsland data-testid="custom-island">
              children
            </TextInput.CustomIsland>
          </TextInput>
        </Configuration>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('input')).toHaveClass('cls');
    expect(screen.getByTestId('input')).toHaveStyle('color: red');
    expect(screen.getByTestId('text-island')).toHaveClass('text-island-cls');
    expect(screen.getByTestId('text-island')).toHaveStyle('color: green');
    expect(screen.getByTestId('icon-island')).toHaveClass('icon-island-cls');
    expect(screen.getByTestId('icon-island')).toHaveStyle('color: blue');
    expect(screen.getByTestId('action-island')).toHaveClass(
      'action-island-cls',
    );
    expect(screen.getByTestId('action-island')).toHaveStyle('color: yellow');
    expect(screen.getByTestId('custom-island')).toHaveClass(
      'custom-island-cls',
    );
    expect(screen.getByTestId('custom-island')).toHaveStyle('color: magenta');
  });
});
