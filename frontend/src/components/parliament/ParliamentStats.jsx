import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function ParliamentStats({ stats }) {
  const { t } = useLanguage();
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.querySelector('.parliament-stats');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, [animated]);
  
  const statsData = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M4 21V9l8-5 8 5v12" strokeLinejoin="round"/>
          <path d="M9 21v-6h6v6" strokeLinecap="round"/>
        </svg>
      ),
      value: '2',
      label: t('Parliamentary Tenures', 'संसदीय कार्यकाल'),
      subtext: '2022 – 2027'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round"/>
        </svg>
      ),
      value: stats?.overall?.firstTenureCount + stats?.overall?.secondTenureCount || '50+',
      label: t('Public Issues Raised', 'सार्वजनिक मुद्दाहरू उठाइएका'),
      subtext: null
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="3" width="6" height="11" rx="3"/>
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round"/>
        </svg>
      ),
      value: '30+',
      label: t('Parliamentary Speeches', 'संसदीय भाषणहरू'),
      subtext: null
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round"/>
        </svg>
      ),
      value: '15+',
      label: t('Committee Discussions', 'समिति छलफलहरू'),
      subtext: null
    }
  ];
  
  return (
    <section className="parliament-stats">
      <div className="container">
        <div className="parliament-stats-grid">
          {statsData.map((stat, index) => (
            <div 
              key={index} 
              className={`parliament-stat-card ${animated ? 'animate-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="parliament-stat-icon">
                {stat.icon}
              </div>
              <div className="parliament-stat-content">
                <div className="parliament-stat-value">{stat.value}</div>
                <div className="parliament-stat-label">{stat.label}</div>
                {stat.subtext && (
                  <div className="parliament-stat-subtext">{stat.subtext}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
