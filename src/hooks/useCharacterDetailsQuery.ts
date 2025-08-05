import { fetchCharacterById } from '../api/api';
import { useQuery } from '@tanstack/react-query';

export default function useCharacterDetailsQuery(detailsId: string) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['character', detailsId],
    queryFn: () => fetchCharacterById(detailsId),
  });

  return {
    character: data || null,
    isLoading: isPending,
    isError,
    errorMessage: error?.message || '',
  };
}
