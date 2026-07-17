import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import image1 from '../../assets/images/image1.png';
import image2 from '../../assets/images/image2.png';
import image3 from '../../assets/images/image3.png';
import image4 from '../../assets/images/image4.png';
import image5 from '../../assets/images/image5.png';
import image6 from '../../assets/images/image6.png';
import image7 from '../../assets/images/image7.png';
import image8 from '../../assets/images/image8.png';
import image9 from '../../assets/images/image9.png';
import image10 from '../../assets/images/image10.png';
import image11 from '../../assets/images/image11.png';
import image12 from '../../assets/images/image12.png';
import image13 from '../../assets/images/image13.png';
import image14 from '../../assets/images/image14.png';
import image15 from '../../assets/images/image15.png';
import image16 from '../../assets/images/image16.png';
import image17 from '../../assets/images/image17.png';
import image18 from '../../assets/images/image18.png';

const CARD_IMAGES = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18];

export default function ActivityCard({ activity, imageIndex = 0 }) {
  const { t, lang } = useLanguage();
  
  const formatDate = (date) => {
    const d = new Date(date);
    return new Intl.NumberFormat(lang === 'ne' ? 'ne-NP' : 'en-US').format(d.getFullYear());
  };
  
  const title = activity.title[lang] || activity.title.en;
  const description = activity.description[lang] || activity.description.en;
  const category = activity.category[lang] || activity.category.en;
  
  return (
    <article className="parliament-activity-card">
      {/* Image */}
      <div className="parliament-card-image-wrapper">
        <img
          src={CARD_IMAGES[imageIndex % CARD_IMAGES.length]}
          alt={title}
          className={`parliament-card-image ${activity.category.en === 'Health Governance' ? 'parliament-card-image--health-governance' : ''}`}
          loading="lazy"
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
