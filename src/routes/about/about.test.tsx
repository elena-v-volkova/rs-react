import { render, screen } from '@testing-library/react';
import About from './About';

test('renders the page', async () => {
  render(<About />);

  expect(await screen.findByText(/about/i)).toBeInTheDocument();
});
