import { fetchCharacterById } from '../api/api';
import { useQuery } from '@tanstack/react-query';

export default function useCharacterDetailsQuery(detailsId: string) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['character', detailsId],
    queryFn: () => fetchCharacterById(detailsId),
    refetchInterval: 50000,
    enabled: !!detailsId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    character: data || null,
    isLoading: isPending,
    isError,
    errorMessage: error?.message || '',
  };
}
