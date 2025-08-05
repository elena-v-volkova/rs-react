import './App.css';
import Button from './components/buttons/Button';
import CardList from './components/cardList/CardList';
import Search from './components/search/Search';
import useLocalStorage from './hooks/useLocalStorage';
import Pagination from './components/pagination/Pagination';
import { useCharacterSearchQuery } from './hooks/useCharacterSearchQuery';
import { useState, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { NavLink } from 'react-router';
import ToggleButton from './components/buttons/toggleButton';
import { RefreshButton } from './components/buttons/RefreshButton';
import ThemeProvider from './provider/ThemeProvider';

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page') ?? '1');
  const [page, setPage] = useState(pageFromUrl);

  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  const [localStorageValue, setLocalStorageValue] = useLocalStorage('');
  const [searchInputValue, setSearchInputValue] = useState(localStorageValue);

  const { characters, isLoading, isError, currentData } =
    useCharacterSearchQuery(localStorageValue, page);

  const handleInputChange = (value: string) => {
    setSearchInputValue(value);
  };

  const handleSearchClick = () => {
    setLocalStorageValue(searchInputValue);
    setSearchParams({ page: '1' });
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <ThemeProvider>
      <div className={`top-controls`}>
        <h1>Main Page</h1>
        <Search value={searchInputValue} onChange={handleInputChange} />
        <Button btnName="Search" onClick={handleSearchClick} />
        <NavLink to="/About" end>
          About
        </NavLink>
        <ToggleButton />
        <RefreshButton queryKey={['characters', searchInputValue]} />
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
    </ThemeProvider>
  );
}
