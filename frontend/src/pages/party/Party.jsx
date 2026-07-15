import { useEffect, useState, useMemo, useCallback } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Loader from '../../components/common/Loader';
import { useLanguage } from '../../context/LanguageContext';
import partyService from '../../services/partyService';
import partyHeroBg from '../../assets/images/party.hero.png';
import fallbackPortrait from '../../assets/images/image10.png';
import './Party.css';

export default function Party() {
  const { lang, t } = useLanguage();
  const [partyData, setPartyData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadPartyData = async () => {
      try {
        const res = await partyService.getSettings();
        setPartyData(res?.data || {});
      } catch {
        // The page has complete local copy and image fallbacks, so an
        // unavailable API must not leave a first-time visitor on a blank page.
        setPartyData({});
      } finally {
        setLoading(false);
      }
    };
    loadPartyData();
  }, []);

  useEffect(() => {
    if (!partyData?.seo) return;
    const title = lang === 'np' ? partyData.seo.metaTitleNp : partyData.seo.metaTitleEn;
    const description = lang === 'np' ? partyData.seo.metaDescriptionNp : partyData.seo.metaDescriptionEn;
    if (title) document.title = title;
    if (description) {
      let descriptionTag = document.querySelector('meta[name="description"]');
      if (!descriptionTag) {
        descriptionTag = document.createElement('meta');
        descriptionTag.name = 'description';
        document.head.appendChild(descriptionTag);
      }
      descriptionTag.content = description;
    }
  }, [lang, partyData]);

  const tt = useCallback((en, np) => (lang === 'np' ? np || en : en), [lang]);

  // Memoize fallback data to prevent recreating on every render
  const fallbackPrinciples = useMemo(() => [
    { titleEn: 'Transparency', titleNp: 'पारदर्शिता', descriptionEn: 'We believe in open communication and transparent governance at all levels.', descriptionNp: 'हामी सबै तहमा खुला संवाद र पारदर्शी शासनमा विश्वास गर्छौं।', icon: 'fas fa-shield-alt' },
    { titleEn: 'Accountability', titleNp: 'जवाफदेहिता', descriptionEn: 'We are accountable to the people and committed to deliver on our promises.', descriptionNp: 'हामी जनताप्रति जवाफदेही छौं र हाम्रा प्रतिबद्धता पूरा गर्न समर्पित छौं।', icon: 'fas fa-users' },
    { titleEn: 'Integrity', titleNp: 'इमान्दारिता', descriptionEn: 'We uphold the highest standards of integrity in all our actions.', descriptionNp: 'हामी हाम्रा सबै कार्यहरूमा उच्चतम इमान्दारिताको मापदण्ड कायम राख्छौं।', icon: 'fas fa-balance-scale' },
    { titleEn: 'Inclusiveness', titleNp: 'समावेशिता', descriptionEn: 'We embrace diversity and ensure equal rights and opportunities for every citizen.', descriptionNp: 'हामी विविधतालाई अँगाल्छौं र हरेक नागरिकका लागि समान अधिकार र अवसर सुनिश्चित गर्छौं।', icon: 'fas fa-people-arrows' },
    { titleEn: 'Innovation', titleNp: 'नवप्रवर्तन', descriptionEn: 'We encourage innovative ideas and modern solutions for national progress.', descriptionNp: 'हामी राष्ट्रिय प्रगतिका लागि नवीन विचार र आधुनिक समाधानलाई प्रोत्साहन गर्छौं।', icon: 'fas fa-lightbulb' },
    { titleEn: 'Democracy', titleNp: 'लोकतन्त्र', descriptionEn: 'We strengthen democratic values and promote active citizen participation.', descriptionNp: 'हामी लोकतान्त्रिक मूल्यहरू सुदृढ गर्छौं र सक्रिय नागरिक सहभागितालाई प्रवर्द्धन गर्छौं।', icon: 'fas fa-flag' }
  ], []);

  const fallbackJourney = useMemo(() => [
    { year: '2022', en: 'Elected as Member of the House of Representatives from Lalitpur Constituency No. 3.', np: 'ललितपुर निर्वाचन क्षेत्र नं. ३ बाट प्रतिनिधि सभा सदस्यमा निर्वाचित।' },
    { year: '2023', en: 'Appointed as Minister of State for Health and Population.', np: 'स्वास्थ्य तथा जनसंख्या राज्यमन्त्रीमा नियुक्त।' },
    { year: t('Present', 'हाल'), en: 'Continuing to serve the people through Parliament and contribute to nation-building with RSP.', np: 'संसदमार्फत जनताको सेवा जारी राखी आरएसपीसँग राष्ट्र निर्माणमा योगदान।' }
  ], [t]);

  const fallbackBullets = useMemo(() => [
    { en: 'Advocating for healthcare reform', np: 'स्वास्थ्य सुधारका लागि वकालत' },
    { en: 'Promoting good governance', np: 'सुशासन प्रवर्द्धन' },
    { en: 'Ensuring social justice', np: 'सामाजिक न्याय सुनिश्चित' },
    { en: 'Encouraging youth participation', np: 'युवा सहभागितालाई प्रोत्साहन' },
    { en: 'Supporting economic prosperity', np: 'आर्थिक समृद्धिमा समर्थन' },
    { en: 'Strengthening democratic values', np: 'लोकतान्त्रिक मूल्यहरू सुदृढ' }
  ], []);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="party-page"><Loader /></main>
        <Footer />
      </>
    );
  }

  const hero = partyData?.hero || {};
  const about = partyData?.about || {};
  const principles = partyData?.principles || [];
  const role = partyData?.role || {};
  const journey = partyData?.journey || [];
  const website = partyData?.officialWebsite || {};

  return (
    <>
      <Navbar />
      <main className="party-page">
        {/* ===================== HERO ===================== */}
        <section className="party-hero-v2 section-padding">
          <div className="party-hero-bg" aria-hidden="true">
            <img 
              src={partyHeroBg} 
              alt="" 
              loading="eager" 
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <span className="hero-dots" aria-hidden="true">
            {Array.from({ length: 15 }).map((_, i) => <span key={i} />)}
          </span>
          <span className="hero-corner" aria-hidden="true"></span>

          <div className="container hero-grid-v2">
            <div className="hero-copy-v2 animate-fade-up">
              <span className="hero-eyebrow-rule"></span>
              <span className="hero-eyebrow">
                {tt(hero.titleEn || 'POLITICAL PARTY', hero.titleNp || 'राजनीतिक पार्टी')}
              </span>
              <h1>
                {tt(
                  hero.subtitleEn || 'Rastriya Swatantra Party',
                  hero.subtitleNp || 'राष्ट्रिय स्वतन्त्र पार्टी'
                )}
              </h1>
              <p>
                {tt(
                  hero.descriptionEn ||
                    'Committed to transparency, good governance, equal opportunities, and accountable leadership for a prosperous and just Nepal.',
                  hero.descriptionNp ||
                    'पारदर्शिता, सुशासन, समान अवसर र जवाफदेही नेतृत्वप्रति प्रतिबद्ध — समृद्ध र न्यायपूर्ण नेपालका लागि।'
                )}
              </p>
              <div className="hero-cta-group">
                <a href={hero.ctaLink || '#about'} className="btn btn-primary hero-cta">
                  {tt(hero.ctaTextEn || 'ABOUT THE PARTY', hero.ctaTextNp || 'पार्टीको बारेमा')}
                  <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== ABOUT ===================== */}
        <section className="section-padding party-section party-about" id="about">
          <div className="container split-grid about-split">
            <div className="section-copy animate-fade-up">
              <span className="section-label">{t('About the Party', 'पार्टीको बारेमा')}</span>
              <h2>{tt('Rastriya Swatantra Party (RSP)', 'राष्ट्रिय स्वतन्त्र पार्टी (आरएसपी)')}</h2>
              <p>{tt(about.descriptionEn || 'Rastriya Swatantra Party (RSP) is a national political party in Nepal that advocates for good governance, transparency, accountability, and citizen-centered leadership. The party believes in the power of collective voice and is committed to reforming the political and administrative system for the benefit of all citizens.', about.descriptionNp || '')}</p>
              <p>{tt(about.descriptionSecondaryEn || 'It aims to build a country where every individual has the freedom to dream, equal opportunities to succeed, and the right to participate in nation-building.', about.descriptionSecondaryNp || '')}</p>
            </div>
            <div className="vision-mission animate-fade-up delay-1">
              <div className="vm-card">
                <div className="vm-icon"><i className="fas fa-eye" aria-hidden="true"></i></div>
                <div>
                  <h4>{t('Vision', 'दृष्टिकोण')}</h4>
                  <p>{tt(about.visionEn || 'A prosperous and just Nepal with good governance, rule of law, inclusive growth, and equal opportunities for all.', about.visionNp || '')}</p>
                </div>
              </div>
              <div className="vm-card">
                <div className="vm-icon"><i className="fas fa-bullseye" aria-hidden="true"></i></div>
                <div>
                  <h4>{t('Mission', 'मिशन')}</h4>
                  <p>{tt(about.missionEn || 'To promote transparent politics, accountable leadership, and people-centered policies that ensure social justice and economic prosperity.', about.missionNp || '')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== PRINCIPLES ===================== */}
        <section className="section-padding party-section bg-light" id="principles">
          <div className="container">
            <div className="section-header align-center animate-fade-up">
              <span className="section-label">{t('Core Principles', 'मुख्य सिद्धान्तहरू')}</span>
            </div>
            <div className="principles-grid">
              {(principles.length > 0 ? principles : fallbackPrinciples).map((item, index) => (
                <div key={index} className="principle-card animate-fade-up delay-1">
                  <div className="principle-icon"><i className={item.icon || 'fas fa-shield-alt'}></i></div>
                  <h4>{tt(item.titleEn, item.titleNp)}</h4>
                  <p>{tt(item.descriptionEn, item.descriptionNp)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== ROLE SPOTLIGHT ===================== */}
        <section className="section-padding party-section" id="role">
          <div className="container split-grid role-split">
            <div className="role-photo animate-fade-up">
              <img
                src={role.photo || hero.backgroundImage || fallbackPortrait}
                alt={tt('Dr. Toshima Karki', 'डा. तोषिमा कार्की')}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = fallbackPortrait;
                }}
              />
            </div>
            <div className="section-copy animate-fade-up delay-1">
              <span className="section-label">{t("Dr. Toshima Karki's Role", 'डा. तोषिमा कार्कीको भूमिका')}</span>
              <h2>{tt(role.titleEn || 'Committed to People, Policies and Progress', role.titleNp || 'जनता, नीति र प्रगतिप्रति प्रतिबद्ध')}</h2>
              <p>{tt(role.descriptionEn || 'As a member of Rastriya Swatantra Party, Dr. Toshima Karki works with dedication to promote effective policies, strengthen institutions, and uplift the lives of citizens.', role.descriptionNp || '')}</p>
              <div className="role-list role-list-cols">
                {(role.bullets && role.bullets.length > 0 ? role.bullets : fallbackBullets).map((item, idx) => (
                  <div key={idx} className="role-list-item">
                    <i className="fas fa-check-circle" aria-hidden="true"></i>
                    <span>{tt(item.en, item.np)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== JOURNEY + WEBSITE ===================== */}
        <section className="section-padding party-section bg-light" id="journey-website">
          <div className="container journey-grid">
            <div className="journey-card animate-fade-up">
              <span className="section-label">{t('Our Journey', 'हाम्रो यात्रा')}</span>
              <div className="journey-timeline">
                {(journey.length > 0 ? journey : fallbackJourney).map((item, idx) => (
                  <div key={idx} className="journey-item">
                    <div className="journey-dot"></div>
                    <strong>{item.year}</strong>
                    <p>{tt(item.en, item.np)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="website-card animate-fade-up delay-1">
              <span className="section-label">{t('Official Party Website', 'आधिकारिक पार्टी वेबसाइट')}</span>
              <p>{tt(website.descriptionEn || 'To learn more about the Rastriya Swatantra Party (RSP), please visit the official website.', website.descriptionNp || '')}</p>
              <a href={website.link || 'https://www.rsp.org.np'} target="_blank" rel="noreferrer" className="btn btn-primary">
                {t('Visit Official Website', 'अधिकारिक वेबसाइट हेर्नुहोस्')} <i className="fas fa-external-link-alt" aria-hidden="true"></i>
              </a>
              <i className="fas fa-landmark website-illustration" aria-hidden="true"></i>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}