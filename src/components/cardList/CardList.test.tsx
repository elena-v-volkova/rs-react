import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { vi } from 'vitest';
import * as api from '../../api/api';
import { charactersMock } from '../../test-utils/mockData';

describe('CardList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('load state & loader)', async () => {
    vi.spyOn(api, 'fetchData').mockResolvedValue(charactersMock);

    render(<CardList searchValue="rick" triggerSearch="rick" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/rick sanchez/i)).toBeInTheDocument();
    expect(await screen.findByText(/morty smith/i)).toBeInTheDocument();
  });

  test('shows error message when fetch fails', async () => {
    vi.spyOn(api, 'fetchData').mockRejectedValue(new Error('fail'));

    render(<CardList searchValue="rick" triggerSearch="rick" />);
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  test('renders nothing if no data found', async () => {
    vi.spyOn(api, 'fetchData').mockResolvedValue([]);

    render(<CardList searchValue="rick" triggerSearch="rick" />);

    expect(screen.queryByText(/rick sanchez/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/morty smith/i)).not.toBeInTheDocument();
  });
});
