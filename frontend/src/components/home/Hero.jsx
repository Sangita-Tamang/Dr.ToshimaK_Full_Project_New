import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect } from 'react';
import heroBackground from '../../assets/images/home.hero.png';

export default function Hero() {
  const { t } = useLanguage();

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-show');
        }
      });
    }, { threshold: 0.25 });

    document.querySelectorAll('.animate-hidden').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const title = t(
    'Honoring the People\'s Trust Through Healthcare, Public Service, and Good Governance to Build a Prosperous Nepal.',
    'जनताको विश्वासलाई सम्मान गर्दै, स्वास्थ्य, सेवा र सुशासनमार्फत समृद्ध नेपालको निर्माणमा निरन्तर समर्पित।'
  );

  const description = t(
    'A lifetime of service rooted in dignity, compassion, and accountable leadership for every Nepali family.',
    'हरि नेपाली परिवारको सम्मान, करुणा र उत्तरदायित्वपूर्ण नेतृत्वमा आधारित सेवाको दीर्घकालीन यात्रा।'
  );

  return (
    <section className="hero-section">
      <div className="hero-backdrop" aria-hidden="true">
        <img src={heroBackground} alt="" className="hero-background" />
        <div className="hero-overlay" />
      </div>

      <div className="container hero-shell">
        <div className="hero-content-panel animate-hidden fade-in-up">
          <span className="hero-tag">{t('Official Website', 'आधिकारिक वेबसाइट')}</span>
          <h1 className="hero-title">{title}</h1>
          <p className="hero-description">{description}</p>
          <div className="hero-buttons">
            <Link to="/about" className="btn btn-primary">{t('Learn More', 'थप जानकारी')}</Link>
            <a href="#explore-work" className="btn btn-outline">{t('Explore Work', 'काम अन्वेषण गर्नुहोस्')}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
