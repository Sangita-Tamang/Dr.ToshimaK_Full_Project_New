import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Loader from '../../components/common/Loader';
import api from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import './Ministry.css';

import img1 from '../../assets/images/image1.png';
import img2 from '../../assets/images/image2.png';
import img3 from '../../assets/images/image3.png';
import img4 from '../../assets/images/image4.png';
import img5 from '../../assets/images/image5.png';
import img6 from '../../assets/images/image6.png';
import img8 from '../../assets/images/image8.png';
import img10 from '../../assets/images/image10.png';
import img11 from '../../assets/images/image11.png';
import img12 from '../../assets/images/image12.png';

const STATS = [
  { icon: 'fas fa-users-cog', val: '1M+', titleEn: 'Lives Impacted', titleNp: 'प्रभावित जीवन', descEn: 'Through health programs and initiatives.', descNp: 'विभिन्न स्वास्थ्य कार्यक्रम र पहलहरू मार्फत।' },
  { icon: 'fas fa-hospital-user', val: '500K+', titleEn: 'Patients Supported', titleNp: 'सहयोग प्राप्त बिरामी', descEn: 'Across hospitals and health centers.', descNp: 'अस्पताल र स्वास्थ्य केन्द्रहरूमा।' },
  { icon: 'fas fa-file-invoice', val: '20+', titleEn: 'Health Policies', titleNp: 'स्वास्थ्य नीतिहरू', descEn: 'Formulated and implemented.', descNp: 'तर्जुमा र कार्यान्वयन गरिएका।' },
  { icon: 'fas fa-history', val: '15+', titleEn: 'Years of Service', titleNp: 'सेवाका वर्षहरू', descEn: 'In public health leadership and governance.', descNp: 'जनस्वास्थ्य नेतृत्व र सुशासनमा।' },
  { icon: 'fas fa-map-marked-alt', val: '75+', titleEn: 'Districts Reached', titleNp: 'पुगेका जिल्लाहरू', descEn: 'Strengthening healthcare nationwide.', descNp: 'देशव्यापी स्वास्थ्य सेवा सुदृढीकरण गर्दै।' }
];

const CONTRIBUTIONS = [
  {
    id: '01',
    categoryEn: 'POLICY AREA',
    categoryNp: 'नीति क्षेत्र',
    titleEn: 'Health Insurance Reform',
    titleNp: 'स्वास्थ्य बीमा सुधार',
    descEn: 'Expanding national health insurance coverage to ensure financial protection and universal healthcare access for all citizens.',
    descNp: 'सबै नागरिकका लागि वित्तीय सुरक्षा र विश्वव्यापी स्वास्थ्य सेवा पहुँच सुनिश्चित गर्न राष्ट्रिय स्वास्थ्य बीमाको दायरा विस्तार।',
    image: img1,
    url: 'https://english.headlinenepal.com/tag/Dr.%20Toshima%20Karki'
  },
  {
    id: '02',
    categoryEn: 'HEALTH REFORM',
    categoryNp: 'स्वास्थ्य सुधार',
    titleEn: 'Healthcare Affordability & Access',
    titleNp: 'स्वास्थ्य सेवाको पहुँच र किफायतता',
    descEn: 'Making healthcare affordable by reducing treatment costs and improving access to essential medical services across Nepal.',
    descNp: 'उपचार खर्च घटाएर र नेपालभर आवश्यक चिकित्सा सेवाहरूमा पहुँच सुधार गरेर स्वास्थ्य सेवालाई किफायती बनाउने।',
    image: img5,
    url: 'https://nagariknews.nagariknetwork.com/politics/1437739-1717496669.html'
  },
  {
    _id: 'c3',
    id: '03',
    categoryEn: 'NATIONAL INITIATIVE',
    categoryNp: 'राष्ट्रिय पहल',
    titleEn: 'Emergency & Trauma Care System',
    titleNp: 'आपतकालीन र ट्रमा केयर प्रणाली',
    descEn: 'Strengthening emergency response systems, ambulance services, and trauma care infrastructure nationwide.',
    descNp: 'देशव्यापी रूपमा आपतकालीन चिकित्सा प्रतिक्रिया प्रणाली, एम्बुलेन्स सेवा र ट्रमा केयर पूर्वाधार सुदृढ गर्ने।',
    image: img6,
    url: 'https://english.ratopati.com/story/63620/mp-karki-demands-immediate-formulation-of-national-trauma-policy'
  },
  {
    id: '04',
    categoryEn: 'REGULATORY REFORM',
    categoryNp: 'नियमनकारी सुधार',
    titleEn: 'Medicine & Drug Regulation Reform',
    titleNp: 'औषधि र ड्रग नियमन सुधार',
    descEn: 'Ensuring safe, high-quality medicines through strict regulation and improved pharmaceutical supply systems.',
    descNp: 'कडा नियमन र सुधारिएको औषधि आपूर्ति प्रणाली मार्फत सुरक्षित, उच्च गुणस्तरीय औषधिहरू सुनिश्चित गर्ने।',
    image: img12,
    url: 'https://ekantipur.com/news/2024/06/11/it-is-necessary-for-the-government-to-immediately-bring-nepal-hospital-operation-act-dr-karki-30-37.html'
  },
  {
    id: '05',
    categoryEn: 'RURAL HEALTH',
    categoryNp: 'ग्रामीण स्वास्थ्य',
    titleEn: 'Rural Healthcare Development',
    titleNp: 'ग्रामीण स्वास्थ्य सेवा विकास',
    descEn: 'Bringing healthcare to remote communities through mobile clinics, telemedicine, and rural health centers.',
    descNp: 'मोबाइल क्लिनिक, टेलिमेडिसिन र ग्रामीण स्वास्थ्य केन्द्रहरू मार्फत दुर्गम समुदायमा स्वास्थ्य सेवा पुर्‍याउने।',
    image: img2,
    url: 'https://nagariknews.nagariknetwork.com/amp/health/1056251-1673949836.html'
  },
  {
    id: '06',
    categoryEn: 'PANDEMIC RESPONSE',
    categoryNp: 'महामारी नियन्त्रण',
    titleEn: 'COVID-19 Response',
    titleNp: 'कोभिड-१९ नियन्त्रण पहल',
    descEn: 'Coordinated national response including vaccination, awareness, and hospital preparedness during the pandemic.',
    descNp: 'महामारीको समयमा खोप, जनचेतना र अस्पतालको पूर्वतयारी सहितको एकीकृत राष्ट्रिय प्रयासको नेतृत्व।',
    image: img8,
    url: 'https://www.onlinekhabar.com/2024/06/1490373/government-should-set-healthcare-fees-tosima-karki'
  }
];

const PROGRAMS = [
  { titleEn: 'Universal Health Coverage Expansion Program', titleNp: 'विश्वव्यापी स्वास्थ्य पहुँच विस्तार कार्यक्रम' },
  { titleEn: 'Rural Health Access Mission', titleNp: 'ग्रामीण स्वास्थ्य पहुँच अभियान' },
  { titleEn: 'Emergency Response Modernization Project', titleNp: 'आपतकालीन सेवा आधुनिकीकरण आयोजना' },
  { titleEn: 'Maternal & Child Health Improvement Program', titleNp: 'मातृ तथा बाल स्वास्थ्य सुधार कार्यक्रम' },
  { titleEn: 'Digital Health Transformation Initiative', titleNp: 'डिजिटल स्वास्थ्य रूपान्तरण पहल' }
];

const POLICIES = [
  { titleEn: 'National Health Insurance Act Reform', titleNp: 'राष्ट्रिय स्वास्थ्य बीमा ऐन सुधार' },
  { titleEn: 'Public Health Emergency Preparedness Policy', titleNp: 'जनस्वास्थ्य आपतकालीन पूर्वतयारी नीति' },
  { titleEn: 'Drug Regulation Improvement Framework', titleNp: 'औषधि नियमन सुधार खाका' },
  { titleEn: 'Rural Healthcare Expansion Strategy', titleNp: 'ग्रामीण स्वास्थ्य सेवा विस्तार रणनीति' },
  { titleEn: 'Health Workforce Development Plan', titleNp: 'स्वास्थ्य जनशक्ति विकास योजना' }
];

const UPDATES = [
  { titleEn: 'Govt. Expands Health Insurance Coverage to 7 More Districts', titleNp: 'सरकारद्वारा थप ७ जिल्लामा स्वास्थ्य बीमा विस्तार', date: 'May 12, 2024' },
  { titleEn: 'New Emergency Hotline 102 Now Nationwide', titleNp: 'नयाँ आपतकालीन हटलाइन १०२ अब देशव्यापी उपलब्ध', date: 'April 28, 2024' },
  { titleEn: 'Mobile Health Camps Reach Remote Villages in Dolpa', titleNp: 'डोल्पाका दुर्गम गाउँहरूमा पुग्यो मोबाइल स्वास्थ्य शिविर', date: 'April 15, 2024' }
];

export default function Ministry() {
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(false);

  const tt = (en, np) => lang === 'np' ? np : en;

  return (
    <>
      <Navbar />
      <main className="ministry-page">

        {/* Hero Section */}
        <section className="min-hero">
          <div className="min-hero-overlay"></div>
          <div className="container min-hero-container">
            <div className="min-hero-content">
              <span className="min-hero-tag">{t('MINISTRY OF HEALTH', 'स्वास्थ्य मन्त्रालय')}</span>
              <h1 className="min-hero-title">
                {t('Leadership with Compassion.', 'करुणा र प्रतिबद्धताको नेतृत्व।')}
                <br />
                <span className="text-red">{t('Reform with Purpose.', 'उद्देश्य सहितको सुधार।')}</span>
              </h1>
              <p className="min-hero-desc">
                {t('Dedicated to building an equitable, accessible, and people-centered healthcare system through policy reform, innovation, and compassionate governance.', 'नीतिगत सुधार, नवीनता र करुणापूर्ण सुशासन मार्फत समतामूलक, पहुँचयोग्य र जनमुखी स्वास्थ्य प्रणाली निर्माणमा समर्पित।')}
              </p>
              <div className="min-hero-buttons">
                <a href="#contributions" className="btn btn-primary">{t('Explore Ministry Work', 'मन्त्रालयको काम खोज्नुहोस्')} &rarr;</a>
                <a href="#policies" className="btn btn-outline">{t('View Policies', 'नीतिहरू हेर्नुहोस्')} &rarr;</a>
              </div>
            </div>
            <div className="min-hero-img-box">
              <img src={img4} alt="Dr. Toshima Karki" className="min-hero-img" />
              <div className="min-hero-badge">
                <span className="badge-title">{t('Ministry of Health & Population', 'स्वास्थ्य तथा जनसंख्या मन्त्रालय')}</span>
                <span className="badge-sub">{t('Government of Nepal', 'नेपाल सरकार')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <section className="min-stats-section">
          <div className="container min-stats-grid">
            {STATS.map((stat, i) => (
              <div key={i} className="min-stat-card">
                <div className="min-stat-icon-wrapper">
                  <i className={stat.icon}></i>
                </div>
                <div className="min-stat-info">
                  <h3>{stat.val}</h3>
                  <strong className="stat-label">{tt(stat.titleEn, stat.titleNp)}</strong>
                  <p className="stat-desc">{tt(stat.descEn, stat.descNp)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Layout Grid */}
        <section className="min-content-section section-padding" id="contributions">
          <div className="container min-layout-grid">
            
            {/* Left Column: Key Contributions */}
            <div className="min-contributions-col">
              <div className="section-header">
                <h2>{t('Our Key Contributions', 'हाम्रा प्रमुख योगदानहरू')}</h2>
                <div className="header-line"></div>
              </div>

              {loading ? <Loader /> : (
                <div className="min-contributions-list">
                  {CONTRIBUTIONS.map((item, i) => {
                    const isEven = i % 2 !== 0;
                    return (
                      <div key={item.id} className="min-contrib-card">
                        <div className={`min-contrib-inner ${isEven ? 'row-reverse' : ''}`}>
                          <div className="min-contrib-img">
                            <img src={item.image} alt={tt(item.titleEn, item.titleNp)} />
                            {item.id === '02' && (
                              <div className="contrib-overlay-badge">
                                <span>{t('Quality Service', 'गुणस्तरीय सेवा')}</span>
                                <span>{t('Affordable Care', 'सुलभ उपचार')}</span>
                                <span>{t('Accessible for All', 'सबैका लागि पहुँच')}</span>
                              </div>
                            )}
                            {item.id === '06' && (
                              <div className="contrib-overlay-badge dark">
                                <span>{t('Get Vaccinated.', 'खोप लगाउनुहोस्।')}</span>
                                <span>{t('Stay Protected.', 'सुरक्षित रहनुहोस्।')}</span>
                                <span>{t('Stay Safe.', 'सजग रहनुहोस्।')}</span>
                              </div>
                            )}
                          </div>
                          <div className="min-contrib-body">
                            <div className="min-contrib-header-row">
                              <span className="contrib-tag">{tt(item.categoryEn, item.categoryNp)}</span>
                              <span className="contrib-num">{item.id}</span>
                            </div>
                            <h3 className="contrib-title">{tt(item.titleEn, item.titleNp)}</h3>
                            <p className="contrib-desc">{tt(item.descEn, item.descNp)}</p>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="contrib-link">
                              {t('Read Full Article', 'पूरा लेख पढ्नुहोस्')} <i className="fas fa-external-link-alt"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Widgets */}
            <div className="min-widgets-col" id="policies">
              
              {/* Major Health Programs Widget */}
              <div className="min-widget-card">
                <h3>{t('MAJOR HEALTH PROGRAMS', 'प्रमुख स्वास्थ्य कार्यक्रमहरू')}</h3>
                <div className="widget-line"></div>
                <ul className="widget-list">
                  {PROGRAMS.map((p, idx) => (
                    <li key={idx}>
                      <span className="widget-num-bullet">{idx + 1}</span>
                      <span className="widget-item-title">{tt(p.titleEn, p.titleNp)}</span>
                    </li>
                  ))}
                </ul>
                <button className="widget-btn">{t('View All Programs', 'सबै कार्यक्रमहरू हेर्नुहोस्')} &rarr;</button>
              </div>

              {/* Policy Highlights Widget */}
              <div className="min-widget-card">
                <h3>{t('POLICY HIGHLIGHTS', 'नीतिगत विशेषताहरू')}</h3>
                <div className="widget-line"></div>
                <ul className="widget-list">
                  {POLICIES.map((p, idx) => (
                    <li key={idx}>
                      <span className="widget-num-bullet secondary"><i className="fas fa-file-signature"></i></span>
                      <span className="widget-item-title">{tt(p.titleEn, p.titleNp)}</span>
                    </li>
                  ))}
                </ul>
                <button className="widget-btn">{t('View All Policies', 'सबै नीतिहरू हेर्नुहोस्')} &rarr;</button>
              </div>

              {/* Latest Updates Widget */}
              <div className="min-widget-card">
                <h3>{t('LATEST UPDATES', 'पछिल्ला अपडेटहरू')}</h3>
                <div className="widget-line"></div>
                <div className="widget-updates-list">
                  {UPDATES.map((u, idx) => (
                    <div key={idx} className="widget-update-item">
                      <span className="update-date">{u.date}</span>
                      <h4 className="update-title">{tt(u.titleEn, u.titleNp)}</h4>
                    </div>
                  ))}
                </div>
                <button className="widget-btn">{t('View All Updates', 'सबै अपडेटहरू हेर्नुहोस्')} &rarr;</button>
              </div>

            </div>

          </div>
        </section>

        {/* Bottom Banner */}
        <section className="min-bottom-banner">
          <div className="container min-banner-content">
            <div className="banner-text">
              <i className="fas fa-heartbeat banner-icon"></i>
              <div>
                <h2>{t('Building a Healthier Nepal Together', 'सँगै स्वस्थ नेपाल निर्माण गरौँ')}</h2>
                <p>{t('Your health, our responsibility. Let\'s continue this journey toward a stronger, healthier, and more equitable Nepal.', 'तपाईंको स्वास्थ्य, हाम्रो जिम्मेवारी। बलियो, स्वस्थ र अधिक समतामूलक नेपालतर्फको यो यात्रा जारी राखौं।')}</p>
              </div>
            </div>
            <div className="banner-actions">
              <Link to="/contact" className="btn btn-secondary">{t('Contact Ministry', 'मन्त्रालयमा सम्पर्क')}</Link>
              <a href="#" className="btn btn-outline-white">{t('Download Reports', 'प्रतिवेदन डाउनलोड')}</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
