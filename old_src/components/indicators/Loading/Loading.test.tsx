import { Loading } from './index';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Indicators.Loading', () => {
  test('should loading renders correctly', () => {
    render(<Loading />);

    expect(screen.getByTestId('alt-test-loading')).toBeInTheDocument();
  });
});
