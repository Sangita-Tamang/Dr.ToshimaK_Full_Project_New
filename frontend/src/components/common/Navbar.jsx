import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { SOCIAL_LINKS } from '../../utils/constants';
import { getCloudinaryUrl } from '../../services/cloudinaryService';
const logoImg = getCloudinaryUrl('dr-tk/logo', { width: 400 });

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [parliamentDropdownOpen, setParliamentDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileParliamentDropdownOpen, setMobileParliamentDropdownOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [logoPreviewOpen, setLogoPreviewOpen] = useState(false);
  const languageSelectorRef = useRef(null);
  const { pathname } = useLocation();
  const { lang, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!logoPreviewOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setLogoPreviewOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [logoPreviewOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageSelectorRef.current && !languageSelectorRef.current.contains(event.target)) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setParliamentDropdownOpen(false);
    setMobileDropdownOpen(false);
    setMobileParliamentDropdownOpen(false);
    setLanguageMenuOpen(false);
  }, [pathname]);

  const selectLanguage = (newLanguage) => {
    toggleLanguage(newLanguage);
    setLanguageMenuOpen(false);
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-contact">
            <span>
              <i className="fas fa-map-marker-alt" style={{ marginRight: 6 }}></i>
              {t('Nakkhu, Lalitpur, Nepal', 'नक्कु, ललितपुर, नेपाल')}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <i className="fas fa-envelope"></i>
              info@toshimakarki.gov.np
            </span>
          </div>
          <div className="top-bar-socials">
            <a className="social-facebook social-tooltip social-icon-circle" href={SOCIAL_LINKS.facebookSecretariat} target="_blank" rel="noreferrer" aria-label="Dr. Toshima Karki Secretariat FB" title="Dr. Toshima Karki Secretariat FB" data-tooltip="Dr. Toshima Karki Secretariat FB"><i className="fa-brands fa-facebook-f"></i></a>
            <a className="social-facebook social-tooltip social-icon-circle" href={SOCIAL_LINKS.facebookPersonal} target="_blank" rel="noreferrer" aria-label="Personal Facebook" title="Personal Facebook" data-tooltip="Personal Facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a className="social-linkedin social-tooltip social-icon-circle" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" data-tooltip="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a className="social-youtube social-tooltip social-icon-circle" href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" title="YouTube" data-tooltip="YouTube"><i className="fa-brands fa-youtube"></i></a>
            <a className="social-x social-tooltip social-icon-circle" href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" title="Twitter" data-tooltip="Twitter"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932Zm-1.29 19.493h2.04L6.486 3.24H4.298L17.61 20.646Z" /></svg></a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header
        className="main-header"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : '#FFFFFF',
          boxShadow: scrolled ? 'var(--shadow-md)' : 'var(--shadow-sm)',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          transition: '0.3s ease',
        }}
      >
        <div className="container header-inner">
          {/* LOGO - Left Column */}
          <div className="site-brand">
            <button className="logo-preview-trigger" type="button" onClick={() => setLogoPreviewOpen(true)} aria-label="View Dr. Toshima Karki logo" aria-haspopup="dialog">
              <img src={logoImg} alt="Dr. Toshima Karki" className="site-logo" />
            </button>
          </div>

          {/* TEXT - Center Column */}
          <Link to="/" className="site-brand-copy">
            <div className="site-brand-name">
              {t('Dr. Toshima Karki', 'डा. तोषिमा कार्की')}
            </div>
            <div className="site-brand-subtitle">
              {t('Official Website', 'आधिकारिक वेबसाइट')}
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="desktop-nav-container">
            <ul className="desktop-nav">
              <li>
                <Link
                  to="/"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    fontSize: '16px',
                    color: pathname === '/' ? 'var(--primary)' : 'var(--secondary)',
                    padding: '8px 0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderBottom: pathname === '/' ? '2px solid var(--primary)' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                  className="nav-link-hover"
                >
                  {t('Home', 'गृह पृष्ठ')}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    fontSize: '16px',
                    color: pathname === '/about' ? 'var(--primary)' : 'var(--secondary)',
                    padding: '8px 0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderBottom: pathname === '/about' ? '2px solid var(--primary)' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                  className="nav-link-hover"
                >
                  {t('About', 'बारेमा')}
                </Link>
              </li>
              <li>
                <Link
                  to="/ministry"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    fontSize: '16px',
                    color: pathname === '/ministry' ? 'var(--primary)' : 'var(--secondary)',
                    padding: '8px 0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderBottom: pathname === '/ministry' ? '2px solid var(--primary)' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                  className="nav-link-hover"
                >
                  {t('Ministry', 'मन्त्रालय')}
                </Link>
              </li>
              <li
                style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
                onMouseEnter={() => setParliamentDropdownOpen(true)}
                onMouseLeave={() => setParliamentDropdownOpen(false)}
              >
                <Link
                  to="/parliament"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    fontSize: '16px',
                    color: pathname === '/parliament' ? 'var(--primary)' : 'var(--secondary)',
                    padding: '8px 0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    borderBottom: pathname === '/parliament' ? '2px solid var(--primary)' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                  className="nav-link-hover"
                >
                  {t('Parliament', 'संसद')} <i className="fas fa-chevron-down" style={{ fontSize: '0.75rem' }}></i>
                </Link>
                {parliamentDropdownOpen && (
                  <ul className="nav-dropdown">
                    <li>
                      <Link to="/parliament">{t('Mini Parliament', 'लघु संसद')}</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link
                  to="/party"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    fontSize: '16px',
                    color: pathname === '/party' ? 'var(--primary)' : 'var(--secondary)',
                    padding: '8px 0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderBottom: pathname === '/party' ? '2px solid var(--primary)' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                  className="nav-link-hover"
                >
                  {t('Political Party', 'राजनीतिक पार्टी')}
                </Link>
              </li>
 
              {/* DROPDOWN FOR NEWS & MEDIA */}
              <li
                style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    fontSize: '16px',
                    color: ['/news', '/media', '/blog'].includes(pathname) ? 'var(--primary)' : 'var(--secondary)',
                    background: 'none',
                    border: 'none',
                    padding: '8px 0',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    borderBottom: ['/news', '/media', '/blog'].includes(pathname) ? '2px solid var(--primary)' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                  className="nav-link-hover"
                >
                  {t('News & Media', 'समाचार र मिडिया')} <i className="fas fa-chevron-down" style={{ fontSize: '0.75rem' }}></i>
                </button>
                {dropdownOpen && (
                  <ul className="nav-dropdown">
                    <li>
                      <Link to="/news">{t('News', 'समाचार')}</Link>
                    </li>
                    <li>
                      <Link to="/media">{t('Media Coverage', 'मिडिया कभरेज')}</Link>
                    </li>
                    <li>
                      <Link to="/blog">{t('Blog', 'ब्लग')}</Link>
                    </li>
                  </ul>
                )}
              </li>
 
              <li>
                <Link
                  to="/gallery"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    fontSize: '16px',
                    color: pathname === '/gallery' ? 'var(--primary)' : 'var(--secondary)',
                    padding: '8px 0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderBottom: pathname === '/gallery' ? '2px solid var(--primary)' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                  className="nav-link-hover"
                >
                  {t('Gallery', 'ग्यालरी')}
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    fontSize: '16px',
                    color: pathname === '/contact' ? 'var(--primary)' : 'var(--secondary)',
                    padding: '8px 0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderBottom: pathname === '/contact' ? '2px solid var(--primary)' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                  className="nav-link-hover"
                >
                  {t('Contact', 'सम्पर्क')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* LANGUAGE SELECTOR */}
          <div className="desktop-language-selector">
            <div className="language-selector" ref={languageSelectorRef} onMouseEnter={() => setLanguageMenuOpen(true)} onMouseLeave={() => setLanguageMenuOpen(false)}>
              <button className="language-toggle" onClick={() => setLanguageMenuOpen((isOpen) => !isOpen)} aria-label="Select language" aria-expanded={languageMenuOpen}>
                <span className={lang === 'en' ? 'active' : ''}>EN</span>
                <span className="language-divider">/</span>
                <span className={lang === 'np' ? 'active' : ''}>ने</span>
              </button>
              {languageMenuOpen && (
                <div className="language-popover" role="menu">
                  <button className={lang === 'en' ? 'active' : ''} onClick={() => selectLanguage('en')} role="menuitem">English</button>
                  <button className={lang === 'np' ? 'active' : ''} onClick={() => selectLanguage('np')} role="menuitem">नेपाली</button>
                </div>
              )}
            </div>
          </div>

          {/* CTA BUTTON + HAMBURGER */}
          <div className="header-actions">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ 
                display: 'none', 
                background: 'transparent', 
                border: 'none', 
                cursor: 'pointer', 
                fontSize: '1.2rem', 
                color: '#000',
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              className="hamburger-btn"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {menuOpen && (
          <div style={{ backgroundColor: '#fff', borderTop: '1px solid var(--border-color)', padding: '16px 24px', boxShadow: 'var(--shadow-md)' }} className="mobile-nav-panel">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ marginBottom: 12 }}>
                <Link to="/" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, color: pathname === '/' ? 'var(--primary)' : 'var(--secondary)', display: 'block', padding: '8px 0' }}>
                  {t('Home', 'गृह पृष्ठ')}
                </Link>
              </li>
              <li style={{ marginBottom: 12 }}>
                <Link to="/about" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, color: pathname === '/about' ? 'var(--primary)' : 'var(--secondary)', display: 'block', padding: '8px 0' }}>
                  {t('About', 'बारेमा')}
                </Link>
              </li>
              <li style={{ marginBottom: 12 }}>
                <Link to="/ministry" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, color: pathname === '/ministry' ? 'var(--primary)' : 'var(--secondary)', display: 'block', padding: '8px 0' }}>
                  {t('Ministry', 'मन्त्रालय')}
                </Link>
              </li>
              <li className="mobile-nav-item has-submenu">
                <div className="mobile-nav-item-row">
                  <Link to="/parliament" className="mobile-nav-main-link">
                    {t('Parliament', 'संसद')}
                  </Link>
                  <button
                    type="button"
                    className="mobile-submenu-toggle"
                    onClick={() => setMobileParliamentDropdownOpen(!mobileParliamentDropdownOpen)}
                    aria-label={t('Toggle Parliament submenu', 'संसद उपमेनु खोल्नुहोस्')}
                    aria-expanded={mobileParliamentDropdownOpen}
                  >
                    <i className={`fas fa-chevron-${mobileParliamentDropdownOpen ? 'up' : 'down'}`}></i>
                  </button>
                </div>
                {mobileParliamentDropdownOpen && (
                  <ul className="mobile-submenu">
                    <li>
                      <Link to="/parliament">{t('Mini Parliament', 'लघु संसद')}</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li style={{ marginBottom: 12 }}>
                <Link to="/party" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, color: pathname === '/party' ? 'var(--primary)' : 'var(--secondary)', display: 'block', padding: '8px 0' }}>
                  {t('Political Party', 'राजनीतिक पार्टी')}
                </Link>
              </li>

              {/* MOBILE DROPDOWN */}
              <li className="mobile-nav-item has-submenu">
                <div className="mobile-nav-item-row">
                  <Link to="/news" className="mobile-nav-main-link">
                    {t('News & Media', 'समाचार र मिडिया')}
                  </Link>
                  <button
                    type="button"
                    className="mobile-submenu-toggle"
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    aria-label={t('Toggle News and Media submenu', 'समाचार र मिडिया उपमेनु खोल्नुहोस्')}
                    aria-expanded={mobileDropdownOpen}
                  >
                    <i className={`fas fa-chevron-${mobileDropdownOpen ? 'up' : 'down'}`}></i>
                  </button>
                </div>
                {mobileDropdownOpen && (
                  <ul className="mobile-submenu">
                    <li>
                      <Link to="/news">
                        {t('News', 'समाचार')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/media">
                        {t('Media Coverage', 'मिडिया कभरेज')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/blog">
                        {t('Blog', 'ब्लग')}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li style={{ marginBottom: 12 }}>
                <Link to="/gallery" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, color: pathname === '/gallery' ? 'var(--primary)' : 'var(--secondary)', display: 'block', padding: '8px 0' }}>
                  {t('Gallery', 'ग्यालरी')}
                </Link>
              </li>

              <li style={{ marginBottom: 12 }}>
                <Link to="/contact" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, color: pathname === '/contact' ? 'var(--primary)' : 'var(--secondary)', display: 'block', padding: '8px 0' }}>
                  {t('Contact', 'सम्पर्क')}
                </Link>
              </li>

              <li className="mobile-language-row">
                <div className="language-selector" ref={languageSelectorRef} onMouseEnter={() => setLanguageMenuOpen(true)} onMouseLeave={() => setLanguageMenuOpen(false)}>
                  <button className="language-toggle" onClick={() => setLanguageMenuOpen((isOpen) => !isOpen)} aria-label="Select language" aria-expanded={languageMenuOpen}>
                    <span className={lang === 'en' ? 'active' : ''}>EN</span>
                    <span className="language-divider">/</span>
                    <span className={lang === 'np' ? 'active' : ''}>ने</span>
                  </button>
                  {languageMenuOpen && (
                    <div className="language-popover" role="menu">
                      <button className={lang === 'en' ? 'active' : ''} onClick={() => selectLanguage('en')} role="menuitem">English</button>
                      <button className={lang === 'np' ? 'active' : ''} onClick={() => selectLanguage('np')} role="menuitem">नेपाली</button>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        )}
      </header>

      {logoPreviewOpen && (
        <div className="logo-lightbox" role="presentation" onMouseDown={() => setLogoPreviewOpen(false)}>
          <div className="logo-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Dr. Toshima Karki logo preview" onMouseDown={(event) => event.stopPropagation()}>
            <button className="logo-lightbox-close" type="button" onClick={() => setLogoPreviewOpen(false)} aria-label="Close logo preview">
              <i className="fas fa-times"></i>
            </button>
            <img src={logoImg} alt="Dr. Toshima Karki full logo" />
          </div>
        </div>
      )}

      {/* Dropdown CSS and Micro-animations */}
      <style>{`
        .animate-hover {
          position: relative;
          overflow: hidden;
        }
        .nav-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: #FFFFFF;
          box-shadow: var(--shadow-lg);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          list-style: none;
          padding: 8px 0;
          margin: 0;
          min-width: 180px;
          z-index: 1000;
          animation: slideDown 0.2s ease-out forwards;
        }
        .nav-dropdown li a {
          display: block;
          padding: 10px 16px;
          color: var(--secondary);
          font-size: 0.9rem;
          font-weight: 500;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .nav-dropdown li a:hover {
          background-color: var(--light-gray);
          color: var(--primary);
        }
        .nav-link-hover:hover {
          color: var(--primary) !important;
          border-bottom-color: var(--primary) !important;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 992px) {
          .desktop-nav-container { display: none !important; }
          .desktop-language-selector { display: none !important; }
          .hamburger-btn { display: inline-flex !important; }
        }
        @media (min-width: 993px) {
          .mobile-nav-panel { display: none !important; }
        }
      `}</style>
    </>
  );
}
