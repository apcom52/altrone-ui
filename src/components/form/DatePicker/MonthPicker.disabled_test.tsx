import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MonthPicker } from './index';

describe('Form.DatePicker', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = jest.fn();
  });

  test('MonthPicker should renders correctly', () => {
    const date = new Date(2022, 9, 1);
    render(
      <MonthPicker
        currentMonth={date}
        selectedDate={date}
        onChange={() => null}
        minDate={new Date(1900, 0, 1)}
        maxDate={new Date(2050, 0, 1)}
      />
    );

    const octoberMonth = screen.getByText('October');
    const year2022 = screen.getByText('2022');

    expect(octoberMonth).toBeInTheDocument();
    expect(year2022).toBeInTheDocument();
    expect(octoberMonth).toHaveClass('alt-scrollable-selector__option--selected');
    expect(year2022).toHaveClass('alt-scrollable-selector__option--selected');
  });

  test('MonthPicker should show years correctly', () => {
    const date = new Date(2022, 9, 1);
    render(
      <MonthPicker
        currentMonth={date}
        selectedDate={date}
        onChange={() => null}
        minDate={new Date(2000, 0, 1)}
        maxDate={new Date(2030, 0, 1)}
      />
    );

    const selectedYear = screen.getByText('2022');
    const children = selectedYear.parentElement.children;
    expect(children).toHaveLength(31);
    expect(children[0].innerHTML).toBe('2000');
    expect(children[children.length - 1].innerHTML).toBe('2030');
  });

  test('MonthPicker should change date correctly', async () => {
    let value = new Date(2022, 9, 1);
    const onChange = (date) => {
      value = date;
    };

    const { rerender } = render(
      <MonthPicker
        currentMonth={value}
        selectedDate={value}
        onChange={onChange}
        minDate={new Date(2000, 0, 1)}
        maxDate={new Date(2030, 0, 1)}
      />
    );

    const june = screen.getByText('June');
    const year2025 = screen.getByText('2025');

    await waitFor(() => fireEvent.click(june));
    rerender(
      <MonthPicker
        currentMonth={value}
        selectedDate={value}
        onChange={onChange}
        minDate={new Date(2000, 0, 1)}
        maxDate={new Date(2030, 0, 1)}
      />
    );

    await waitFor(() => fireEvent.click(year2025));

    expect([value.getFullYear(), value.getMonth()]).toStrictEqual([2025, 5]);
  });
});
