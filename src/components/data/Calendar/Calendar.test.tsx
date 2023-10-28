import { fireEvent, render, waitFor } from '@testing-library/react';
import { Calendar } from './Calendar';

describe('Data.Carousel', () => {
  test('should renders days correctly', () => {
    const { container } = render(<Calendar month={new Date(2023, 8, 1)} />);

    const dateElements = container.querySelectorAll('.alt-calendar-date');

    expect(dateElements).toHaveLength(35);
  });

  test('should renders first week correctly', () => {
    const { container } = render(<Calendar month={new Date(2023, 8, 1)} />);

    const dateElements = Array.from(container.querySelectorAll('.alt-calendar-date')).slice(0, 7);

    const dates = dateElements.map((el) => el.innerHTML);
    const fromAnotherMonthDates = dateElements.map(
      (el) => !el.classList.contains('alt-calendar-date--active-month')
    );

    expect(dates).toStrictEqual(['28', '29', '30', '31', '1', '2', '3']);
    expect(fromAnotherMonthDates).toStrictEqual([true, true, true, true, false, false, false]);
  });

  test('should renders last week correctly', () => {
    const { container } = render(<Calendar month={new Date(2023, 8, 1)} />);

    const dateElements = Array.from(container.querySelectorAll('.alt-calendar-date')).slice(28, 35);

    const dates = dateElements.map((el) => el.innerHTML);
    const fromAnotherMonthDates = dateElements.map(
      (el) => !el.classList.contains('alt-calendar-date--active-month')
    );

    expect(dates).toStrictEqual(['25', '26', '27', '28', '29', '30', '1']);
    expect(fromAnotherMonthDates).toStrictEqual([false, false, false, false, false, false, true]);
  });

  test('should renders today date correctly', () => {
    const { container } = render(<Calendar month={new Date()} />);

    const todayDateElement = container.querySelector('.alt-calendar-date--today');
    expect(todayDateElement?.innerHTML).toBe(new Date().getDate().toString());
  });

  test('should renders selected dates correctly', () => {
    const { container } = render(
      <Calendar
        month={new Date(2023, 8, 1)}
        selectedDates={[new Date(2023, 8, 14), new Date(2023, 8, 20)]}
      />
    );

    const selectedDateElements = Array.from(
      container.querySelectorAll('.alt-calendar-date--selected')
    );
    const dates = selectedDateElements.map((el) => el.innerHTML);
    expect(dates).toStrictEqual(['14', '20']);
  });

  test('should render custom DateComponent', () => {
    const { container } = render(
      <Calendar
        month={new Date(2023, 8, 1)}
        selectedDates={[new Date(2023, 8, 14), new Date(2023, 8, 20)]}
        DateComponent={(props) => {
          return props.fromAnotherMonth ? null : <span>{props.currentDate.getDate()}</span>;
        }}
      />
    );

    const dateElements = Array.from(container.querySelectorAll('span'));

    expect(dateElements).toHaveLength(30);
  });

  test('onDateChange works correctly', async () => {
    let value: Date | undefined = undefined;
    const onChange = jest.fn().mockImplementation((_value) => {
      value = _value;
    });

    const { container } = render(<Calendar month={new Date(2023, 8, 1)} onDateChange={onChange} />);

    const dateElements = Array.from(container.querySelectorAll('.alt-calendar-date'));

    await waitFor(() => fireEvent.click(dateElements[14]));

    expect(value).toBeTruthy();
    expect((value as unknown as Date).getDate()).toBe(11);
  });
});
