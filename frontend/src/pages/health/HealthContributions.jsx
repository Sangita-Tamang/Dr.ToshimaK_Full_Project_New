import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { useLanguage } from '../../context/LanguageContext';
import OptimizedImage from '../../components/common/OptimizedImage';
import { getCloudinaryUrl } from '../../services/cloudinaryService';
import './HealthContributions.css';

// All images served from Cloudinary (f_auto, q_auto auto-applied by getCloudinaryUrl)
const templeBg      = getCloudinaryUrl('dr-tk/temple_bg', { width: 1920 });
const portraitImg   = getCloudinaryUrl('dr-tk/image10', { width: 600, height: 700 });
const imgHealthInsurance = getCloudinaryUrl('dr-tk/image1', { width: 720, height: 480 });
const imgRural      = getCloudinaryUrl('dr-tk/image6', { width: 720, height: 480 });
const imgEmergency  = getCloudinaryUrl('dr-tk/image2', { width: 720, height: 480 });
const imgCovid      = getCloudinaryUrl('dr-tk/image13', { width: 720, height: 480 });

export default function HealthContributions() {
  const { t } = useLanguage();

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-show');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.animate-hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: 'fas fa-users', value: '1M+', label: t('Lives Impacted', 'प्रभावित जीवन'), desc: t('Through healthcare policies and programs', 'स्वास्थ्य नीति र कार्यक्रमहरू मार्फत') },
    { icon: 'fas fa-heartbeat', value: '500K+', label: t('Patients Supported', 'सहयोग प्राप्त बिरामीहरू'), desc: t('Access to affordable healthcare services', 'सुलभ स्वास्थ्य सेवामा पहुँच') },
    { icon: 'fas fa-file-medical', value: '20+', label: t('Health Policies', 'स्वास्थ्य नीतिहरू'), desc: t('Introduced and implemented', 'प्रस्तुत र लागू गरिएको') },
    { icon: 'fas fa-map-marker-alt', value: '77', label: t('Districts Reached', 'पुगेका जिल्लाहरू'), desc: t('Urban, rural and remote areas covered', 'सहरी, ग्रामीण र दुर्गम क्षेत्रहरू समेटिएको') },
    { icon: 'fas fa-hospital', value: '100+', label: t('Health Facilities', 'स्वास्थ्य सुविधाहरू'), desc: t('Strengthened across the country', 'देशभर सुदृढ गरिएको') },
  ];

  const initiatives = [
    {
      num: '01',
      title: t('Health Insurance Reform', 'स्वास्थ्य बीमा सुधार'),
      desc: t('Pioneered and strengthened health insurance programs to ensure financial protection and quality healthcare access for all Nepalis.', 'सबै नेपालीको वित्तीय सुरक्षा र गुणस्तरीय स्वास्थ्य सेवामा पहुँच सुनिश्चित गर्न स्वास्थ्य बीमा कार्यक्रमलाई सुदृढ गरियो।'),
      icon: 'fas fa-stethoscope',
      img: imgHealthInsurance,
      points: [
        t('Expanded coverage to more than 500,000 families', '५००,००० भन्दा बढी परिवारमा पहुँच विस्तार'),
        t('Reduced out-of-pocket expenses for vulnerable communities', 'विपन्न समुदायको स्वास्थ्य खर्चमा कटौती'),
        t('Strengthened sustainability of the insurance model', 'बीमा मोडेलको दिगोपन सुदृढ')
      ]
    },
    {
      num: '02',
      title: t('Rural Healthcare Expansion', 'ग्रामीण स्वास्थ्य सेवा विस्तार'),
      desc: t('Worked to bring essential healthcare services closer to rural communities by improving infrastructure and resources.', 'पूर्वाधार र स्रोत साधनमा सुधार गरी अत्यावश्यक स्वास्थ्य सेवालाई ग्रामीण समुदायको नजिक पुर्याउन पहल गरियो।'),
      icon: 'fas fa-clinic-medical',
      img: imgRural,
      points: [
        t('Supported 100+ rural health facilities', '१००+ ग्रामीण स्वास्थ्य सुविधाहरूमा सहयोग'),
        t('Improved access to maternal and child healthcare', 'मातृ तथा बाल स्वास्थ्य सेवामा पहुँच सुधार'),
        t('Deployed healthcare workers in remote areas', 'दुर्गम क्षेत्रमा स्वास्थ्यकर्मी परिचालन')
      ]
    },
    {
      num: '03',
      title: t('Emergency & Trauma Care Improvement', 'आपतकालीन तथा ट्रमा केयर सुधार'),
      desc: t('Strengthened emergency medical response and trauma care services across Nepal for timely and effective treatment.', 'समयमै प्रभावकारी उपचारको लागि आपतकालीन चिकित्सा र ट्रमा केयर सेवालाई देशभर सुदृढ गरियो।'),
      icon: 'fas fa-ambulance',
      img: imgEmergency,
      points: [
        t('Upgraded trauma centers and emergency units', 'ट्रमा सेन्टर र आपतकालीन एकाइहरूको स्तरोन्नति'),
        t('Trained healthcare professionals in emergency care', 'स्वास्थ्यकर्मीहरूलाई आपतकालीन हेरचाहमा तालिम'),
        t('Improved ambulance and referral systems', 'एम्बुलेन्स र रेफरल प्रणालीमा सुधार')
      ]
    },
    {
      num: '04',
      title: t('COVID-19 Pandemic Response', 'कोभिड-१९ महामारी प्रतिकार्य'),
      desc: t('Led effective response initiatives during the COVID-19 pandemic to protect lives and support communities.', 'कोभिड-१९ महामारीको समयमा जीवन रक्षा र समुदायको सहयोगका लागि प्रभावकारी कदम चालियो।'),
      icon: 'fas fa-virus-covid',
      img: imgCovid,
      points: [
        t('Supported hospitals with equipment and resources', 'अस्पतालहरूलाई उपकरण र स्रोतसाधन उपलब्ध'),
        t('Strengthened testing, treatment and vaccination programs', 'परीक्षण, उपचार र खोप कार्यक्रम सुदृढ'),
        t('Ensured support for frontline healthcare workers', 'अग्रपङ्क्तिका स्वास्थ्यकर्मीहरूलाई सहयोग सुनिश्चित')
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <main className="page-fade-in health-contributions-page">
        {/* Sticky Breadcrumb */}
        <div className="sticky-breadcrumb">
          <div className="container">
            <Link to="/">{t('Home', 'गृहपृष्ठ')}</Link>
            <span className="separator">&gt;</span>
            <a href="/#explore-work">{t('Explore My Work', 'मेरो कामको अन्वेषण')}</a>
            <span className="separator">&gt;</span>
            <span className="current">{t('Health Contributions', 'स्वास्थ्य क्षेत्रमा योगदान')}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="hc-hero" style={{ backgroundImage: `url(${templeBg})` }}>
          <div className="hc-hero-overlay"></div>
          <div className="container hc-hero-container">
            <div className="hc-hero-content animate-hidden fade-in-up">
              <span className="hc-tag">
                <i className="fas fa-heart-pulse"></i> {t('HEALTH CONTRIBUTIONS', 'स्वास्थ्य क्षेत्रमा योगदान')}
              </span>
              <h1 className="hc-title">{t('Building a Healthier Nepal for All', 'सबैका लागि स्वस्थ नेपाल निर्माण गर्दै')}</h1>
              <p className="hc-desc">
                {t('Dedicated to transforming Nepal\'s healthcare system through inclusive policies, reformative initiatives and people-centered leadership.', 'समावेशी नीतिहरू, सुधारात्मक पहलहरू र जनकेन्द्रित नेतृत्व मार्फत नेपालको स्वास्थ्य सेवा प्रणाली रूपान्तरण गर्न समर्पित।')}
              </p>
            </div>
            <div className="hc-hero-image animate-hidden slide-in-right">
              <OptimizedImage
                src={portraitImg}
                alt="Dr. Toshima Karki"
                lazy={false}
                priority={true}
                objectFit="contain"
                style={{ maxWidth: '100%', maxHeight: 450, display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <section className="hc-stats-section">
          <div className="container">
            <div className="hc-stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="hc-stat-card animate-hidden fade-in-up" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="hc-stat-icon"><i className={stat.icon}></i></div>
                  <h3 className="hc-stat-value">{stat.value}</h3>
                  <h4 className="hc-stat-label">{stat.label}</h4>
                  <p className="hc-stat-desc">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Initiatives Section */}
        <section className="hc-initiatives-section section-padding">
          <div className="container">
            <div className="section-header center animate-hidden fade-in-up">
              <h2>{t('Our Major Health Initiatives', 'हाम्रा प्रमुख स्वास्थ्य पहलहरू')}</h2>
              <p>{t('Focused on creating equitable, accessible and quality healthcare for every citizen of Nepal.', 'नेपालका प्रत्येक नागरिकको लागि समतामूलक, पहुँचयोग्य र गुणस्तरीय स्वास्थ्य सेवा सिर्जना गर्नमा केन्द्रित।')}</p>
            </div>

            <div className="hc-initiatives-list">
              {initiatives.map((item, i) => {
                const isEven = i % 2 !== 0;
                return (
                  <div key={i} className={`hc-initiative-row ${isEven ? 'row-reverse' : ''}`}>
                    <div className={`hc-initiative-img-col animate-hidden ${isEven ? 'slide-in-right' : 'slide-in-left'}`} style={{ position: 'relative' }}>
                      <OptimizedImage src={item.img} alt={item.title} lazy={true} fill={true} objectFit="cover" />
                    </div>
                    <div className={`hc-initiative-content-col animate-hidden ${isEven ? 'slide-in-left' : 'slide-in-right'}`}>
                      <div className="hc-initiative-header">
                        <div className="hc-initiative-icon">
                          <i className={item.icon}></i>
                        </div>
                        <div className="hc-initiative-title-wrap">
                          <span className="hc-num">{item.num}. </span>
                          <h3 className="hc-title-text">{item.title}</h3>
                        </div>
                      </div>
                      <p className="hc-initiative-desc">{item.desc}</p>
                      <ul className="hc-bullet-list">
                        {item.points.map((pt, j) => (
                          <li key={j}>
                            <i className="fas fa-check-circle check-icon"></i>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="hc-cta-section animate-hidden fade-in-up">
          <div className="container">
            <div className="hc-cta-content">
              <div className="hc-cta-text">
                <div className="hc-cta-icon"><i className="fas fa-hands-holding-heart"></i></div>
                <div>
                  <h3>{t('Together, we can build a healthier, stronger and more equitable Nepal.', 'सँगै, हामी एक स्वस्थ, बलियो र समतामूलक नेपाल निर्माण गर्न सक्छौं।')}</h3>
                  <p>{t('Every policy, every program, every action is dedicated to the well-being of our people.', 'हरेक नीति, हरेक कार्यक्रम, हरेक कार्य हाम्रा जनताको भलाइका लागि समर्पित छ।')}</p>
                </div>
              </div>
              <Link to="/contact" className="btn btn-primary">{t('Get In Touch', 'सम्पर्क गर्नुहोस्')} &rarr;</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
