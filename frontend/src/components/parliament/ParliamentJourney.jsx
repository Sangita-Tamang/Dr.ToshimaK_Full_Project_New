import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function ParliamentJourney({ activeTenure, onTenureChange }) {
  const { t } = useLanguage();
  
  const tenures = [
    {
      id: 'first',
      label: t('First Tenure', 'पहिलो कार्यकाल'),
      period: '2022 – 2025',
      status: t('Completed', 'सम्पन्न'),
      statusClass: 'completed'
    },
    {
      id: 'second',
      label: t('Second Tenure', 'दोस्रो कार्यकाल'),
      period: '2025 – 2027',
      status: t('Current', 'चालु'),
      statusClass: 'current'
    }
  ];
  
  return (
    <section className="parliament-journey">
      <div className="parliament-journey-header">
        <h2 className="parliament-journey-title">
          {t('Parliamentary Journey', 'संसदीय यात्रा')}
        </h2>
        <p className="parliament-journey-subtitle">
          {t(
            'Explore legislative work, debates, policies and initiatives across both tenures.',
            'दुवै कार्यकालहरूमा विधायी कार्य, बहस, नीति र पहलहरू अन्वेषण गर्नुहोस्।'
          )}
        </p>
      </div>
      
      <div className="parliament-tenure-selector">
        {tenures.map((tenure) => (
          <button
            key={tenure.id}
            className={`parliament-tenure-card ${
              activeTenure === tenure.id ? 'active' : ''
            }`}
            onClick={() => onTenureChange(tenure.id)}
            aria-pressed={activeTenure === tenure.id}
          >
            <div className="parliament-tenure-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            
            <div className="parliament-tenure-content">
              <div className="parliament-tenure-label">{tenure.label}</div>
              <div className="parliament-tenure-period">{tenure.period}</div>
            </div>
            
            <span className={`parliament-tenure-badge ${tenure.statusClass}`}>
              {tenure.status}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
