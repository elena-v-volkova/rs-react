import { create } from 'zustand';
import type { Character } from '../components/cardList/types';

type SelectedItemsState = {
  selectedItems: Record<string, Character>;
  selectItem: (item: Character) => void;
  unselectItem: (id: number) => void;
  clearSelection: () => void;
};

export const useSelectedItemsStore = create<SelectedItemsState>((set) => ({
  selectedItems: {},

  selectItem: (item) =>
    set((state) => ({
      selectedItems: {
        ...state.selectedItems,
        [item.id]: item,
      },
    })),

  unselectItem: (id) =>
    set((state) => {
      const { [id]: _unused, ...updated } = state.selectedItems;
      return { selectedItems: updated };
    }),

  clearSelection: () => set({ selectedItems: {} }),
}));
