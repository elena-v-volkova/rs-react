import { themes } from '../../constants';
import useTheme from '../../hooks/useTheme';

export default function ToggleButton() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <input
        type="checkbox"
        id="switch"
        checked={theme === themes.dark}
        onClick={() => {
          setTheme(theme === themes.dark ? themes.light : themes.dark);
        }}
      />
      <label htmlFor="switch"></label>
    </>
  );
}
