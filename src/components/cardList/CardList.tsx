import Card from './Card';
import type { Character } from './types';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface CardListProps {
  characters: Character[];
  isLoading: boolean;
  isError: string | boolean;
}

export default function CardList({
  characters,
  isLoading,
  isError,
}: CardListProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleCardClick = (characterId: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('details', characterId.toString());
    navigate(`/?${newParams.toString()}`);
  };

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
        <Card
          key={character.id}
          character={character}
          onClick={() => handleCardClick(character.id)}
        />
      ))}
    </div>
  );
}
