import { useContext } from 'react';
import { ThemeContext } from '../context';

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('ThemeContext is missing');
  }
  return context;
}
