export async function fetchData() {
  const response = await fetch('https://rickandmortyapi.com/api/character');
  if (!response.ok) {
    throw new Error('Error while fetching');
  }
  const data = await response.json();
  return data.results;
}
