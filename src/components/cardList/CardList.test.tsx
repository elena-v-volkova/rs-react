import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import * as api from '../../api/api';
import { charactersMock } from '../../test-utils/mockData';
import { MemoryRouter } from 'react-router';

describe('CardList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('show loader while loading', async () => {
    vi.spyOn(api, 'fetchData').mockResolvedValue(charactersMock);

    render(
      <MemoryRouter>
        <CardList
          characters={charactersMock}
          isLoading={true}
          isError={false}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('shows charachters when loaded', async () => {
    vi.spyOn(api, 'fetchData').mockResolvedValue(charactersMock);
    render(
      <MemoryRouter>
        <CardList
          characters={charactersMock}
          isLoading={false}
          isError={false}
        />
      </MemoryRouter>
    );
    expect(await screen.findByText(/rick sanchez/i)).toBeInTheDocument();
    expect(await screen.findByText(/morty smith/i)).toBeInTheDocument();
  });

  test('shows error message when fetch fails', async () => {
    vi.spyOn(api, 'fetchData').mockRejectedValue(new Error('fail'));

    render(
      <MemoryRouter>
        <CardList
          characters={charactersMock}
          isLoading={false}
          isError={true}
        />
      </MemoryRouter>
    );
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
