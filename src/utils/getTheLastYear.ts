import type { FullCO2Data } from '../types/types';

export function getYearRangeFromDataset(data: FullCO2Data): {
  min: number | null;
  max: number | null;
} {
  let min: number | null = null;
  let max: number | null = null;

  for (const [, country] of data) {
    if (!country.data) continue;

    for (const record of country.data) {
      const year = record.year;
      if (min === null || year < min) min = year;
      if (max === null || year > max) max = year;
    }
  }

  return { min, max };
}
