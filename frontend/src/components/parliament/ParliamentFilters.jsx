import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function ParliamentFilters({
  searchQuery,
  onSearchChange,
  selectedDate,
  onDateChange,
  activeTenure
}) {
  const { t } = useLanguage();
  const availableYears = activeTenure === 'second' ? [2027, 2026, 2025] : [2025, 2024, 2023, 2022];
  
  return (
    <section className="parliament-filters">
      {/* Search */}
      <div className="parliament-search">
        <div className="parliament-search-input-wrapper">
          <svg 
            className="parliament-search-icon" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35" strokeLinecap="round"/>
          </svg>
          <input
            type="search"
            className="parliament-search-input"
            placeholder={t(
              'Search Parliamentary Activities',
              'संसदीय गतिविधि खोज्नुहोस्'
            )}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label={t('Search', 'खोज्नुहोस्')}
          />
        </div>
      </div>
      
      {/* Date Filter */}
      <div className="parliament-filter-section">
        <h3 className="parliament-filter-title">
          {t('Filter by Date', 'मितिअनुसार फिल्टर गर्नुहोस्')}
        </h3>
        <div className="parliament-date-filter">
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <select
            className="parliament-date-select"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            aria-label={t('Select Date', 'मिति छान्नुहोस्')}
          >
            <option value="">
              {t('All Dates', 'सबै मिति')}
            </option>
            {availableYears.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
      </div>
      
      {/* Active Filters Display */}
      {(searchQuery || selectedDate) && (
        <div className="parliament-active-filters">
          <span className="parliament-active-filters-label">
            {t('Active Filters:', 'सक्रिय फिल्टरहरू:')}
          </span>
          
          {searchQuery && (
            <span className="parliament-active-filter-tag">
              {t('Search:', 'खोज:')} "{searchQuery}"
              <button 
                onClick={() => onSearchChange('')}
                aria-label={t('Clear search', 'खोज हटाउनुहोस्')}
              >
                ×
              </button>
            </span>
          )}
          
          {selectedDate && (
            <span className="parliament-active-filter-tag">
              {selectedDate}
              <button 
                onClick={() => onDateChange('')}
                aria-label={t('Clear date', 'मिति हटाउनुहोस्')}
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </section>
  );
}
