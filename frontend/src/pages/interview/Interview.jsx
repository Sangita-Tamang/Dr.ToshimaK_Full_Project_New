import { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import contactService from '../../services/contactService';
import { useLanguage } from '../../context/LanguageContext';
import img4 from '../../assets/images/image4.png';

export default function Interview() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ mediaOutlet: '', reporterName: '', email: '', phone: '', proposedDate: '', type: '', topics: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const INTERVIEW_TYPES = [
    { value: 'Press Conference', labelEn: 'Press Conference', labelNp: 'पत्रकार सम्मेलन' },
    { value: 'Exclusive Interview', labelEn: 'Exclusive Interview', labelNp: 'विशेष अन्तर्वार्ता' },
    { value: 'TV/Radio Appearance', labelEn: 'TV/Radio Appearance', labelNp: 'टिभी/रेडियो अन्तर्वार्ता' },
    { value: 'Panel Discussion', labelEn: 'Panel Discussion', labelNp: 'प्यानल छलफल' },
    { value: 'Podcast', labelEn: 'Podcast', labelNp: 'पोडकास्ट' },
    { value: 'Print Media', labelEn: 'Print Media', labelNp: 'छापा माध्यम' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); setError(''); setSuccess('');
    try {
      await contactService.submitInterview(form);
      setSuccess(t(
        'Your interview request has been submitted successfully. We will respond within 2-3 business days.',
        'तपाईंको अन्तर्वार्ता अनुरोध सफलतापूर्वक बुझाइएको छ। हामी २-३ कार्यदिन भित्र प्रतिक्रिया दिनेछौं।'
      ));
      setForm({ mediaOutlet: '', reporterName: '', email: '', phone: '', proposedDate: '', type: '', topics: '' });
    } catch (err) {
      setError(err?.error || t('Failed to submit request.', 'अनुरोध बुझाउन असफल भयो।'));
    } finally { setSubmitting(false); }
  };

  const tt = (en, np) => lang === 'np' ? np : en;

  return (
    <>
      <Navbar />
      <main>
        <section className="section-padding">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'start' }} className="contact-bottom-grid">
              {/* Left Info */}
              <div>
                <span className="hero-tag">{t('MEDIA & PRESS', 'मिडिया र प्रेस')}</span>
                <h1 style={{ fontSize: '2.5rem', marginBottom: 20 }}>{t('Request an Official Interview', 'आधिकारिक अन्तर्वार्ता अनुरोध गर्नुहोस्')}</h1>
                <p style={{ color: '#555', marginBottom: 30 }}>
                  {t(
                    'Dr. Toshima Karki welcomes responsible media engagements. Please fill out the form with your interview details, proposed date, and key topics.',
                    'डा. तोसिमा कार्की जिम्मेवार मिडिया सहभागितालाई स्वागत गर्नुहुन्छ। कृपया तपाईंको अन्तर्वार्ता विवरण, प्रस्तावित मिति र मुख्य विषयहरू सहित फारम भर्नुहोस्।'
                  )}
                </p>
                <img src={img4} alt="Dr. Toshima" style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', marginBottom: 30, maxWidth: 360 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { icon: 'fas fa-clock', text: t('Response time: 2-3 business days', 'प्रतिक्रिया समय: २-३ कार्यदिन') },
                    { icon: 'fas fa-check-circle', text: t('Accredited journalists only', 'मान्यता प्राप्त पत्रकारहरू मात्र') },
                    { icon: 'fas fa-envelope', text: 'press@toshimakarki.gov.np' },
                  ].map(item => (
                    <div key={item.text} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <i className={item.icon} style={{ color: 'var(--primary)', width: 20 }}></i>
                      <span style={{ color: '#555', fontSize: '0.9rem' }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="card" style={{ padding: 40 }}>
                <h3 style={{ marginBottom: 24 }}>{t('Interview Request Form', 'अन्तर्वार्ता अनुरोध फारम')}</h3>

                {success && (
                  <div style={{ background: '#d4edda', color: '#155724', padding: '14px 20px', borderRadius: 'var(--radius-md)', marginBottom: 24, border: '1px solid #c3e6cb' }}>
                    <i className="fas fa-check-circle" style={{ marginRight: 8 }}></i>{success}
                  </div>
                )}
                {error && (
                  <div style={{ background: '#f8d7da', color: '#721c24', padding: '14px 20px', borderRadius: 'var(--radius-md)', marginBottom: 24, border: '1px solid #f5c6cb' }}>
                    <i className="fas fa-exclamation-circle" style={{ marginRight: 8 }}></i>{error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="contact-form-grid">
                    <div className="form-group">
                      <label>{t('Media Organization *', 'मिडिया संस्था *')}</label>
                      <input type="text" value={form.mediaOutlet} onChange={e => setForm({...form, mediaOutlet: e.target.value})} placeholder={t('e.g., Kantipur TV', 'उदा. कान्तिपुर टिभी')} required />
                    </div>
                    <div className="form-group">
                      <label>{t('Reporter / Correspondent *', 'संवाददाता / पत्रकार *')}</label>
                      <input type="text" value={form.reporterName} onChange={e => setForm({...form, reporterName: e.target.value})} placeholder={t('Full name', 'पूरा नाम')} required />
                    </div>
                    <div className="form-group">
                      <label>{t('Contact Email *', 'सम्पर्क इमेल *')}</label>
                      <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="reporter@outlet.com" required />
                    </div>
                    <div className="form-group">
                      <label>{t('Contact Phone *', 'सम्पर्क फोन *')}</label>
                      <input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+977 9812345678" required />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="contact-form-grid">
                    <div className="form-group">
                      <label>{t('Interview Type *', 'अन्तर्वार्ताको प्रकार *')}</label>
                      <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} required>
                        <option value="">{t('-- Select Type --', '-- प्रकार चयन गर्नुहोस् --')}</option>
                        {INTERVIEW_TYPES.map(tOption => (
                          <option key={tOption.value} value={tOption.value}>{tt(tOption.labelEn, tOption.labelNp)}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>{t('Preferred Date & Time *', 'प्रस्तावित मिति र समय *')}</label>
                      <input type="datetime-local" value={form.proposedDate} onChange={e => setForm({...form, proposedDate: e.target.value})} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t('Interview Topics / Questions *', 'अन्तर्वार्ताका विषयहरू / प्रश्नहरू *')}</label>
                    <textarea rows={5} value={form.topics} onChange={e => setForm({...form, topics: e.target.value})} placeholder={t('List the topics or questions you plan to cover...', 'तपाईंले समेट्न खोज्नुभएका प्रश्नहरू वा विषयहरू यहाँ लेख्नुहोस्...')} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
                    {submitting ? <><i className="fas fa-spinner fa-spin" style={{ marginRight: 8 }}></i>{t('Submitting...', 'पेश गर्दै...')}</> : t('Submit Interview Request', 'अन्तर्वार्ता अनुरोध बुझाउनुहोस्')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
