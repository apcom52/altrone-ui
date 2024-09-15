import { render, screen } from '@testing-library/react';
import {
  AltroneApplication,
  Configuration,
  Icon,
  Flex,
  Button,
  Popover,
} from '../src';

describe('Configation', () => {
  test('check that component receive correct configuration properties', () => {
    render(
      <AltroneApplication
        tagName="body"
        config={{
          flex: {
            className: 'rootConfig',
          },
        }}
      >
        <Flex data-testid="flex" />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('flex')).toHaveClass('rootConfig');
  });

  test('check nested configuration', () => {
    render(
      <AltroneApplication
        config={{
          flex: {
            className: 'rootConfig',
          },
        }}
      >
        <Configuration flex={{ className: 'innerConfig' }}>
          <Flex data-testid="flex1" />
          <Flex data-testid="flex2" />
        </Configuration>
        <Flex data-testid="flex3" />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('flex1')).not.toHaveClass('rootConfig');
    expect(screen.getByTestId('flex2')).not.toHaveClass('rootConfig');
    expect(screen.getByTestId('flex3')).not.toHaveClass('innerConfig');

    expect(screen.getByTestId('flex1')).toHaveClass('innerConfig');
    expect(screen.getByTestId('flex2')).toHaveClass('innerConfig');
    expect(screen.getByTestId('flex3')).toHaveClass('rootConfig');
  });

  test('check that Flex configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{ flex: { className: 'cls', style: { color: 'blue' } } }}
      >
        <Flex data-testid="element">content</Flex>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });

  test('check that Icon configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{ icon: { className: 'cls', style: { color: 'blue' } } }}
      >
        <Icon i="check" data-testid="element" />
      </AltroneApplication>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });

  test('check that Button configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{ button: { className: 'cls', style: { color: 'blue' } } }}
      >
        <Button data-testid="element" />
      </AltroneApplication>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });

  test('check that Popover configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{ popover: { className: 'cls', style: { color: 'blue' } } }}
      >
        <Popover
          content={<div>content</div>}
          openedByDefault
          data-testid="element"
        >
          <Button />
        </Popover>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
