import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DatePicker } from './index';
import { Picker } from './DatePicker.types';
import { timeout } from '../../../utils';
import dayjs from 'dayjs';

describe('Form.DatePicker', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = jest.fn();
  });

  test('has to render day picker correctly', () => {
    let value: Date | undefined = new Date(2022, 4, 4);
    const onChange = (date: Date | undefined) => {
      value = date;
    };

    const { rerender } = render(<DatePicker value={value} onChange={onChange} />);

    act(() => fireEvent.click(screen.getByTestId('alt-test-datepicker')));

    rerender(<DatePicker value={value} onChange={onChange} />);

    expect(screen.getByText('20')).toBeInTheDocument();

    act(() => fireEvent.click(screen.getByText('20')));

    expect(value.toString()).toBe(new Date(2022, 4, 20).toString());
  });

  test('has to render month picker correctly', () => {
    let value: Date | undefined = new Date(2022, 4, 4);
    const onChange = (date: Date | undefined) => {
      value = date;
    };

    const { rerender } = render(
      <DatePicker picker={Picker.month} value={value} onChange={onChange} />
    );

    act(() => fireEvent.click(screen.getByTestId('alt-test-datepicker')));

    rerender(<DatePicker picker={Picker.month} value={value} onChange={onChange} />);

    expect(screen.getByText('Nov')).toBeInTheDocument();

    act(() => fireEvent.click(screen.getByText('Nov')));

    expect(value.toString()).toBe(new Date(2022, 10, 1).toString());
  });

  test('has to render year picker correctly', () => {
    let value: Date | undefined = new Date(2022, 4, 4);
    const onChange = (date: Date | undefined) => {
      value = date;
    };

    const { rerender } = render(
      <DatePicker picker={Picker.year} value={value} onChange={onChange} />
    );

    act(() => fireEvent.click(screen.getByTestId('alt-test-datepicker')));

    rerender(<DatePicker picker={Picker.year} value={value} onChange={onChange} />);

    expect(screen.getByText('2030')).toBeInTheDocument();

    act(() => fireEvent.click(screen.getByText('2030')));

    expect(value.toString()).toBe(new Date(2030, 0, 1).toString());
  });

  test('has to prev and next button change current month', () => {
    let value: Date | undefined = new Date(2022, 4, 4);
    const onChange = (date: Date | undefined) => {
      value = date;
    };

    const { rerender } = render(
      <DatePicker picker={Picker.day} value={value} onChange={onChange} />
    );

    act(() => fireEvent.click(screen.getByTestId('alt-test-datepicker')));

    rerender(<DatePicker picker={Picker.day} value={value} onChange={onChange} />);

    expect(screen.getByTestId('alt-test-datepicker-header')).toHaveTextContent('May 2022');

    fireEvent.click(screen.getByText('arrow_forward_ios'));

    rerender(<DatePicker picker={Picker.day} value={value} onChange={onChange} />);

    expect(screen.getByTestId('alt-test-datepicker-header')).toHaveTextContent('June 2022');

    fireEvent.click(screen.getByText('arrow_back_ios'));

    rerender(<DatePicker picker={Picker.day} value={value} onChange={onChange} />);

    expect(screen.getByTestId('alt-test-datepicker-header')).toHaveTextContent('May 2022');
  });

  test('has to show month picker when user clicks on the header', () => {
    let value: Date | undefined = new Date(2022, 4, 4);
    const onChange = (date: Date | undefined) => {
      value = date;
    };

    const { rerender } = render(
      <DatePicker picker={Picker.day} value={value} onChange={onChange} />
    );

    act(() => fireEvent.click(screen.getByTestId('alt-test-datepicker')));

    rerender(<DatePicker picker={Picker.day} value={value} onChange={onChange} />);

    expect(screen.getByText('15')).toBeInTheDocument();

    fireEvent.click(screen.getByText('May 2022'));

    rerender(<DatePicker picker={Picker.day} value={value} onChange={onChange} />);

    expect(screen.queryByText('15')).not.toBeInTheDocument();
    expect(screen.queryByText('Jun')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Nov'));

    rerender(<DatePicker picker={Picker.day} value={value} onChange={onChange} />);

    expect(screen.queryByText('15')).toBeInTheDocument();
    expect(screen.queryByText('Jun')).not.toBeInTheDocument();
    expect(screen.getByText('November 2022')).toBeInTheDocument();

    fireEvent.click(screen.getByText('November 2022'));

    rerender(<DatePicker picker={Picker.day} value={value} onChange={onChange} />);

    expect(screen.queryByText('Jun')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Apply'));
    rerender(<DatePicker picker={Picker.day} value={value} onChange={onChange} />);
    expect(screen.getByText('November 2022')).toBeInTheDocument();
  });

  test('should clearable prop works correctly', async () => {
    let value: Date | undefined = new Date(2021, 3, 3);
    const onChange = (date?: Date) => {
      value = date;
    };

    const { rerender } = render(
      <DatePicker value={value} onChange={onChange} picker={Picker.day} clearable />
    );

    const datePicker = screen.getByTestId('alt-test-datepicker');
    await waitFor(() => fireEvent.click(datePicker));
    rerender(<DatePicker value={value} onChange={onChange} picker={Picker.day} clearable />);

    const menuElement = screen.getByText('more_horiz');
    expect(menuElement).toBeInTheDocument();
    await waitFor(() => fireEvent.click(menuElement));

    rerender(<DatePicker value={value} onChange={onChange} picker={Picker.day} clearable />);

    const clearButton = screen.getByText('Clear');
    expect(clearButton).toBeInTheDocument();
    expect(value).not.toBeUndefined();
    await waitFor(() => fireEvent.click(clearButton));

    await waitFor(() => expect(value).toBeUndefined());
  });

  test('should updates value correctly after change minDate or maxDate', async () => {
    let value: Date | undefined = new Date(2021, 3, 3);
    const onChange = (date: Date | undefined) => {
      value = date;
    };

    const { rerender } = render(
      <DatePicker
        value={value}
        onChange={onChange}
        picker={Picker.day}
        maxDate={new Date(2022, 5, 5)}
      />
    );

    await expect(value).toStrictEqual(new Date(2021, 3, 3));

    rerender(
      <DatePicker
        value={value}
        onChange={onChange}
        picker={Picker.day}
        maxDate={new Date(2021, 2, 2)}
      />
    );

    await expect(value).toStrictEqual(new Date(2021, 2, 2));

    rerender(
      <DatePicker
        value={value}
        onChange={onChange}
        picker={Picker.day}
        minDate={new Date(2022, 2, 2)}
        maxDate={new Date(2023, 2, 2)}
      />
    );

    await expect(value).toStrictEqual(new Date(2022, 2, 2));
  });

  test('should minDate works correctly', async () => {
    let value: Date | undefined = new Date(2021, 4, 25);
    const onChange = (date: Date | undefined) => {
      value = date;
    };
    render(
      <DatePicker
        value={value}
        onChange={onChange}
        picker={Picker.day}
        minDate={new Date(2021, 6, 1)}
      />
    );

    await expect(value).toStrictEqual(new Date(2021, 6, 1));
  });

  test('should maxDate works correctly', async () => {
    let value: Date | undefined = new Date(2021, 4, 25);
    const onChange = (date: Date | undefined) => {
      value = date;
    };
    render(
      <DatePicker
        value={value}
        onChange={onChange}
        picker={Picker.day}
        maxDate={new Date(2020, 3, 2)}
      />
    );

    await expect(value).toStrictEqual(new Date(2020, 3, 2));
  });

  test('should closes popup after click on Apply', async () => {
    const { rerender } = render(
      <DatePicker value={new Date()} onChange={() => null} picker={Picker.day} />
    );

    const datePicker = screen.getByTestId('alt-test-datepicker');
    await waitFor(() => fireEvent.click(datePicker));
    rerender(<DatePicker value={new Date()} onChange={() => null} picker={Picker.day} />);

    let calendar = screen.getByTestId('alt-test-calendar');
    expect(calendar).toBeInTheDocument();

    const applyButton = screen.getByTestId('alt-test-datepicker-apply');
    await waitFor(() => fireEvent.click(applyButton));
    rerender(<DatePicker value={new Date()} onChange={() => null} picker={Picker.day} />);

    calendar = screen.queryByTestId('alt-test-calendar') as HTMLElement;
    expect(calendar).not.toBeInTheDocument();
  });

  test('should chooses today day after click on Today', async () => {
    let value: Date | undefined = new Date(2021, 4, 25);
    const onChange = (date: Date | undefined) => {
      value = date;
    };
    const { rerender } = render(
      <DatePicker value={value} onChange={onChange} picker={Picker.day} />
    );

    const datePicker = screen.getByTestId('alt-test-datepicker');
    await waitFor(() => fireEvent.click(datePicker));
    rerender(<DatePicker value={value} onChange={onChange} picker={Picker.day} />);

    const todayButton = screen.getByTestId('alt-test-datepicker-today');
    await waitFor(() => fireEvent.click(todayButton));

    const today = new Date();
    expect([value.getFullYear(), value.getMonth(), value.getDate()]).toStrictEqual([
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ]);
  });

  test('should provide correct dates in range mode', async () => {
    let startDate: Date | undefined = new Date(2021, 4, 25);
    let endDate: Date | undefined = new Date(2025, 3, 25);
    const onChange = (date: [Date | undefined, Date | undefined] | undefined) => {
      startDate = date?.[0];
      endDate = date?.[1];
    };

    render(
      <DatePicker
        value={[startDate, endDate]}
        onChange={onChange}
        picker={Picker.day}
        minDate={new Date(2022, 1, 14)}
        maxDate={new Date(2022, 8, 20)}
        useDateRange
      />
    );

    await timeout(1);

    expect(dayjs(startDate).format('YYYY-MM-DD')).toBe('2022-02-14');
    expect(dayjs(endDate).format('YYYY-MM-DD')).toBe('2022-09-20');
  });

  test('onChange should works correctly in range mode', async () => {
    let startDate: Date | undefined = undefined;
    let endDate: Date | undefined = undefined;
    const onChange = (date: [Date | undefined, Date | undefined] | undefined) => {
      startDate = date?.[0];
      endDate = date?.[1];
    };

    render(<DatePicker value={[startDate, endDate]} onChange={onChange} useDateRange />);

    act(() => fireEvent.click(screen.getByTestId('alt-test-datepicker')));

    fireEvent.click(screen.getByText('14'));

    expect(startDate).toBeUndefined();
    expect(endDate).toBeUndefined();

    fireEvent.click(screen.getByText('16'));

    const beginningOfDate = dayjs().format('YYYY-MM');

    expect(dayjs(startDate).format('YYYY-MM-DD')).toBe(`${beginningOfDate}-14`);
    expect(dayjs(endDate).format('YYYY-MM-DD')).toBe(`${beginningOfDate}-16`);
  });
});
