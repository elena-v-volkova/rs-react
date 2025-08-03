import { useSelectedItemsStore } from '../../store/itemStore';
import type { CardProps } from './types';

export default function Card(props: CardProps) {
  const { character, onClick } = props;
  const characterDetails = {
    gender: { data: character.gender, color: 'orange' },
    location: { data: character.location.name, color: 'green' },
    species: { data: character.species, color: 'pink' },
    status: { data: character.status, color: 'blue' },
  };

  const selectedItems = useSelectedItemsStore((s) => s.selectedItems);
  const selectItem = useSelectedItemsStore((s) => s.selectItem);
  const unselectItem = useSelectedItemsStore((s) => s.unselectItem);

  const isSelected = !!selectedItems[props.character.id];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      selectItem(props.character);
    } else {
      unselectItem(props.character.id);
    }
  };

  return (
    <div className="card" onClick={onClick}>
      <input type="checkbox" onChange={handleChange} checked={isSelected} />
      <img src={character.image} alt={character.name} width={100} />
      <h3>{character.name}</h3>
      <div className="card-description">
        {Object.entries(characterDetails).map(([key, detail]) => (
          <span key={key}>
            <span className={`${detail.color}`}>{key}: </span>
            {detail.data}
          </span>
        ))}
      </div>
    </div>
  );
}
