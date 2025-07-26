import Card from './Card';
import type { Character } from './types';

interface CardListProps {
  characters: Character[];
  isLoading: boolean;
  isError: string;
}

export default function CardList({
  characters,
  isLoading,
  isError,
}: CardListProps) {
  if (isLoading)
    return (
      <div className="loader-container">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );

  if (isError) return <p>Error: {isError}</p>;

  if (characters.length === 0)
    return <p>No characters found. Try a different name.</p>;

  return (
    <div className="results" data-testid="results">
      {characters.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
}
