import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/button/Button';
import CardList from './components/cardList/CardList';
import Search from './components/search/Search';
import { loadSearchValue, saveSearchValue } from './utils/storage';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [triggerSearch, setTriggerSearch] = useState('');
  // const [searchResults, setSearchResults] = useState([]);

  const handleChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const stored = loadSearchValue();
    if (stored) {
      setSearchValue(stored);
      setTriggerSearch(stored);
    }
  }, []);

  return (
    <>
      <div className="top-controls">
        <Search value={searchValue} onChange={handleChange} />
        <Button
          btnName="Search"
          onClick={() => {
            setTriggerSearch('');
            setTriggerSearch(searchValue);
            if (searchValue) {
              saveSearchValue(searchValue);
            }
          }}
        />
      </div>
      <div>
        <CardList searchValue={searchValue} triggerSearch={triggerSearch} />
      </div>
    </>
  );
}
