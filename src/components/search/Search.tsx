interface searchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Search({ value, onChange }: searchProps) {
  return (
    <input
      value={value}
      type="search"
      placeholder="Search by name"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
