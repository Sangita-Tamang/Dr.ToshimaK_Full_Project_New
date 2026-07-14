import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { NAV_LINKS, SOCIAL_LINKS } from '../../utils/constants';
import logoImg from '../../assets/images/logo.png';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-brand-heading">
              <img src={logoImg} className="footer-logo" alt="Dr. Toshima Karki" />
              <h2>{t('Dr. Toshima Karki', 'डा. तोषिमा कार्की')}</h2>
            </Link>
            <p>{t('Dedicated to building a healthier, stronger and more prosperous Nepal through leadership and service.', 'नेतृत्व र सेवा मार्फत स्वस्थ, सशक्त र समृद्ध नेपालको लागि समर्पित।')}</p>
            <div className="footer-socials">
              <a className="social-facebook" href={SOCIAL_LINKS.facebookPersonal} target="_blank" rel="noreferrer" aria-label="Facebook Personal" title="Facebook Personal"><i className="fa-brands fa-facebook-f"></i></a>
              <a className="social-facebook" href={SOCIAL_LINKS.facebookSecretariat} target="_blank" rel="noreferrer" aria-label="Facebook Secretariat" title="Facebook Secretariat"><i className="fa-brands fa-facebook-f"></i></a>
              <a className="social-linkedin" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a className="social-youtube" href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" title="YouTube"><i className="fa-brands fa-youtube"></i></a>
              <a className="social-x" href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" aria-label="X (Twitter)" title="X (Twitter)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932Zm-1.29 19.493h2.04L6.486 3.24H4.298L17.61 20.646Z" /></svg></a>
              <a className="social-tiktok" href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" title="TikTok"><i className="fa-brands fa-tiktok"></i></a>
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
