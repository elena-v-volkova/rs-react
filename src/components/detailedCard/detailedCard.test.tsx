import { render, screen } from '@testing-library/react';
import DetailedCard from './DetailedCard';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
  useNavigate: () => vi.fn(),
}));

vi.mock('../../hooks/useCharacterDetails', () => ({
  useCharacterDetails: vi.fn(),
}));

import * as routerDom from 'react-router-dom';
import * as hooks from '../../hooks/useCharacterDetails';
import { vi } from 'vitest';

describe('DetailedCard', () => {
  beforeEach(() => {
    (routerDom.useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('details=1'),
      vi.fn(),
    ]);
  });

  it('renders character details if present', () => {
    (hooks.useCharacterDetails as jest.Mock).mockReturnValue({
      character: {
        name: 'Rick Sanchez',
        image: 'rick.png',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: { name: 'Earth' },
        location: { name: 'Earth' },
      },
      isLoading: false,
      isError: null,
    });

    render(<DetailedCard />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();

    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute(
      'src',
      'rick.png'
    );

    expect(screen.getByText(/Status: Alive/i)).toBeInTheDocument();
    expect(screen.getByText(/Species: Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: Male/i)).toBeInTheDocument();
    expect(screen.getByText(/Origin: Earth/i)).toBeInTheDocument();
    expect(screen.getByText(/Location: Earth/i)).toBeInTheDocument();

    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });
});
