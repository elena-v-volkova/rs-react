export default async function fetchCountries(): Promise<
  [string, { iso_code: string }][]
> {
  const res = await fetch('/data.json');
  const json = await res.json();
  return Object.entries(json);
}
