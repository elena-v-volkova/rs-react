import { useEffect, useRef, useState } from 'react';
import { useSelectedItemsStore } from '../../store/itemStore';

export default function SelectedItemsBar() {
  const selectedItems = useSelectedItemsStore(
    (selected) => selected.selectedItems
  );
  const clearSelection = useSelectedItemsStore(
    (selected) => selected.clearSelection
  );

  const itemsArray = Object.values(selectedItems);
  const [downloadUrl, setDownloadUrl] = useState('');
  const downloadRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!downloadUrl || !downloadRef.current) return;

    downloadRef.current.click();
    URL.revokeObjectURL(downloadUrl);
    setDownloadUrl('');
  }, [downloadUrl]);

  if (itemsArray.length === 0) return null;

  const handleDownload = () => {
    const header = ['Name', 'Description', 'Details URL'];
    const rows = itemsArray.map((item) => [item.name, item.status, item.url]);

    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
  };

  return (
    <div className="bar-container">
      <span>
        {itemsArray.length} item{itemsArray.length > 1 ? 's' : ''} selected
      </span>
      <div>
        <button onClick={clearSelection} className="bar-button">
          Unselect all
        </button>
        <button onClick={handleDownload}>Download</button>
        <a
          href={downloadUrl}
          download={`${itemsArray.length}_items.csv`}
          ref={downloadRef}
          className="bar-hidden-link"
          data-testid="download-link"
        ></a>
      </div>
    </div>
  );
}
