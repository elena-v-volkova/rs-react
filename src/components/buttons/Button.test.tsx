import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';
import { describe, expect, test, vi } from 'vitest';
import { ThemeContext } from '../../provider/ThemeProvider';

describe('Button', () => {
  const renderWithTheme = (ui: React.ReactNode, theme = 'light') => {
    const setTheme = vi.fn();
    return render(
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {ui}
      </ThemeContext.Provider>
    );
  };

  test('btn renders', () => {
    renderWithTheme(<Button btnName="Search" />);
    const element = screen.getByText(/Search/i);
    expect(element).toBeInTheDocument();
  });

  test('onClick', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(<Button btnName="Search" onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: /Search/i }));
    expect(onClick).toHaveBeenCalled();
  });
});
