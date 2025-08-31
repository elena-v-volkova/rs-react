import { DEFAULT_INFO_TABLE_COLUMNS } from '../../constants/constants';
import { useStore } from '../../store/useStore';
import type { CO2CountryData, CountryData } from '../../types/types';

type DataListProps = { country: string };

type StringKey<T> = Extract<keyof T, string>;
type DataKey = StringKey<CO2CountryData>;

export default function DataList({ country }: DataListProps) {
  const dataSet = useStore((state) => state.data);
  const selectedColumns = useStore((state) => state.selectedColumns);
  const countryEntry = dataSet.find(([countryName]) => countryName === country);

  if (!countryEntry) return <p>No data for {country}</p>;

  const [, countryInfo] = countryEntry as [string, CountryData];
  const yearlyRows: CO2CountryData[] = countryInfo.data ?? [];

  const availableKeySet = new Set<string>(
    yearlyRows.flatMap((row) => Object.keys(row))
  );

  const baseColumns = DEFAULT_INFO_TABLE_COLUMNS as DataKey[];

  const isValidDataKey = (columnName: string): columnName is DataKey =>
    availableKeySet.has(columnName);

  const extraColumns: DataKey[] = selectedColumns.filter(isValidDataKey);

  const allColumns: DataKey[] = [...baseColumns, ...extraColumns];

  return (
    <table>
      <thead>
        <tr>
          {allColumns.map((columnName) => (
            <th scope="col" key={columnName}>
              {columnName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {yearlyRows.map((yearlyRecord, rowIndex) => (
          <tr key={rowIndex}>
            {allColumns.map((columnName) => {
              const cellValue = (
                yearlyRecord as Record<string, number | null | undefined>
              )[columnName];
              return <td key={columnName}>{cellValue ?? 'N/A'}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
