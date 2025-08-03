import { render, screen, fireEvent } from '@testing-library/react';
import SelectedItemsBar from './SelectedItemsBar';
import * as itemStore from '../../store/itemStore'; // Импортируем весь модуль
import { vi } from 'vitest';

vi.mock('../../store/itemStore');

interface SelectedItemsState {
  selectedItems: Record<string, { name: string; status: string; url: string }>;
  clearSelection: () => void;
}

const mockItems: SelectedItemsState['selectedItems'] = {
  a1: { name: 'Rick', status: 'Alive', url: 'https://rick.com' },
  b2: { name: 'Morty', status: 'Dead', url: 'https://morty.com' },
};

beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => 'blob:test-url');
  global.URL.revokeObjectURL = vi.fn();
});

describe('SelectedItemsBar', () => {
  let clearSelectionMock: ReturnType<typeof vi.fn>;
  const mockedUseSelectedItemsStore =
    itemStore.useSelectedItemsStore as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    clearSelectionMock = vi.fn();

    mockedUseSelectedItemsStore.mockImplementation(
      (selector: (state: SelectedItemsState) => unknown) =>
        selector({
          selectedItems: mockItems,
          clearSelection: clearSelectionMock,
        })
    );
  });

  it('renders selected item count', () => {
    render(<SelectedItemsBar />);
    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });

  it('calls clearSelection on button click', () => {
    render(<SelectedItemsBar />);
    const button = screen.getByText(/Unselect all/i);
    fireEvent.click(button);
    expect(clearSelectionMock).toHaveBeenCalled();
  });

  it('returns null if no items selected', () => {
    mockedUseSelectedItemsStore.mockImplementation(
      (selector: (state: SelectedItemsState) => unknown) =>
        selector({
          selectedItems: {},
          clearSelection: vi.fn(),
        })
    );
    const { container } = render(<SelectedItemsBar />);
    expect(container.firstChild).toBeNull();
  });
});
