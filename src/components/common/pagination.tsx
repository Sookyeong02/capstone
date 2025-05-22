interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded border border-[#0A1B2D] bg-white px-3 py-1 text-[#0A1B2D] disabled:opacity-50"
      >
        &lt;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded border border-[#0A1B2D] px-3 py-1 ${
            page === currentPage ? 'bg-[#0A1B2D] text-white' : 'bg-white text-[#0A1B2D]'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded border border-[#0A1B2D] bg-white px-3 py-1 text-[#0A1B2D] disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
