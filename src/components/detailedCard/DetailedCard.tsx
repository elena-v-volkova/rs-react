import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCharacterDetails } from '../../hooks/useCharacterDetails';

export default function DetailedCard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const detailsId = searchParams.get('details');
  const { character, isLoading, isError } = useCharacterDetails(detailsId);

  useEffect(() => {
    if (detailsId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [detailsId]);

  if (!detailsId) return null;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError}</p>;
  if (!character) return null;

  const handleClose = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    navigate(`/?${newParams.toString()}`, { replace: true });
  };

  return (
    <div className="detailed-card">
      <button onClick={handleClose} className="close-btn">
        X Close
      </button>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
    </div>
  );
}
