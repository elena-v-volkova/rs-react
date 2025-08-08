import { useQueryClient } from '@tanstack/react-query';

type Props = {
  queryKey: (string | number)[];
  label?: string;
};

export const RefreshButton = ({ queryKey, label = 'Refresh' }: Props) => {
  const queryClient = useQueryClient();

  const handleClick = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  return <button onClick={handleClick}>{label}</button>;
};
