import { render, screen } from '@testing-library/react';
import { BrowserRouter, createMemoryRouter } from 'react-router';
import App from '../App';
import userEvent from '@testing-library/user-event';
import Page404 from './404/Page404';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

test('renders home page by default', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  );

  expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
});

test('navigates to the about page when link is clicked', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  );

  const aboutLink = screen.getByText(/About/i);
  userEvent.click(aboutLink);

  expect(screen.getByText(/About/i)).toBeInTheDocument();
});

it('renders 404 page on invalid route', () => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
    {
      initialEntries: ['/unusualpath'],
    }
  );

  render(<RouterProvider router={router} />);
  expect(screen.getByRole('alert')).toHaveTextContent('Страницы не существует');
});
