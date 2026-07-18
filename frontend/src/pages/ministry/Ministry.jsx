import { useEffect, useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { useLanguage } from '../../context/LanguageContext';
import { useCachedApi } from '../../hooks/useCachedApi';
import OptimizedImage from '../../components/common/OptimizedImage';
import './Ministry.css';

const CONTRIBUTIONS = [
  {
    id: '01',
    categoryEn: 'Emergency healthcare',
    categoryNp: 'आपतकालीन स्वास्थ्य सेवा',
    titleEn: 'National Trauma Policy & Emergency Healthcare Reform',
    titleNp: 'राष्ट्रिय ट्रमा नीति र आपतकालीन स्वास्थ्य सेवा सुधार',
    descEn: 'Calling for a national trauma policy and a coordinated emergency care system so that timely treatment is available when it matters most.',
    descNp: 'समयमै उपचार उपलब्ध होस् भन्ने उद्देश्यले राष्ट्रिय ट्रमा नीति र समन्वित आपतकालीन सेवा प्रणालीका लागि आवाज।',
    imageIndex: 0,
    url: 'https://english.ratopati.com/story/63620/mp-karki-demands-immediate-formulation-of-national-trauma-policy'
  },
  {
    id: '02',
    categoryEn: 'Healthcare access',
    categoryNp: 'स्वास्थ्य पहुँच',
    titleEn: 'Healthcare Accessibility & Affordability',
    titleNp: 'स्वास्थ्य सेवाको पहुँच र किफायतता',
    descEn: 'Advocating for people-centred healthcare that reduces financial barriers and brings essential services closer to every community.',
    descNp: 'आर्थिक बाधा घटाउँदै अत्यावश्यक सेवा हरेक समुदायसम्म पुर्‍याउने जनकेन्द्रित स्वास्थ्य सेवाको वकालत।',
    image: null, imageIndex: 1,
    url: 'https://hr.parliament.gov.np/en/video/21055'
  },
  {
    id: '03',
    categoryEn: 'Public systems',
    categoryNp: 'सार्वजनिक प्रणाली',
    titleEn: 'Public Healthcare System Improvement',
    titleNp: 'सार्वजनिक स्वास्थ्य प्रणाली सुधार',
    descEn: 'Strengthening public hospitals, frontline services, and accountable systems that can deliver reliable care throughout Nepal.',
    descNp: 'नेपालभर भरपर्दो सेवा दिन सक्ने सार्वजनिक अस्पताल, अग्रपङ्क्तिका सेवा र उत्तरदायी प्रणाली सुदृढ गर्ने पहल।',
    image: null, imageIndex: 2,
    url: 'https://hr.parliament.gov.np/index.php/en/video/21282'
  },
  {
    id: '04',
    categoryEn: 'Patient safety',
    categoryNp: 'बिरामी सुरक्षा',
    titleEn: 'Medicine Regulation & Patient Safety',
    titleNp: 'औषधि नियमन र बिरामी सुरक्षा',
    descEn: 'Bringing medical insight to the standards, oversight, and safeguards that protect patients and promote confidence in care.',
    descNp: 'बिरामीको सुरक्षा र स्वास्थ्य सेवाप्रति विश्वास बढाउने मापदण्ड, अनुगमन र सुरक्षाका उपायमा चिकित्सकीय दृष्टिकोण।',
    image: null, imageIndex: 3,
    url: 'https://hr.parliament.gov.np/en/video/18557'
  },
  {
    id: '05',
    categoryEn: 'Evidence-led policy',
    categoryNp: 'प्रमाणमा आधारित नीति',
    titleEn: 'Medical Expertise in Healthcare Policy',
    titleNp: 'स्वास्थ्य नीतिमा चिकित्सकीय विशेषज्ञता',
    descEn: 'Championing practical, evidence-informed health policy shaped by clinical experience and the realities faced by patients.',
    descNp: 'क्लिनिकल अनुभव र बिरामीले भोग्ने वास्तविकतामा आधारित व्यावहारिक, प्रमाणमुखी स्वास्थ्य नीतिको समर्थन।',
    image: null, imageIndex: 4,
    url: 'https://www.youtube.com/watch?v=iNo5kzZUKZs'
  },
  {
    id: '06',
    categoryEn: 'Public advocacy',
    categoryNp: 'जनस्वास्थ्य पैरवी',
    titleEn: 'Public Health Advocacy',
    titleNp: 'जनस्वास्थ्य पैरवी',
    descEn: 'Keeping public health, prevention, and the dignity of patients at the centre of national conversations and public action.',
    descNp: 'राष्ट्रिय बहस र सार्वजनिक कार्यको केन्द्रमा जनस्वास्थ्य, रोकथाम र बिरामीको सम्मानलाई राख्ने निरन्तर प्रयास।',
    image: null, imageIndex: 5,
    url: 'https://www.youtube.com/watch?v=B85s2EoC9v0'
  },
  {
    id: '07',
    categoryEn: 'House of Representatives',
    categoryNp: 'प्रतिनिधि सभा',
    titleEn: 'Parliamentary Healthcare Discussions',
    titleNp: 'संसदीय स्वास्थ्य छलफल',
    descEn: 'Raising health-sector priorities in parliamentary debate and connecting public concerns with accountable policy action.',
    descNp: 'संसदीय छलफलमा स्वास्थ्य क्षेत्रका प्राथमिकता उठाउँदै जनचासोलाई उत्तरदायी नीतिगत कामसँग जोड्ने प्रयास।',
    image: null, imageIndex: 6,
    url: 'https://hr.parliament.gov.np/en/video/22715'
  },
  {
    id: '08',
    categoryEn: 'Looking ahead',
    categoryNp: 'भावी दृष्टि',
    titleEn: 'Healthcare Transformation Vision',
    titleNp: 'स्वास्थ्य सेवा रूपान्तरणको दृष्टि',
    descEn: 'A long-term vision for a fairer, stronger healthcare system—built through reform, public dialogue, and service to people.',
    descNp: 'सुधार, सार्वजनिक संवाद र जनसेवाबाट निर्माण हुने थप न्यायपूर्ण र बलियो स्वास्थ्य प्रणालीको दीर्घकालीन दृष्टि।',
    image: null, imageIndex: 7,
    url: 'https://english.nepalnews.com/s/politics/toshima-karki-advocates-transformation-of-rastriya-swatantra-party/'
  }
];

const CARDS_PER_PAGE = 4;

export default function Ministry() {
  const { t, lang } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: apiData } = useCachedApi('/ministry');
  const cloudImages = apiData?.cloudinaryImages?.contributionImages || [];
  const heroImage = apiData?.cloudinaryImages?.heroImage || '';
  const tt = (en, np) => (lang === 'np' ? np : en);
  // Inject Cloudinary URLs into contributions
  const CONTRIBUTIONS_WITH_IMAGES = CONTRIBUTIONS.map(item => ({
    ...item,
    image: cloudImages[item.imageIndex] || item.image || null,
  }));
  const totalPages = Math.ceil(CONTRIBUTIONS_WITH_IMAGES.length / CARDS_PER_PAGE);
  const visibleContributions = CONTRIBUTIONS_WITH_IMAGES.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('animate-show');
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.ministry-page .animate-hidden');
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [currentPage]);

  const changePage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    document.getElementById('contributions')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Navbar />
      <main className="page-fade-in ministry-page">
        <section className="min-hero">
          <div className="min-hero-bg" aria-hidden="true">
            {heroImage && (
              <OptimizedImage src={heroImage} alt="" lazy={false} priority={true} objectFit="cover" />
            )}
          </div>
          <div className="min-hero-gradient" aria-hidden="true" />

          <div className="container min-hero-container">
            <div className="min-hero-content animate-hidden fade-in-up">
              <span className="min-hero-tag">{t('Public Health Leadership', 'जनस्वास्थ्य नेतृत्व')}</span>
              <h1 className="min-hero-title">
                <span>{t('Leadership with Compassion', 'करुणासहितको नेतृत्व')}</span>
                <span className="text-red">{t('Reform with Purpose', 'उद्देश्यसहितको सुधार')}</span>
              </h1>
              <p className="min-hero-desc">
                {t(
                  'Dedicated to an equitable, accessible, and people-centred healthcare system through informed public leadership and accountable reform.',
                  'जानकारीपूर्ण सार्वजनिक नेतृत्व र उत्तरदायी सुधारमार्फत समतामूलक, पहुँचयोग्य र जनकेन्द्रित स्वास्थ्य प्रणाली निर्माणमा समर्पित।'
                )}
              </p>
            </div>
          </div>
        </section>

        <section className="min-contributions-section section-padding" id="contributions">
          <div className="container">
            <header className="min-section-header animate-hidden fade-in-up">
              <span>{t('Public service in action', 'कार्यमा सार्वजनिक सेवा')}</span>
              <h2>{t('Our Key Contributions', 'हाम्रा प्रमुख योगदानहरू')}</h2>
              <p>{t('Parliamentary speeches and public discussions on building a stronger, safer, and more accessible healthcare system.', 'बलियो, सुरक्षित र थप पहुँचयोग्य स्वास्थ्य प्रणाली निर्माणसम्बन्धी संसदीय सम्बोधन र सार्वजनिक छलफलहरू।')}</p>
            </header>

            <div className="min-contributions-list">
              {visibleContributions.map((item, index) => (
                <article key={item.id} className={`min-contrib-card animate-hidden fade-in-up ${index % 2 ? 'is-reversed' : ''}`}>
                  <div className="min-contrib-image">
                    <OptimizedImage src={item.image} alt={tt(item.titleEn, item.titleNp)} lazy={true} objectFit="cover" />
                  </div>
                  <div className="min-contrib-body">
                    <div className="min-contrib-meta">
                      <span>{tt(item.categoryEn, item.categoryNp)}</span>
                      <strong>{item.id}</strong>
                    </div>
                    <h3>{tt(item.titleEn, item.titleNp)}</h3>
                    <p>{tt(item.descEn, item.descNp)}</p>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary min-contrib-link">
                      {t('More', 'थप')} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="min-pagination" aria-label={t('Contribution pages', 'योगदान पृष्ठहरू')}>
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      type="button"
                      className={page === currentPage ? 'is-active' : ''}
                      onClick={() => changePage(page)}
                      aria-current={page === currentPage ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  type="button"
                  className="min-pagination-next"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {t('Next', 'अर्को')} <span aria-hidden="true">→</span>
                </button>
              </nav>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
