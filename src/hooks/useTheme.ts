import { useContext } from 'react';
import { ThemeContext } from '../provider/ThemeProvider';

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within Layout');
  }
  return context;
}
