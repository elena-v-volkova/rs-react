import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination', () => {
  const onPageChange = vi.fn();

  it('renders page numbers', () => {
    render(
      <Pagination currentPage={1} pages={5} onPageChange={onPageChange} />
    );
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument();
    }
  });

  it('disables "first" and "prev" on first page', () => {
    render(
      <Pagination currentPage={1} pages={5} onPageChange={onPageChange} />
    );
    expect(screen.getByText('«')).toBeDisabled();
    expect(screen.getByText('‹')).toBeDisabled();
  });

  it('disables "next" and "last" on last page', () => {
    render(
      <Pagination currentPage={5} pages={5} onPageChange={onPageChange} />
    );
    expect(screen.getByText('›')).toBeDisabled();
    expect(screen.getByText('»')).toBeDisabled();
  });

  it('calls onPageChange when a page number is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Pagination currentPage={1} pages={3} onPageChange={onPageChange} />
    );

    await user.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when "next" is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Pagination currentPage={2} pages={3} onPageChange={onPageChange} />
    );

    await user.click(screen.getByText('›'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when "prev" is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Pagination currentPage={2} pages={3} onPageChange={onPageChange} />
    );

    await user.click(screen.getByText('‹'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange when "first" and "last" are clicked', async () => {
    const user = userEvent.setup();
    render(
      <Pagination currentPage={3} pages={5} onPageChange={onPageChange} />
    );

    await user.click(screen.getByText('«'));
    expect(onPageChange).toHaveBeenCalledWith(1);

    await user.click(screen.getByText('»'));
    expect(onPageChange).toHaveBeenCalledWith(5);
  });
});
