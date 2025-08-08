import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { createMemoryRouter } from 'react-router-dom';

describe('Router', () => {
  it('renders About page on /about route', () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/about'],
    });

    render(<RouterProvider router={testRouter} />);

    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });

  it('renders 404Page on ', () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/404'],
    });

    render(<RouterProvider router={testRouter} />);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
