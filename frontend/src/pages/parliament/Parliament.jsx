import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { useLanguage } from '../../context/LanguageContext';
import './Parliament.css';

import heroBg from '../../assets/images/Parliament.hero.png';
import img1 from '../../assets/images/image1.png';
import img2 from '../../assets/images/image2.png';
import img3 from '../../assets/images/image13.png';
import img4 from '../../assets/images/image14.png';
import img5 from '../../assets/images/image6.png';
import img6 from '../../assets/images/image11.png';
import img7 from '../../assets/images/image12.png';
import img8 from '../../assets/images/image3.png';
import img9 from '../../assets/images/image7.png';
import img10 from '../../assets/images/image8.png';

const ITEMS_PER_PAGE = 5;

const ALL_TIMELINE_DATA = [
  {
    id: '01',
    sidebarTitle: 'Health Reform Initiative',
    sidebarTitleNp: 'स्वास्थ्य सुधार पहल',
    tag: 'HEALTH POLICY',
    tagNp: 'स्वास्थ्य नीति',
    title: 'Advocated for the Health Insurance Reform Bill',
    titleNp: 'स्वास्थ्य बीमा सुधार विधेयकको वकालत',
    desc: 'Pushed for universal health insurance to ensure every Nepali has access to quality and affordable healthcare.',
    descNp: 'हरेक नेपालीको गुणस्तरीय र सर्वसुलभ स्वास्थ्य सेवामा पहुँच सुनिश्चित गर्न विश्वव्यापी स्वास्थ्य बीमाको लागि जोड दिइयो।',
    date: 'May 12, 2024',
    dateNp: 'मे १२, २०२४',
    location: 'House of Representatives',
    locationNp: 'प्रतिनिधि सभा',
    img: img1,
    url: 'https://english.headlinenepal.com/tag/Dr.%20Toshima%20Karki'
  },
  {
    id: '02',
    sidebarTitle: 'Rural Healthcare Expansion',
    sidebarTitleNp: 'ग्रामीण स्वास्थ्य सेवा विस्तार',
    tag: 'INFRASTRUCTURE',
    tagNp: 'पूर्वाधार',
    title: 'Raised Voice on Rural Healthcare Infrastructure',
    titleNp: 'ग्रामीण स्वास्थ्य पूर्वाधारको लागि आवाज',
    desc: 'Highlighted the urgent need for quality healthcare facilities, trained staff and essential resources in rural and remote areas.',
    descNp: 'ग्रामीण र दुर्गम क्षेत्रमा गुणस्तरीय स्वास्थ्य सुविधा, तालिम प्राप्त कर्मचारी र अत्यावश्यक स्रोतहरूको तत्काल आवश्यकतालाई उजागर गरियो।',
    date: 'Apr 28, 2024',
    dateNp: 'अप्रिल २८, २०२४',
    location: 'House of Representatives',
    locationNp: 'प्रतिनिधि सभा',
    img: img2,
    url: 'https://ekantipur.com/news/2024/06/11/it-is-necessary-for-the-government-to-immediately-bring-nepal-hospital-operation-act-dr-karki-30-37.html'
  },
  {
    id: '03',
    sidebarTitle: 'Emergency Healthcare Reform',
    sidebarTitleNp: 'आपतकालीन स्वास्थ्य सेवा सुधार',
    tag: 'HEALTH EMERGENCY',
    tagNp: 'स्वास्थ्य संकटकाल',
    title: 'Pushed for Emergency Healthcare Reform',
    titleNp: 'आपतकालीन स्वास्थ्य सेवा सुधारको लागि जोड',
    desc: 'Strengthened emergency medical response systems and trauma care services across Nepal for timely and effective treatment.',
    descNp: 'समयमै र प्रभावकारी उपचारको लागि नेपालभर आपतकालीन चिकित्सा प्रतिक्रिया प्रणाली र ट्रमा केयर सेवाहरूलाई सुदृढ गरियो।',
    date: 'Mar 18, 2024',
    dateNp: 'मार्च १८, २०२४',
    location: 'House of Representatives',
    locationNp: 'प्रतिनिधि सभा',
    img: img3,
    url: 'https://english.ratopati.com/story/63620/mp-karki-demands-immediate-formulation-of-national-trauma-policy'
  },
  {
    id: '04',
    sidebarTitle: 'Women & Health Safety Policy',
    sidebarTitleNp: 'महिला र स्वास्थ्य सुरक्षा नीति',
    tag: 'WOMEN EMPOWERMENT',
    tagNp: 'महिला सशक्तिकरण',
    title: 'Advocated for Women & Health Safety Policy',
    titleNp: 'महिला तथा स्वास्थ्य सुरक्षा नीतिको वकालत',
    desc: 'Spoke on the need for stronger laws, effective enforcement and support systems for women across the country.',
    descNp: 'देशभरका महिलाहरूको लागि कडा कानुन, प्रभावकारी कार्यान्वयन र समर्थन प्रणालीहरूको आवश्यकतामा बोलियो।',
    date: 'Feb 22, 2024',
    dateNp: 'फेब्रुअरी २२, २०२४',
    location: 'House of Representatives',
    locationNp: 'प्रतिनिधि सभा',
    img: img4,
    url: 'https://ekantipur.com/news/2025/03/07/mp-toshimas-question-cant-a-male-minister-work-with-a-female-secretary-33-59.html'
  },
  {
    id: '05',
    sidebarTitle: 'Mental Health Awareness',
    sidebarTitleNp: 'मानसिक स्वास्थ्य सचेतना',
    tag: 'PUBLIC AWARENESS',
    tagNp: 'जनचेतना',
    title: 'Promoted Mental Health Awareness',
    titleNp: 'मानसिक स्वास्थ्य सचेतना प्रवर्द्धन',
    desc: 'Supported nationwide awareness programs to reduce stigma and ensure access to mental health support for all.',
    descNp: 'कलंक कम गर्न र सबैका लागि मानसिक स्वास्थ्य सहयोगमा पहुँच सुनिश्चित गर्न राष्ट्रव्यापी सचेतना कार्यक्रमहरूलाई समर्थन गरियो।',
    date: 'Jan 10, 2024',
    dateNp: 'जनवरी १०, २०२४',
    location: 'House of Representatives',
    locationNp: 'प्रतिनिधि सभा',
    img: img5,
    url: 'https://nagariknews.nagariknetwork.com/politics/1437739-1717496669.html'
  },
  {
    id: '06',
    sidebarTitle: 'Budget Discussion on Health Ministry',
    sidebarTitleNp: 'स्वास्थ्य मन्त्रालयको बजेट छलफल',
    tag: 'HEALTH POLICY',
    tagNp: 'स्वास्थ्य नीति',
    title: 'Budget Discussion on Health and Population Ministry',
    titleNp: 'स्वास्थ्य तथा जनसंख्या मन्त्रालयको बजेट छलफल',
    desc: 'Participated in parliamentary discussion related to annual budget allocation, government programs, and health sector priorities.',
    descNp: 'स्वास्थ्य बजेट विनियोजन र जनस्वास्थ्यका कार्यक्रमहरू सम्बन्धी छलफलमा सहभागिता।',
    date: 'Jun 4, 2024',
    dateNp: 'जुन ४, २०२४',
    location: 'House of Representatives',
    locationNp: 'प्रतिनिधि सभा',
    img: img6,
    url: 'https://hr.parliament.gov.np/en/video/18557'
  },
  {
    id: '07',
    sidebarTitle: 'Urgent Public Importance Proposal',
    sidebarTitleNp: 'जरुरी सार्वजनिक महत्वको प्रस्ताव',
    tag: 'PARLIAMENTARY ISSUES',
    tagNp: 'संसदीय मुद्दा',
    title: 'Urgent Public Importance Proposal Discussion',
    titleNp: 'जरुरी सार्वजनिक महत्वको प्रस्तावमाथि छलफल',
    desc: 'Speech related to urgent national issues raised in the House of Representatives for immediate government action.',
    descNp: 'जनताका तत्कालका समस्याहरूबारे प्रतिनिधि सभामा दर्ता गरिएको जरुरी प्रस्तावमाथि भनाइ।',
    date: 'May 15, 2024',
    dateNp: 'मे १५, २०२४',
    location: 'House of Representatives',
    locationNp: 'प्रतिनिधि सभा',
    img: img7,
    url: 'https://hr.parliament.gov.np/en/video/19765'
  },
  {
    id: '08',
    sidebarTitle: 'Special Time Parliamentary Address',
    sidebarTitleNp: 'विशेष समय सम्बोधन',
    tag: 'PARLIAMENTARY SPEECH',
    tagNp: 'संसदीय भाषण',
    title: 'Special Time Speech by Dr. Toshima Karki',
    titleNp: 'डा. तोसिमा कार्कीको विशेष समय सम्बोधन',
    desc: 'Parliamentary statement delivered during Special Time session addressing national public concerns.',
    descNp: 'संसदको विशेष समयमा जनसरोकारका विभिन्न विषयहरूमा राखिएको तथ्यपरक विचार।',
    date: 'Feb 22, 2023',
    dateNp: 'फेब्रुअरी २२, २०२३',
    location: 'House of Representatives',
    locationNp: 'प्रतिनिधि सभा',
    img: img8,
    url: 'https://hr.parliament.gov.np/en/video/13949'
  },
  {
    id: '09',
    sidebarTitle: 'Federal Civil Service Bill Discussion',
    sidebarTitleNp: 'संघीय निजामती सेवा विधेयक छलफल',
    tag: 'LEGISLATION',
    tagNp: 'कानुन निर्माण',
    title: 'Discussion on Federal Civil Service Bill 2080',
    titleNp: 'संघीय निजामती सेवा विधेयक २०८० माथि छलफल',
    desc: 'Parliamentary discussion regarding civil service reform and administrative efficiency to serve the public better.',
    descNp: 'निजामती सेवालाई व्यावसायिक र जनमुखी बनाउन ऐन संशोधन सम्बन्धी छलफल।',
    date: 'Apr 10, 2024',
    dateNp: 'अप्रिल १०, २०२४',
    location: 'House of Representatives',
    locationNp: 'प्रतिनिधि सभा',
    img: img9,
    url: 'https://hr.parliament.gov.np/en/video/18188'
  },
  {
    id: '10',
    sidebarTitle: 'Appropriation Bill Priorities',
    sidebarTitleNp: 'विनियोजन विधेयकका प्राथमिकताहरू',
    tag: 'BUDGET & POLICY',
    tagNp: 'बजेट र नीति',
    title: 'Discussion on Principles and Priorities of Appropriation Bill',
    titleNp: 'विनियोजन विधेयकका सिद्धान्त र प्राथमिकतामाथि छलफल',
    desc: 'Discussion related to government budget priorities and national development policies for sustainable growth.',
    descNp: 'सरकारी बजेटका प्राथमिकताहरू र विकास नीतिको मार्गचित्र बारे समीक्षा र सुझाव।',
    date: 'Mar 1, 2025',
    dateNp: 'मार्च १, २०२५',
    location: 'House of Representatives',
    locationNp: 'प्रतिनिधि सभा',
    img: img10,
    url: 'https://hr.parliament.gov.np/en/video/22715'
  }
];

const TOTAL_PAGES = Math.ceil(ALL_TIMELINE_DATA.length / ITEMS_PER_PAGE);

export default function Parliament() {
  const { t, lang } = useLanguage();
  const location = useLocation();
  const fromExploreWork = location.state?.fromExploreWork;
  const [currentPage, setCurrentPage] = useState(1);
  const cardsTopRef = useRef(null);

  // Items for the current page
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = ALL_TIMELINE_DATA.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // Sidebar always shows current page's items
  const sidebarItems = pageItems;

  // Re-run animations when page changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-show');
            if (entry.target.classList.contains('parl-card')) {
              const id = entry.target.getAttribute('data-id');
              document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
              const activeTimelineItem = document.getElementById(`timeline-${id}`);
              if (activeTimelineItem) activeTimelineItem.classList.add('active');
            }
          }
        });
      }, { threshold: 0.25 });

      // Reset classes before re-observing
      document.querySelectorAll('.animate-hidden').forEach(el => {
        el.classList.remove('animate-show');
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 50);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > TOTAL_PAGES) return;
    setCurrentPage(page);
    // Scroll to cards section
    if (cardsTopRef.current) {
      cardsTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tt = (en, np) => lang === 'np' ? np : en;

  return (
    <>
      <Navbar />
      <main className="parliament-page">
        {/* Sticky Breadcrumb - only shown when navigated from Explore My Work */}
        {fromExploreWork && (
          <div className="sticky-breadcrumb">
            <div className="container">
              <Link to="/">{t('Home', 'गृहपृष्ठ')}</Link>
              <span className="separator">&gt;</span>
              <a href="/#explore-work">{t('Explore My Work', 'मेरो कामको अन्वेषण')}</a>
              <span className="separator">&gt;</span>
              <span className="current">{t('Parliamentary Work', 'संसदीय गतिविधि')}</span>
            </div>
          </div>
        )}

        {/* Hero Section - single background image only */}
        <section className="parl-hero">
          <div className="parl-hero-bg" aria-hidden="true">
            <img
              src={heroBg}
              alt=""
              loading="eager"
              fetchPriority="high"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = img1;
              }}
            />
          </div>
          <div className="parl-hero-overlay"></div>
          <div className="container parl-hero-container">
            <div className="parl-hero-content animate-hidden fade-in-up">
              <span className="parl-tag">
                <i className="fas fa-landmark"></i> {t('PARLIAMENTARY WORK', 'संसदीय गतिविधि')}
              </span>
              <h1 className="parl-title">
                {lang === 'np' ? (
                  'स्वस्थ, बलियो नेपालको लागि विधायन'
                ) : (
                  <>
                    <span>Legislating for a</span>
                    <span>Healthier, Stronger Nepal</span>
                  </>
                )}
              </h1>
              <p className="parl-desc">
                {t('Representing the voice of the people in the Parliament of Nepal and advocating for policies that bring real change.', 'नेपालको संसदमा जनताको आवाजको प्रतिनिधित्व गर्दै र वास्तविक परिवर्तन ल्याउने नीतिहरूको वकालत गर्दै।')}
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Layout */}
        <section className="parl-content-section section-padding" ref={cardsTopRef}>
          <div className="container parl-layout">

            {/* Left Sidebar Timeline */}
            <div className="parl-sidebar">
              <div className="parl-timeline">
                {sidebarItems.map((item, i) => (
                  <div
                    key={item.id}
                    id={`timeline-${item.id}`}
                    className={`timeline-item ${i === 0 ? 'active' : ''}`}
                  >
                    <div className="timeline-dot"></div>
                    <div className="timeline-line"></div>
                    <h3 className="timeline-num">{item.id}</h3>
                    <p className="timeline-title">{tt(item.sidebarTitle, item.sidebarTitleNp)}</p>
                  </div>
                ))}
                <div className="timeline-scroll-indicator">
                  <i className="fas fa-arrow-down"></i>
                  <span>{t('Scroll to explore', 'अन्वेषण गर्न तल जानुहोस्')}</span>
                </div>
              </div>
            </div>

            {/* Right Content Cards */}
            <div className="parl-cards">
              {pageItems.map((item, i) => {
                const isEven = i % 2 !== 0;
                return (
                  <div key={item.id} className="parl-card animate-hidden fade-in-up" data-id={item.id}>
                    <div className="parl-card-bg-num">{item.id}</div>
                    <div className={`parl-card-inner ${isEven ? 'row-reverse' : ''}`}>
                      <div className="parl-card-img">
                        <img
                          src={item.img}
                          alt={tt(item.title, item.titleNp)}
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = img10;
                          }}
                        />
                      </div>
                      <div className="parl-card-content">
                        <span className="parl-card-tag">{tt(item.tag, item.tagNp)}</span>
                        <h3 className="parl-card-title">{tt(item.title, item.titleNp)}</h3>
                        <p className="parl-card-desc">{tt(item.desc, item.descNp)}</p>
                        <div className="parl-card-meta-row">
                          <div className="parl-card-meta">
                            <span><i className="far fa-calendar-alt"></i> {tt(item.date, item.dateNp)}</span>
                            <span className="meta-divider">|</span>
                            <span><i className="fas fa-landmark text-primary"></i> {tt(item.location, item.locationNp)}</span>
                          </div>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-read-more"
                          >
                            {t('Read More', 'थप पढ्नुहोस्')} <i className="fas fa-external-link-alt"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Working Pagination */}
              <div className="parl-pagination">
                <button
                  className="page-btn"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-arrow-left"></i>
                </button>

                {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map(page => {
                  const isActive = page === currentPage;
                  const isNear = Math.abs(page - currentPage) <= 1 || page === 1 || page === TOTAL_PAGES;
                  const showDotBefore = page === currentPage - 2 && currentPage > 3;
                  const showDotAfter = page === currentPage + 2 && currentPage < TOTAL_PAGES - 2;

                  if (showDotBefore) return <span key={`dot-before`} className="page-dots">...</span>;
                  if (showDotAfter) return <span key={`dot-after`} className="page-dots">...</span>;
                  if (!isNear) return null;

                  return (
                    <button
                      key={page}
                      className={`page-btn ${isActive ? 'active' : ''}`}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  className="page-btn"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === TOTAL_PAGES}
                >
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>

              {/* Page info */}
              <p className="parl-page-info">
                {t(
                  `Showing ${startIdx + 1}–${Math.min(startIdx + ITEMS_PER_PAGE, ALL_TIMELINE_DATA.length)} of ${ALL_TIMELINE_DATA.length} parliamentary activities`,
                  `${ALL_TIMELINE_DATA.length} मध्ये ${startIdx + 1}–${Math.min(startIdx + ITEMS_PER_PAGE, ALL_TIMELINE_DATA.length)} देखाइँदै`
                )}
              </p>
            </div>

          </div>
        </section>

        {/* Call to Action */}
        <section className="parl-cta-section animate-hidden fade-in-up">
          <div className="container">
            <div className="parl-cta-content">
              <div className="parl-cta-text">
                <div className="parl-cta-icon"><i className="fas fa-handshake"></i></div>
                <div>
                  <h3>{t('Together, we can build a healthier, stronger and more equitable Nepal.', 'सँगै, हामी एक स्वस्थ, बलियो र समतामूलक नेपाल निर्माण गर्न सक्छौं।')}</h3>
                  <p>{t('Your voice matters. Your support drives real change.', 'तपाईंको आवाज महत्त्वपूर्ण छ। तपाईंको समर्थनले वास्तविक परिवर्तन ल्याउँछ।')}</p>
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
