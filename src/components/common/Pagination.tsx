interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const maxVisiblePages = 9;
  let startPage = 1;

  if (totalPages > maxVisiblePages) {
    startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    startPage = Math.min(startPage, totalPages - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPages - startPage + 1) },
    (_, i) => startPage + i,
  );

  return (
    <div className="mt-[70px] flex justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`flex h-[34px] w-[34px] items-center justify-center rounded-md border border-[#0A1B2D] bg-white text-[18px] text-[#0A1B2D] lg:h-[48px] lg:w-[48px] ${
          currentPage <= 1 ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        &lt;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-[34px] w-[34px] items-center justify-center rounded-md border border-[#0A1B2D] text-[16px] lg:h-[48px] lg:w-[48px] lg:text-[18px] ${
            page === currentPage ? 'bg-[#0A1B2D] font-bold text-white' : 'bg-white text-[#0A1B2D]'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`flex h-[34px] w-[34px] items-center justify-center rounded-md border border-[#0A1B2D] bg-white text-[18px] text-[#0A1B2D] lg:h-[48px] lg:w-[48px] ${
          currentPage >= totalPages ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
