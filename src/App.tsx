import React from 'react';
import './App.css';
import Button from './components/button/Button';
import CardList from './components/cardList/CardList';
import Search from './components/search/Search';
import { loadSearchValue, saveSearchValue } from './utils/storage';

interface AppState {
  searchValue: string;
  triggerSearch: boolean;
}

class App extends React.Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchValue: loadSearchValue(),
      triggerSearch: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleInputChange(value: string): void {
    this.setState({ searchValue: value });
  }

  handleSearchClick(): void {
    saveSearchValue(this.state.searchValue.trim());
    this.setState({ triggerSearch: true }, () => {
      this.setState({ triggerSearch: false, searchValue: this.state.searchValue.trim() });
    });
  }

  render() {
    const { searchValue, triggerSearch } = this.state;

    return (
      <>
        <div className="top-controls">
          <Search value={searchValue} onChange={this.handleInputChange} />
          <Button btnName="Search" onClick={this.handleSearchClick} />
        </div>
        <div>
          <CardList searchValue={searchValue} triggerSearch={triggerSearch} />
          <Button btnName="Error Button" />
        </div>
      </>
    );
  }
}

export default App;
