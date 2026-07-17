import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import heroImage from '../../assets/images/parliment.hero.png';

export default function ParliamentHero() {
  const { t } = useLanguage();
  
  return (
    <section className="parliament-hero">
      {/* Background Image */}
      <div className="parliament-hero-backdrop">
        <img 
          src={heroImage} 
          alt="" 
          className="parliament-hero-background"
          loading="eager"
        />
        <div className="parliament-hero-overlay"></div>
      </div>
      
      {/* Content */}
      <div className="container parliament-hero-container">
        <div className="parliament-hero-content">
          <span className="parliament-hero-label">
            {t('PARLIAMENT OF NEPAL', 'नेपालको संसद')}
          </span>
          
          <h1 className="parliament-hero-title">
            {t('Representing People.', 'जनताको प्रतिनिधित्व।')}
            <br />
            {t('Raising Voices.', 'जनताको आवाज उठाउँदै।')}
            <br />
            <span className="parliament-hero-title-accent">
              {t('Creating Impact.', 'परिवर्तनको प्रभाव सिर्जना गर्दै।')}
            </span>
          </h1>
          
          <p className="parliament-hero-description">
            {t(
              'As a Member of Parliament representing Lalitpur Constituency No. 3, Dr. Toshima Karki works towards evidence-based policymaking, healthcare reform, good governance, and citizen-centered development.',
              'ललितपुर निर्वाचन क्षेत्र नं. ३ बाट प्रतिनिधित्व गर्ने सांसद डा. तोशिमा कार्की प्रमाणमा आधारित नीति निर्माण, स्वास्थ्य सुधार, सुशासन र नागरिक केन्द्रित विकासका लागि निरन्तर कार्यरत हुनुहुन्छ।'
            )}
          </p>
          
          <a 
            href="#activities" 
            className="parliament-hero-button"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M6.3 2.84A1 1 0 0 0 5 3.73v12.54a1 1 0 0 0 1.54.83l10-6.27a1 1 0 0 0 0-1.66l-10-6.33Z" />
            </svg>
            <span>{t('Watch Speech', 'भाषण हेर्नुहोस्')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
