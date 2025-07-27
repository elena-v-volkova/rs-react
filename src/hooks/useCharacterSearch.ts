import { useState, useEffect } from 'react';
import type { Character } from '../components/cardList/types';
import { fetchData } from '../api/api';
import type { ApiResponse } from '../api/types';

export function useCharacterSearch(
  searchValue: string,
  page: number,
  triggerSearch: number
): {
  characters: Character[];
  isLoading: boolean;
  isError: boolean | string;
  currentData: ApiResponse | null;
} {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    if (!triggerSearch) return;

    setIsLoading(true);
    setIsError('');
    setCharacters([]);

    fetchData(searchValue, page)
      .then((data) => {
        setCurrentData(data);
        setCharacters(data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        setCharacters([]);
        setIsLoading(false);
        setIsError(err.message);
      });
  }, [searchValue, page, triggerSearch]);

  return { characters, isLoading, isError, currentData };
}
