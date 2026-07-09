import { useLanguage } from '../../context/LanguageContext';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const { t } = useLanguage();
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === currentPage;
    const isNear = Math.abs(i - currentPage) <= 1 || i === 1 || i === totalPages;
    const isDotBefore = i === currentPage - 2 && currentPage > 3;
    const isDotAfter = i === currentPage + 2 && currentPage < totalPages - 2;

    if (isDotBefore) { pages.push(<span key="dot-b" className="page-dots">...</span>); continue; }
    if (isDotAfter)  { pages.push(<span key="dot-a" className="page-dots">...</span>); continue; }
    if (!isNear) continue;

    pages.push(
      <button
        key={i}
        className={`page-btn ${isActive ? 'active' : ''}`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="pagination-wrapper">
      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={t('Previous', 'अघिल्लो')}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      {pages}
      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={t('Next', 'अर्को')}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
}
