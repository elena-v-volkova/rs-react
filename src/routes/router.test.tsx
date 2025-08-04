import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import App from '../App';

test('renders home page by default', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
});
