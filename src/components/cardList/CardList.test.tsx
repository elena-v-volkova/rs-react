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

    render(
      <CardList characters={charactersMock} isLoading={false} isError={false} />
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/rick sanchez/i)).toBeInTheDocument();
    expect(await screen.findByText(/morty smith/i)).toBeInTheDocument();
  });

  test('shows error message when fetch fails', async () => {
    vi.spyOn(api, 'fetchData').mockRejectedValue(new Error('fail'));

    render(
      <CardList characters={charactersMock} isLoading={false} isError={true} />
    );
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
