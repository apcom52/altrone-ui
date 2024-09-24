import { render, screen } from '@testing-library/react';
import { AltroneApplication, NavigationList } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('NavigationList', () => {
  test('NavigationList has to apply custom className and id', () => {
    render(
      <NavigationList
        data-testid="list"
        className="cls"
        style={{ color: 'red' }}
      >
        <NavigationList.Group
          data-testid="group"
          title="Group title"
          className="group"
          style={{ color: 'blue' }}
        />
        <NavigationList.Link
          href="#"
          label="Link label"
          data-testid="link"
          className="link"
          style={{ color: 'yellow' }}
        />
      </NavigationList>,
    );

    expect(screen.getByTestId('list')).toHaveClass('cls');
    expect(screen.getByTestId('list')).toHaveStyle('color: red');
    expect(screen.getByTestId('group')).toHaveClass('group');
    expect(screen.getByTestId('group')).toHaveStyle('color: blue');
    expect(screen.getByTestId('link')).toHaveClass('link');
    expect(screen.getByTestId('link')).toHaveStyle('color: yellow');
  });

  test('check that NavigationList configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          navigationList: {
            className: 'cls',
            style: { color: 'blue' },
            group: {
              titleClassName: 'title',
            },
          },
        }}
      >
        <NavigationList data-testid="list">
          <NavigationList.Group title="Title" data-testid="group" />
          <NavigationList.Link href="#" label="Link label" data-testid="link" />
        </NavigationList>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('list')).toHaveClass('cls');
    expect(screen.getByTestId('list')).toHaveStyle('color: blue');
    expect(
      screen.getByTestId('list').querySelector('.title'),
    ).toBeInTheDocument();
  });
});
