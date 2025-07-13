import React from 'react';
import Card from './Card';
import { fetchData } from '../../api/api';
import type { Character, State } from './types';

class CardList extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      characters: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    fetchData()
      .then((data) => {
        setTimeout(() => {
          this.setState({ characters: data, loading: false });
        }, 2000);
      })
      .catch((err) => {
        this.setState({ error: err.message, loading: false });
      });
  }
  render() {
    const { characters, loading, error } = this.state;

    if (loading)
      return (
        <div className="loader-container">
          <div className="spinner" />
          <p>Loading...</p>
        </div>
      );
    if (error) return <p>Error: {error}</p>;

    return (
      <div className="results">
        {characters.map((character: Character) => (
          <Card character={character} />
        ))}
      </div>
    );
  }
}

export default CardList;
