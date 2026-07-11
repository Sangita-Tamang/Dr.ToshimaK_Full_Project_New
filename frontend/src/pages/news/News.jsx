import { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Loader from '../../components/common/Loader';
import newsService from '../../services/newsService';
import { formatDate, truncate } from '../../utils/formatDate';
import { useLanguage } from '../../context/LanguageContext';
import Pagination from '../../components/common/Pagination';

import img1 from '../../assets/images/image1.png';
import img2 from '../../assets/images/image2.png';
import img3 from '../../assets/images/image3.png';
import img4 from '../../assets/images/image4.png';
import img5 from '../../assets/images/image5.png';
import img6 from '../../assets/images/image6.png';
import img7 from '../../assets/images/image7.png';
import img8 from '../../assets/images/image8.png';
import img9 from '../../assets/images/image9.png';
import img10 from '../../assets/images/image10.png';
import img11 from '../../assets/images/image11.png';
import img12 from '../../assets/images/image12.png';
import img13 from '../../assets/images/image13.png';
import img14 from '../../assets/images/image14.png';
import img15 from '../../assets/images/image15.png';

const ITEMS_PER_PAGE = 6;

const REAL_NEWS = [
  {
    _id: 'n1',
    image: img1,
    category: 'Healthcare Policy',
    publisherEn: 'OnlineKhabar',
    publisherNp: 'अनलाइनखबर',
    publishedDate: '2024-06-15',
    titleEn: 'Government Should Set Healthcare Service Fees: Toshima Karki',
    titleNp: 'सरकारले स्वास्थ्य सेवा शुल्क तोक्न जरुरी: तोसिमा कार्की',
    contentEn: 'Dr. Toshima Karki raised concerns about expensive healthcare services and suggested that the government should regulate healthcare service charges in both government and private hospitals.',
    contentNp: 'सरकारले सरकारी तथा निजी दुवै अस्पतालमा स्वास्थ्य सेवा शुल्क नियमन गर्नुपर्नेमा डा. तोसिमा कार्कीको जोड।',
    link: 'https://www.onlinekhabar.com/2024/06/1490373/government-should-set-healthcare-fees-tosima-karki'
  },
  {
    _id: 'n2',
    image: img2,
    category: 'Healthcare Policy',
    publisherEn: 'Nagarik News',
    publisherNp: 'नागरिक न्यूज',
    publishedDate: '2024-06-03',
    titleEn: 'Healthcare Fee Regulation Discussion',
    titleNp: 'स्वास्थ्य सेवा शुल्क नियमन सम्बन्धी छलफल',
    contentEn: "News coverage about Dr. Toshima Karki's views on regulating healthcare costs and ensuring affordable healthcare access for citizens.",
    contentNp: 'नागरिकहरूका लागि किफायती स्वास्थ्य सेवा पहुँच सुनिश्चित गर्न र स्वास्थ्य सेवा शुल्क नियमन गर्नुपर्ने डा. तोसिमा कार्कीको धारणा।',
    link: 'https://nagariknews.nagariknetwork.com/politics/1437739-1717496669.html'
  },
  {
    _id: 'n3',
    image: img3,
    category: 'Ministry Activities',
    publisherEn: 'Nagarik News',
    publisherNp: 'नागरिक न्यूज',
    publishedDate: '2023-01-18',
    titleEn: "Dr. Toshima Karki Begins Her Test as Health State Minister",
    titleNp: "अरुलाई प्रश्न सोध्न माहिर 'डा. तोसिमा' को अब सुरु भयो परीक्षा",
    contentEn: 'Coverage after Dr. Toshima Karki received responsibility as State Minister for Health and Population, focusing on expectations and challenges ahead.',
    contentNp: 'स्वास्थ्य राज्यमन्त्रीका रूपमा डा. तोसिमा कार्कीले जिम्मेवारी सम्हालेपछि थपिएका चुनौती र अपेक्षाहरूको विश्लेषण।',
    link: 'https://nagariknews.nagariknetwork.com/amp/health/1056251-1673949836.html'
  },
  {
    _id: 'n4',
    image: img4,
    category: 'Ministry Activities',
    publisherEn: 'Nepal Samaya',
    publisherNp: 'नेपाल समय',
    publishedDate: '2022-12-25',
    titleEn: 'Based on Expertise, I Should Lead the Health Ministry',
    titleNp: 'विज्ञताका हिसाबले स्वास्थ्य मन्त्रालय मैले नै पाउनुपर्छ: डा. तोसिमा कार्की',
    contentEn: 'Interview discussing her healthcare expertise, ministry responsibility, and her vision for health sector priorities and reforms in Nepal.',
    contentNp: 'डा. तोसिमा कार्कीको स्वास्थ्य क्षेत्रको विज्ञता, मन्त्रालयको जिम्मेवारी र प्राथमिकताबारे अन्तर्वार्ता।',
    link: 'https://nepalsamaya.com/detail/95913'
  },
  {
    _id: 'n5',
    image: img5,
    category: 'Healthcare Policy',
    publisherEn: 'Headline Nepal',
    publisherNp: 'हेडलाइन नेपाल',
    publishedDate: '2024-03-10',
    titleEn: 'Attempts Were Made to Stall Health Insurance: Toshima Karki',
    titleNp: 'स्वास्थ्य बीमा रोक्न विभिन्न प्रयास भए: तोसिमा कार्की',
    contentEn: "Dr. Toshima Karki discussed concerns regarding Nepal's health insurance system and challenges affecting its implementation at the national level.",
    contentNp: 'नेपालको स्वास्थ्य बीमा प्रणालीका चुनौती र यसको प्रभावकारी कार्यान्वयनमा आएका अवरोधहरूबारे छलफल।',
    link: 'https://english.headlinenepal.com/tag/Dr.%20Toshima%20Karki'
  },
  {
    _id: 'n6',
    image: img6,
    category: 'Political Updates',
    publisherEn: 'Headline Nepal',
    publisherNp: 'हेडलाइन नेपाल',
    publishedDate: '2024-02-15',
    titleEn: 'Health Examination Program for Meter-Interest Victims',
    titleNp: 'मिटर ब्याज पीडितहरूको स्वास्थ्य परीक्षण कार्यक्रम',
    contentEn: 'News coverage about Dr. Toshima Karki participating in a health examination program for affected citizens in her constituency.',
    contentNp: 'मिटरब्याज पीडित नागरिकहरूको स्वास्थ्य परीक्षण कार्यक्रममा डा. तोसिमा कार्कीको सक्रिय सहभागिता।',
    link: 'https://english.headlinenepal.com/tag/Dr.%20Toshima%20Karki'
  },
  {
    _id: 'n7',
    image: img7,
    category: 'Parliamentary Issues',
    publisherEn: 'Headline Nepal',
    publisherNp: 'हेडलाइन नेपाल',
    publishedDate: '2024-01-20',
    titleEn: 'Government Should Address Local Demands Before Taking Action',
    titleNp: 'स्थानीय माग सम्बोधन नगरी सरकारले अघि बढ्नु हुँदैन: डा. कार्की',
    contentEn: "Coverage of Toshima Karki raising public concerns and demanding government response to citizens' issues in the House of Representatives.",
    contentNp: 'संसदमा नागरिकका मुद्दाहरू उठाउँदै र स्थानीय मागहरू सम्बोधन गर्न माग गर्दै सांसद तोसिमा कार्की।',
    link: 'https://english.headlinenepal.com/tag/Dr.%20Toshima%20Karki'
  },
  {
    _id: 'n8',
    image: img8,
    category: 'Parliamentary Issues',
    publisherEn: 'Headline Nepal',
    publisherNp: 'हेडलाइन नेपाल',
    publishedDate: '2023-11-12',
    titleEn: 'School Education Bill Should Be Rewritten Instead of Amended',
    titleNp: 'विद्यालय शिक्षा विधेयक संशोधन होइन पुनर्लेखन गर्नुपर्छ',
    contentEn: 'Dr. Toshima Karki expressed her firm position that the School Education Bill requires comprehensive reform, not mere amendments.',
    contentNp: 'विद्यालय शिक्षा विधेयकमाथि व्यापक सुधार र पुनर्लेखन आवश्यक रहेको सांसद तोसिमा कार्कीको अडान।',
    link: 'https://english.headlinenepal.com/tag/Dr.%20Toshima%20Karki'
  },
  {
    _id: 'n9',
    image: img9,
    category: 'Political Updates',
    publisherEn: 'Headline Nepal',
    publisherNp: 'हेडलाइन नेपाल',
    publishedDate: '2023-01-10',
    titleEn: 'Dr. Toshima Karki Moves Toward Becoming Health State Minister',
    titleNp: 'डा. तोसिमा कार्की स्वास्थ्य राज्यमन्त्री बन्ने प्रक्रियामा',
    contentEn: "News coverage about Dr. Toshima Karki's appointment process and expectations regarding the Ministry of Health and Population.",
    contentNp: 'स्वास्थ्य मन्त्रालयमा नयाँ नेतृत्व र डा. तोसिमा कार्कीको मन्त्री बन्ने तयारी सम्बन्धी समाचार।',
    link: 'https://english.headlinenepal.com/tag/Dr.%20Toshima%20Karki'
  },
  {
    _id: 'n10',
    image: img10,
    category: 'Healthcare Policy',
    publisherEn: 'Ratopati',
    publisherNp: 'रातोपाटी',
    publishedDate: '2024-05-25',
    titleEn: 'MP Toshima Karki Demands Immediate National Trauma Policy',
    titleNp: 'सांसद तोसिमा कार्कीले तत्काल राष्ट्रिय ट्रमा नीति माग गरिन्',
    contentEn: 'Dr. Toshima Karki demanded immediate formulation and implementation of a National Trauma Policy to reduce deaths caused by road accidents.',
    contentNp: 'सडक दुर्घटनाबाट हुने मृत्यु न्यूनीकरण गर्न तत्काल राष्ट्रिय ट्रमा नीति तर्जुमा गरी कार्यान्वयन गर्न माग।',
    link: 'https://english.ratopati.com/story/63620/mp-karki-demands-immediate-formulation-of-national-trauma-policy'
  },
  {
    _id: 'n11',
    image: img11,
    category: 'Political Updates',
    publisherEn: 'Nepal News',
    publisherNp: 'नेपाल न्यूज',
    publishedDate: '2024-07-02',
    titleEn: 'RSP MP Karki Questions Government Legitimacy',
    titleNp: 'रास्वपा सांसद कार्कीले सरकारको वैधानिकतामाथि प्रश्न उठाइन्',
    contentEn: "Dr. Toshima Karki's parliamentary statement regarding government performance and the need for stronger political accountability.",
    contentNp: 'संसदमा सरकारको कामकारबाही र राजनीतिक उत्तरदायित्वबारे सांसद तोसिमा कार्कीको सम्बोधन।',
    link: 'https://english.nepalnews.com/s/politics/rsp-mp-karki-declares-oli-govt-no-longer-legitimate/'
  },
  {
    _id: 'n12',
    image: img12,
    category: 'Election News',
    publisherEn: 'The Kathmandu Post',
    publisherNp: 'काठमाडौँ पोष्ट',
    publishedDate: '2022-11-24',
    titleEn: 'Toshima Karki Wins Lalitpur-3 With Over 34,000 Vote Margin',
    titleNp: 'तोसिमा कार्की ललितपुर–३ मा ३४ हजारभन्दा बढी मतान्तरले विजयी',
    contentEn: 'Dr. Toshima Karki won the Lalitpur Constituency No. 3 election with 43,906 votes and a huge majority over competitors.',
    contentNp: 'राष्ट्रिय स्वतन्त्र पार्टीकी डा. तोसिमा कार्की अत्यधिक बहुमतका साथ ललितपुर क्षेत्र नं. ३ बाट प्रतिनिधि सभा सदस्यमा निर्वाचित।',
    link: 'https://kathmandupost.com/national/2026/03/07/tosima-karki-wins-lalitpur-3-with-over-34-000-vote-margin'
  },
  {
    _id: 'n13',
    image: img13,
    category: 'Healthcare Policy',
    publisherEn: 'Kantipur',
    publisherNp: 'कान्तिपुर',
    publishedDate: '2024-06-11',
    titleEn: "Government Should Immediately Bring Nepal Hospital Operation Act",
    titleNp: "सरकारले तत्काल 'नेपाल अस्पताल सञ्चालन ऐन' ल्याउनुपर्छ: डा. कार्की",
    contentEn: 'Dr. Toshima Karki raised the need for a separate hospital operation law to regulate healthcare institutions and improve overall healthcare standards.',
    contentNp: 'स्वास्थ्य संस्थाहरूको नियमन र गुणस्तर सुधारका लागि छुट्टै अस्पताल सञ्चालन ऐन आवश्यक रहेको सांसद डा. तोसिमा कार्कीको जोड।',
    link: 'https://ekantipur.com/news/2024/06/11/it-is-necessary-for-the-government-to-immediately-bring-nepal-hospital-operation-act-dr-karki-30-37.html'
  },
  {
    _id: 'n14',
    image: img14,
    category: 'Parliamentary Issues',
    publisherEn: 'Kantipur',
    publisherNp: 'कान्तिपुर',
    publishedDate: '2025-01-17',
    titleEn: 'MP Retirement Age Limit Should Be Set',
    titleNp: 'सांसद अवकाशको उमेर हद तोक्नुपर्छ: डा. कार्की',
    contentEn: 'Dr. Toshima Karki suggested setting an age limit for lawmakers to improve younger representation and effectiveness in parliament.',
    contentNp: 'संसदको प्रभावकारिता र युवा प्रतिनिधित्व बढाउन सांसदहरूको लागि उमेर हद तोकिनुपर्ने डा. तोसिमा कार्कीको प्रस्ताव।',
    link: 'https://ekantipur.com/news/2025/01/17/mp-retirement-age-should-be-set-dr-karki-27-04.html'
  },
  {
    _id: 'n15',
    image: img15,
    category: 'Parliamentary Issues',
    publisherEn: 'Kantipur',
    publisherNp: 'कान्तिपुर',
    publishedDate: '2025-03-07',
    titleEn: 'Toshima Karki Questions Health Secretary Appointment Decision',
    titleNp: 'सांसद तोसिमाको प्रश्न: पुरुष मन्त्रीले महिला सचिवसँग काम गर्नै नसक्ने हो?',
    contentEn: 'Dr. Toshima Karki questioned the process of appointing the Health Ministry secretary and raised serious concerns about transparency and gender equality.',
    contentNp: 'स्वास्थ्य मन्त्रालयको सचिव सरुवा निर्णयमा पारदर्शीता र समानताको कुरा उठाउँदै सांसद तोसिमा कार्कीको प्रश्न।',
    link: 'https://ekantipur.com/news/2025/03/07/mp-toshimas-question-cant-a-male-minister-work-with-a-female-secretary-33-59.html'
  }
];

export default function News() {
  const { t, lang } = useLanguage();
  const [news, setNews] = useState(REAL_NEWS);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    newsService.getAll({ limit: 20 })
      .then(data => {
        if (data?.data?.length) setNews(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...Array.from(new Set(REAL_NEWS.map(n => n.category)))];

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filtered = news.filter(n => {
    const title = n.titleEn || n.title?.en || '';
    const content = n.contentEn || n.content?.en || '';
    const cat = n.category || '';
    const matchCat = activeCategory === 'all' || cat === activeCategory;
    const matchSearch = !search || title.toLowerCase().includes(search.toLowerCase()) || content.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews = filtered.slice(startIdx, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="light-hero">
          <div className="light-hero-bg" style={{ backgroundImage: `url(${img13})` }} />
          <div className="container">
            <div className="light-hero-content">
              <span className="light-hero-tag">{t('NEWS', 'समाचार')}</span>
              <h1 className="light-hero-title">{t('Latest News', 'ताजा समाचार')}</h1>
              <p className="light-hero-desc">
                {t(
                  "Stay informed with the latest news and media reports highlighting Dr. Toshima Karki's initiatives, public engagements, parliamentary activities, and healthcare reforms across Nepal.",
                  'डा. तोसिमा कार्कीका पहलहरू, सार्वजनिक सहभागिता, संसदीय गतिविधिहरू र नेपालभरका स्वास्थ्य सुधारहरू हाइलाइट गर्ने ताजा समाचार र मिडिया रिपोर्टहरूसँग जानकारी रहनुहोस्।'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article Card */}
        {REAL_NEWS.length > 0 && (
          <div className="container">
            <div className="featured-card-overlap" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', minHeight: 280 }}>
              <div style={{ overflow: 'hidden' }}>
                <img src={REAL_NEWS[0].image} alt={REAL_NEWS[0].titleEn} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>{REAL_NEWS[0].category}</span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--secondary)', lineHeight: 1.2, marginBottom: 12 }}>{t(REAL_NEWS[0].titleEn, REAL_NEWS[0].titleNp)}</h2>
                <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem', color: '#888', marginBottom: 14 }}>
                  <span>📰 {t(REAL_NEWS[0].publisherEn, REAL_NEWS[0].publisherNp)}</span>
                  <span>📅 {formatDate(REAL_NEWS[0].publishedDate)}</span>
                </div>
                <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 20 }}>{t(REAL_NEWS[0].contentEn, REAL_NEWS[0].contentNp)}</p>
                <div>
                  <a href={REAL_NEWS[0].link} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
                    {t('Read Full Article', 'पूरा लेख पढ्नुहोस्')} →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="section-padding bg-light">
          <div className="container">
            {/* Filter + Search Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
              <div className="filter-tabs" style={{ marginBottom: 0 }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat === 'all' ? t('All', 'सबै') : cat}
                  </button>
                ))}
              </div>
              <div style={{ position: 'relative', maxWidth: 320, width: '100%' }}>
                <i className="fas fa-search" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                <input
                  type="text"
                  placeholder={t('Search news...', 'समाचार खोज्नुहोस्...')}
                  value={search}
                  onChange={handleSearchChange}
                  style={{ width: '100%', padding: '12px 16px 12px 40px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-full)', background: '#fff' }}
                />
              </div>
            </div>

            {/* Grid */}
            {loading ? <Loader /> : (
              <>
                <div className="grid-3">
                  {paginatedNews.length === 0 ? (
                    <p className="text-muted text-center" style={{ gridColumn: '1/-1' }}>
                      {t('No news articles found.', 'कुनै समाचार फेला परेन।')}
                    </p>
                  ) : paginatedNews.map(item => {
                    const titleEn = item.titleEn || item.title?.en || '';
                    const titleNp = item.titleNp || item.title?.np || titleEn;
                    const contentEn = item.contentEn || item.content?.en || '';
                    const contentNp = item.contentNp || item.content?.np || contentEn;
                    const publisher = lang === 'np' ? (item.publisherNp || item.publisherEn) : (item.publisherEn || item.source || '');
                    const articleUrl = item.link || item.url || '#';
                    return (
                      <div className="card" key={item._id} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="card-img-container" style={{ position: 'relative' }}>
                          <img src={item.image || item.imageUrl || img13} alt={titleEn} />
                          <span className="card-badge" style={{ background: 'var(--primary)' }}>{item.category}</span>
                        </div>
                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                          <div style={{ display: 'flex', gap: 16, fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                            <span><i className="far fa-newspaper" style={{ marginRight: 5 }}></i>{publisher}</span>
                            <span><i className="far fa-calendar-alt" style={{ marginRight: 5 }}></i>{formatDate(item.publishedDate, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          </div>
                          <h3 style={{ fontSize: '1.05rem', marginBottom: 10, lineHeight: 1.4 }}>
                            {t(titleEn, titleNp)}
                          </h3>
                          <p style={{ flexGrow: 1, fontSize: '0.9rem', color: '#555' }}>
                            {truncate(t(contentEn, contentNp), 130)}
                          </p>
                          <a
                            href={articleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-link"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12 }}
                          >
                            {t('Read Full Article', 'पूरा लेख पढ्नुहोस्')} <i className="fas fa-external-link-alt" style={{ fontSize: '0.75rem' }}></i>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                {totalPages > 1 && (
                  <p className="page-info">
                    {t(`Showing ${startIdx + 1}–${Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)} of ${filtered.length} news articles`, `${filtered.length} मध्ये ${startIdx + 1}–${Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)} देखाइँदै`)}
                  </p>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
