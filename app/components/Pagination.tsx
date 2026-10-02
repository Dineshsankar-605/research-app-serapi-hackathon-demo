'use client';

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function Pagination({
  currentPage,
  totalResults,
  resultsPerPage,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  if (totalPages <= 1) {
    return null; // No pagination needed
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !isLoading) {
      onPageChange(page);
    }
  };

  // Determine which page numbers to show
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = window.innerWidth < 768 ? 3 : 5;
    const halfWindow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfWindow);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Add first page
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="pagination-container">
      <button
        className="pagination-button pagination-prev"
        onClick={handlePrevious}
        disabled={isPreviousDisabled || isLoading}
        aria-label="Previous page"
      >
        ← Previous
      </button>

      <div className="pagination-pages">
        {pageNumbers.map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="pagination-ellipsis">...</span>
            ) : (
              <button
                className={`pagination-page ${
                  page === currentPage ? 'active' : ''
                }`}
                onClick={() => handlePageClick(page as number)}
                disabled={isLoading}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        className="pagination-button pagination-next"
        onClick={handleNext}
        disabled={isNextDisabled || isLoading}
        aria-label="Next page"
      >
        Next →
      </button>

      <div className="pagination-info">
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
}
