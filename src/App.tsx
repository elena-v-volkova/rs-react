import './App.css';
import Button from './components/button/Button';
import CardList from './components/cardList/CardList';
import Search from './components/search/Search';
import useLocalStorage from './hooks/useLocalStorage';
import Pagination from './components/pagination/Pagination';
import { useCharacterSearch } from './hooks/useCharacterSearch';
import { useState, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { NavLink } from 'react-router';
import ToggleButton from './components/button/toggleButton';
import { ThemeContext } from './context';

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page') ?? '1');
  const [page, setPage] = useState(pageFromUrl);
  const getDefaultTheme = () =>
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  const [theme, setTheme] = useState(getDefaultTheme());

  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  const [localStorageValue, setLocalStorageValue] = useLocalStorage('');
  const [searchInputValue, setSearchInputValue] = useState(localStorageValue);

  const { characters, isLoading, isError, currentData } = useCharacterSearch(
    localStorageValue,
    page
  );

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
    <ThemeContext value={{ theme, setTheme }}>
      <main className={`main ${theme === 'dark' ? 'dark' : ''}`}>
        <div className={`top-controls`}>
          <Search value={searchInputValue} onChange={handleInputChange} />
          <Button btnName="Search" onClick={handleSearchClick} />
          <NavLink to="/About" end>
            About
          </NavLink>
          <ToggleButton />
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
      </main>
    </ThemeContext>
  );
}
