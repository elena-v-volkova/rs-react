import { render, screen } from '@testing-library/react';
import About from './About';
import { expect, test } from 'vitest';

test('renders the page', async () => {
  render(<About />);

  expect(await screen.findByText(/about/i)).toBeInTheDocument();
});
