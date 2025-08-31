import { memo, useCallback, useMemo, useState } from 'react';
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

function Card({ name, countryData }: CardProps) {
  const [showTable, setShowTable] = useState(false);

  const countryCode = countryData.iso_code;

  const yearData = useMemo(
    () => getDataByYear(countryData.data ?? []),
    [countryData.data]
  );

  const flagSrc = useMemo(() => {
    if (!countryCode) return '/not_available.jpg';
    return `${FLAG_API_URL}${countryCode.slice(0, -1)}${FLAG_STYLE_DEFAULT}`;
  }, [countryCode]);

  const toggleTable = useCallback(() => {
    setShowTable((prev) => !prev);
  }, []);

  const handleImgError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      event.currentTarget.src = '/not_available.jpg';
    },
    []
  );

  return (
    <span>
      <img
        className="flag"
        src={flagSrc}
        alt="country flag"
        onError={handleImgError}
      />

      <h2>{name}</h2>
      <p>population: {yearData.population ?? 'N/A'}</p>
      <p>ISO code: {countryCode ?? 'N/A'}</p>

      <button onClick={toggleTable}>Detailed info</button>

      {showTable && (
        <Modal onClose={toggleTable}>
          <h3>{name} — detailed info</h3>
          <DataList country={name} />
        </Modal>
      )}
    </span>
  );
}

export default memo(Card);
