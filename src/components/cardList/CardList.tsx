import { use, useEffect } from 'react';
import Card from './card/Card';
import './style.css';
import fetchCountries from '../../api/fetchCountries';
import { useStore } from '../../store/useStore';

const countriesPromise = fetchCountries();

export default function CardList() {
  const setData = useStore((state) => state.setData);
  const entries = use(countriesPromise);

  useEffect(() => {
    setData(entries);
  }, [entries, setData]);

  return (
    <ul className="countries-list">
      {entries.map(([name, info]) => (
        <li key={name}>
          <Card name={name} countryData={info} />
        </li>
      ))}
    </ul>
  );
}
