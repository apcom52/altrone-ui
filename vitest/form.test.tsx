import React from 'react';
import { expect, test, describe } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Application, Form, TextInput } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Form', () => {
  test('we need to wrap content into <form> tag', () => {
    render(
      <Application>
        <Form data-testid="form">
          <Form.Field label="Field Label" data-testid="field">
            <TextInput />
          </Form.Field>
        </Form>
      </Application>,
    );

    expect(screen.getByTestId('form').tagName).toBe('FORM');
    expect(screen.getByTestId('field')).toBeInTheDocument();
  });

  test('we need to show error message', () => {
    render(
      <Application>
        <Form
          data-testid="form"
          errorMessages={{
            field1: 'Error message for field 1',
          }}
        >
          <Form.Field name="field1" label="Field Label" data-testid="field1">
            <TextInput />
          </Form.Field>
          <Form.Field
            name="field2"
            label="Field Label"
            errorMessage="Error message for field 2"
            data-testid="field2"
          >
            <TextInput />
          </Form.Field>
        </Form>
      </Application>,
    );

    expect(screen.getByText('Error message for field 1')).toBeInTheDocument();
    expect(screen.getByText('Error message for field 2')).toBeInTheDocument();
  });

  test('we need to make all nested fields as disabled', () => {
    render(
      <Application>
        <Form data-testid="form" disabled={true}>
          <Form.Field name="field1" label="Field Label" data-testid="field1">
            <TextInput data-testid="control-1" />
          </Form.Field>
          <Form.Field name="field2" label="Field Label" data-testid="field2">
            <TextInput data-testid="control-2" />
          </Form.Field>
        </Form>
      </Application>,
    );

    expect(screen.getByTestId('control-1')).toBeDisabled();
    expect(screen.getByTestId('control-2')).toBeDisabled();
  });

  test('we need to show required asterisk', () => {
    render(
      <Application>
        <Form data-testid="form" disabled={true}>
          <Form.Field
            name="field1"
            required
            label="Field Label"
            data-testid="field1"
          >
            <TextInput data-testid="control-1" />
          </Form.Field>
          <Form.Field name="field2" label="Field Label" data-testid="field2">
            <TextInput data-testid="control-2" />
          </Form.Field>
        </Form>
      </Application>,
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('we need to show field description', () => {
    render(
      <Application>
        <Form data-testid="form" disabled={true}>
          <Form.Field
            name="field1"
            required
            label="Field Label"
            data-testid="field1"
            description="field description"
          >
            <TextInput data-testid="control-1" />
          </Form.Field>
          <Form.Field name="field2" label="Field Label" data-testid="field2">
            <TextInput data-testid="control-2" />
          </Form.Field>
        </Form>
      </Application>,
    );

    expect(screen.getByText('field description')).toBeInTheDocument();
  });

  test('we need to show hint text', () => {
    render(
      <Application>
        <Form data-testid="form" disabled={true}>
          <Form.Field
            name="field1"
            required
            label="Field Label"
            data-testid="field1"
            hintText="Hello, world!"
          >
            <TextInput data-testid="control-1" />
          </Form.Field>
          <Form.Field name="field2" label="Field Label" data-testid="field2">
            <TextInput data-testid="control-2" />
          </Form.Field>
        </Form>
      </Application>,
    );

    expect(
      screen.getByRole('button', { name: 'Hello, world!' }),
    ).toBeInTheDocument();
  });

  test('check that className and style props works', () => {
    render(
      <Application>
        <Form
          data-testid="form"
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
        />
      </Application>,
    );

    expect(screen.getByTestId('form')).toHaveClass('cls');
    expect(screen.getByTestId('form')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('submit is prevented by default, but left alone when a form action is set', () => {
    const onSubmit = vi.fn();

    const { rerender } = render(
      <Application>
        <Form data-testid="form" onSubmit={onSubmit}>
          <Form.Field label="Field" name="field">
            <TextInput />
          </Form.Field>
        </Form>
      </Application>,
    );

    fireEvent.submit(screen.getByTestId('form'));
    expect(onSubmit.mock.calls[0][0].defaultPrevented).toBe(true);

    rerender(
      <Application>
        <Form data-testid="form" action="/submit" onSubmit={onSubmit}>
          <Form.Field label="Field" name="field">
            <TextInput />
          </Form.Field>
        </Form>
      </Application>,
    );

    fireEvent.submit(screen.getByTestId('form'));
    expect(onSubmit.mock.calls[1][0].defaultPrevented).toBe(false);
  });
});
