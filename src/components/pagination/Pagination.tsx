import './pagination.css';

interface PaginationProps {
  currentPage: number;
  pages: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  currentPage,
  pages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <div>
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="page-btn pagination__first-btn"
          disabled={currentPage === 1}
        >
          «
        </button>
        <button
          key={1}
          onClick={() => onPageChange(currentPage - 1)}
          className="page-btn pagination__first-btn"
          disabled={currentPage === 1}
        >
          ‹
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className="page-btn"
          >
            {page}
          </button>
        ))}
        <button
          key={1}
          onClick={() => onPageChange(currentPage + 1)}
          className="page-btn pagination__first-btn"
          disabled={currentPage === pageNumbers.length}
        >
          ›
        </button>
        <button
          key={1}
          onClick={() => onPageChange(pageNumbers.length)}
          className="page-btn pagination__first-btn"
          disabled={currentPage === pageNumbers.length}
        >
          »
        </button>
      </div>
    </div>
  );
}
