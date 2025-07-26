import type { Character } from '../components/cardList/types';

export interface ApiResponse {
  info: ApiInfo;
  results: Character[];
}

interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
