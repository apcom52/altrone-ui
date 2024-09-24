import { render, screen } from '@testing-library/react';
import {
  Configuration,
  AltroneApplication,
  Form,
  TextInput,
} from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Form', () => {
  test('we need to wrap content into <form> tag', () => {
    render(
      <AltroneApplication>
        <Form data-testid="form">
          <Form.Field label="Field Label" data-testid="field">
            <TextInput />
          </Form.Field>
        </Form>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('form').tagName).toBe('FORM');
    expect(screen.getByTestId('field')).toBeInTheDocument();
  });

  test('we need to show error message', () => {
    render(
      <AltroneApplication>
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
      </AltroneApplication>,
    );

    expect(screen.getByText('Error message for field 1')).toBeInTheDocument();
    expect(screen.getByText('Error message for field 2')).toBeInTheDocument();
  });

  test('we need to make all nested fields as disabled', () => {
    render(
      <AltroneApplication>
        <Form data-testid="form" disabled={true}>
          <Form.Field name="field1" label="Field Label" data-testid="field1">
            <TextInput data-testid="control-1" />
          </Form.Field>
          <Form.Field name="field2" label="Field Label" data-testid="field2">
            <TextInput data-testid="control-2" />
          </Form.Field>
        </Form>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('control-1')).toBeDisabled();
    expect(screen.getByTestId('control-2')).toBeDisabled();
  });

  test('we need to show required asterisk', () => {
    render(
      <AltroneApplication>
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
      </AltroneApplication>,
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('we need to show field description', () => {
    render(
      <AltroneApplication>
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
      </AltroneApplication>,
    );

    expect(screen.getByText('field description')).toBeInTheDocument();
  });

  test('we need to show hint text', () => {
    render(
      <AltroneApplication>
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
      </AltroneApplication>,
    );

    expect(screen.getByText('help_outline')).toBeInTheDocument();
  });

  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <Form data-testid="form" className="cls" style={{ color: 'blue' }} />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('form')).toHaveClass('cls');
    expect(screen.getByTestId('form')).toHaveStyle('color: blue');
  });

  test('check that Form configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          form={{
            className: 'cls',
            style: { color: 'blue' },
            field: {
              className: 'child-cls',
              style: { color: 'red' },
            },
          }}
        >
          <Form data-testid="form">
            <Form.Field data-testid="field" />
          </Form>
          ,
        </Configuration>
      </AltroneApplication>,
    );

    const form = screen.getByTestId('form');
    const field = screen.getByTestId('field');
    expect(form).toHaveClass('cls');
    expect(form).toHaveStyle('color: blue');
    expect(field).toHaveClass('child-cls');
    expect(field).toHaveStyle('color: red');
  });
});
