import { apiURL } from '../constants';

export async function fetchData(
  searchValue: string = '',
  pageValue: number = 1
) {
  const url = `${apiURL}/character?name=${encodeURIComponent(searchValue)}&page=${pageValue}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error while fetching');
  }

  const data = await response.json();
  return data;
}

export async function fetchCharacterById(id: string) {
  const url = `${apiURL}/character/${id}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(` ${id} not found`);
  }

  const data = await response.json();
  return data;
}
