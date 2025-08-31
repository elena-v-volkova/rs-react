import { useMemo, useState } from 'react';
import { useStore } from '../../store/useStore';
import getAvailableFieldsFromDataset from '../../utils/getAvailiableFields';
import ColumnPicker from './ColumnPicker';
import './style.css';

type Props = {
  lockedColumns?: string[];
  className?: string;
};

export default function GlobalColumnPickerButton({
  lockedColumns = ['year'],
}: Props) {
  const dataset = useStore((state) => state.data);
  const [isOpen, setIsOpen] = useState(false);

  const availableFields = useMemo(
    () => getAvailableFieldsFromDataset(dataset),
    [dataset]
  );

  return (
    <>
      <button className="floating-button" onClick={() => setIsOpen(true)}>
        Choose columns
      </button>
      <ColumnPicker
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fields={availableFields}
        locked={lockedColumns}
      />
    </>
  );
}
