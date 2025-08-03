import useTheme from '../../hooks/useTheme';

interface ButtonProps {
  btnName: string;
  onClick?: () => void;
}

export default function Button({ btnName, onClick }: ButtonProps) {
  const { theme } = useTheme();
  return (
    <button className={`${theme === 'dark' ? 'dark' : ''}`} onClick={onClick}>
      {btnName}
    </button>
  );
}
