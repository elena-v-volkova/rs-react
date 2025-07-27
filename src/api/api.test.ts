import { fetchData } from './api';
import { vi } from 'vitest';

describe('fetchData', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('works when we have answer', async () => {
    const fakeData = {
      results: [{ id: 1, name: 'Rick' }],
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(fakeData.results),
      })
    );

    const result = await fetchData('rick');

    expect(result).toEqual(fakeData.results);
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
