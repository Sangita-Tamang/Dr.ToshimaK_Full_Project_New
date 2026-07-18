import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Loader from '../../components/common/Loader';
import newsService from '../../services/newsService';
import { formatDate, truncate } from '../../utils/formatDate';
import { useLanguage } from '../../context/LanguageContext';
import Pagination from '../../components/common/Pagination';
import OptimizedImage from '../../components/common/OptimizedImage';
import { getCloudinaryUrl } from '../../services/cloudinaryService';


const ITEMS_PER_PAGE = 6;
export default function News() {
  const { t, lang } = useLanguage();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsHeroImage, setNewsHeroImage] = useState('');
  const [newsImages, setNewsImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    newsService.getAll({ limit: 50 })
      .then(data => {
        if (data?.data?.length) setNews(data.data);
        if (data?.cloudinaryImages?.heroImage) setNewsHeroImage(data.cloudinaryImages.heroImage);
        if (data?.cloudinaryImages?.newsImages) setNewsImages(data.cloudinaryImages.newsImages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...Array.from(new Set(news.map(n => n.category).filter(Boolean)))];

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      <main className="page-fade-in">
        {/* HERO */}
        <section className="light-hero" ref={topRef}>
          <div className="light-hero-bg" style={newsHeroImage ? { backgroundImage: `url(${newsHeroImage})` } : {}} />
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
        {news.length > 0 && (
          <div className="container">
            <div className="featured-card-overlap" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', minHeight: 280 }}>
              <div style={{ position: 'relative', overflow: 'hidden', background: '#f5f5f5' }}>
                {(news[0].image || news[0].imageUrl || newsImages[0]) && (
                  <OptimizedImage
                    src={getCloudinaryUrl(news[0].image) || getCloudinaryUrl(news[0].imageUrl) || newsImages[0] || ''}
                    alt={news[0].titleEn}
                    fill={true}
                    lazy={false}
                    priority={true}
                  />
                )}
              </div>
              <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>{news[0].category}</span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--secondary)', lineHeight: 1.2, marginBottom: 12 }}>{t(news[0].titleEn || news[0].title?.en || '', news[0].titleNp || news[0].title?.np || '')}</h2>
                <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem', color: '#888', marginBottom: 14 }}>
                  <span>📰 {t(news[0].publisherEn || news[0].source || '', news[0].publisherNp || news[0].publisherEn || '')}</span>
                  <span>📅 {formatDate(news[0].publishedDate)}</span>
                </div>
                <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 20 }}>{t(news[0].contentEn || news[0].content?.en || '', news[0].contentNp || news[0].content?.np || '')}</p>
                <div>
                  <a href={news[0].link || news[0].url || '#'} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
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
                  ) : paginatedNews.map((item, idx) => {
                    const titleEn = item.titleEn || item.title?.en || '';
                    const titleNp = item.titleNp || item.title?.np || titleEn;
                    const contentEn = item.contentEn || item.content?.en || '';
                    const contentNp = item.contentNp || item.content?.np || contentEn;
                    const publisher = lang === 'np' ? (item.publisherNp || item.publisherEn) : (item.publisherEn || item.source || '');
                    const articleUrl = item.link || item.url || '#';
                    return (
                      <div className="card" key={item._id} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="card-img-container" style={{ position: 'relative' }}>
                          <OptimizedImage
                            src={getCloudinaryUrl(item.image) || getCloudinaryUrl(item.imageUrl) || newsImages[(startIdx + idx) % (newsImages.length || 1)] || ''}
                            alt={titleEn}
                            lazy={true}
                            fill={true}
                            style={{ objectFit: 'cover' }}
                          />
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
