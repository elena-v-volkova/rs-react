import { useEffect, useState } from 'react';
import type { Character } from '../components/cardList/types';
import { fetchCharacterById } from '../api/api';

export function useCharacterDetails(detailsId: string | null) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    if (!detailsId) return;

    setIsLoading(true);
    setIsError('');
    setCharacter(null);

    fetchCharacterById(detailsId)
      .then((data) => {
        setCharacter(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.message || 'Failed to load character');
        setIsLoading(false);
      });
  }, [detailsId]);

  return { character, isLoading, isError };
}
