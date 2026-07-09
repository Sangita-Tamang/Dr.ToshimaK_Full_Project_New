import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Loader from '../../components/common/Loader';
import blogService from '../../services/blogService';
import { formatDate } from '../../utils/formatDate';
import { useLanguage } from '../../context/LanguageContext';
import img1 from '../../assets/images/image1.png';
import img4 from '../../assets/images/image4.png';

export default function BlogDetails() {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In our paginated/seeder data we have mock b1-b7 blogs
    // If it's a mock blog, we can find it directly in REAL_BLOGS inside Blog.jsx, or fetch it.
    // Let's first mock check since seeder matches these
    const mockBlogDb = [
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
        contentEn: 'Quality healthcare should not be a privilege for the wealthy. Through targeted reforms like the Hospital Operation Act and regulating hospital fees, we can build a system where every citizen gets standard treatment without financial ruin. We need strong, cooperative actions between government and private entities to reach everyone.',
        contentNp: 'गुणस्तरीय स्वास्थ्य सेवा धनी वर्गको मात्र अधिकार हुनु हुँदैन। अस्पताल सञ्चालन ऐन र सेवा शुल्कको नियमन मार्फत हामीले यस्तो प्रणाली विकास गर्न सक्छौं जहाँ हरेक नागरिकले आर्थिक संकट बिना उपचार पाउन सकून्। हामीलाई सबैमा पुग्न सरकारी र निजी निकायहरू बीच बलियो र सहयोगी कार्यहरू चाहिन्छ।',
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
        contentEn: 'As a doctor, I saved lives one patient at a time. But in rural health camps, I saw that the ultimate cure for our healthcare crisis lies not in the clinic, but in the halls of parliament through strong, pro-people health policies. Changing health policies is the best way to serve our country.',
        contentNp: 'एक चिकित्सकका रूपमा मैले एक पटकमा एकजना बिरामीको ज्यान जोगाउन सक्थें। तर ग्रामीण स्वास्थ्य शिविरहरूमा मैले बुझें कि हाम्रो स्वास्थ्य संकटको अन्तिम समाधान क्लिनिकमा होइन, नीति निर्माण तहमा छ। नीतिहरू परिवर्तन गर्नु नै देशको सेवा गर्ने उत्तम माध्यम हो।',
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
        contentEn: 'A country is only as strong as the health of its citizens. By investing in rural health clinics, preventative care, maternal health, and immediate trauma response, we can save thousands of lives before they even reach emergency rooms.',
        contentNp: 'नागरिक स्वस्थ नभई देश बलियो हुन सक्दैन। ग्रामीण क्लिनिक, मातृ स्वास्थ्य र ट्रमा केयरमा लगानी गरेर हामीले अस्पताल पुग्नु अगावै धेरैको ज्यान जोगाउन सक्छौं।',
        readTimeEn: '5 min read',
        readTimeNp: '५ मिनेट पढाइ',
        views: 942
      }
    ];

    const localFound = mockBlogDb.find(item => item._id === id);
    if (localFound) {
      setBlog(localFound);
      setLoading(false);
    } else {
      blogService.getById(id)
        .then(data => setBlog(data?.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <><Navbar /><Loader /><Footer /></>;

  const tt = (en, np) => lang === 'np' ? np : en;

  if (!blog) return (
    <>
      <Navbar />
      <div className="container section-padding text-center">
        <h2>{t('Blog post not found.', 'ब्लग पोष्ट फेला परेन।')}</h2>
        <Link to="/blog" className="btn btn-primary" style={{ marginTop: 20 }}>{t('Back to Blog', 'ब्लगमा फिर्ता जानुहोस्')}</Link>
      </div>
      <Footer />
    </>
  );

  const title = tt(blog.titleEn, blog.titleNp);
  const content = tt(blog.contentEn, blog.contentNp);
  const author = tt(blog.authorEn, blog.authorNp);
  const category = tt(blog.category, blog.categoryNp);
  const readTime = tt(blog.readTimeEn, blog.readTimeNp || blog.readTime);

  return (
    <>
      <Navbar />
      <main>
        <section className="section-padding">
          <div className="container" style={{ maxWidth: 800 }}>
            <Link to="/blog" style={{ color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
              <i className="fas fa-arrow-left"></i> {t('Back to Blog', 'ब्लगमा फिर्ता जानुहोस्')}
            </Link>

            <div>
              <span style={{ background: 'var(--primary)', color: '#fff', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600, display: 'inline-block', marginBottom: 16 }}>
                {category}
              </span>
            </div>
            <h1 style={{ fontSize: '2.25rem', marginBottom: 20 }}>{title}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid var(--border-color)' }}>
              <img src={blog.authorImage || img4} alt={author} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 600 }}>{author}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {formatDate(blog.publishedDate)} &bull; {readTime} &bull; {blog.views} {t('views', 'अवलोकनहरू')}
                </div>
              </div>
            </div>

            <img src={blog.image || img1} alt={title} style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 'var(--radius-lg)', marginBottom: 32 }} />

            <div style={{ lineHeight: 1.8, fontSize: '1.05rem', color: '#333', whiteSpace: 'pre-line' }}>
              {content}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
