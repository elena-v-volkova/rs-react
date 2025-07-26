import { useEffect, useState } from 'react';
import Card from './Card';
import { fetchData } from '../../api/api';
import type { Character } from './types';

interface CardListProps {
  searchValue: string;
  triggerSearch: number;
}

export default function CardList({
  searchValue,
  triggerSearch,
}: CardListProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isErr, setIsError] = useState('');

  useEffect(() => {
    if (!triggerSearch) return;

    setIsLoading(true);
    setIsError('');
    setCharacters([]);

    fetchData(searchValue)
      .then((data) => {
        setCharacters(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setCharacters([]);
        setIsLoading(false);
        setIsError(err.message);
      });
  }, [triggerSearch]);

  if (isLoading)
    return (
      <div className="loader-container">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  if (isErr) return <p>Error: {isErr}</p>;

  return (
    <div className="results" data-testid="results">
      {characters.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
}
