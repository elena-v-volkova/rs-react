import { create } from 'zustand';
import type { FullCO2Data } from '../types/types';

type Store = {
  year: number;
  data: FullCO2Data;
  selectedColumns: string[];
  setYear: (y: number) => void;
  setData: (d: FullCO2Data) => void;
  setSelectedColumns: (cols: string[]) => void;
};

export const useStore = create<Store>((set) => ({
  year: 1990,
  data: [],
  selectedColumns: [],
  setYear: (y) => set({ year: y }),
  setData: (d) => set({ data: d }),
  setSelectedColumns: (cols) => set({ selectedColumns: cols }),
}));
