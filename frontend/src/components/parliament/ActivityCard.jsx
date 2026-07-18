import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getCloudinaryUrl } from '../../services/cloudinaryService';
import OptimizedImage from '../common/OptimizedImage';

const CARD_IMAGES = Array.from({ length: 18 }, (_, i) => 
  getCloudinaryUrl(`dr-tk/image${i + 1}`, { width: 600 })
);

export default function ActivityCard({ activity, imageIndex = 0 }) {
  const { t, lang } = useLanguage();
  // The site-wide language selector uses "np", while Parliament API content
  // is stored with the standard Nepali key, "ne".
  const contentLanguage = lang === 'np' ? 'ne' : 'en';
  
  const formatDate = (date) => {
    const d = new Date(date);
    return new Intl.NumberFormat(contentLanguage === 'ne' ? 'ne-NP' : 'en-US').format(d.getFullYear());
  };
  
  const title = activity.title[contentLanguage] || activity.title.en;
  const description = activity.description[contentLanguage] || activity.description.en;
  const category = activity.category[contentLanguage] || activity.category.en;
  const image = getCloudinaryUrl(
    activity.image || `dr-tk/image${(imageIndex % CARD_IMAGES.length) + 1}`,
    { width: 600, height: 400 }
  );
  
  return (
    <article className="parliament-activity-card">
      {/* Image */}
      <div className="parliament-card-image-wrapper">
        <OptimizedImage
          src={image}
          alt={title}
          className={`parliament-card-image ${activity.category.en === 'Health Governance' ? 'parliament-card-image--health-governance' : ''}`}
          lazy={true}
          fill={true}
        />
        <div className="parliament-card-date-badge">
          {formatDate(activity.date)}
        </div>
      </div>
      
      {/* Content */}
      <div className="parliament-card-body">
        <div className="parliament-card-category-badge">
          {category}
        </div>
        
        <h3 className="parliament-card-title">
          {title}
        </h3>
        
        <p className="parliament-card-description">
          {description}
        </p>

      </div>
      
      {/* Action */}
      <a
        href={activity.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="parliament-card-action"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <span>
          {activity.sourceType === 'video'
            ? t('Watch Speech', 'भाषण हेर्नुहोस्')
            : t('Read Article', 'लेख पढ्नुहोस्')
          }
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </a>
    </article>
  );
}
