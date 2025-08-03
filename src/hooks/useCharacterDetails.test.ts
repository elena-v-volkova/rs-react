import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useCharacterDetails } from './useCharacterDetails';
import * as api from '../api/api';

const mockCharacter = {
  id: '1',
  name: 'Test Character',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'url',
};

describe('useCharacterDetails', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not fetch if detailsId is null', () => {
    const fetchSpy = vi.spyOn(api, 'fetchCharacterById');
    renderHook(() => useCharacterDetails(null));
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('fetches character data on valid id', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockResolvedValue(mockCharacter);

    const { result } = renderHook(() => useCharacterDetails('1'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.character).toEqual(mockCharacter);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe('');
    });
  });

  it('sets error on fetch failure', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockRejectedValue(
      new Error('API error')
    );

    const { result } = renderHook(() => useCharacterDetails('1'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.character).toBeNull();
      expect(result.current.isError).toBe('API error');
      expect(result.current.isLoading).toBe(false);
    });
  });
});
