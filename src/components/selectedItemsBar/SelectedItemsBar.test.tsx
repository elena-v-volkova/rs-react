import { render, screen, fireEvent } from '@testing-library/react';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useSelectedItemsStore } from '../../store/itemStore';
import SelectedItemsBar from './SelectedItemsBar';
import type { Character } from '../cardList/types';

const mockCharacter: Character = {
  id: 1,
  name: 'Test Character',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Mars', url: '' },
  image: '',
  episode: [],
  url: 'https://example.com/test-character',
  created: '2023-01-01T00:00:00Z',
};

describe('SelectedItemsBar', () => {
  beforeEach(() => {
    useSelectedItemsStore.setState({
      selectedItems: { [mockCharacter.id]: mockCharacter },
    });
  });

  afterEach(() => {
    useSelectedItemsStore.setState({ selectedItems: {} });
  });

  it('renders with selected items', () => {
    render(<SelectedItemsBar />);
    expect(screen.getByText('1 item selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('clears selection on "Unselect all"', () => {
    render(<SelectedItemsBar />);
    fireEvent.click(screen.getByText('Unselect all'));
    expect(useSelectedItemsStore.getState().selectedItems).toEqual({});
  });

  it('generates download link with CSV', () => {
    render(<SelectedItemsBar />);
    const downloadButton = screen.getByText('Download');
    fireEvent.click(downloadButton);

    const downloadLink = screen.getByTestId('download-link');
    expect(downloadLink).toHaveAttribute('href');
    expect(downloadLink).toHaveAttribute('download', '1_items.csv');
  });

  it('does not render when no selected items', () => {
    useSelectedItemsStore.setState({ selectedItems: {} });
    render(<SelectedItemsBar />);
    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
  });
});
