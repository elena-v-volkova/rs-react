import type { CO2CountryData } from '../types/types';

export default function getDataByYear(
  data: CO2CountryData[],
  year = new Date().getFullYear()
) {
  return (
    data.find((obj) => obj.year === year) ??
    data.reduce((acc, obj) => (obj.year > acc.year ? obj : acc))
  );
}
