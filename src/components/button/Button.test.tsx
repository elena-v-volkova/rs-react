import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';
import { vi } from 'vitest';

describe('Button', () => {
  test('btn renders', () => {
    render(<Button btnName="Search" />);

    const element = screen.getByText(/Search/i);

    expect(element).toBeInTheDocument();
  });

  test('onClick', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button btnName="Search" onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: /Search/i }));
    expect(onClick).toHaveBeenCalled();
  });
});
