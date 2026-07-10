import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Loader from '../../components/common/Loader';
import Pagination from '../../components/common/Pagination';
import api from '../../services/api';
import { formatDate } from '../../utils/formatDate';
import { useLanguage } from '../../context/LanguageContext';
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

const ITEMS_PER_PAGE = 9;

const REAL_GALLERY = [
  { _id: '1', mediaUrl: img1, titleEn: 'Hospital Inspection and Monitoring Visit', titleNp: 'अस्पताल निरीक्षण तथा अनुगमन', category: 'Health Programs', date: '2024-05-20' },
  { _id: '2', mediaUrl: img2, titleEn: 'State Ministry of Health Office Work', titleNp: 'स्वास्थ्य मन्त्रालयको कार्यकक्षमा', category: 'Leadership Moments', date: '2023-02-10' },
  { _id: '3', mediaUrl: img3, titleEn: 'Interaction with Lalitpur Community Members', titleNp: 'ललितपुरका नागरिकहरूसँग अन्तरक्रिया', category: 'Public Meetings', date: '2024-04-25' },
  { _id: '4', mediaUrl: img4, titleEn: 'Official Portrait of Dr. Toshima Karki', titleNp: 'डा. तोसिमा कार्कीको आधिकारिक तस्विर', category: 'Leadership Moments', date: '2022-12-10' },
  { _id: '5', mediaUrl: img5, titleEn: 'Working on Health Policies at Desk', titleNp: 'स्वास्थ्य नीति लेखन तथा अध्ययनमा', category: 'Leadership Moments', date: '2024-03-10' },
  { _id: '6', mediaUrl: img6, titleEn: 'Healthcare Camp for Underprivileged Citizens', titleNp: 'विपन्न नागरिकका लागि निःशुल्क स्वास्थ्य शिविर', category: 'Health Programs', date: '2024-02-28' },
  { _id: '7', mediaUrl: img7, titleEn: 'Addressing a Public Health Awareness Program', titleNp: 'स्वास्थ्य सचेतना कार्यक्रममा सम्बोधन', category: 'Health Programs', date: '2024-02-14' },
  { _id: '8', mediaUrl: img8, titleEn: 'Press Conference on Healthcare Reforms', titleNp: 'स्वास्थ्य सुधार सम्बन्धी पत्रकार सम्मेलन', category: 'Media Events', date: '2024-01-30' },
  { _id: '9', mediaUrl: img9, titleEn: 'International Delegation on Public Health', titleNp: 'अन्तर्राष्ट्रिय स्वास्थ्य प्रतिनिधिमण्डलसँग बैठक', category: 'Media Events', date: '2023-12-15' },
  { _id: '10', mediaUrl: img10, titleEn: 'Dr. Toshima Karki Official Portrait Red Blazer', titleNp: 'डा. तोसिमा कार्की — रातो कोटमा', category: 'Leadership Moments', date: '2022-11-20' },
  { _id: '11', mediaUrl: img11, titleEn: 'Speaking in the Federal Parliament of Nepal', titleNp: 'प्रतिनिधि सभा बैठकमा मन्तव्य राख्दै', category: 'Parliament Sessions', date: '2024-06-04' },
  { _id: '12', mediaUrl: img12, titleEn: 'National TV Interview on Medical Policy', titleNp: 'राष्ट्रिय टेलिभिजनमा नीतिगत बहस', category: 'Media Events', date: '2024-05-15' },
  { _id: '13', mediaUrl: img13, titleEn: 'Maternal Healthcare Awareness Campaign', titleNp: 'मातृ स्वास्थ्य सचेतना अभियान', category: 'Health Programs', date: '2024-03-12' },
  { _id: '14', mediaUrl: img14, titleEn: 'Policy Discussion with Lawmakers', titleNp: 'सांसदहरूसँग नीतिगत छलफल', category: 'Parliament Sessions', date: '2024-06-11' },
  { _id: '15', mediaUrl: img15, titleEn: 'Addressing Public Assembly in Lalitpur', titleNp: 'ललितपुरमा आयोजित आमसभामा सम्बोधन', category: 'Public Meetings', date: '2024-05-18' },
];

const CATEGORIES = ['all', 'Parliament Sessions', 'Health Programs', 'Public Meetings', 'Media Events', 'Leadership Moments'];

export default function Gallery() {
  const { t, lang } = useLanguage();
  const [gallery, setGallery] = useState(REAL_GALLERY);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const topRef = useRef(null);

  useEffect(() => {
    api.get('/gallery', { params: { limit: 50 } })
      .then(data => { if (data?.data?.length) setGallery(data.data); })
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
  };

  const handlePage = (p) => {
    setCurrentPage(p);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectedIndex = selectedImage ? filtered.findIndex(item => item._id === selectedImage._id) : -1;

  const openImage = (item) => setSelectedImage(item);
  const closeImage = () => setSelectedImage(null);
  const showPrevious = () => {
    if (selectedIndex <= 0) return;
    setSelectedImage(filtered[selectedIndex - 1]);
  };
  const showNext = () => {
    if (selectedIndex < 0 || selectedIndex >= filtered.length - 1) return;
    setSelectedImage(filtered[selectedIndex + 1]);
  };

  return (
    <>
      <Navbar />
      <main>
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

            {loading ? <Loader /> : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 24 }}>
                  {pageItems.length === 0 ? (
                    <p className="text-muted text-center" style={{ gridColumn: '1/-1' }}>{t('No items found.', 'कुनै वस्तु फेला परेन।')}</p>
                  ) : pageItems.map(item => {
                    const title = lang === 'np' ? (item.titleNp || item.titleEn) : (item.titleEn || '');
                    return (
                      <div key={item._id} className="card" style={{ cursor: 'pointer', overflow: 'hidden' }} onClick={() => openImage(item)}>
                        <div style={{ height: 220, overflow: 'hidden' }}>
                          <img
                            src={item.mediaUrl || item.imageUrl}
                            alt={title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
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
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 24 }} onClick={closeImage}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 960, maxHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeImage} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', fontSize: 20, zIndex: 1 }} aria-label="Close">×</button>
            <button onClick={showPrevious} disabled={selectedIndex <= 0} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: '50%', width: 44, height: 44, cursor: selectedIndex <= 0 ? 'not-allowed' : 'pointer', opacity: selectedIndex <= 0 ? 0.5 : 1, zIndex: 1 }} aria-label="Previous">‹</button>
            <button onClick={showNext} disabled={selectedIndex >= filtered.length - 1} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: '50%', width: 44, height: 44, cursor: selectedIndex >= filtered.length - 1 ? 'not-allowed' : 'pointer', opacity: selectedIndex >= filtered.length - 1 ? 0.5 : 1, zIndex: 1 }} aria-label="Next">›</button>
            <img src={selectedImage.mediaUrl || selectedImage.imageUrl} alt={lang === 'np' ? (selectedImage.titleNp || selectedImage.titleEn) : (selectedImage.titleEn || '')} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 12 }} />
            <div style={{ marginTop: 16, textAlign: 'center', color: '#fff', maxWidth: 700 }}>
              <h3 style={{ marginBottom: 6 }}>{lang === 'np' ? (selectedImage.titleNp || selectedImage.titleEn) : (selectedImage.titleEn || '')}</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>{selectedImage.category}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
