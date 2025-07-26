import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/button/Button';
import CardList from './components/cardList/CardList';
import Search from './components/search/Search';
import useLocalStorage from './hooks/useLocalStorage';

export default function App() {
  const [triggerSearch, setTriggerSearch] = useState('');
  const [localStorageValue, setLocalStorageValue] = useLocalStorage('');
  const [searchVersion, setSearchVersion] = useState(1);

  useEffect(() => {
    if (localStorageValue) {
      setTriggerSearch(localStorageValue);
    }
  }, [triggerSearch]);

  const handleChange = (value: string) => {
    setLocalStorageValue(value);
  };

  const handleSearchClick = () => {
    setSearchVersion((prev) => prev + 1);
  };

  return (
    <>
      <div className="top-controls">
        <Search value={localStorageValue} onChange={handleChange} />
        <Button btnName="Search" onClick={handleSearchClick} />
      </div>
      <div>
        <CardList
          searchValue={localStorageValue}
          triggerSearch={searchVersion}
        />
      </div>
    </>
  );
}
