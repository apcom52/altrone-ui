import { Box } from './index';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Containers.Box', () => {
  test('render box as div with text', () => {
    render(<Box padding={2}>example</Box>);
    const element = screen.getByText('example');
    expect(element).toBeInTheDocument();
  });

  test('render box as h2', () => {
    render(
      <Box tagName="h2" padding={2}>
        Header
      </Box>
    );
    const element = screen.getByRole('heading');
    expect(element.tagName).toBe('H2');
  });
});
