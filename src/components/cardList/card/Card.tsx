import { useState } from 'react';
import { FLAG_API_URL, FLAG_STYLE_DEFAULT } from '../../../constants/constants';
import type { CountryData } from '../../../types/types';

import getDataByYear from '../../../utils/getDataByYear';
import './style.css';
import DataList from '../../dataList/DataList';
import Modal from '../../modal/Modal';

type CardProps = {
  name: string;
  countryData: CountryData;
};

export default function Card({ name, countryData }: CardProps) {
  const countryCode = countryData.iso_code;
  const yearData = getDataByYear(countryData.data ?? []);
  const [showTable, setShowTable] = useState(false);

  function handleClick() {
    setShowTable(!showTable);
  }

  return (
    <span>
      {countryCode ? (
        <img
          src={FLAG_API_URL + countryCode.slice(0, -1) + FLAG_STYLE_DEFAULT}
          alt="country flag"
        />
      ) : (
        <img
          src="/not_available.jpg"
          alt="not available flag"
          className="flag"
        />
      )}

      <h2>{name}</h2>
      <p>population: {yearData.population || 'N/A'}</p>
      <p>ISO code: {countryCode || 'N/A'}</p>
      <button onClick={handleClick}>Detailed info</button>
      {showTable && (
        <Modal onClose={() => setShowTable(false)}>
          <h3>{name} — detailed info</h3>
          <DataList country={name} />
        </Modal>
      )}
    </span>
  );
}
