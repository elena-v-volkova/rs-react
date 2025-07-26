import './App.css';
import Button from './components/button/Button';
import CardList from './components/cardList/CardList';
import Search from './components/search/Search';
import useLocalStorage from './hooks/useLocalStorage';
import Pagination from './components/pagination/Pagination';
import { useCharacterSearch } from './hooks/useCharacterSearch';
import { useState } from 'react';

export default function App() {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage('');
  const [searchInputValue, setSearchInputValue] = useState(localStorageValue);
  const [searchVersion, setSearchVersion] = useState(1);
  const [page, setPage] = useState(1);
  const { characters, isLoading, isError, currentData } = useCharacterSearch(
    localStorageValue,
    page,
    searchVersion
  );

  const handleInputChange = (value: string) => {
    setSearchInputValue(value);
  };

  const handleSearchClick = () => {
    setLocalStorageValue(searchInputValue);
    setSearchVersion((v) => v + 1);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchVersion((v) => v + 1);
  };

  return (
    <>
      <div className="top-controls">
        <Search value={searchInputValue} onChange={handleInputChange} />
        <Button btnName="Search" onClick={handleSearchClick} />
        <a href="/About">About</a>
      </div>
      <div>
        <CardList
          characters={characters}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
      <Pagination
        currentPage={page}
        pages={currentData?.info?.pages ?? 1}
        onPageChange={handlePageChange}
      />
    </>
  );
}
