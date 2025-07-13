import React from 'react';
import type { CardProps } from './types';

class Card extends React.Component<CardProps> {
  render() {
    const { character } = this.props;

    return (
      <div className="card">
        <img src={character.image} alt={character.name} width={100} />
        <h3>{character.name}</h3>
        <div className="card-description">
          <span>
            {' '}
            <span className="orange">Gender: </span>
            {character.gender}
          </span>

          <span>
            {' '}
            <span className="green">Location: </span>
            {character.location.name}
          </span>

          <span>
            {' '}
            <span className="pink">Species: </span>
            {character.species}
          </span>

          <span>
            {' '}
            <span className="blue">Status: </span>
            {character.status}
          </span>
        </div>
      </div>
    );
  }
}

export default Card;
