import React from 'react';
import Card from './Card';
import { fetchData } from '../../api/api';
import type { Character } from './types';

interface State {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

interface CardListProps {
  searchValue: string;
  triggerSearch: boolean;
}

class CardList extends React.Component<CardListProps, State> {
  constructor(props: CardListProps) {
    super(props);
    this.state = {
      characters: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetchData(this.props.searchValue)
      .then((data) => {
        setTimeout(() => {
          this.setState({ characters: data, loading: false });
        }, 2000);
      })
      .catch((err) => {
        this.setState({ characters: [], error: err.message, loading: false });
      });
  }

  componentDidUpdate(prevProps: CardListProps) {
    if (this.props.triggerSearch && !prevProps.triggerSearch) {
      this.setState({ loading: true, error: null });
      fetchData(this.props.searchValue)
        .then((data) => {
          setTimeout(() => {
            this.setState({ characters: data, loading: false });
          }, 2000);
        })
        .catch((err: Error) => {
          this.setState({ characters: [], error: err.message, loading: false });
        });
    }
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
        {characters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    );
  }
}

export default CardList;
