import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

type UseLocalStorageReturn = [string, Dispatch<SetStateAction<string>>];

const useLocalStorage = (
  defaultValue: string = '',
  key: string = 'searchValue'
): UseLocalStorageReturn => {
  const [value, setValue] = useState<string>(() => {
    return localStorage.getItem(key) || defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value.trim());
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
