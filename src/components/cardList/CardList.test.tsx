import { screen } from '@testing-library/react';
import CardList from './CardList';
import { beforeEach, describe, expect, test } from 'vitest';
import { charactersMock } from '../../test-utils/mockData';
import { renderWithRouter } from '../../test-utils/renderTestUtil';

describe('CardList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('shows loader while loading', () => {
    renderWithRouter(
      <CardList characters={charactersMock} isLoading={true} isError={false} />
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('shows characters when loaded', async () => {
    renderWithRouter(
      <CardList characters={charactersMock} isLoading={false} isError={false} />
    );

    expect(await screen.findByText(/rick sanchez/i)).toBeInTheDocument();
    expect(await screen.findByText(/morty smith/i)).toBeInTheDocument();
  });

  test('shows error message when fetch fails', async () => {
    renderWithRouter(
      <CardList characters={charactersMock} isLoading={false} isError={true} />
    );

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
