import { fetchCharacterById, fetchData } from './api';
import { beforeEach, describe, expect, it, test, vi } from 'vitest';

describe('fetchData', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('works when we have answer', async () => {
    const mockData = {
      results: [{ id: 1, name: 'Rick' }],
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData.results),
      })
    );

    const result = await fetchData('rick');

    expect(result).toEqual(mockData.results);
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character?name=rick&page=1'
    );
  });

  test('throws if API is bad', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
      })
    );

    await expect(fetchData('x')).rejects.toThrow('Error while fetching');
  });
});

describe('fetchCharacterById', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches Character by id ', async () => {
    const mockData = {
      results: [
        { id: 1, name: 'Rick' },
        { id: 55, name: 'Morty' },
      ],
    };

    global.fetch = vi.fn();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );
    const result = await fetchCharacterById('1');

    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/1'
    );
  });

  it('throws an error if character is not found', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
      })
    );
    await expect(fetchCharacterById('999')).rejects.toThrow('999 not found');
  });
});
