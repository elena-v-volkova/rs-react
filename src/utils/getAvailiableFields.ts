import type { FullCO2Data } from '../types/types';

export default function getAvailableFieldsFromDataset(
  entries: FullCO2Data
): string[] {
  const fieldSet = new Set<string>();
  for (const [, country] of entries) {
    const rows = country.data ?? [];
    for (const row of rows) {
      for (const key of Object.keys(row)) {
        if (key !== 'year') fieldSet.add(key);
      }
    }
  }
  return [...fieldSet].sort();
}
