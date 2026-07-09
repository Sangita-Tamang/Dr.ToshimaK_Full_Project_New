import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Loader from '../../components/common/Loader';
import Pagination from '../../components/common/Pagination';
import mediaService from '../../services/mediaService';
import { useLanguage } from '../../context/LanguageContext';

import img1 from '../../assets/images/image1.png';
import img2 from '../../assets/images/image2.png';
import img4 from '../../assets/images/image4.png';
import img6 from '../../assets/images/image6.png';
import img8 from '../../assets/images/image8.png';
import img11 from '../../assets/images/image11.png';
import img12 from '../../assets/images/image12.png';
import img13 from '../../assets/images/image13.png';

const ITEMS_PER_PAGE = 6;

const REAL_MEDIA = [
  {
    _id: 'm1',
    thumbnail: img12,
    type: 'Interviews',
    titleEn: 'Healthcare Vision Interview: Public Expectations',
    titleNp: 'स्वास्थ्य क्षेत्रको दृष्टिकोण अन्तर्वार्ता: जनअपेक्षा',
    link: 'https://www.healthaawaj.com/interview/51839/',
    duration: '15:20',
    sourceEn: 'Health Aawaj',
    sourceNp: 'स्वास्थ्य आवाज'
  },
  {
    _id: 'm2',
    thumbnail: img1,
    type: 'Interviews',
    titleEn: 'Health Sector Reform Blueprint Interview',
    titleNp: 'स्वास्थ्य क्षेत्र सुधारको खाका अन्तर्वार्ता',
    link: 'https://nagariknews.nagariknetwork.com/interview/1038531-1672301280.html',
    duration: '22:45',
    sourceEn: 'Nagarik News',
    sourceNp: 'नागरिक न्यूज'
  },
  {
    _id: 'm3',
    thumbnail: img4,
    type: 'Interviews',
    titleEn: 'Health Ministry Leadership & Expertise Discussion',
    titleNp: 'स्वास्थ्य मन्त्रालयको नेतृत्व र विज्ञता सम्बन्धी छलफल',
    link: 'https://nepalsamaya.com/detail/95913',
    duration: '18:10',
    sourceEn: 'Nepal Samaya',
    sourceNp: 'नेपाल समय'
  },
  {
    _id: 'm4',
    thumbnail: img11,
    type: 'TV Programs',
    titleEn: 'Toshima Karki Media Interviews Collection',
    titleNp: 'तोसिमा कार्की मिडिया अन्तर्वार्ता संग्रह',
    link: 'https://www.youtube.com/results?search_query=Toshima+Karki+interview',
    duration: 'Collection',
    sourceEn: 'YouTube',
    sourceNp: 'यूट्यूब'
  },
  {
    _id: 'm5',
    thumbnail: img6,
    type: 'Speeches',
    titleEn: 'Toshima Karki Health Sector Policy & Reform Discussions',
    titleNp: 'तोसिमा कार्की स्वास्थ्य क्षेत्र नीति र सुधार छलफल',
    link: 'https://www.youtube.com/results?search_query=Toshima+Karki+health+policy',
    duration: '32:15',
    sourceEn: 'YouTube',
    sourceNp: 'यूट्यूब'
  },
  {
    _id: 'm6',
    thumbnail: img8,
    type: 'Speeches',
    titleEn: 'Toshima Karki Parliament Speech Videos Collection',
    titleNp: 'तोसिमा कार्की संसद सम्बोधन भिडियो संग्रह',
    link: 'https://www.youtube.com/results?search_query=Toshima+Karki+parliament+speech',
    duration: 'Collection',
    sourceEn: 'YouTube',
    sourceNp: 'यूट्यूब'
  },
  {
    _id: 'm7',
    thumbnail: img2,
    type: 'TV Programs',
    titleEn: 'Hospital and Healthcare Visits & Public Address',
    titleNp: 'अस्पताल तथा स्वास्थ्य सेवा अनुगमन र सार्वजनिक सम्बोधन',
    link: 'https://www.youtube.com/results?search_query=Toshima+Karki+hospital+visit',
    duration: '28:40',
    sourceEn: 'YouTube',
    sourceNp: 'यूट्यूब'
  },
  {
    _id: 'm8',
    thumbnail: img13,
    type: 'Interviews',
    titleEn: 'Maternal Healthcare & Campaign Blueprint Discussion',
    titleNp: 'मातृ स्वास्थ्य र अभियानको मार्गचित्र सम्बन्धी छलफल',
    link: 'https://www.youtube.com/results?search_query=Toshima+Karki+interview',
    duration: '14:50',
    sourceEn: 'YouTube',
    sourceNp: 'यूट्यूब'
  }
];

const PLATFORMS = [
  { icon: 'fab fa-youtube', color: '#FF0000', labelEn: 'YouTube', labelNp: 'यूट्यूब', subEn: 'Watch Speeches', subNp: 'भाषणहरू हेर्नुहोस्' },
  { icon: 'fas fa-newspaper', color: '#4A90E2', labelEn: 'News', labelNp: 'समाचार', subEn: 'Read Articles', subNp: 'लेखहरू पढ्नुहोस्' },
  { icon: 'fab fa-tiktok', color: '#010101', labelEn: 'TikTok', labelNp: 'टिकटक', subEn: 'Follow Updates', subNp: 'अपडेटहरू पछ्याउनुहोस्' },
  { icon: 'fas fa-podcast', color: '#8A2BE2', labelEn: 'Podcasts', labelNp: 'पोडकास्ट', subEn: 'Listen Now', subNp: 'अहिले सुन्नुहोस्' }
];

export default function Media() {
  const { t, lang } = useLanguage();
  const [media, setMedia] = useState(REAL_MEDIA);
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef(null);

  useEffect(() => {
    mediaService.getAll({ limit: 50 })
      .then(data => { if (data?.data?.length) setMedia(data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleTypeChange = (type) => {
    setActiveType(type);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filtered = media.filter(m => {
    const title = m.titleEn || '';
    const titleNp = m.titleNp || '';
    const matchType = activeType === 'all' || m.type === activeType;
    const matchSearch = !search || title.toLowerCase().includes(search.toLowerCase()) || titleNp.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMedia = filtered.slice(startIdx, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (p) => {
    setCurrentPage(p);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tt = (en, np) => lang === 'np' ? np : en;

  const uniqueTypes = ['all', 'Interviews', 'Speeches', 'TV Programs'];

  return (
    <>
      <Navbar />
      <main ref={topRef}>
        {/* HERO */}
        <section className="hero-section" style={{ paddingBottom: 60 }}>
          <div className="container">
            <div className="hero-content" style={{ paddingBottom: 0 }}>
              <span className="hero-tag">{t('SPEECHES & MEDIA COVERAGE', 'सम्बोधन तथा मिडिया कभरेज')}</span>
              <h1 className="hero-title">{t('My Speeches. My Message. My Mission.', 'मेरो सम्बोधन। मेरो सन्देश। मेरो मिसन।')}</h1>
              <p className="hero-description">
                {t('Explore public addresses, press conferences, media interviews and coverage where I share my vision for a healthier, stronger and more equitable Nepal.', 'मैले स्वस्थ, बलियो र अधिक समतामूलक नेपालका लागि आफ्नो दृष्टिकोण साझा गरेका सार्वजनिक सम्बोधन, पत्रकार सम्मेलन र मिडिया अन्तर्वार्ताहरू अन्वेषण गर्नुहोस्।')}
              </p>
            </div>
            <div className="hero-image-container">
              <img src={img12} alt="Media" className="hero-portrait" />
            </div>
          </div>
        </section>

        <section className="section-padding bg-light">
          <div className="container">
            {/* Platforms */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 20, marginBottom: 50 }}>
              {PLATFORMS.map(p => (
                <div key={p.labelEn} className="card" style={{ padding: 20, textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <i className={p.icon} style={{ fontSize: '2rem', color: p.color }}></i>
                  <strong>{tt(p.labelEn, p.labelNp)}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{tt(p.subEn, p.subNp)}</span>
                </div>
              ))}
            </div>

            {/* Filter + Search */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
              <div className="filter-tabs" style={{ marginBottom: 0 }}>
                {uniqueTypes.map(type => (
                  <button
                    key={type}
                    className={`filter-tab ${activeType === type ? 'active' : ''}`}
                    onClick={() => handleTypeChange(type)}
                  >
                    {type === 'all' ? t('All', 'सबै') : t(type, type)}
                  </button>
                ))}
              </div>
              <div style={{ position: 'relative', maxWidth: 320, width: '100%' }}>
                <i className="fas fa-search" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                <input
                  type="text"
                  placeholder={t('Search media...', 'खोज्नुहोस्...')}
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
                  {paginatedMedia.length === 0 ? (
                    <p className="text-muted text-center" style={{ gridColumn: '1/-1' }}>
                      {t('No media items found.', 'कुनै मिडिया सामग्री फेला परेन।')}
                    </p>
                  ) : paginatedMedia.map(item => {
                    const title = tt(item.titleEn, item.titleNp);
                    const source = tt(item.sourceEn, item.sourceNp);
                    return (
                      <div className="card" key={item._id} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="card-img-container" style={{ position: 'relative' }}>
                          <img src={item.thumbnail || img11} alt={title} />
                          <a href={item.link} target="_blank" rel="noreferrer" className="play-overlay"><i className="fas fa-play"></i></a>
                          <span className="card-badge" style={{ background: 'var(--primary)' }}>{t(item.type, item.type)}</span>
                        </div>
                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                          <h3 style={{ fontSize: '1.05rem', marginBottom: 8, lineHeight: 1.4 }}>{title}</h3>
                          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {item.duration && <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}><i className="far fa-clock"></i> {item.duration}</span>}
                            {source && <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}><i className="far fa-play-circle"></i> {source}</span>}
                          </div>
                          <a href={item.link} target="_blank" rel="noreferrer" className="card-link" style={{ marginTop: 12, display: 'inline-block' }}>
                            {t('Watch Video &rarr;', 'भिडियो हेर्नुहोस् &rarr;')}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                {totalPages > 1 && (
                  <p className="page-info">
                    {t(`Showing ${startIdx + 1}–${Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)} of ${filtered.length} media coverages`, `${filtered.length} मध्ये ${startIdx + 1}–${Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)} देखाइँदै`)}
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
