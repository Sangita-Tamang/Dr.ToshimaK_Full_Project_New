import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Pagination from '../../components/common/Pagination';
import OptimizedImage from '../../components/common/OptimizedImage';
import api from '../../services/api';
import { formatDate } from '../../utils/formatDate';
import { useLanguage } from '../../context/LanguageContext';

const ITEMS_PER_PAGE = 9;
const CATEGORIES = ['all', 'Parliament Sessions', 'Health Programs', 'Public Meetings', 'Media Events', 'Leadership Moments'];

// Skeleton card shown while images are loading
function GallerySkeletonCard() {
  return (
    <div className="card" style={{ overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{ height: 220, background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      <div style={{ padding: '14px 18px' }}>
        <div style={{ height: 16, background: '#f0f0f0', borderRadius: 4, marginBottom: 8 }} />
        <div style={{ height: 12, background: '#f0f0f0', borderRadius: 4, width: '60%' }} />
      </div>
    </div>
  );
}

export default function Gallery() {
  const { t, lang } = useLanguage();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const topRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    api.get('/gallery', { params: { limit: 100 } })
      .then(data => {
        if (data?.data?.length) setGallery(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'all' ? gallery : gallery.filter(g => g.category === activeCategory);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePage = (p) => {
    setCurrentPage(p);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectedIndex = selectedImage ? filtered.findIndex(item => item._id === selectedImage._id) : -1;
  const openImage = (item) => setSelectedImage(item);
  const closeImage = () => setSelectedImage(null);
  const showPrevious = () => { if (selectedIndex > 0) setSelectedImage(filtered[selectedIndex - 1]); };
  const showNext = () => { if (selectedIndex >= 0 && selectedIndex < filtered.length - 1) setSelectedImage(filtered[selectedIndex + 1]); };

  // Close lightbox on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeImage(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <Navbar />
      <main className="page-fade-in">
        <section className="section-padding" ref={topRef}>
          <div className="container">
            <div className="section-header center">
              <h1>{t('Photo & Video Gallery', 'फोटो र भिडियो ग्यालरी')}</h1>
              <p className="text-muted">
                {t('Moments of service — glimpses from community visits, speeches, parliament sessions and events.', 'सेवाका क्षणहरू — सामुदायिक भ्रमण, भाषण, संसद सत्र र कार्यक्रमहरूका झलकहरू।')}
              </p>
            </div>

            <div className="filter-tabs">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => handleCategory(cat)}
                >
                  {cat === 'all' ? t('All', 'सबै') : cat}
                </button>
              ))}
            </div>

            {/* Skeleton loading state */}
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 24 }}>
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <GallerySkeletonCard key={i} />)}
              </div>
            ) : (
              <>
                {gallery.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <i className="fas fa-images" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: 16 }} />
                    <p className="text-muted">{t('Gallery images are being loaded. Please check back soon.', 'ग्यालरी तस्विरहरू लोड भइरहेका छन्। कृपया पछि फेरि हेर्नुहोस्।')}</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 24 }}>
                    {pageItems.length === 0 ? (
                      <p className="text-muted text-center" style={{ gridColumn: '1/-1' }}>{t('No items found.', 'कुनै वस्तु फेला परेन।')}</p>
                    ) : pageItems.map(item => {
                      const title = lang === 'np' ? (item.titleNp || item.titleEn) : (item.titleEn || '');
                      const imgSrc = item.mediaUrl || item.imageUrl || '';
                      return (
                        <div key={item._id} className="card" style={{ cursor: 'pointer', overflow: 'hidden' }} onClick={() => openImage(item)}>
                          <div style={{ height: 220, overflow: 'hidden', background: '#f5f5f5', position: 'relative' }}>
                            <OptimizedImage
                              src={imgSrc}
                              alt={title}
                              fill={true}
                              style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                              lazy={true}
                            />
                          </div>
                          <div style={{ padding: '14px 18px' }}>
                            <h4 style={{ fontSize: '0.95rem', marginBottom: 4, color: '#101828' }}>{title}</h4>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              <span className="card-badge" style={{ background: 'var(--primary)', fontSize: '0.7rem', padding: '2px 8px', borderRadius: 100, color: '#fff', marginRight: 8 }}>{item.category}</span>
                              {formatDate(item.date, { year: 'numeric', month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePage} />
                {totalPages > 1 && (
                  <p className="page-info">
                    {t(`Showing ${startIdx + 1}–${Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)} of ${filtered.length} photos`, `${filtered.length} मध्ये ${startIdx + 1}–${Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)} देखाइँदै`)}
                  </p>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
      {selectedImage && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 24 }}
          onClick={closeImage}
        >
          <div
            style={{ position: 'relative', width: '100%', maxWidth: 960, maxHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeImage} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', fontSize: 20, zIndex: 1, backdropFilter: 'blur(4px)' }} aria-label="Close">×</button>
            <button onClick={showPrevious} disabled={selectedIndex <= 0} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: '50%', width: 44, height: 44, cursor: selectedIndex <= 0 ? 'not-allowed' : 'pointer', opacity: selectedIndex <= 0 ? 0.4 : 1, zIndex: 1, backdropFilter: 'blur(4px)', fontSize: 20 }} aria-label="Previous">‹</button>
            <button onClick={showNext} disabled={selectedIndex >= filtered.length - 1} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: '50%', width: 44, height: 44, cursor: selectedIndex >= filtered.length - 1 ? 'not-allowed' : 'pointer', opacity: selectedIndex >= filtered.length - 1 ? 0.4 : 1, zIndex: 1, backdropFilter: 'blur(4px)', fontSize: 20 }} aria-label="Next">›</button>
            <OptimizedImage
              src={selectedImage.mediaUrl || selectedImage.imageUrl}
              alt={lang === 'np' ? (selectedImage.titleNp || selectedImage.titleEn) : (selectedImage.titleEn || '')}
              style={{ width: '100%', maxHeight: '78vh', objectFit: 'contain', borderRadius: 12 }}
              lazy={false}
              priority={true}
            />
            <div style={{ marginTop: 16, textAlign: 'center', color: '#fff', maxWidth: 700 }}>
              <h3 style={{ marginBottom: 6 }}>{lang === 'np' ? (selectedImage.titleNp || selectedImage.titleEn) : (selectedImage.titleEn || '')}</h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem' }}>{selectedImage.category}</p>
              {selectedIndex >= 0 && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: 4 }}>{selectedIndex + 1} / {filtered.length}</p>}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
