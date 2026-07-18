import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Loader from '../../components/common/Loader';
import Pagination from '../../components/common/Pagination';
import OptimizedImage from '../../components/common/OptimizedImage';
import mediaService from '../../services/mediaService';
import { useLanguage } from '../../context/LanguageContext';
import { getCloudinaryUrl } from '../../services/cloudinaryService';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 6;

// Fallback Cloudinary thumbnails if backend media items don't have thumbnails
const FALLBACK_THUMBNAILS = [
  getCloudinaryUrl('dr-tk/image12', { width: 600 }),
  getCloudinaryUrl('dr-tk/image1', { width: 600 }),
  getCloudinaryUrl('dr-tk/image4', { width: 600 }),
  getCloudinaryUrl('dr-tk/image11', { width: 600 }),
  getCloudinaryUrl('dr-tk/image6', { width: 600 }),
  getCloudinaryUrl('dr-tk/image8', { width: 600 }),
  getCloudinaryUrl('dr-tk/image2', { width: 600 }),
  getCloudinaryUrl('dr-tk/image13', { width: 600 }),
];

// Static fallback data with Cloudinary thumbnail references
const FALLBACK_MEDIA = [
  {
    _id: 'm1',
    thumbnailIndex: 0,
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
    thumbnailIndex: 1,
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
    thumbnailIndex: 2,
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
    thumbnailIndex: 3,
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
    thumbnailIndex: 4,
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
    thumbnailIndex: 5,
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
    thumbnailIndex: 6,
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
    thumbnailIndex: 7,
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
  { icon: 'fab fa-facebook', color: '#1877F2', labelEn: 'Facebook', labelNp: 'फेसबुक', subEn: 'Official Page', subNp: 'आधिकारिक पेज', link: 'https://www.facebook.com/share/1JehU2Mjcu/' },
  { icon: 'fab fa-youtube', color: '#FF0000', labelEn: 'YouTube', labelNp: 'यूट्यूब', subEn: 'Watch Speeches', subNp: 'भाषणहरू हेर्नुहोस्', link: 'https://www.youtube.com/@Dr.Toshima_Karki_Secretariat' },
  { icon: 'fab fa-x-twitter', color: '#000000', labelEn: 'Twitter/X', labelNp: 'ट्विटर/एक्स', subEn: 'Latest Updates', subNp: 'पछिल्लो अपडेटहरू', link: 'https://x.com/ToshimaKarkiDr' },
  { icon: 'fab fa-linkedin', color: '#0A66C2', labelEn: 'LinkedIn', labelNp: 'लिंक्डइन', subEn: 'Follow Updates', subNp: 'अपडेटहरू पछ्याउनुहोस्', link: 'https://www.linkedin.com/in/dr-toshima-karki-471511166/' },
  { icon: 'fas fa-newspaper', color: '#4A90E2', labelEn: 'News', labelNp: 'समाचार', subEn: 'Read Articles', subNp: 'लेखहरू पढ्नुहोस्', internalLink: '/news' }
];

export default function Media() {
  const { t, lang } = useLanguage();
  const [media, setMedia] = useState(FALLBACK_MEDIA);
  const [cloudinaryThumbnails, setCloudinaryThumbnails] = useState(FALLBACK_THUMBNAILS);
  const [heroImage, setHeroImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    mediaService.getAll({ limit: 50 })
      .then(data => {
        if (data?.data?.length) setMedia(data.data);
        if (data?.cloudinaryImages?.thumbnails?.length) {
          setCloudinaryThumbnails(data.cloudinaryImages.thumbnails);
        }
        if (data?.cloudinaryImages?.heroImage) {
          setHeroImage(data.cloudinaryImages.heroImage);
        }
      })
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

  const getThumbnail = (item, index) => {
    let url = '';
    if (item.thumbnail && !item.thumbnail.startsWith('blob:')) url = item.thumbnail;
    else if (item.imageUrl) url = item.imageUrl;
    else if (item.mediaUrl) url = item.mediaUrl;
    else if (typeof item.thumbnailIndex === 'number') {
      url = cloudinaryThumbnails[item.thumbnailIndex] || cloudinaryThumbnails[index % (cloudinaryThumbnails.length || 1)];
    } else {
      url = cloudinaryThumbnails[index % (cloudinaryThumbnails.length || 1)] || '';
    }
    return getCloudinaryUrl(url);
  };

  const uniqueTypes = ['all', 'Interviews', 'Speeches', 'TV Programs'];

  return (
    <>
      <Navbar />
      <main ref={topRef}>
        {/* HERO */}
        <section className="light-hero">
          <div
            className="light-hero-bg"
            style={heroImage ? { backgroundImage: `url(${heroImage})` } : {
              backgroundImage: `url(${cloudinaryThumbnails[0] || ''})`
            }}
          />
          <div className="container">
            <div className="light-hero-content">
              <span className="light-hero-tag">{t('MEDIA', 'मिडिया')}</span>
              <h1 className="light-hero-title">{t('Speeches & Media', 'सम्बोधन र मिडिया')}</h1>
              <p className="light-hero-desc">
                {t(
                  'Explore public addresses, press conferences, media interviews and coverage where I share my vision for a healthier, stronger and more equitable Nepal.',
                  'मैले स्वस्थ, बलियो र अधिक समतामूलक नेपालका लागि आफ्नो दृष्टिकोण साझा गरेका सार्वजनिक सम्बोधन, पत्रकार सम्मेलन र मिडिया अन्तर्वार्ताहरू अन्वेषण गर्नुहोस्।'
                )}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-light">
          <div className="container">
            {/* Platforms */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 20, marginBottom: 50 }}>
              {PLATFORMS.map(p => (
                <div 
                  key={p.labelEn} 
                  className="card" 
                  style={{ padding: 20, textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
                  onClick={() => {
                    if (p.link) window.open(p.link, '_blank', 'noopener,noreferrer');
                    else if (p.internalLink) navigate(p.internalLink);
                  }}
                >
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
                  ) : paginatedMedia.map((item, idx) => {
                    const title = tt(item.titleEn, item.titleNp);
                    const source = tt(item.sourceEn, item.sourceNp);
                    const thumbSrc = getThumbnail(item, startIdx + idx);
                    return (
                      <div className="card" key={item._id} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="card-img-container" style={{ position: 'relative' }}>
                          <OptimizedImage
                            src={thumbSrc}
                            alt={title}
                            lazy={true}
                            fill={true}
                            objectFit="cover"
                          />
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
                            {t('Watch Video →', 'भिडियो हेर्नुहोस् →')}
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
