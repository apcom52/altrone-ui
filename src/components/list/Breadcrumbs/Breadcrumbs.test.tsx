import { Breadcrumbs } from './Breadcrumbs';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { timeout } from '../../../utils';

describe('List.Breadcrumbs', () => {
  test('should render correctly', () => {
    const parentHandler = jest.fn();
    const homeHandler = jest.fn();

    render(
      <Breadcrumbs
        links={[
          { title: 'Parent', onClick: parentHandler },
          { title: 'Child', onClick: jest.fn() }
        ]}
        showHomeLink
        onHomeClick={homeHandler}
      />
    );

    act(() => {
      fireEvent.click(screen.getByText('Parent'));
      fireEvent.click(screen.getByText('Home'));
    });

    expect(parentHandler).toBeCalled();
    expect(homeHandler).toBeCalled();
  });

  test('should render home button as link', () => {
    const parentHandler = jest.fn();
    const homeHandler = jest.fn();

    render(
      <Breadcrumbs
        links={[
          { title: 'Parent', onClick: parentHandler },
          { title: 'Child', onClick: jest.fn() }
        ]}
        showHomeLink
        onHomeClick={homeHandler}
        homepageHref="http://test.com"
      />
    );

    const homeButton = screen.getByText('Home');

    expect(screen.getByText('Home').tagName).toBe('A');
    fireEvent.click(homeButton);

    expect(homeHandler).not.toBeCalled();
  });

  test('should render home button as link', () => {
    render(
      <Breadcrumbs
        links={[
          { title: 'Parent', onClick: jest.fn() },
          { title: 'Child', onClick: jest.fn() }
        ]}
        showHomeLink
        HomeComponent={() => <div>Custom Home</div>}
      />
    );

    expect(screen.getByText('Custom Home')).toBeInTheDocument();
  });

  test('breadcrumb items as link has to work as expected', async () => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: {}
    });

    render(
      <Breadcrumbs
        links={[
          { title: 'Parent', onClick: jest.fn() },
          { title: 'Child', href: 'http://check-url' }
        ]}
        showHomeLink
        HomeComponent={() => <div>Custom Home</div>}
      />
    );

    fireEvent.click(screen.getByText('Child'));

    await timeout(500);

    expect(window.location.href).toBe('http://check-url');
  });

  test('breadcrumb items as link has to work as expected', async () => {
    render(
      <Breadcrumbs
        links={[
          { title: 'Parent', onClick: jest.fn() },
          { title: 'Inner Element 1', onClick: jest.fn() },
          { title: 'Child', href: 'http://check-url' }
        ]}
        showHomeLink
        collapsible
      />
    );

    expect(screen.queryByText('Parent')).not.toBeInTheDocument();
    expect(screen.queryByText('Inner Element 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Child')).toBeInTheDocument();

    const dropdown = screen.getByText('more_horiz');
    expect(dropdown).toBeInTheDocument();

    fireEvent.click(dropdown);

    await timeout(1);

    expect(screen.queryByText('Parent')).toBeInTheDocument();
    expect(screen.queryByText('Inner Element 1')).toBeInTheDocument();
  });
});
