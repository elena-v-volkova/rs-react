import { screen, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import Page404 from './Page404';
import App from '../../App';

describe('404 page', () => {
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
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Страницы не существуета'
    );
  });
});
