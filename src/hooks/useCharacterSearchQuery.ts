import type { Character } from '../components/cardList/types';
import { fetchData } from '../api/api';
import type { ApiResponse } from '../api/types';

import { useQuery } from '@tanstack/react-query';

export function useCharacterSearchQuery(
  searchValue: string,
  page: number
): {
  characters: Character[];
  isLoading: boolean;
  isError: boolean | string;
  currentData: ApiResponse | null;
} {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['characters', searchValue, page],
    queryFn: () => fetchData(searchValue, page),
  });

  return {
    characters: data?.results || [],
    isLoading: isPending,
    isError: isError ? error?.message || true : false,
    currentData: data ?? null,
  };
}
