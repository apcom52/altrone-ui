import { render, screen } from '@testing-library/react';
import {
  Configuration,
  AltroneApplication,
  DataTable,
} from '../src/components';
import { EMPLOYEES } from '../src/components/dataTable/EMPLOYEES';

describe('DataTable', () => {
  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <DataTable
          data={EMPLOYEES}
          columns={[]}
          data-testid="data-table"
          className="cls"
          style={{ color: 'blue' }}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('data-table')).toHaveClass('cls');
    expect(screen.getByTestId('data-table')).toHaveStyle('color: blue');
  });

  test('check that CollapsedList configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          dataTable={{ className: 'cls', style: { color: 'blue' } }}
        >
          <DataTable data={EMPLOYEES} columns={[]} data-testid="data-table" />
        </Configuration>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('data-table');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
