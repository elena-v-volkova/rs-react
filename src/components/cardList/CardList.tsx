import { use } from 'react';
import Card from './card/Card';
import './style.css';
import fetchCountries from '../../api/fetchCountries';

const countriesPromise = fetchCountries();

export default function CardList() {
  const entries = use(countriesPromise);

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
