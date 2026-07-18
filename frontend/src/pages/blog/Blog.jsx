import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../../components/common/OptimizedImage';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Loader from '../../components/common/Loader';
import Pagination from '../../components/common/Pagination';
import blogService from '../../services/blogService';
import { formatDate, truncate } from '../../utils/formatDate';
import { useLanguage } from '../../context/LanguageContext';

import { getCloudinaryUrl } from '../../services/cloudinaryService';

// Fallback images from Cloudinary (f_auto, q_auto auto-applied)
const img1 = getCloudinaryUrl('dr-tk/image1', { width: 800 });
const img2 = getCloudinaryUrl('dr-tk/image2', { width: 800 });
const img3 = getCloudinaryUrl('dr-tk/image3', { width: 800 });
const img4 = getCloudinaryUrl('dr-tk/image4', { width: 400, height: 400 });
const img5 = getCloudinaryUrl('dr-tk/image5', { width: 800 });
const img6 = getCloudinaryUrl('dr-tk/image6', { width: 800 });

const ITEMS_PER_PAGE = 6;

const REAL_BLOGS = [
  {
    _id: 'b1',
    image: img1,
    category: 'Healthcare Reform',
    categoryNp: 'स्वास्थ्य सुधार',
    authorEn: 'Dr. Toshima Karki',
    authorNp: 'डा. तोषिमा कार्की',
    authorImage: img4,
    publishedDate: '2024-06-20',
    titleEn: 'The Path to Healthcare Reform in Nepal',
    titleNp: 'नेपालमा स्वास्थ्य क्षेत्र सुधारको बाटो',
    summaryEn: 'Regulating costs, boosting insurance, and standardizing operations are key to accessible health for all.',
    summaryNp: 'स्वास्थ्य सेवालाई पहुँचयोग्य बनाउन शुल्क नियमन, बीमाको सुदृढीकरण र अस्पताल सञ्चालन मापदण्ड मुख्य आधार हुन्।',
    readTimeEn: '6 min read',
    readTimeNp: '६ मिनेट पढाइ',
    views: 1240
  },
  {
    _id: 'b2',
    image: img4,
    category: 'Personal Journey',
    categoryNp: 'व्यक्तिगत यात्रा',
    authorEn: 'Dr. Toshima Karki',
    authorNp: 'डा. तोषिमा कार्की',
    authorImage: img4,
    publishedDate: '2024-01-15',
    titleEn: 'From Clinical Medicine to Policymaking: My Journey',
    titleNp: 'क्लिनिकल मेडिसिनदेखि नीति निर्माणसम्म: मेरो यात्रा',
    summaryEn: 'Why I decided to move from treating individual patients to curing the healthcare system itself.',
    summaryNp: 'बिरामी जाँच्ने स्टेथोसप छोडेर प्रणालीकै उपचार गर्न राजनीति र नीति निर्माणमा आउनुको मेरो अन्तर्य।',
    readTimeEn: '8 min read',
    readTimeNp: '८ मिनेट पढाइ',
    views: 856
  },
  {
    _id: 'b3',
    image: img6,
    category: 'Public Awareness',
    categoryNp: 'जनचेतना',
    authorEn: 'Dr. Toshima Karki',
    authorNp: 'डा. तोषिमा कार्की',
    authorImage: img4,
    publishedDate: '2024-04-10',
    titleEn: 'Prioritizing Preventative Health & Awareness',
    titleNp: 'प्रवर्धनात्मक स्वास्थ्य र सचेतनालाई प्राथमिकता',
    summaryEn: 'Preventing diseases through regular screening, health education and healthy lifestyle changes across rural Nepal.',
    summaryNp: 'नियमित स्वास्थ्य जाँच, स्वास्थ्य शिक्षा र स्वस्थ जीवनशैली अपनाई रोग लाग्नै नदिने उपायहरू बारे सचेतना।',
    readTimeEn: '5 min read',
    readTimeNp: '५ मिनेट पढाइ',
    views: 942
  },
  {
    _id: 'b4',
    image: img2,
    category: 'Healthcare Reform',
    categoryNp: 'स्वास्थ्य सुधार',
    authorEn: 'Dr. Toshima Karki',
    authorNp: 'डा. तोषिमा कार्की',
    authorImage: img4,
    publishedDate: '2024-03-05',
    titleEn: 'Strengthening Rural Health Infrastructure & Access',
    titleNp: 'ग्रामीण स्वास्थ्य पूर्वाधार र पहुँचको सुदृढीकरण',
    summaryEn: 'A strategic outline of how rural hospitals can bridge the healthcare gap between rural communities and cities.',
    summaryNp: 'ग्रामीण अस्पतालहरूले ग्रामीण समुदाय र सहरहरू बीचको स्वास्थ्य सेवाको खाडललाई कसरी कम गर्न सक्छन् भन्ने रणनीतिक रूपरेखा।',
    readTimeEn: '7 min read',
    readTimeNp: '७ मिनेट पढाइ',
    views: 671
  },
  {
    _id: 'b5',
    image: img3,
    category: 'Public Awareness',
    categoryNp: 'जनचेतना',
    authorEn: 'Dr. Toshima Karki',
    authorNp: 'डा. तोषिमा कार्की',
    authorImage: img4,
    publishedDate: '2024-02-18',
    titleEn: 'Emergency Response & Trauma Care Policy in Nepal',
    titleNp: 'नेपालमा आपतकालीन सेवा र ट्रमा केयर नीति',
    summaryEn: 'Why standardizing emergency response systems and trauma care across highway networks is critical to saving lives.',
    summaryNp: 'राजमार्ग नेटवर्कमा आपतकालीन चिकित्सा प्रतिक्रिया प्रणाली र ट्रमा केयर मापदण्डको भूमिका र जीवन रक्षा।',
    readTimeEn: '6 min read',
    readTimeNp: '६ मिनेट पढाइ',
    views: 1105
  },
  {
    _id: 'b6',
    image: img5,
    category: 'Personal Journey',
    categoryNp: 'व्यक्तिगत यात्रा',
    authorEn: 'Dr. Toshima Karki',
    authorNp: 'डा. तोषिमा कार्की',
    authorImage: img4,
    publishedDate: '2023-11-20',
    titleEn: 'Representing Public Hopes: One Year in Federal Parliament',
    titleNp: 'जनअपेक्षाको प्रतिनिधित्व: संघीय संसदमा एक वर्ष',
    summaryEn: 'Reflections on parliamentary processes, policy-drafting challenges, and achievements as a representative of Lalitpur-3.',
    summaryNp: 'संसदीय प्रक्रिया, नीति मस्यौदाका चुनौतीहरू र ललितपुर-३ को प्रतिनिधिको रूपमा हासिल गरेका उपलब्धिहरूको समीक्षा।',
    readTimeEn: '10 min read',
    readTimeNp: '१० मिनेट पढाइ',
    views: 1450
  },
  {
    _id: 'b7',
    image: img1,
    category: 'Healthcare Reform',
    categoryNp: 'स्वास्थ्य सुधार',
    authorEn: 'Dr. Toshima Karki',
    authorNp: 'डा. तोषिमा कार्की',
    authorImage: img4,
    publishedDate: '2024-07-01',
    titleEn: 'Digital Health and Telemedicine in Rural Regions',
    titleNp: 'ग्रामीण क्षेत्रमा डिजिटल स्वास्थ्य र टेलिमेडिसिन',
    summaryEn: 'Leveraging technology to connect specialist doctors from Kathmandu with remote clinics in mountainous areas.',
    summaryNp: 'काठमाडौंका विशेषज्ञ डाक्टरहरूलाई हिमाली क्षेत्रका दुर्गम क्लिनिकहरूसँग जोड्न प्रविधिको प्रयोग।',
    readTimeEn: '5 min read',
    readTimeNp: '५ मिनेट पढाइ',
    views: 520
  }
];

export default function Blog() {
  const { t, lang } = useLanguage();
  const [blogs, setBlogs] = useState(REAL_BLOGS);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef(null);

  useEffect(() => {
    blogService.getAll({ limit: 50 })
      .then(data => { if (data?.data?.length) setBlogs(data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const filtered = activeCategory === 'all' ? blogs : blogs.filter(b => b.category === activeCategory || b.categoryNp === activeCategory);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBlogs = filtered.slice(startIdx, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (p) => {
    setCurrentPage(p);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tt = (en, np) => lang === 'np' ? np : en;

  const categories = ['all', 'Healthcare Reform', 'Personal Journey', 'Public Awareness'];

  return (
    <>
      <Navbar />
      <main ref={topRef}>
        <section className="section-padding">
          <div className="container">
            <div className="section-header center">
              <h2>{t('Insights & Writings', 'विचार र लेखन')}</h2>
              <p className="text-muted">{t('Thoughts on healthcare, leadership, policy and nation building.', 'स्वास्थ्य सेवा, नेतृत्व, नीति र राष्ट्र निर्माण सम्बन्धी विचारहरू।')}</p>
            </div>

            <div className="filter-tabs">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat === 'all' ? t('All', 'सबै') : t(cat, cat === 'Healthcare Reform' ? 'स्वास्थ्य सुधार' : cat === 'Personal Journey' ? 'व्यक्तिगत यात्रा' : 'जनचेतना')}
                </button>
              ))}
            </div>

            {loading ? <Loader /> : (
              <>
                <div className="grid-3">
                  {paginatedBlogs.length === 0 ? (
                    <p className="text-muted text-center" style={{ gridColumn: '1/-1' }}>{t('No blogs found.', 'कुनै ब्लग फेला परेन।')}</p>
                  ) : paginatedBlogs.map(blog => {
                    const title = tt(blog.titleEn, blog.titleNp);
                    const summary = tt(blog.summaryEn, blog.summaryNp);
                    const author = tt(blog.authorEn, blog.authorNp);
                    const readTime = tt(blog.readTimeEn, blog.readTimeNp);
                    const category = tt(blog.category, blog.categoryNp);

                    return (
                      <div className="card" key={blog._id} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="card-img-container" style={{ position: 'relative' }}>
                          <OptimizedImage
                            src={blog.image || img1}
                            alt={title}
                            lazy={true}
                            fill={true}
                            style={{ objectFit: 'cover' }}
                          />
                          <span className="card-badge" style={{ background: 'var(--primary)' }}>{category}</span>
                        </div>
                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                            <img src={blog.authorImage || img4} alt={author} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{author}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>{readTime}</span>
                          </div>
                          <h3 style={{ fontSize: '1.05rem', marginBottom: 10, lineHeight: 1.4 }}>{title}</h3>
                          <p style={{ flexGrow: 1, fontSize: '0.9rem', color: '#555' }}>{truncate(summary || blog.contentEn, 120)}</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                            <Link to={`/blog/${blog._id}`} className="card-link">{t('Read More &rarr;', 'थप पढ्नुहोस् &rarr;')}</Link>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              <i className="far fa-eye" style={{ marginRight: 4 }}></i>{blog.views || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                {totalPages > 1 && (
                  <p className="page-info">
                    {t(`Showing ${startIdx + 1}–${Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)} of ${filtered.length} writings`, `${filtered.length} मध्ये ${startIdx + 1}–${Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)} देखाइँदै`)}
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
