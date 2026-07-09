import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import heroImg from '../../assets/images/image10.png';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <span className="hero-tag">{t('LEADERSHIP. COMPASSION. COMMITMENT.', 'नेतृत्व। करुणा। प्रतिबद्धता।')}</span>
          <h1 className="hero-title">
            {t('Empowering Health & Leadership in Nepal', 'नेपालमा स्वास्थ्य र नेतृत्वको सशक्तिकरण')}
          </h1>
          <p className="hero-description">
            {t(
              'Dedicated to building a healthy, equitable and prosperous Nepal through healthcare reform, good governance and people-first leadership.',
              'स्वास्थ्य सेवा सुधार, सुशासन र जनमुखी नेतृत्व मार्फत स्वस्थ, समतामूलक र समृद्ध नेपाल निर्माणमा समर्पित।'
            )}
          </p>
          <div className="hero-buttons">
            <Link to="/about" className="btn btn-primary">{t('Learn More About Me', 'मेरो बारेमा थप जान्नुहोस्')}</Link>
            <a href="#explore-work" className="btn btn-outline">{t('Explore My Work', 'मेरो कामको अन्वेषण गर्नुहोस्')}</a>
          </div>
        </div>

        <div className="hero-image-container">
          <div style={{
            position: 'absolute', top: '10%', right: 0, width: '90%', height: '80%',
            background: 'radial-gradient(circle, rgba(200,16,46,0.08) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 1
          }} />
          <img src={heroImg} alt="Dr. Toshima Karki" className="hero-portrait" />
        </div>
      </div>
    </section>
  );
}
