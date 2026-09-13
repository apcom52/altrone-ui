import React, { createRef } from 'react';
import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Breadcrumbs } from '../src/components';

describe('Breadcrumbs', () => {
  test('renders a labelled <nav> with an <ol>, forwarding className/style/ref', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Breadcrumbs
        ref={ref}
        data-testid="crumbs"
        className="cls"
        style={{ color: 'rgb(255, 0, 0)' }}
      >
        <Breadcrumbs.Item label="Home" />
        <Breadcrumbs.Item label="Now" current />
      </Breadcrumbs>,
    );

    const nav = screen.getByRole('navigation');
    expect(nav.tagName).toBe('NAV');
    expect(nav).toBe(ref.current);
    expect(nav).toHaveClass('cls');
    expect(nav).toHaveStyle('color: rgb(255, 0, 0)');
    expect(nav).toHaveAccessibleName();
    expect(nav.querySelector('ol')).toBeInTheDocument();
  });

  test('each item is an <li>; the current item gets aria-current="page"', () => {
    render(
      <Breadcrumbs>
        <Breadcrumbs.Item label="Home" data-testid="home" />
        <Breadcrumbs.Item label="Section" data-testid="section" />
        <Breadcrumbs.Item label="Page" current data-testid="page" />
      </Breadcrumbs>,
    );

    expect(screen.getByTestId('home').closest('li')).toBeInTheDocument();
    expect(screen.getByTestId('home')).not.toHaveAttribute('aria-current');
    expect(screen.getByTestId('page')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Section')).toBeInTheDocument();
  });

  test('asChild renders the child element with the label/icon inside and forwards onClick', () => {
    const onClick = vi.fn();
    render(
      <Breadcrumbs>
        <Breadcrumbs.Item label="Home" asChild onClick={onClick}>
          <a href="#home" data-testid="link" />
        </Breadcrumbs.Item>
        <Breadcrumbs.Item label="Here" current />
      </Breadcrumbs>,
    );

    const link = screen.getByTestId('link');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '#home');
    expect(link).toHaveTextContent('Home');

    fireEvent.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('asChild with an invalid child logs an error and renders nothing', () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(
      <Breadcrumbs>
        <Breadcrumbs.Item label="Home" asChild>
          {'not an element' as unknown as React.ReactElement}
        </Breadcrumbs.Item>
      </Breadcrumbs>,
    );

    expect(container.querySelector('li')).not.toBeInTheDocument();
    expect(err).toHaveBeenCalled();
    err.mockRestore();
  });
});
