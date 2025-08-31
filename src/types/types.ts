export type CO2CountryData = Record<string, number>;

export type CountryData = {
  iso_code?: string;
  data?: CO2CountryData[];
};

export type FullCO2Entry = [name: string, info: CountryData];

export type FullCO2Data = FullCO2Entry[];
