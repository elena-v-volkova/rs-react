import { use, useEffect, useMemo } from 'react';
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

  const listItems = useMemo(
    () =>
      entries.map(([countryName, countryInfo]) => (
        <li key={countryName}>
          <Card name={countryName} countryData={countryInfo} />
        </li>
      )),
    [entries]
  );

  return <ul className="countries-list">{listItems}</ul>;
}
