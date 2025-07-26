export async function fetchData(searchValue: string = '', pageValue?: number) {
  const url = `https://rickandmortyapi.com/api/character?name=${encodeURIComponent(searchValue)}&page=${pageValue}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error while fetching');
  }

  const data = await response.json();
  return data;
}
