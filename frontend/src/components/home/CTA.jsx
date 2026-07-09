import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function CTA() {
  const { t, lang } = useLanguage();

  const benefits = [
    { en: 'Gain real-world experience', np: 'वास्तविक अनुभव प्राप्त गर्नुहोस्' },
    { en: 'Work on impactful projects', np: 'प्रभावकारी आयोजनाहरूमा काम गर्नुहोस्' },
    { en: 'Learn from experienced leaders', np: 'अनुभवी नेताहरूबाट सिक्नुहोस्' },
    { en: 'Be part of a mission that matters', np: 'महत्त्वपूर्ण अभियानको हिस्सा बन्नुहोस्' }
  ];

  const tt = (en, np) => lang === 'np' ? np : en;

  return (
    <section className="section-padding" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="internship-banner">
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>
              {t('Make a Difference.', 'सकारात्मक परिवर्तन ल्याउनुहोस्।')}
            </span>
            <h2>{t('Apply for an Internship', 'इन्टर्नशिपका लागि आवेदन दिनुहोस्')}</h2>
            <p>{t('Join our team and contribute to meaningful change in healthcare and public service.', 'हाम्रो टोलीमा सामेल हुनुहोस् र स्वास्थ्य सेवा तथा जनसेवामा अर्थपूर्ण योगदान दिनुहोस्।')}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
              {benefits.map((item) => (
                <div key={item.en} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--primary)' }}></i>
                  <span style={{ fontSize: '0.9rem' }}>{tt(item.en, item.np)}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/internship" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
              {t('Apply Now', 'अहिले नै आवेदन दिनुहोस्')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
