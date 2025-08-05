interface ButtonProps {
  btnName: string;
  onClick?: () => void;
}

export default function Button({ btnName, onClick }: ButtonProps) {
  return <button onClick={onClick}>{btnName}</button>;
}
