import { themes } from '../../constants';
import useTheme from '../../hooks/useTheme';

export default function ToggleButton() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === themes.dark;

  const toggleTheme = () => {
    setTheme(isDark ? themes.light : themes.dark);
  };

  return (
    <>
      <input
        type="checkbox"
        id="switch"
        checked={isDark}
        onChange={toggleTheme}
      />
      <label htmlFor="switch"></label>
    </>
  );
}
