import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import Modal from '../modal/Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  fields: string[];
  locked?: string[];
};

export default function ColumnPicker({
  open,
  onClose,
  fields,
  locked = [],
}: Props) {
  const selectedColumns = useStore((state) => state.selectedColumns);
  const setSelectedColumns = useStore((state) => state.setSelectedColumns);
  const [localSelectedColumns, setLocalSelectedColumns] =
    useState<string[]>(selectedColumns);

  useEffect(() => {
    if (open) setLocalSelectedColumns(selectedColumns);
  }, [open, selectedColumns]);

  if (!open) return null;

  const toggleColumn = (columnName: string) => {
    setLocalSelectedColumns((current) =>
      current.includes(columnName)
        ? current.filter((existing) => existing !== columnName)
        : [...current, columnName]
    );
  };

  const saveSelection = () => {
    setSelectedColumns(localSelectedColumns);
    onClose();
  };

  const selectableColumns = fields.filter(
    (columnName) => !locked.includes(columnName)
  );

  return (
    <Modal onClose={onClose}>
      <h3 style={{ marginTop: 0 }}>Select extra columns</h3>
      <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
        {selectableColumns.map((columnName) => (
          <label
            key={columnName}
            style={{ display: 'flex', gap: 8, alignItems: 'center' }}
          >
            <input
              type="checkbox"
              checked={localSelectedColumns.includes(columnName)}
              onChange={() => toggleColumn(columnName)}
            />
            <span>{columnName}</span>
          </label>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button onClick={onClose}>Cancel</button>
        <button onClick={saveSelection}>Apply</button>
      </div>
    </Modal>
  );
}
