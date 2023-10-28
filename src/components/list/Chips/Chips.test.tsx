import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Option } from '../../../types';
import Chips from './Chips';

const DATA: Option<number>[] = [
  {
    label: 'North America',
    value: 0
  },
  {
    label: 'South America',
    value: 1
  },
  {
    label: 'Europe',
    value: 2
  },
  {
    label: 'Asia',
    value: 3
  },
  {
    label: 'Africa',
    value: 4,
    disabled: true
  },
  {
    label: 'Australia',
    value: 5
  }
];

describe('List.Chips', () => {
  test('should renders correctly', () => {
    render(<Chips options={DATA} values={[1, 2]} onChange={() => null} />);
    const chips = screen.queryAllByTestId('alt-test-chip');
    expect(chips).toHaveLength(6);

    const selectedChips = chips
      .filter((chip) => chip.classList.contains('alt-chip--selected'))
      .map((chip) => chip.querySelector('.alt-chip__label')?.innerHTML);
    expect(selectedChips).toStrictEqual(['South America', 'Europe']);
  });

  test('should onChange works correctly', async () => {
    let value = [1, 2];
    const onChange = (newValue: number[]) => {
      value = newValue;
    };

    const { rerender } = render(<Chips options={DATA} values={value} onChange={onChange} />);

    const australia = screen.getByText('Australia');
    await waitFor(() => fireEvent.click(australia));

    rerender(<Chips options={DATA} values={value} onChange={onChange} />);
    expect(value).toStrictEqual([1, 2, 5]);

    const europe = screen.getByText('Europe');
    await waitFor(() => fireEvent.click(europe));

    rerender(<Chips options={DATA} values={value} onChange={onChange} />);
    expect(value).toStrictEqual([1, 5]);
  });

  test('should disabled works correctly', async () => {
    let value = [1, 2];
    const onChange = (newValue: number[]) => {
      value = newValue;
    };

    const { rerender } = render(<Chips options={DATA} values={value} onChange={onChange} />);

    const africa = screen.getByText('Africa');
    await waitFor(() => fireEvent.click(africa));

    rerender(<Chips options={DATA} values={value} onChange={onChange} />);
    expect(value).toStrictEqual([1, 2]);
  });

  test('should onChange works correctly in single mode', async () => {
    let value: number | undefined = 1;
    const onChange = (newValue: number | undefined) => {
      value = newValue;
    };

    const { rerender } = render(
      <Chips options={DATA} values={value} onChange={onChange} multiple={false} />
    );

    fireEvent.click(screen.getByText('Australia'));

    rerender(<Chips options={DATA} values={value} onChange={onChange} multiple={false} />);
    expect(value).toStrictEqual(5);

    fireEvent.click(screen.getByText('Europe'));

    rerender(<Chips options={DATA} values={value} onChange={onChange} multiple={false} />);
    expect(value).toStrictEqual(2);

    fireEvent.click(screen.getByText('Europe'));

    rerender(<Chips options={DATA} values={value} onChange={onChange} multiple={false} />);
    expect(value).toStrictEqual(undefined);
  });
});
