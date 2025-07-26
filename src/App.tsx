import './App.css';
import Button from './components/button/Button';
import CardList from './components/cardList/CardList';
import Search from './components/search/Search';
import useLocalStorage from './hooks/useLocalStorage';
import Pagination from './components/pagination/Pagination';
import { useCharacterSearch } from './hooks/useCharacterSearch';
import { useState, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page') ?? '1');
  const [page, setPage] = useState(pageFromUrl);

  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  const [localStorageValue, setLocalStorageValue] = useLocalStorage('');
  const [searchInputValue, setSearchInputValue] = useState(localStorageValue);
  const [searchVersion, setSearchVersion] = useState(1);

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
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    setSearchVersion((v) => v + 1);
  };

  return (
    <>
      <div className="top-controls">
        <Search value={searchInputValue} onChange={handleInputChange} />
        <Button btnName="Search" onClick={handleSearchClick} />
        <a href="/About">About</a>
      </div>
      <div className="main-results">
        <CardList
          characters={characters}
          isLoading={isLoading}
          isError={isError}
        />
        {!isLoading && characters.length > 0 && <Outlet />}
      </div>
      {!isLoading && characters.length > 0 && (
        <Pagination
          currentPage={page}
          pages={currentData?.info?.pages ?? 1}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
