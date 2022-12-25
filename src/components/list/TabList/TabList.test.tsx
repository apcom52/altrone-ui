import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TabList, TabListVariant } from './index';

const TABS = [
  {
    label: 'Dashboard',
    value: 0
  },
  {
    label: 'Accessories',
    value: 1
  },
  {
    label: 'My home',
    value: 2,
    disabled: true
  },
  {
    label: 'Help and support',
    value: 3
  }
];

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('List.TabList', () => {
  beforeEach(() => {
    window.ResizeObserver = ResizeObserver;
  });

  test('should renders correctly', () => {
    render(<TabList tabs={TABS} selected={1} onChange={() => null} />);

    const tabList = screen.getByTestId('alt-test-tab-list');
    const tabs = screen.queryAllByTestId('alt-test-tab');
    expect(tabList).toBeInTheDocument();
    expect(tabs).toHaveLength(4);
  });

  test('should variants works correctly', () => {
    const { rerender } = render(
      <TabList tabs={TABS} selected={1} onChange={() => null} variant={TabListVariant.border} />
    );
    let tabList = screen.getByTestId('alt-test-tab-list');

    expect(tabList).toHaveClass('alt-tab-list--variant-border');

    rerender(
      <TabList tabs={TABS} selected={1} onChange={() => null} variant={TabListVariant.solid} />
    );
    tabList = screen.getByTestId('alt-test-tab-list');

    expect(tabList).toHaveClass('alt-tab-list--variant-solid');
  });

  test('should tabs works correctly', async () => {
    let value = 1;
    const onChange = (tab) => {
      value = tab;
    };

    const { rerender } = render(<TabList tabs={TABS} selected={value} onChange={onChange} />);

    let helpAndSupport = screen.getByText('Help and support');
    await waitFor(() => fireEvent.click(helpAndSupport));

    rerender(<TabList tabs={TABS} selected={value} onChange={onChange} />);
    helpAndSupport = screen.getByText('Help and support');

    expect(value).toBe(3);
    expect(helpAndSupport).toHaveClass('alt-tab--selected');
  });

  test('should disabled tabs works correctly', async () => {
    let value = 1;
    const onChange = (tab) => {
      value = tab;
    };

    const { rerender } = render(<TabList tabs={TABS} selected={value} onChange={onChange} />);

    let myHome = screen.getByText('My home');
    await waitFor(() => fireEvent.click(myHome));

    rerender(<TabList tabs={TABS} selected={value} onChange={onChange} />);
    myHome = screen.getByText('My home');

    expect(value).toBe(1);
    expect(myHome).not.toHaveClass('alt-tab--selected');
  });

  test('should AddTab button works correctly', async () => {
    const tabs = [...TABS];

    const onAdd = () => {
      tabs.push({ label: 'new tab', value: Math.random() });
    };

    render(
      <TabList
        tabs={TABS}
        selected={1}
        onChange={() => null}
        variant={TabListVariant.solid}
        onAddTab={onAdd}
      />
    );
    const addButton = screen.getByTestId('alt-test-tab-list-add');

    await waitFor(() => fireEvent.click(addButton));
    expect(tabs).toHaveLength(5);
  });

  test('should CloseTab button works correctly', async () => {
    let tabs = [...TABS];

    const onClose = (value) => {
      tabs = tabs.filter((t) => t.value !== value);
    };

    const { rerender } = render(
      <TabList
        tabs={tabs}
        selected={1}
        onChange={() => null}
        variant={TabListVariant.solid}
        onCloseTab={onClose}
      />
    );
    let removeButton = screen.queryAllByTestId('alt-test-tab-close');

    await waitFor(() => fireEvent.click(removeButton[0]));

    rerender(
      <TabList
        tabs={tabs}
        selected={1}
        onChange={() => null}
        variant={TabListVariant.solid}
        onCloseTab={onClose}
      />
    );
    removeButton = screen.queryAllByTestId('alt-test-tab-close');

    await waitFor(() => fireEvent.click(removeButton[0]));

    expect(tabs).toHaveLength(2);
    expect(tabs).toStrictEqual([
      {
        label: 'My home',
        value: 2,
        disabled: true
      },
      {
        label: 'Help and support',
        value: 3
      }
    ]);
  });
});
