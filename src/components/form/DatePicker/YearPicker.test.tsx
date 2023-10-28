import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { YearPicker } from './index';
import dayjs, { Dayjs } from 'dayjs';
import { DateRangePosition } from './DatePicker.types';
import { timeout } from '../../../utils';

describe('Form.DatePicker.YearPicker', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = jest.fn();
  });

  test('YearPicker should renders correctly', () => {
    const date = dayjs(new Date(2022, 0, 1));

    render(
      <YearPicker
        startSelectedDate={date}
        endSelectedDate={undefined}
        onChange={() => null}
        minDate={new Date(2015, 0, 1)}
        maxDate={new Date(2030, 11, 31)}
        isDateRange={false}
      />
    );

    const selectedYear = screen.getByText('2022');
    const children = selectedYear.parentElement?.children;
    expect(children).toHaveLength(16);
    expect(children?.[0]).toHaveTextContent('2015');
    expect(children?.[children.length - 1]).toHaveTextContent('2030');
  });

  test('YearPicker should change date correctly', async () => {
    let value: Dayjs | undefined = dayjs(new Date(2022, 0, 1));
    const onChange = (position: DateRangePosition, date: Dayjs | undefined) => {
      value = date;
    };

    render(
      <YearPicker
        startSelectedDate={value}
        onChange={onChange}
        minDate={new Date(2015, 0, 1)}
        maxDate={new Date(2030, 11, 31)}
        isDateRange={false}
      />
    );

    const year2025 = screen.getByText('2025');

    await waitFor(() => fireEvent.click(year2025));

    expect(value.year()).toStrictEqual(2025);
  });

  test('YearPicker should render years correctly in range mode', async () => {
    const startDate = dayjs(new Date(2013, 8, 1));
    const endDate = dayjs(new Date(2025, 8, 1));

    const { container } = render(
      <YearPicker
        startSelectedDate={startDate}
        endSelectedDate={endDate}
        onChange={jest.fn()}
        minDate={new Date(2000, 0, 1)}
        maxDate={new Date(2030, 11, 31)}
        isDateRange={true}
      />
    );

    const startYears = Array.from(
      container.querySelectorAll(
        '[data-testid="alt-test-yearPicker-year1"] .alt-scrollable-selector__option'
      )
    );

    const endYears = Array.from(
      container.querySelectorAll(
        '[data-testid="alt-test-yearPicker-year2"] .alt-scrollable-selector__option'
      )
    );

    const selectedStartDate = container.querySelector(
      '[data-testid="alt-test-yearPicker-year1"] .alt-scrollable-selector__option--selected'
    );
    const selectedEndDate = container.querySelector(
      '[data-testid="alt-test-yearPicker-year2"] .alt-scrollable-selector__option--selected'
    );

    expect(startYears).toHaveLength(31);
    expect(endYears).toHaveLength(31);

    expect(selectedStartDate).toHaveTextContent('2013');
    expect(selectedEndDate).toHaveTextContent('2025');

    const endYearDisabledYears = Array.from(
      container.querySelectorAll(
        '[data-testid="alt-test-yearPicker-year2"] .alt-scrollable-selector__option:disabled'
      )
    );

    expect(endYearDisabledYears).toHaveLength(14);
  });

  test('onChange should work correctly in range mode', async () => {
    let startDate: dayjs.Dayjs | undefined = undefined;
    let endDate: dayjs.Dayjs | undefined = undefined;

    const onChange = (position: DateRangePosition, value: Dayjs | undefined) => {
      if (position === 'start') {
        startDate = value;
      } else if (position === 'end') {
        endDate = value;
      }
    };

    const { container, rerender } = render(
      <YearPicker
        startSelectedDate={startDate}
        endSelectedDate={endDate}
        onChange={onChange}
        minDate={new Date(2000, 0, 1)}
        maxDate={new Date(2030, 11, 31)}
        isDateRange={true}
      />
    );

    const startYears = Array.from(
      container.querySelectorAll(
        '[data-testid="alt-test-yearPicker-year1"] .alt-scrollable-selector__option'
      )
    );

    expect(startYears[10]).toHaveTextContent('2010');

    fireEvent.click(startYears[10]);
    await timeout(1);

    rerender(
      <YearPicker
        startSelectedDate={startDate}
        endSelectedDate={endDate}
        onChange={onChange}
        minDate={new Date(2000, 0, 1)}
        maxDate={new Date(2030, 11, 31)}
        isDateRange={true}
      />
    );

    expect(startDate).not.toBeUndefined();
    expect(endDate).toBeUndefined();

    expect(
      Array.from(
        container.querySelectorAll(
          '[data-testid="alt-test-yearPicker-year2"] .alt-scrollable-selector__option:disabled'
        )
      )
    ).toHaveLength(11);

    const endYears = Array.from(
      container.querySelectorAll(
        '[data-testid="alt-test-yearPicker-year2"] .alt-scrollable-selector__option'
      )
    );

    expect(endYears[18]).toHaveTextContent('2018');

    fireEvent.click(endYears[18]);

    expect((startDate as unknown as Dayjs).year()).toBe(2010);
    expect((endDate as unknown as Dayjs).year()).toBe(2018);
  });

  test('onChange has to reset endDate when startDate is more that endDsate', async () => {
    let startDate: Dayjs | undefined = dayjs('2015-05-10');
    let endDate: Dayjs | undefined = dayjs('2018-05-10');

    const onChange = (
      position: DateRangePosition,
      value: Dayjs | undefined,
      extraValue: Dayjs | undefined
    ) => {
      if (!value) {
        return;
      }

      if (position === 'start') {
        startDate = value;
      } else if (position === 'end') {
        endDate = value;
      } else if (position === 'both') {
        startDate = value;
        endDate = extraValue;
      }
    };

    const { container, rerender } = render(
      <YearPicker
        startSelectedDate={startDate}
        endSelectedDate={endDate}
        onChange={onChange}
        minDate={new Date(2000, 0, 1)}
        maxDate={new Date(2030, 11, 31)}
        isDateRange={true}
      />
    );

    const startYears = Array.from(
      container.querySelectorAll(
        '[data-testid="alt-test-yearPicker-year1"] .alt-scrollable-selector__option'
      )
    );

    expect(startYears[20]).toHaveTextContent('2020');

    fireEvent.click(startYears[20]);
    await timeout(1);

    expect(startDate.year()).toBe(2020);
    expect(endDate.year()).toBe(2021);

    rerender(
      <YearPicker
        startSelectedDate={startDate}
        endSelectedDate={endDate}
        onChange={onChange}
        minDate={new Date(2000, 0, 1)}
        maxDate={new Date(2030, 11, 31)}
        isDateRange={true}
      />
    );

    const lastYear = Array.from(
      container.querySelectorAll(
        '[data-testid="alt-test-yearPicker-year1"] .alt-scrollable-selector__option'
      )
    ).at(-1);

    fireEvent.click(lastYear as Element);
    await timeout(1);

    expect(startDate.year()).toBe(2030);
    expect(endDate).toBeUndefined();
  });
});
