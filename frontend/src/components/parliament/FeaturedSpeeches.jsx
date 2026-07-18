import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import axios from 'axios';
import { getCloudinaryUrl } from '../../services/cloudinaryService';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';

export default function FeaturedSpeeches({ tenure }) {
  const { t, lang } = useLanguage();
  const contentLanguage = lang === 'np' ? 'ne' : 'en';
  const [speeches, setSpeeches] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchFeaturedSpeeches();
  }, [tenure]);
  
  const fetchFeaturedSpeeches = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/parliament/activities/featured`, {
        params: { limit: 3, tenure }
      });
      setSpeeches(response.data.data || []);
    } catch (err) {
      console.error('Error fetching featured speeches:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString(contentLanguage === 'ne' ? 'ne-NP' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="parliament-featured">
        <div className="parliament-featured-header">
          <h3>{t('Featured Parliamentary Speeches', 'विशेष संसदीय भाषणहरू')}</h3>
        </div>
        <div className="parliament-featured-loading">
          <div className="parliament-spinner-small"></div>
        </div>
      </div>
    );
  }
  
  if (speeches.length === 0) {
    return null;
  }
  
  return (
    <aside className="parliament-featured" id="featured-speeches">
      <div className="parliament-featured-header">
        <h3>{t('Featured Parliamentary Speeches', 'विशेष संसदीय भाषणहरू')}</h3>
        <a href="#" className="parliament-featured-link">
          {t('View All', 'सबै हेर्नुहोस्')} →
        </a>
      </div>
      
      <div className="parliament-featured-list">
        {speeches.map((speech) => {
          const title = speech.title[contentLanguage] || speech.title.en;
          const category = speech.category[contentLanguage] || speech.category.en;
          
          return (
            <a
              key={speech._id}
              href={speech.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="parliament-featured-item"
            >
              <div className="parliament-featured-thumbnail">
                <img
                  src={speech.image || getCloudinaryUrl('dr-tk/image2', { width: 400 })}
                  alt=""
                  loading="lazy"
                />
                <div className="parliament-featured-play-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              
              <div className="parliament-featured-content">
                <h4 className="parliament-featured-title">
                  {title}
                </h4>
                <div className="parliament-featured-meta">
                  <span className="parliament-featured-category">
                    {category}
                  </span>
                  <span className="parliament-featured-date">
                    {formatDate(speech.date)}
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
