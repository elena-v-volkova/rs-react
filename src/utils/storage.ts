const STORAGE_KEY = 'searchValue';

export function saveSearchValue(value: string): void {
  localStorage.setItem(STORAGE_KEY, value.trim());
}

export function loadSearchValue(): string {
  return localStorage.getItem(STORAGE_KEY) || '';
}
