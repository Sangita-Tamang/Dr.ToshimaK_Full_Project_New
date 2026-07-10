import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { NAV_LINKS, SOCIAL_LINKS } from '../../utils/constants';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <h2>{t('Dr. Toshima Karki', 'डा. तोषिमा कार्की')}</h2>
            <p>{t('Dedicated to building a healthier, stronger and more prosperous Nepal through leadership and service.', 'नेतृत्व र सेवा मार्फत स्वस्थ, सशक्त र समृद्ध नेपालको लागि समर्पित।')}</p>
            <div className="footer-socials">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>{t('Quick Links', 'छिटो लिङ्कहरू')}</h3>
            <ul>
              {NAV_LINKS.slice(0, 4).map(link => (
                <li key={link.path}><Link to={link.path}>{t(link.label, link.labelNp)}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-links">
            <h3>{t('Resources', 'संसाधनहरू')}</h3>
            <ul>
              <li><Link to="/gallery">{t('Gallery', 'ग्यालरी')}</Link></li>
              <li><Link to="/media">{t('Speeches & Media', 'भाषण र मिडिया')}</Link></li>
              <li><Link to="/internship">{t('Internship', 'इन्टर्नशिप')}</Link></li>
              <li><Link to="/contact">{t('Contact', 'सम्पर्क')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {t('Dr. Toshima Karki. All Rights Reserved.', 'डा. तोषिमा कार्की। सबै अधिकार सुरक्षित।')}</p>
          <div className="footer-bottom-links">
            <a href="#">{t('Privacy Policy', 'गोपनीयता नीति')}</a>
            <a href="#">{t('Terms of Use', 'प्रयोगका शर्तहरू')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
