import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormField, FormGroup, FormGroupVariant } from './index';
import Form from './Form';

describe('Form.FormGroup', () => {
  test('should renders correctly', () => {
    render(
      <Form>
        <FormGroup>content</FormGroup>
      </Form>
    );

    const formGroup = screen.getByTestId('alt-test-form-group');
    expect(formGroup).toBeInTheDocument();
  });

  test('should calculate columns correctly', () => {
    const { rerender } = render(
      <Form>
        <FormGroup variant={FormGroupVariant.linear} weights={[1, 2, 3]}>
          <FormField />
          <FormField />
          <FormField />
        </FormGroup>
      </Form>
    );

    let formGroup = screen.getByTestId('alt-test-form-group');
    expect(formGroup).toHaveStyle({ 'grid-template-columns': '1fr 2fr 3fr' });

    rerender(
      <Form>
        <FormGroup variant={FormGroupVariant.linear}>
          <FormField />
          <FormField />
          <FormField />
        </FormGroup>
      </Form>
    );

    formGroup = screen.getByTestId('alt-test-form-group');
    expect(formGroup).toHaveStyle({ 'grid-template-columns': 'repeat(3, 1fr)' });

    rerender(
      <Form>
        <FormGroup variant={FormGroupVariant.linear} weights={[1, 2, 3]}>
          <FormField />
        </FormGroup>
      </Form>
    );

    formGroup = screen.getByTestId('alt-test-form-group');
    expect(formGroup).toHaveStyle({ 'grid-template-columns': '1fr' });
  });
});
