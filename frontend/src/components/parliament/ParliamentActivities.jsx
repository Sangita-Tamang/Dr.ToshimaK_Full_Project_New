import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ActivityCard from './ActivityCard';

export default function ParliamentActivities({
  activities,
  loading,
  error,
  activeTenure,
  page,
  totalPages,
  onPageChange
}) {
  const { t } = useLanguage();
  
  const tenureLabels = {
    first: t('First Tenure: 2022 – 2025', 'पहिलो कार्यकाल: २०२२ – २०२५'),
    second: t('Second Tenure: 2025 – 2027', 'दोस्रो कार्यकाल: २०२५ – २०२७')
  };

  const paginationItems = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1);

    if (page <= 3) return [1, 2, 3, 4, 'ellipsis', totalPages];
    if (page >= totalPages - 2) return [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

    return [1, 'ellipsis-left', page - 1, page, page + 1, 'ellipsis-right', totalPages];
  };
  
  if (error) {
    return (
      <div className="parliament-error">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h3>{t('Failed to load activities', 'गतिविधिहरू लोड गर्न असफल')}</h3>
        <p>{error}</p>
        <button 
          className="parliament-btn-retry"
          onClick={() => window.location.reload()}
        >
          {t('Try Again', 'पुन: प्रयास गर्नुहोस्')}
        </button>
      </div>
    );
  }
  
  return (
    <div className="parliament-activities">
      <div className="parliament-activities-header">
        <h2 className="parliament-activities-title">
          {t('Parliamentary Activities', 'संसदीय गतिविधिहरू')}
        </h2>
        <p className="parliament-activities-subtitle">
          ({tenureLabels[activeTenure]})
        </p>
      </div>
      
      {loading && activities.length === 0 ? (
        <div className="parliament-loading">
          <div className="parliament-spinner"></div>
          <p>{t('Loading activities...', 'गतिविधिहरू लोड हुँदैछ...')}</p>
        </div>
      ) : activities.length === 0 ? (
        <div className="parliament-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
          </svg>
          <h3>{t('No Activities Found', 'कुनै गतिविधि फेला परेन')}</h3>
          <p>
            {t(
              'No parliamentary activities match your current filters. Try adjusting your search or filters.',
              'तपाईंको हालको फिल्टरसँग मिल्ने कुनै संसदीय गतिविधि छैन। आफ्नो खोज वा फिल्टर समायोजन गर्ने प्रयास गर्नुहोस्।'
            )}
          </p>
        </div>
      ) : (
        <>
          <div className="parliament-activities-grid">
            {activities.map((activity, index) => (
              <ActivityCard
                key={activity._id}
                activity={activity}
                imageIndex={(page - 1) * 6 + index}
              />
            ))}
          </div>
          
          {totalPages > 1 && (
            <nav className="parliament-pagination" aria-label={t('Activities pagination', 'गतिविधि पृष्ठाङ्कन')}>
              <button
                type="button"
                className="parliament-pagination-arrow"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1 || loading}
                aria-label={t('Previous page', 'अघिल्लो पृष्ठ')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              {paginationItems().map((item, index) => (
                typeof item === 'number' ? (
                  <button
                    type="button"
                    key={item}
                    className={`parliament-pagination-page ${item === page ? 'active' : ''}`}
                    onClick={() => onPageChange(item)}
                    disabled={loading}
                    aria-current={item === page ? 'page' : undefined}
                    aria-label={t(`Page ${item}`, `पृष्ठ ${item}`)}
                  >
                    {item}
                  </button>
                ) : (
                  <span className="parliament-pagination-ellipsis" key={`${item}-${index}`} aria-hidden="true">…</span>
                )
              ))}
              <button
                type="button"
                className="parliament-pagination-arrow"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages || loading}
                aria-label={t('Next page', 'अर्को पृष्ठ')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
