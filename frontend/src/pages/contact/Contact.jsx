import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Modal from '../../components/common/Modal';
import contactService from '../../services/contactService';
import { useLanguage } from '../../context/LanguageContext';

export default function Contact() {
  const { t, lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const defaultSubject = searchParams.get('type') === 'internship' 
    ? t('Internship Application', 'इन्टर्नशिप आवेदन') 
    : '';

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: defaultSubject, priority: 'Normal', message: '' });
  const [interviewForm, setInterviewForm] = useState({ mediaOutlet: '', reporterName: '', email: '', phone: '', proposedDate: '', topics: '' });
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const tt = (en, np) => lang === 'np' ? np : en;

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); setError(''); setSuccess('');
    try {
      await contactService.submit(form);
      setSuccess(t('Thank you! Your message has been sent successfully.', 'धन्यवाद! तपाईंको सन्देश सफलतापूर्वक पठाइयो।'));
      setForm({ name: '', email: '', phone: '', subject: '', priority: 'Normal', message: '' });
    } catch (err) {
      setError(err?.error || t('Failed to send message. Please try again.', 'सन्देश पठाउन असफल भयो। कृपया पुनः प्रयास गर्नुहोस्।'));
    } finally { setSubmitting(false); }
  };

  const handleInterviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); setError('');
    try {
      await contactService.submitInterview(interviewForm);
      setShowInterviewModal(false);
      setSuccess(t('Interview request submitted successfully!', 'अन्तर्वार्ता अनुरोध सफलतापूर्वक दर्ता गरियो!'));
      setInterviewForm({ mediaOutlet: '', reporterName: '', email: '', phone: '', proposedDate: '', topics: '' });
    } catch (err) {
      setError(err?.error || t('Failed to submit request. Please try again.', 'अनुरोध दर्ता गर्न असफल भयो। कृपया पुनः प्रयास गर्नुहोस्।'));
    } finally { setSubmitting(false); }
  };

  const CONTACT_INFO = [
    { icon: 'fas fa-map-marker-alt', titleEn: 'Office Address', titleNp: 'कार्यालयको ठेगाना', infoEn: 'Singha Durbar, Kathmandu, Nepal', infoNp: 'सिंहदरबार, काठमाडौं, नेपाल' },
    { icon: 'fas fa-envelope', titleEn: 'Email Us', titleNp: 'हामीलाई इमेल गर्नुहोस्', infoEn: 'info@toshimakarki.gov.np', infoNp: 'info@toshimakarki.gov.np' },
    { icon: 'fas fa-phone-alt', titleEn: 'Call Us', titleNp: 'हामीलाई फोन गर्नुहोस्', infoEn: '+977 1 1234567', infoNp: '+९७७ १ १२३४५६७' },
    { icon: 'fas fa-clock', titleEn: 'Office Hours', titleNp: 'कार्यालय समय', infoEn: 'Sunday - Friday: 10 AM - 5 PM', infoNp: 'आइतबार - शुक्रबार: बिहान १० बजे देखि बेलुका ५ बजेसम्म' },
  ];

  const PRIORITY_LEVELS = [
    { value: 'Urgent', labelEn: 'Urgent', labelNp: 'अति आवश्यक' },
    { value: 'High', labelEn: 'High', labelNp: 'उच्च' },
    { value: 'Normal', labelEn: 'Normal', labelNp: 'सामान्य' },
    { value: 'Low', labelEn: 'Low', labelNp: 'न्यून' }
  ];

  const PRIORITY_GUIDE = [
    { color: '#D62828', icon: 'fas fa-exclamation', levelEn: 'Urgent', levelNp: 'अति आवश्यक', descEn: 'Requires immediate attention. Response within 24 hours.', descNp: 'तत्काल ध्यानाकर्षण आवश्यक। २४ घण्टा भित्र प्रतिक्रिया।' },
    { color: '#F77F00', icon: 'fas fa-angle-double-up', levelEn: 'High', levelNp: 'उच्च', descEn: 'Important requests. Response within 1-2 business days.', descNp: 'महत्त्वपूर्ण अनुरोधहरू। १-२ कार्यदिन भित्र प्रतिक्रिया।' },
    { color: '#FCBF49', icon: 'fas fa-minus', levelEn: 'Normal', levelNp: 'सामान्य', descEn: 'Standard inquiries. Response within 2-5 business days.', descNp: 'साधारण सोधपुछ। २-५ कार्यदिन भित्र प्रतिक्रिया।' },
    { color: '#003049', icon: 'fas fa-angle-down', levelEn: 'Low', levelNp: 'न्यून', descEn: 'General queries. Response within 5-7 business days.', descNp: 'सामान्य जिज्ञासाहरू। ५-७ कार्यदिन भित्र प्रतिक्रिया।' }
  ];

  return (
    <>
      <Navbar />
      <main>
        <section className="section-padding bg-light">
          <div className="container">
            <div className="section-header center">
              <h2>{t('Get in Touch', 'सम्पर्कमा रहनुहोस्')}</h2>
            </div>

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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', gap: 30, marginBottom: 60 }} className="contact-main-grid">
              
              {/* Info */}
              <div className="card" style={{ padding: 30 }}>
                <h3 style={{ marginBottom: 24 }}>{t('Contact Information', 'सम्पर्क जानकारी')}</h3>
                {CONTACT_INFO.map(item => (
                  <div key={item.titleEn} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                    <div style={{ width: 40, height: 40, background: 'rgba(200,16,46,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                      <i className={item.icon}></i>
                    </div>
                    <div>
                      <strong style={{ fontSize: '0.9rem', display: 'block', marginBottom: 4 }}>{tt(item.titleEn, item.titleNp)}</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{tt(item.infoEn, item.infoNp)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="card" style={{ padding: 40 }}>
                <h3 style={{ marginBottom: 24 }}>{t('Send a Message', 'सन्देश पठाउनुहोस्')}</h3>
                <form onSubmit={handleContactSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="contact-form-grid">
                    <div className="form-group">
                      <label>{t('Full Name *', 'पूरा नाम *')}</label>
                      <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder={t('Your full name', 'तपाईंको पूरा नाम')} required />
                    </div>
                    <div className="form-group">
                      <label>{t('Email Address *', 'इमेल ठेगाना *')}</label>
                      <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder={t('Your email', 'तपाईंको इमेल')} required />
                    </div>
                    <div className="form-group">
                      <label>{t('Phone Number', 'फोन नम्बर')}</label>
                      <input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder={t('Phone number', 'फोन नम्बर')} />
                    </div>
                    <div className="form-group">
                      <label>{t('Subject *', 'विषय *')}</label>
                      <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder={t('Subject', 'विषय')} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t('Priority Level', 'प्राथमिकता स्तर')}</label>
                    <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
                      {PRIORITY_LEVELS.map(p => (
                        <option key={p.value} value={p.value}>{tt(p.labelEn, p.labelNp)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t('Message *', 'सन्देश *')}</label>
                    <textarea rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder={t('Write your message here...', 'यहाँ आफ्नो सन्देश लेख्नुहोस्...')} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
                    {submitting ? <><i className="fas fa-spinner fa-spin" style={{ marginRight: 8 }}></i>{t('Sending...', 'पठाउँदै...')}</> : t('Send Message', 'सन्देश पठाउनुहोस्')}
                  </button>
                </form>
              </div>

              {/* Priority Guide */}
              <div className="card" style={{ padding: 30 }}>
                <h3 style={{ marginBottom: 24 }}>{t('Priority Level Guide', 'प्राथमिकता स्तर निर्देशिका')}</h3>
                {PRIORITY_GUIDE.map(item => (
                  <div key={item.levelEn} style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'flex-start' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', flexShrink: 0 }}>
                      <i className={item.icon}></i>
                    </div>
                    <div>
                      <strong style={{ fontSize: '0.9rem', display: 'block', marginBottom: 2 }}>{tt(item.levelEn, item.levelNp)}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{tt(item.descEn, item.descNp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="contact-bottom-grid">
              <div className="card" style={{ padding: 30 }}>
                <h3 style={{ marginBottom: 16 }}>{t('Our Location', 'हाम्रो स्थान')}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 20 }}>{t('Singha Durbar, Kathmandu, Nepal', 'सिंहदरबार, काठमाडौं, नेपाल')}</p>
                <div style={{ background: 'var(--light-gray)', height: 200, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  <i className="fas fa-map-marked-alt" style={{ fontSize: '2.5rem', marginRight: 12 }}></i>
                  <span>{t('Singha Durbar, Kathmandu', 'सिंहदरबार, काठमाडौं')}</span>
                </div>
              </div>

              <div className="card" style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <i className="fas fa-microphone-alt" style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: 20 }}></i>
                <h3 style={{ marginBottom: 12 }}>{t('Request an Interview', 'अन्तर्वार्ताको लागि अनुरोध')}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 24 }}>
                  {t('Journalists and media organizations can request official interviews or statements.', 'पत्रकार र मिडिया संगठनहरूले आधिकारिक अन्तर्वार्ता वा वक्तव्यको लागि अनुरोध गर्न सक्नुहुन्छ।')}
                </p>
                <button onClick={() => setShowInterviewModal(true)} className="btn btn-secondary">{t('Request Interview ➔', 'अन्तर्वार्ता अनुरोध गर्नुहोस् ➔')}</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Interview Modal */}
      <Modal isOpen={showInterviewModal} onClose={() => setShowInterviewModal(false)} title={t('Request an Interview', 'अन्तर्वार्ता अनुरोध गर्नुहोस्')}>
        <form onSubmit={handleInterviewSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="contact-form-grid">
            <div className="form-group"><label>{t('Media Organization *', 'मिडिया संस्था *')}</label><input type="text" value={interviewForm.mediaOutlet} onChange={e => setInterviewForm({...interviewForm, mediaOutlet: e.target.value})} required /></div>
            <div className="form-group"><label>{t('Reporter Name *', 'पत्रकारको नाम *')}</label><input type="text" value={interviewForm.reporterName} onChange={e => setInterviewForm({...interviewForm, reporterName: e.target.value})} required /></div>
            <div className="form-group"><label>{t('Contact Email *', 'सम्पर्क इमेल *')}</label><input type="email" value={interviewForm.email} onChange={e => setInterviewForm({...interviewForm, email: e.target.value})} required /></div>
            <div className="form-group"><label>{t('Contact Phone *', 'सम्पर्क फोन *')}</label><input type="text" value={interviewForm.phone} onChange={e => setInterviewForm({...interviewForm, phone: e.target.value})} required /></div>
          </div>
          <div className="form-group"><label>{t('Proposed Date & Time *', 'प्रस्तावित मिति र समय *')}</label><input type="datetime-local" value={interviewForm.proposedDate} onChange={e => setInterviewForm({...interviewForm, proposedDate: e.target.value})} required /></div>
          <div className="form-group"><label>{t('Interview Topics / Questions *', 'अन्तर्वार्ताका विषयहरू / प्रश्नहरू *')}</label><textarea rows={4} value={interviewForm.topics} onChange={e => setInterviewForm({...interviewForm, topics: e.target.value})} required /></div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
            {submitting ? <><i className="fas fa-spinner fa-spin" style={{ marginRight: 8 }}></i>{t('Submitting...', 'पेश गर्दै...')}</> : t('Submit Request', 'अनुरोध बुझाउनुहोस्')}
          </button>
        </form>
      </Modal>
    </>
  );
}
