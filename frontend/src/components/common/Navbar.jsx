import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const { pathname } = useLocation();
  const { lang, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setMobileDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="container">
          <div style={{ display: 'flex', gap: 24, fontSize: '0.85rem', alignItems: 'center' }}>
            <span>
              <i className="fas fa-map-marker-alt" style={{ marginRight: 6 }}></i>
              {t('Singha Durbar, Kathmandu, Nepal', 'सिंहदरबार, काठमाडौं, नेपाल')}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <i className="fas fa-envelope"></i>
              info@toshimakarki.gov.np
            </span>
          </div>
          <div className="top-bar-socials">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
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
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 80 }}>
          {/* LOGO */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src="/src/assets/images/image10.png"
              alt="Dr. Toshima Karki"
              style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--secondary)', textTransform: 'uppercase', lineHeight: 1.2 }}>
                {t('Dr. Toshima Karki', 'डा. तोषिमा कार्की')}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {t('Official Website', 'आधिकारिक वेबसाइट')}
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 40 }} className="desktop-nav-container">
            <ul style={{ display: 'flex', listStyle: 'none', gap: 32, alignItems: 'center', margin: 0, padding: 0 }} className="desktop-nav">
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
              <li>
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
                    borderBottom: pathname === '/parliament' ? '2px solid var(--primary)' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                  className="nav-link-hover"
                >
                  {t('Parliament', 'संसद')}
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
 
            {/* LANGUAGE SELECTOR */}
            <div className="language-selector" style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: '15px', marginLeft: 12 }}>
              <i className="fas fa-globe" style={{ color: 'var(--text-muted)', marginRight: 6 }}></i>
              <button
                onClick={() => toggleLanguage('en')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  color: lang === 'en' ? 'var(--primary)' : 'var(--text-muted)',
                  padding: '4px 0',
                  width: '32px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-heading)',
                  transition: 'color 0.2s ease',
                  display: 'inline-block',
                }}
              >
                EN
              </button>
              <span style={{ color: 'var(--border-color)', userSelect: 'none', padding: '0 2px' }}>|</span>
              <button
                onClick={() => toggleLanguage('np')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  color: lang === 'np' ? 'var(--primary)' : 'var(--text-muted)',
                  padding: '4px 0',
                  width: '32px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-heading)',
                  transition: 'color 0.2s ease',
                  display: 'inline-block',
                }}
              >
                NP
              </button>
            </div>
          </nav>

          {/* CTA BUTTON + HAMBURGER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: 'var(--secondary)' }}
              className="hamburger-btn"
              aria-label="Toggle menu"
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
              <li style={{ marginBottom: 12 }}>
                <Link to="/parliament" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, color: pathname === '/parliament' ? 'var(--primary)' : 'var(--secondary)', display: 'block', padding: '8px 0' }}>
                  {t('Parliament', 'संसद')}
                </Link>
              </li>

              {/* MOBILE DROPDOWN */}
              <li style={{ marginBottom: 12 }}>
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    color: ['/news', '/media', '/blog'].includes(pathname) ? 'var(--primary)' : 'var(--secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '8px 0',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span>{t('News & Media', 'समाचार र मिडिया')}</span>
                  <i className={`fas fa-chevron-${mobileDropdownOpen ? 'up' : 'down'}`} style={{ fontSize: '0.8rem' }}></i>
                </button>
                {mobileDropdownOpen && (
                  <ul style={{ listStyle: 'none', paddingLeft: 16, marginTop: 8, borderLeft: '2px solid var(--border-color)' }}>
                    <li style={{ marginBottom: 8 }}>
                      <Link to="/news" style={{ display: 'block', padding: '6px 0', color: pathname === '/news' ? 'var(--primary)' : 'var(--secondary)' }}>
                        {t('News', 'समाचार')}
                      </Link>
                    </li>
                    <li style={{ marginBottom: 8 }}>
                      <Link to="/media" style={{ display: 'block', padding: '6px 0', color: pathname === '/media' ? 'var(--primary)' : 'var(--secondary)' }}>
                        {t('Media Coverage', 'मिडिया कभरेज')}
                      </Link>
                    </li>
                    <li style={{ marginBottom: 8 }}>
                      <Link to="/blog" style={{ display: 'block', padding: '6px 0', color: pathname === '/blog' ? 'var(--primary)' : 'var(--secondary)' }}>
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

              {/* MOBILE LANGUAGE SELECTOR */}
              <li style={{ padding: '12px 0', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <i className="fas fa-globe" style={{ color: 'var(--text-muted)' }}></i>
                <button
                  onClick={() => toggleLanguage('en')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: lang === 'en' ? '700' : '400',
                    color: lang === 'en' ? 'var(--primary)' : 'var(--secondary)',
                  }}
                >
                  English
                </button>
                <span style={{ color: 'var(--border-color)' }}>|</span>
                <button
                  onClick={() => toggleLanguage('np')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: lang === 'np' ? '700' : '400',
                    color: lang === 'np' ? 'var(--primary)' : 'var(--secondary)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  नेपाली
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

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
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
