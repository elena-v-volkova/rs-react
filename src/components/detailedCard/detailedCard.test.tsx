import { describe, it, expect, vi } from 'vitest';
import type { Mock } from 'vitest';
import { screen } from '@testing-library/react';
import DetailedCard from './DetailedCard';
import { renderWithQueryClient } from '../../test-utils/test-utils';

vi.mock('react-router-dom', () => ({
  useSearchParams: () => [new URLSearchParams('details=1'), vi.fn()],
  useNavigate: () => vi.fn(),
}));

vi.mock('../../hooks/useCharacterDetailsQuery', () => ({
  default: vi.fn(),
}));

import useCharacterDetailsQuery from '../../hooks/useCharacterDetailsQuery';

describe('DetailedCard', () => {
  it('renders character details if present', () => {
    const mockedHook = useCharacterDetailsQuery as unknown as Mock;

    mockedHook.mockReturnValue({
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

    renderWithQueryClient(<DetailedCard />);

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
